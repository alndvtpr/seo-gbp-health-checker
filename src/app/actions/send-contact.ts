'use server'

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'

export interface SendContactResponse {
  success: boolean
  error?: string
}

export async function sendContactAction(data: ContactFormData): Promise<SendContactResponse> {
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
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

  try {
    const payload = {
      name,
      email,
      website: website || '',
      service,
      message,
      submittedAt: new Date().toISOString(),
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new Error(`Webhook endpoint returned HTTP status ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Google Sheet Webhook submission error:', error)
    return {
      success: false,
      error: 'Unable to send message at this moment. Please try again or reach out directly via email.',
    }
  }
}
