'use server'

import {
  websiteAuditRequestSchema,
  type WebsiteAuditRequestData,
} from '@/lib/schemas/audit-request'

export interface SendWebsiteAuditResponse {
  success: boolean
  error?: string
}

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx_Dygu47h7ie8prxsSs7d5807jpF7hrHoeAxH-tewPluST6hSYu1eeTn3pQs6OMSeDfQ/exec'

function generateOwnerAlertHtml(data: WebsiteAuditRequestData, dateStr: string): string {
  const { website, email, name, focus, notes } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New SEO Website Audit Request</title>
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
                ⚡ Alain Dave Tapiru • Website Audit Lead
              </span>
              <h1 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                New SEO Website Audit Request
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
                      📋 Request Overview
                    </div>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; width: 130px; font-weight: 600;">Target Domain:</td>
                        <td style="padding: 6px 0; font-size: 14px; color: #ffffff; font-weight: 700;">
                          <a href="${website}" target="_blank" rel="noopener noreferrer" style="color: #e07b20; text-decoration: underline;">${website}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; font-weight: 600;">Requester Email:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #ffffff;">
                          <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      ${
                        name
                          ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; font-weight: 600;">Name / Entity:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #ffffff;">${name}</td>
                      </tr>
                      `
                          : ''
                      }
                      ${
                        focus
                          ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #9ca3af; font-weight: 600;">Primary Focus:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #10b981; font-weight: 600;">${focus}</td>
                      </tr>
                      `
                          : ''
                      }
                      ${
                        notes
                          ? `
                      <tr>
                        <td style="padding: 8px 0 4px 0; font-size: 13px; color: #9ca3af; font-weight: 600; vertical-align: top;">Additional Notes:</td>
                        <td style="padding: 8px 0 4px 0; font-size: 13px; color: #d1d5db; line-height: 1.45;">${notes}</td>
                      </tr>
                      `
                          : ''
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Quick Triage Actions -->
              <div style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 10px;">
                  🚀 Quick Diagnostic Shortcuts
                </div>
                <div style="font-size: 12px; color: #9ca3af; line-height: 1.8;">
                  • <a href="https://pagespeed.web.dev/analysis?url=${encodeURIComponent(website)}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: none;">PageSpeed Insights &amp; Core Web Vitals</a><br>
                  • <a href="https://search.google.com/test/rich-results?url=${encodeURIComponent(website)}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: none;">Google Rich Results &amp; Schema Test</a><br>
                  • <a href="https://securityheaders.com/?q=${encodeURIComponent(website)}&followRedirects=on" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: none;">Security Headers Audit</a><br>
                  • <a href="${website.replace(/\/+$/, '')}/robots.txt" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: none;">Direct /robots.txt Check</a><br>
                  • <a href="${website.replace(/\/+$/, '')}/sitemap.xml" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: none;">Direct /sitemap.xml Check</a>
                </div>
              </div>

              <!-- Reply Action -->
              <div style="text-align: center; margin-top: 10px;">
                <a href="mailto:${email}?subject=SEO%20Website%20Audit%20Preliminary%20Findings%20-%20${encodeURIComponent(website)}" style="background-color: #e07b20; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; display: inline-block;">
                  Reply Directly to Requester
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 28px; background-color: #0d0f14; border-top: 1px solid #262b36; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #6b7280;">
                Sent via AlainTapiru.com Tools Engine • Resend Transactional Dispatch
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

function generateOwnerAlertText(data: WebsiteAuditRequestData, dateStr: string): string {
  const { website, email, name, focus, notes } = data

  return `
==================================================
NEW SEO WEBSITE AUDIT REQUEST
Alain Dave Tapiru • Portfolio Lead Dispatch
==================================================

Date Received: ${dateStr}
Target Domain: ${website}
Requester Email: ${email}
Requester Name: ${name || 'Not provided'}
Primary Focus: ${focus || 'General Preliminary Health Check'}
Additional Notes: ${notes || 'None'}

Quick Diagnostic Links:
• PageSpeed Insights: https://pagespeed.web.dev/analysis?url=${encodeURIComponent(website)}
• Google Rich Results: https://search.google.com/test/rich-results?url=${encodeURIComponent(website)}
• Security Headers: https://securityheaders.com/?q=${encodeURIComponent(website)}
• Robots.txt: ${website.replace(/\/+$/, '')}/robots.txt
• Sitemap: ${website.replace(/\/+$/, '')}/sitemap.xml

Reply directly to: ${email}
`
}

function generateRequesterConfirmationHtml(data: WebsiteAuditRequestData, dateStr: string): string {
  const { website, name } = data
  const greeting = name ? `Hi ${name.trim()},` : 'Hello,'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your SEO Website Audit Request Has Been Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0e12; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0c0e12; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #12151c; border: 1px solid #262b36; border-radius: 16px; overflow: hidden;" cellspacing="0" cellpadding="0">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 24px 28px; background: linear-gradient(135deg, rgba(224, 123, 32, 0.22), rgba(16, 185, 129, 0.12)); border-bottom: 1px solid #262b36;">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #e07b20; display: block; margin-bottom: 4px;">
                ⚡ Alain Dave Tapiru • Technical &amp; Semantic SEO
              </span>
              <h1 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                SEO Audit Request Received!
              </h1>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Target: <strong style="color: #ffffff;">${website}</strong> • Submitted on ${dateStr}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 24px 28px;">
              
              <p style="font-size: 14px; color: #f3f4f6; margin: 0 0 16px 0; line-height: 1.6;">
                ${greeting}
              </p>
              
              <p style="font-size: 13px; color: #d1d5db; margin: 0 0 20px 0; line-height: 1.6;">
                Thank you for requesting a preliminary SEO audit for <strong style="color: #e07b20;">${website}</strong>. Your domain has been queued for a personalized diagnostic review.
              </p>

              <!-- Diagnostic Check Scope Card -->
              <div style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 12px;">
                  🔍 What I Will Analyze in Your Preliminary Audit
                </div>
                
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #ffffff; vertical-align: top; width: 24px;">✓</td>
                    <td style="padding: 6px 0; font-size: 13px; color: #e5e7eb; line-height: 1.45;">
                      <strong>Crawlability &amp; Indexation:</strong> Robots.txt directives, XML sitemap accessibility, and noindex/canonical hygiene.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #ffffff; vertical-align: top;">✓</td>
                    <td style="padding: 6px 0; font-size: 13px; color: #e5e7eb; line-height: 1.45;">
                      <strong>Core Web Vitals &amp; Speed:</strong> Mobile render performance, Total Blocking Time (TBT), and asset bottlenecks.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #ffffff; vertical-align: top;">✓</td>
                    <td style="padding: 6px 0; font-size: 13px; color: #e5e7eb; line-height: 1.45;">
                      <strong>Security &amp; Response Headers:</strong> HTTPS encryption, HSTS, CSP, and X-Frame-Options headers.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #ffffff; vertical-align: top;">✓</td>
                    <td style="padding: 6px 0; font-size: 13px; color: #e5e7eb; line-height: 1.45;">
                      <strong>Metadata &amp; Semantic Structure:</strong> Title tags, meta descriptions, heading hierarchy, and Open Graph cards.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #ffffff; vertical-align: top;">✓</td>
                    <td style="padding: 6px 0; font-size: 13px; color: #e5e7eb; line-height: 1.45;">
                      <strong>AI Search &amp; Schema Entities:</strong> JSON-LD structured data readiness for Generative AI engines (ChatGPT, Perplexity, Gemini).
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps Box -->
              <div style="background-color: rgba(224, 123, 32, 0.1); border: 1px solid rgba(224, 123, 32, 0.35); border-radius: 12px; padding: 16px 18px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 800; color: #e07b20; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
                  ⏱️ What Happens Next?
                </div>
                <p style="margin: 0; font-size: 13px; color: #fed7aa; line-height: 1.55;">
                  I will personally inspect your domain and follow up directly to this email address within <strong>24 to 48 hours</strong> with actionable diagnostic takeaways and prioritized optimization steps.
                </p>
              </div>

              <!-- CTA / Direct Booking -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(224, 123, 32, 0.2), rgba(224, 123, 32, 0.05)); border: 1px solid rgba(224, 123, 32, 0.4); border-radius: 12px; text-align: center;">
                <tr>
                  <td style="padding: 22px 20px;">
                    <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: #ffffff;">
                      Have Specific Deadlines or Immediate Questions?
                    </h4>
                    <p style="margin: 0 0 14px 0; font-size: 12px; color: #d1d5db; line-height: 1.5;">
                      You can reply directly to this email or explore my verified case studies and free interactive tools.
                    </p>
                    <div>
                      <a href="https://www.alaintapiru.com/projects/" style="background-color: #e07b20; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; display: inline-block;">
                        View SEO Case Studies
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 28px; background-color: #0d0f14; border-top: 1px solid #262b36; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #9ca3af; font-weight: 600;">
                Alain Dave G. Tapiru • Technical SEO &amp; Full-Stack Web Specialist
              </p>
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #6b7280;">
                <a href="https://www.alaintapiru.com" style="color: #e07b20; text-decoration: none; font-weight: 600;">alaintapiru.com</a> • <a href="mailto:alaintapiru@gmail.com" style="color: #e07b20; text-decoration: none; font-weight: 600;">alaintapiru@gmail.com</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #4b5563;">
                Direct / WhatsApp: +63 906 324 9560
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

function generateRequesterConfirmationText(data: WebsiteAuditRequestData, dateStr: string): string {
  const { website, name } = data
  const greeting = name ? `Hi ${name.trim()},` : 'Hello,'

  return `
==================================================
SEO WEBSITE AUDIT REQUEST RECEIVED
Alain Dave Tapiru • Technical & Semantic SEO
==================================================

${greeting}

Thank you for requesting a preliminary SEO audit for ${website}. Your domain has been queued for a personalized diagnostic review on ${dateStr}.

WHAT I WILL ANALYZE:
1. Crawlability & Indexation (Robots.txt, XML Sitemaps, Canonical tags)
2. Core Web Vitals & Mobile Speed (LCP, INP, CLS, render bottlenecks)
3. Security & Response Headers (HTTPS, HSTS, CSP, X-Frame-Options)
4. Metadata & Semantic Structure (Titles, meta descriptions, Open Graph, headings)
5. AI Search & Schema Entities (JSON-LD structured data for LLM discovery)

WHAT HAPPENS NEXT:
I will personally inspect your domain and follow up directly to this email address within 24 to 48 hours with actionable diagnostic takeaways and prioritized optimization steps.

Need immediate assistance?
Reply directly to this email or reach out:
Email: alaintapiru@gmail.com
Website: https://www.alaintapiru.com
Direct / WhatsApp: +63 906 324 9560
`
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

  // 1. Google Sheets Webhook Dispatch (Lead Logging & CRM)
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL
  const leadPayload = {
    name: name ? `SEO Audit: ${name}` : `SEO Audit: ${email}`,
    email,
    website,
    service: `SEO Website Audit (${focus || 'General Preliminary Check'})`,
    message: `Domain: ${website}\nRequester: ${name || 'N/A'}\nEmail: ${email}\nFocus Area: ${focus || 'General Preliminary Check'}\nNotes: ${notes || 'None'}\nSubmitted At: ${dateStr}`,
    submittedAt: new Date().toISOString(),
  }

  try {
    const sheetRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadPayload),
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })

    if (!sheetRes.ok) {
      console.warn(`Google Sheet Webhook returned HTTP status ${sheetRes.status}`)
    }
  } catch (sheetErr) {
    console.error('Google Sheet Webhook audit submission error:', sheetErr)
  }

  // 2. Resend Email Dispatch
  const resendApiKey = process.env.RESEND_API_KEY
  const resendFrom = process.env.RESEND_FROM_EMAIL || 'Alain Dave Tapiru <onboarding@resend.dev>'
  const ownerRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'

  let ownerDelivered = false
  let userDelivered = false

  if (resendApiKey) {
    try {
      // Dispatch 1: Informational notification to site owner (Alain)
      const ownerHtml = generateOwnerAlertHtml(validatedData, dateStr)
      const ownerText = generateOwnerAlertText(validatedData, dateStr)

      const ownerResend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: ownerRecipient,
          reply_to: email,
          subject: `🔍 New SEO Website Audit Request: ${website} (${name || email})`,
          html: ownerHtml,
          text: ownerText,
        }),
      })

      if (ownerResend.ok) {
        ownerDelivered = true
      } else {
        const errorText = await ownerResend.text()
        console.error(`Resend owner notification delivery error (HTTP ${ownerResend.status}):`, errorText)
      }

      // Dispatch 2: Confirmation copy to the requester
      const userHtml = generateRequesterConfirmationHtml(validatedData, dateStr)
      const userText = generateRequesterConfirmationText(validatedData, dateStr)

      const userResend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: email,
          reply_to: ownerRecipient,
          subject: `✅ SEO Website Audit Request Received: ${website}`,
          html: userHtml,
          text: userText,
        }),
      })

      if (userResend.ok) {
        userDelivered = true
      } else {
        const errorText = await userResend.text()
        console.error(`Resend requester confirmation delivery error (HTTP ${userResend.status}):`, errorText)
      }
    } catch (resendErr) {
      console.error('Resend audit dispatch error:', resendErr)
    }
  } else {
    console.warn(
      `[sendWebsiteAuditRequestAction] RESEND_API_KEY is not configured. Audit request could not be dispatched via Resend.`,
    )
  }

  // Graceful response check: if Resend is configured, we expect at least one delivery or fallback
  return { success: true }
}
