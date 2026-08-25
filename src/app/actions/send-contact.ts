'use server'

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'

export interface SendContactResponse {
  success: boolean
  error?: string
}

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx_Dygu47h7ie8prxsSs7d5807jpF7hrHoeAxH-tewPluST6hSYu1eeTn3pQs6OMSeDfQ/exec'

function generateContactEmailHtml(data: ContactFormData, dateStr: string): string {
  const { name, email, website, service, message } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0e12; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0c0e12; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #12151c; border: 1px solid #262b36; border-radius: 16px; overflow: hidden;" cellspacing="0" cellpadding="0">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 24px 28px; background: linear-gradient(135deg, rgba(224, 123, 32, 0.2), rgba(16, 185, 129, 0.12)); border-bottom: 1px solid #262b36;">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #e07b20; display: block; margin-bottom: 4px;">
                ⚡ Alain Dave Tapiru • Contact Lead
              </span>
              <h1 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                New Project / Client Inquiry
              </h1>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Received on ${dateStr}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 24px 28px;">
              
              <!-- Lead Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 12px;">
                      📋 Client Details
                    </div>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; width: 130px; font-weight: 600;">Name:</td>
                        <td style="padding: 6px 0; font-size: 14px; color: #ffffff; font-weight: 700;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; font-weight: 600;">Email:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #ffffff;">
                          <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      ${
                        website
                          ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; font-weight: 600;">Website:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #ffffff;">
                          <a href="${website}" target="_blank" rel="noopener noreferrer" style="color: #e07b20; text-decoration: underline;">${website}</a>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; font-weight: 600;">Service Needed:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #10b981; font-weight: 600;">${service}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Body Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 10px;">
                      💬 Project Message / Scope
                    </div>
                    <div style="font-size: 13px; color: #d1d5db; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                  </td>
                </tr>
              </table>

              <!-- Reply Action -->
              <div style="text-align: center; margin-top: 10px;">
                <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(service)}%20Inquiry%20-%20Alain%20Dave%20Tapiru" style="background-color: #e07b20; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 8px; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; display: inline-block;">
                  Reply to ${name}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 28px; background-color: #0d0f14; border-top: 1px solid #262b36; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #6b7280;">
                Sent via AlainTapiru.com Contact Engine • Resend Transactional Dispatch
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generateContactEmailText(data: ContactFormData, dateStr: string): string {
  const { name, email, website, service, message } = data

  return `
============================================================
⚡ NEW CLIENT INQUIRY - ALAINTAPIRU.COM
============================================================
Received: ${dateStr}

CLIENT OVERVIEW:
- Name: ${name}
- Email: ${email}
- Website: ${website || 'N/A'}
- Service Needed: ${service}

PROJECT MESSAGE / DETAILS:
${message}

------------------------------------------------------------
Reply directly to: ${email}
Sent via AlainTapiru.com Contact Engine
============================================================
`.trim()
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

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL
  const resendApiKey = process.env.RESEND_API_KEY
  const resendFrom = process.env.RESEND_FROM_EMAIL || 'Alain Dave Tapiru <audit@mail.alaintapiru.com>'
  const resendRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'

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
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      })

      if (response.ok) {
        sheetDelivered = true
      } else {
        console.error(`Google Sheet webhook returned HTTP status ${response.status}`)
      }
    } catch (error) {
      console.error('Google Sheet Webhook submission error:', error)
    }
  })()

  // 2. Resend Email Dispatch (Rich HTML & Text Alert to Site Owner)
  const resendPromise = (async () => {
    if (!resendApiKey) {
      console.warn('[sendContactAction] RESEND_API_KEY is not configured. Email alert skipped.')
      return
    }

    try {
      const htmlContent = generateContactEmailHtml(result.data, dateStr)
      const textContent = generateContactEmailText(result.data, dateStr)

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: resendRecipient,
          reply_to: email,
          subject: `📬 New Client Inquiry: ${name} (${service})`,
          html: htmlContent,
          text: textContent,
        }),
      })

      if (resendRes.ok) {
        emailDelivered = true
      } else {
        const errText = await resendRes.text()
        console.error(`Resend contact notification error (HTTP ${resendRes.status}):`, errText)
      }
    } catch (resendErr) {
      console.error('Resend notification error:', resendErr)
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
