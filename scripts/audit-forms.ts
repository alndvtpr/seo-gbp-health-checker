import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { contactFormSchema } from '../src/lib/schemas/contact'
import { websiteAuditRequestSchema } from '../src/lib/schemas/audit-request'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
dotenv.config({ path: path.resolve(__dirname, '../.env') })

interface AuditCheck {
  form: string
  check: string
  passed: boolean
  details?: string
}

const auditChecks: AuditCheck[] = []

function logCheck(form: string, check: string, passed: boolean, details?: string) {
  auditChecks.push({ form, check, passed, details })
  const icon = passed ? '✅' : '❌'
  console.log(`${icon} [${form}] ${check}${details ? ` -> ${details}` : ''}`)
}

async function runFormAudit() {
  console.log('\n📋 --- INITIATING COMPREHENSIVE FORM & DISPATCH PIPELINE AUDIT ---\n')

  // 1. ENVIRONMENT AUDIT
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  const resendApiKey = process.env.RESEND_API_KEY
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'
  const resendFrom = process.env.RESEND_FROM_EMAIL || 'Alain Dave Tapiru <onboarding@resend.dev>'

  logCheck('Environment', 'Google Sheets Webhook URL configured', !!webhookUrl, webhookUrl ? 'Configured' : 'Missing')
  logCheck('Environment', 'Resend API Key configured', !!resendApiKey, resendApiKey ? `Configured (prefix: ${resendApiKey.slice(0, 6)}...)` : 'Missing')
  logCheck('Environment', 'Owner Notification Email configured', !!notificationEmail, notificationEmail)
  logCheck('Environment', 'Resend From Email configured', !!resendFrom, resendFrom)

  // 2. CONTACT FORM SCHEMA VALIDATION
  const validContact = contactFormSchema.safeParse({
    name: 'Alain Dave Tapiru',
    email: 'alaintapiru@gmail.com',
    website: 'alaintapiru.com',
    service: 'Technical SEO Audit & Architecture',
    message: 'Testing contact form audit pipeline and email delivery.',
    hp_website: '',
  })
  logCheck('ContactForm', 'Zod schema validation (valid payload)', validContact.success, validContact.success ? `Normalized website: ${validContact.data?.website}` : JSON.stringify(validContact.error))

  // 3. WEBSITE AUDIT REQUEST FORM SCHEMA VALIDATION
  const validAuditReq = websiteAuditRequestSchema.safeParse({
    website: 'angatsikat.com',
    email: 'client@example.com',
    name: 'AngatSikat Admin',
    focus: 'Core Web Vitals & Mobile Speed Profile',
    notes: 'Please review INP and LCP on mobile pages.',
    hp_website: '',
  })
  logCheck('WebsiteAuditForm', 'Zod schema validation (valid payload)', validAuditReq.success, validAuditReq.success ? `Normalized website: ${validAuditReq.data?.website}` : JSON.stringify(validAuditReq.error))

  // 4. LIVE GOOGLE SHEETS WEBHOOK VALIDATION
  if (webhookUrl) {
    try {
      const pingPayload = {
        name: 'Automated Audit Ping',
        email: 'alaintapiru@gmail.com',
        website: 'https://alaintapiru.com',
        service: 'System Form Health Audit',
        message: 'Ping verification to ensure Google Sheets Webhook accepts live JSON POST payloads.',
        submittedAt: new Date().toISOString(),
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pingPayload),
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(12000),
      })

      logCheck('GoogleSheetsWebhook', 'HTTP Response Status', res.ok, `HTTP ${res.status} (${res.statusText})`)
      const resText = await res.text()
      logCheck('GoogleSheetsWebhook', 'Webhook Payload Processed', res.ok, `Response preview: ${resText.slice(0, 120)}`)
    } catch (err: any) {
      logCheck('GoogleSheetsWebhook', 'Webhook Connectivity', false, err.message)
    }
  }

  // 5. RESEND API AUTHENTICATION & CAPABILITY VALIDATION
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/api-keys', {
        headers: { Authorization: `Bearer ${resendApiKey}` },
      })
      logCheck('ResendAPI', 'API Key Authentication', res.ok, `HTTP ${res.status}`)
    } catch (err: any) {
      logCheck('ResendAPI', 'Resend API Connectivity', false, err.message)
    }
  }

  const passedCount = auditChecks.filter((c) => c.passed).length
  const failedCount = auditChecks.filter((c) => !c.passed).length
  console.log(`\n📊 AUDIT SUMMARY: ${passedCount} Passed, ${failedCount} Failed\n`)
}

runFormAudit()
