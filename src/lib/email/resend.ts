import { env } from '@/lib/env'

export interface SendEmailOptions {
  to: string
  from?: string
  replyTo?: string
  subject: string
  html: string
  text: string
}

export interface SendEmailResult {
  success: boolean
  error?: string
}

/**
 * Dispatches an email via the Resend REST API using typed environment secrets.
 */
export async function sendResendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) {
    console.warn(
      `[sendResendEmail] RESEND_API_KEY is not configured. Email to "${options.to}" was skipped.`
    )
    return { success: false, error: 'RESEND_API_KEY is not configured.' }
  }

  const from = options.from || env.RESEND_FROM_EMAIL || 'Alain Dave Tapiru <audit@mail.alaintapiru.com>'

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: options.to,
        reply_to: options.replyTo,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(
        `[sendResendEmail] Resend delivery error (HTTP ${response.status}) to ${options.to}:`,
        errorText
      )
      return { success: false, error: errorText }
    }

    return { success: true }
  } catch (error) {
    console.error(`[sendResendEmail] Network error sending to ${options.to}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown network error',
    }
  }
}
