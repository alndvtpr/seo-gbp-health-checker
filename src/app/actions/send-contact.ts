'use server'

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'

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

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('Missing GOOGLE_SHEET_WEBHOOK_URL in environment configuration.')
    return {
      success: false,
      error: 'Server configuration error: Contact webhook URL is not set.',
    }
  }

  let sheetSuccess = false
  const payload = {
    name,
    email,
    website: website || '',
    service,
    message,
    submittedAt: new Date().toISOString(),
  }

  // 1. Google Sheets Webhook Dispatch (Properly awaited with redirect: 'follow')
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })

    if (!response.ok) {
      console.error(`Google Sheet webhook returned HTTP status ${response.status}`)
    } else {
      sheetSuccess = true
    }
  } catch (error) {
    console.error('Google Sheet Webhook submission error:', error)
  }

  // 2. Resend Email Dispatch (Graceful fallback if RESEND_API_KEY is not set or fails)
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    try {
      const resendRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: resendRecipient,
          reply_to: email,
          subject: `New Lead: ${name} (${service})`,
          text: `Name: ${name}\nEmail: ${email}\nWebsite: ${website || 'N/A'}\nService: ${service}\n\nMessage:\n${message}`,
        }),
      })

      if (!resendRes.ok) {
        console.warn(`Resend API notification returned HTTP status ${resendRes.status}`)
      }
    } catch (resendErr) {
      console.error('Resend notification error (non-fatal):', resendErr)
    }
  }

  // Ensure overall delivery succeeded
  if (!sheetSuccess && !resendApiKey) {
    return {
      success: false,
      error: 'Unable to send message at this moment. Please try again or reach out directly via email.',
    }
  }

  return { success: true }
}
