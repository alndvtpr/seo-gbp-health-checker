import type { ContactFormData } from '@/lib/schemas/contact'

export function generateContactEmailHtml(data: ContactFormData, dateStr: string): string {
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

export function generateContactEmailText(data: ContactFormData, dateStr: string): string {
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
