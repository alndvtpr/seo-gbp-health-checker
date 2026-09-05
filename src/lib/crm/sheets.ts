import { env } from '@/lib/env'

export interface SheetLeadPayload {
  name: string
  email: string
  to?: string
  subject?: string
  htmlBody?: string
  textBody?: string
  website?: string
  service: string
  message: string
  submittedAt?: string
}

export interface SheetDispatchResult {
  success: boolean
  error?: string
}

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx_Dygu47h7ie8prxsSs7d5807jpF7hrHoeAxH-tewPluST6hSYu1eeTn3pQs6OMSeDfQ/exec'

/**
 * Dispatches lead data to the Google Sheets webhook endpoint for CRM logging.
 */
export async function sendSheetLead(payload: SheetLeadPayload): Promise<SheetDispatchResult> {
  const webhookUrl = env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: payload.submittedAt || new Date().toISOString(),
      }),
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      console.warn(`[sendSheetLead] Google Sheet Webhook returned HTTP status ${response.status}`)
      return { success: false, error: `HTTP ${response.status}` }
    }

    return { success: true }
  } catch (error) {
    console.error('[sendSheetLead] Google Sheet Webhook submission error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown network error',
    }
  }
}
