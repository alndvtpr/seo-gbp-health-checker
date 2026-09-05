'use server'

import { z } from 'zod'
import { env } from '@/lib/env'
import { sendResendEmail } from '@/lib/email/resend'
import { sendSheetLead } from '@/lib/crm/sheets'
import {
  generateAuditEmailHtml,
  generateAuditEmailText,
} from '@/lib/email/templates/auditReport'

const publicCheckSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  status: z.enum(['passed', 'failed', 'warning']).or(z.string()),
  value: z.string().nullable().optional(),
  scoreEarned: z.number().optional().default(0),
  maxScore: z.number().optional().default(10),
  impactMessage: z.string().optional().default(''),
})

const pillarSchema = z.object({
  name: z.string(),
  score: z.number().optional().default(0),
  maxScore: z.number().optional().default(30),
  details: z.array(z.string()).nullable().optional().default([]),
})

const actionItemSchema = z.object({
  priority: z.enum(['high', 'medium', 'low', 'passed']).or(z.string()).optional().default('medium'),
  message: z.string(),
})

const competitorSchema = z.object({
  name: z.string(),
  rating: z.union([z.number(), z.string().transform(Number), z.null()]).optional(),
  reviews: z.union([z.number(), z.string().transform(Number), z.null()]).optional(),
  position: z.number().optional().default(1),
  category: z.string().nullable().optional(),
})

const websiteSeoSchema = z.object({
  url: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  status: z.enum(['success', 'error', 'no_website']).or(z.string()).nullable().optional(),
})

const reviewTemplatesSchema = z.object({
  positive: z.string().nullable().optional(),
  constructive: z.string().nullable().optional(),
})

const categoryBenchmarkSchema = z.object({
  isCategoryAlignedWithTopCompetitors: z.boolean().nullable().optional(),
  topCompetitorCategories: z.array(z.string()).nullable().optional(),
  categoryOptimizationTip: z.string().nullable().optional(),
  rawGoogleCategory: z.string().nullable().optional(),
  isCategoryMismatchDetected: z.boolean().nullable().optional(),
  recommendedPrimaryCategory: z.string().nullable().optional(),
  recommendedSecondaryCategories: z.array(z.string()).nullable().optional(),
})

const auditEmailSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please enter a valid email address'),
  businessName: z.string().trim().min(1, 'Business name is required'),
  location: z.string().nullable().optional(),
  totalScore: z.union([z.number(), z.string().transform(Number)]),
  grade: z.string().optional().default('N/A'),
  primaryCategory: z.string().nullable().optional(),
  additionalCategories: z.array(z.string()).nullable().optional(),
  foundInMapPack: z.boolean().nullable().optional(),
  mapPackPosition: z.number().nullable().optional(),
  pillars: z.array(pillarSchema).nullable().optional(),
  publicChecks: z.array(publicCheckSchema).nullable().optional(),
  actionItems: z.array(actionItemSchema).nullable().optional(),
  competitors: z.array(competitorSchema).nullable().optional(),
  websiteSeo: websiteSeoSchema.nullable().optional(),
  aiRecommendations: z.string().nullable().optional(),
  aiDescription: z.string().nullable().optional(),
  aiReviewTemplates: reviewTemplatesSchema.nullable().optional(),
  aiKeywords: z.array(z.string()).nullable().optional(),
  categoryBenchmark: categoryBenchmarkSchema.nullable().optional(),
  topActionItems: z.array(z.string()).nullable().optional(),
  hp_website: z.string().nullable().optional(),
})

export type AuditEmailData = z.infer<typeof auditEmailSchema>

export interface SendAuditResponse {
  success: boolean
  error?: string
  warning?: string
}

export async function sendAuditReportAction(data: AuditEmailData): Promise<SendAuditResponse> {
  const result = auditEmailSchema.safeParse(data)

  if (!result.success) {
    console.error('Audit report validation error:', result.error)
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Invalid email data.',
    }
  }

  const validatedData = result.data
  const {
    email,
    businessName,
    location,
    totalScore,
    grade,
    primaryCategory,
    actionItems,
    topActionItems,
    hp_website,
  } = validatedData

  // Honeypot spam mitigation
  if (hp_website && hp_website.trim().length > 0) {
    return { success: true }
  }

  const resendFrom = env.RESEND_FROM_EMAIL || 'GBP Health Checker <audit@mail.alaintapiru.com>'
  const ownerRecipient = env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'

  const allActions = actionItems?.map((a) => `[${a.priority.toUpperCase()}] ${a.message}`) || topActionItems || []
  const emailHtml = generateAuditEmailHtml(validatedData)
  const emailText = generateAuditEmailText(validatedData)
  const subjectLine = `📊 Complete GBP Audit & Growth Blueprint: ${businessName} (${totalScore}/100 - Grade ${grade})`

  // 1. Google Sheets Webhook Dispatch (Lead Logging & CRM)
  const sheetPromise = sendSheetLead({
    name: `GBP Lead: ${businessName}`,
    email,
    to: email,
    subject: subjectLine,
    htmlBody: emailHtml,
    textBody: emailText,
    website: location || '',
    service: `GBP Full Audit (${totalScore}/100 - Grade ${grade})`,
    message: `Business: ${businessName}\nLocation: ${location || 'N/A'}\nScore: ${totalScore}/100 (Grade ${grade})\nPrimary Category: ${primaryCategory || 'N/A'}\nTop Action Items:\n${allActions.map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
    submittedAt: new Date().toISOString(),
  })

  // 2. Resend Direct Email Dispatch
  const resendPromise = (async () => {
    if (!env.RESEND_API_KEY) {
      console.warn(
        `[sendAuditReportAction] RESEND_API_KEY environment variable is not configured. Audit report could not be emailed to ${email}. Lead was recorded to Google Sheets.`,
      )
      return
    }

    // Concurrently dispatch directly to the user's input email and site owner notification
    await Promise.allSettled([
      sendResendEmail({
        from: resendFrom,
        to: email,
        replyTo: ownerRecipient,
        subject: subjectLine,
        html: emailHtml,
        text: emailText,
      }),
      sendResendEmail({
        from: resendFrom,
        to: ownerRecipient,
        replyTo: email,
        subject: `⚡ New GBP Audit Lead: ${businessName} (${totalScore}/100 - Grade ${grade})`,
        html: emailHtml,
        text: emailText,
      }),
    ])
  })()

  // Concurrently await both dispatches
  await Promise.allSettled([sheetPromise, resendPromise])

  return { success: true }
}
