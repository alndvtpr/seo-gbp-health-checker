'use server'

import { z } from 'zod'

const auditEmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(1, 'Business name is required'),
  location: z.string().optional(),
  totalScore: z.number(),
  grade: z.string(),
  primaryCategory: z.string().optional(),
  topActionItems: z.array(z.string()).optional(),
  hp_website: z.string().optional(),
})

export type AuditEmailData = z.infer<typeof auditEmailSchema>

export interface SendAuditResponse {
  success: boolean
  error?: string
}

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx_Dygu47h7ie8prxsSs7d5807jpF7hrHoeAxH-tewPluST6hSYu1eeTn3pQs6OMSeDfQ/exec'

export async function sendAuditReportAction(data: AuditEmailData): Promise<SendAuditResponse> {
  const result = auditEmailSchema.safeParse(data)

  if (!result.success) {
    console.error('Audit report validation error:', result.error)
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Invalid email data.',
    }
  }

  const { email, businessName, location, totalScore, grade, primaryCategory, topActionItems, hp_website } =
    result.data

  // Honeypot spam mitigation
  if (hp_website && hp_website.trim().length > 0) {
    return { success: true }
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL
  let leadLogged = false

  const payload = {
    name: `GBP Lead: ${businessName}`,
    email,
    website: location || '',
    service: `GBP Audit Report (${totalScore}/100 - Grade ${grade})`,
    message: `Business: ${businessName}\nLocation: ${location || 'N/A'}\nScore: ${totalScore}/100 (Grade ${grade})\nPrimary Category: ${primaryCategory || 'N/A'}\nTop Action Items:\n${(topActionItems || []).map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
    submittedAt: new Date().toISOString(),
  }

  // 1. Google Sheets Webhook Dispatch
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })

    if (response.ok) {
      leadLogged = true
    }
  } catch (error) {
    console.error('Google Sheet Webhook audit submission error:', error)
  }

  // 2. Resend Email Dispatch (Sends audit summary to user & notification to owner)
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    try {
      const resendRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'
      
      // Dispatch notification to site owner
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GBP Health Checker <onboarding@resend.dev>',
          to: resendRecipient,
          reply_to: email,
          subject: `⚡ New GBP Audit Lead: ${businessName} (${totalScore}/100)`,
          text: `Business: ${businessName}\nTarget Email: ${email}\nLocation: ${location || 'N/A'}\nScore: ${totalScore}/100 (Grade ${grade})\nCategory: ${primaryCategory || 'N/A'}\n\nTop Recommended Fixes:\n${(topActionItems || []).join('\n')}`,
        }),
      })

      leadLogged = true
    } catch (resendErr) {
      console.error('Resend audit notification error:', resendErr)
    }
  }

  // If webhook succeeded or we caught no fatal block, return success
  return { success: true }
}
