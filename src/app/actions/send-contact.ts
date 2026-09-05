'use server'

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'
import { env } from '@/lib/env'
import { sendResendEmail } from '@/lib/email/resend'
import { sendSheetLead } from '@/lib/crm/sheets'
import {
  generateContactEmailHtml,
  generateContactEmailText,
} from '@/lib/email/templates/contactMessage'

export interface SendContactResponse {
  success: boolean
  error?: string
}

export async function sendContactAction(data: ContactFormData): Promise<SendContactResponse> {
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    console.error('Validation error:', result.error)
    const issue = result.error.issues[0]
    return {
      success: false,
      error: issue?.message || 'Invalid form inputs. Please check the fields.',
    }
  }

  const { name, email, website, service, message, hp_website } = result.data

  // Honeypot spam mitigation: silent return if filled by a bot
  if (hp_website && hp_website.trim().length > 0) {
    return { success: true }
  }

  const dateStr = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Manila',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const payload = {
    name,
    email,
    website: website || '',
    service,
    message,
    submittedAt: new Date().toISOString(),
  }

  let sheetDelivered = false
  let emailDelivered = false

  // 1. Google Sheets Webhook Dispatch (Lead Logging & CRM)
  const sheetPromise = (async () => {
    const res = await sendSheetLead(payload)
    if (res.success) {
      sheetDelivered = true
    }
  })()

  // 2. Resend Email Dispatch (Rich HTML & Text Alert to Site Owner)
  const resendFrom = env.RESEND_FROM_EMAIL || 'Alain Dave Tapiru <audit@mail.alaintapiru.com>'
  const resendRecipient = env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'

  const resendPromise = (async () => {
    if (!env.RESEND_API_KEY) {
      console.warn('[sendContactAction] RESEND_API_KEY is not configured. Email alert skipped.')
      return
    }

    const htmlContent = generateContactEmailHtml(result.data, dateStr)
    const textContent = generateContactEmailText(result.data, dateStr)

    const res = await sendResendEmail({
      from: resendFrom,
      to: resendRecipient,
      replyTo: email,
      subject: `📬 New Client Inquiry: ${name} (${service})`,
      html: htmlContent,
      text: textContent,
    })

    if (res.success) {
      emailDelivered = true
    }
  })()

  // Concurrently execute both dispatches
  await Promise.allSettled([sheetPromise, resendPromise])

  // Ensure at least one delivery pipeline succeeded
  if (!sheetDelivered && !emailDelivered) {
    return {
      success: false,
      error: 'Unable to send message at this moment. Please try again or reach out directly via email.',
    }
  }

  return { success: true }
}
