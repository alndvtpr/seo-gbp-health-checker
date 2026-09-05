'use server'

import {
  websiteAuditRequestSchema,
  type WebsiteAuditRequestData,
} from '@/lib/schemas/audit-request'
import { env } from '@/lib/env'
import { sendResendEmail } from '@/lib/email/resend'
import { sendSheetLead } from '@/lib/crm/sheets'
import {
  generateOwnerAlertHtml,
  generateOwnerAlertText,
  generateRequesterConfirmationHtml,
  generateRequesterConfirmationText,
} from '@/lib/email/templates/websiteAuditRequest'

export interface SendWebsiteAuditResponse {
  success: boolean
  error?: string
}

export async function sendWebsiteAuditRequestAction(
  data: WebsiteAuditRequestData,
): Promise<SendWebsiteAuditResponse> {
  const result = websiteAuditRequestSchema.safeParse(data)

  if (!result.success) {
    console.error('Website audit validation error:', result.error)
    const firstIssue = result.error.issues[0]
    return {
      success: false,
      error: firstIssue?.message || 'Invalid form inputs. Please check the fields.',
    }
  }

  const validatedData = result.data
  const { website, email, name, focus, notes, hp_website } = validatedData

  // Honeypot spam mitigation: silent return if filled by a bot
  if (hp_website && hp_website.trim().length > 0) {
    return { success: true }
  }

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  let sheetDelivered = false
  let ownerDelivered = false
  let userDelivered = false

  // 1. Google Sheets Webhook Dispatch (Lead Logging & CRM)
  const sheetPromise = (async () => {
    const leadPayload = {
      name: name ? `SEO Audit: ${name}` : `SEO Audit: ${email}`,
      email,
      website,
      service: `SEO Website Audit (${focus || 'General Preliminary Check'})`,
      message: `Domain: ${website}\nRequester: ${name || 'N/A'}\nEmail: ${email}\nFocus Area: ${focus || 'General Preliminary Check'}\nNotes: ${notes || 'None'}\nSubmitted At: ${dateStr}`,
      submittedAt: new Date().toISOString(),
    }

    const res = await sendSheetLead(leadPayload)
    if (res.success) {
      sheetDelivered = true
    }
  })()

  // 2. Resend Email Dispatch
  const resendFrom = env.RESEND_FROM_EMAIL || 'Alain Dave Tapiru <audit@mail.alaintapiru.com>'
  const ownerRecipient = env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'

  const resendPromise = (async () => {
    if (!env.RESEND_API_KEY) {
      console.warn(
        `[sendWebsiteAuditRequestAction] RESEND_API_KEY is not configured. Audit request could not be dispatched via Resend.`,
      )
      return
    }

    const ownerHtml = generateOwnerAlertHtml(validatedData, dateStr)
    const ownerText = generateOwnerAlertText(validatedData, dateStr)
    const userHtml = generateRequesterConfirmationHtml(validatedData, dateStr)
    const userText = generateRequesterConfirmationText(validatedData, dateStr)

    // Dispatch 1: Informational notification to site owner (Alain)
    // Dispatch 2: Confirmation copy to the requester
    const [ownerResendResult, userResendResult] = await Promise.allSettled([
      sendResendEmail({
        from: resendFrom,
        to: ownerRecipient,
        replyTo: email,
        subject: `🔍 New SEO Website Audit Request: ${website} (${name || email})`,
        html: ownerHtml,
        text: ownerText,
      }),
      sendResendEmail({
        from: resendFrom,
        to: email,
        replyTo: ownerRecipient,
        subject: `✅ SEO Website Audit Request Received: ${website}`,
        html: userHtml,
        text: userText,
      }),
    ])

    if (ownerResendResult.status === 'fulfilled' && ownerResendResult.value.success) {
      ownerDelivered = true
    }
    if (userResendResult.status === 'fulfilled' && userResendResult.value.success) {
      userDelivered = true
    }
  })()

  // Concurrently execute both dispatches
  await Promise.allSettled([sheetPromise, resendPromise])

  // Ensure at least one delivery pipeline succeeded
  if (!sheetDelivered && !ownerDelivered && !userDelivered) {
    return {
      success: false,
      error: 'Unable to submit audit request at this moment. Please try again or reach out directly.',
    }
  }

  return { success: true }
}
