import { z } from 'zod'

/**
 * Known insecure secret fallbacks that must be strictly rejected in production.
 */
const INSECURE_SECRET_PLACEHOLDERS = new Set([
  '',
  'secret',
  'YOUR_SECRET_HERE',
  'your-preview-secret-here',
  'your-payload-secret-here',
  'change-me',
  'changeme',
  'dev-payload-secret-do-not-use-in-production',
  'dev-preview-secret-do-not-use-in-production',
])

const isProduction = process.env.NODE_ENV === 'production'
const isNode = typeof process !== 'undefined' && Boolean(process.versions?.node)
const isServer = typeof window === 'undefined' || isNode

// ── 1. Client Environment Schema (Browser Safe) ─────────────────────────────
const clientEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().default('G-2VK6KQNJGH'),
})

// ── 2. Server Environment Schema (Server-Only Secrets & Config) ─────────────
const serverEnvSchema = z.object({
  // Runtime & Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Required Server-Only Variables
  DATABASE_URI: z.string().min(1, 'DATABASE_URI (or POSTGRES_URL) is required'),
  PAYLOAD_SECRET: z
    .string()
    .min(1, 'PAYLOAD_SECRET is required')
    .refine(
      (val) => !isProduction || !INSECURE_SECRET_PLACEHOLDERS.has(val.trim()),
      {
        message:
          'PAYLOAD_SECRET is missing, empty, or using an insecure placeholder in production.',
      }
    ),
  PREVIEW_SECRET: z
    .string()
    .min(1, 'PREVIEW_SECRET is required')
    .refine(
      (val) => !isProduction || !INSECURE_SECRET_PLACEHOLDERS.has(val.trim()),
      {
        message:
          'PREVIEW_SECRET is missing, empty, or using an insecure placeholder in production.',
      }
    ),

  // Optional Server-Only Variables
  OPENAI_API_KEY: z.string().optional(),
  SERPER_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z
    .string()
    .default('Alain Dave Tapiru <audit@mail.alaintapiru.com>'),
  CONTACT_NOTIFICATION_EMAIL: z
    .string()
    .email('CONTACT_NOTIFICATION_EMAIL must be a valid email')
    .default('alaintapiru@gmail.com'),
  GOOGLE_SHEET_WEBHOOK_URL: z.string().optional(),
  INDEXNOW_KEY: z.string().default('a8f9c1b2d3e4f5061728394a5b6c7d8e'),
  WEBSUB_HUB_URL: z.string().default('https://pubsubhubbub.appspot.com/'),

  // Public/Browser-Safe Mirror on Server
  NEXT_PUBLIC_SITE_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().default('G-2VK6KQNJGH'),
})

export type ClientEnv = z.infer<typeof clientEnvSchema>
export type ServerEnv = z.infer<typeof serverEnvSchema>

// ── 3. Parse Client Environment ─────────────────────────────────────────────
const clientResult = clientEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
})

if (!clientResult.success) {
  const issues = clientResult.error.issues
    .map((i) => `${i.path.join('.')}: ${i.message}`)
    .join(', ')
  throw new Error(`[Environment Validation Error] Invalid client configuration: ${issues}`)
}

export const clientEnv: ClientEnv = clientResult.data

// ── 4. Parse Server Environment ─────────────────────────────────────────────
let serverEnvData: ServerEnv

if (isServer) {
  // Resolve effective database connection string (supporting Vercel / Supabase standard fallbacks)
  let effectiveDbUri =
    process.env.DATABASE_URI ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL

  if (!effectiveDbUri && !isProduction) {
    console.warn(
      '[env] Notice: DATABASE_URI is not set. Using local development fallback string.'
    )
    effectiveDbUri = 'postgresql://postgres:postgres@127.0.0.1:5432/postgres'
  }

  // Resolve effective PAYLOAD_SECRET
  let effectivePayloadSecret = process.env.PAYLOAD_SECRET
  if (
    (!effectivePayloadSecret || INSECURE_SECRET_PLACEHOLDERS.has(effectivePayloadSecret.trim())) &&
    !isProduction
  ) {
    console.warn(
      '[env] Notice: PAYLOAD_SECRET is not set or insecure. Using local development fallback secret.'
    )
    effectivePayloadSecret = 'dev-payload-secret-do-not-use-in-production'
  }

  // Resolve effective PREVIEW_SECRET
  let effectivePreviewSecret = process.env.PREVIEW_SECRET
  if (
    (!effectivePreviewSecret || INSECURE_SECRET_PLACEHOLDERS.has(effectivePreviewSecret.trim())) &&
    !isProduction
  ) {
    console.warn(
      '[env] Notice: PREVIEW_SECRET is not set or insecure. Using local development fallback secret.'
    )
    effectivePreviewSecret = 'dev-preview-secret-do-not-use-in-production'
  }

  const rawServerInput = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URI: effectiveDbUri,
    PAYLOAD_SECRET: effectivePayloadSecret,
    PREVIEW_SECRET: effectivePreviewSecret,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SERPER_API_KEY: process.env.SERPER_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL,
    GOOGLE_SHEET_WEBHOOK_URL: process.env.GOOGLE_SHEET_WEBHOOK_URL,
    INDEXNOW_KEY: process.env.INDEXNOW_KEY,
    WEBSUB_HUB_URL: process.env.WEBSUB_HUB_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  }

  const serverResult = serverEnvSchema.safeParse(rawServerInput)

  if (!serverResult.success) {
    // Collect issue messages without ever leaking raw secret values
    const issues = serverResult.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join(', ')
    throw new Error(
      `[Environment Validation Error] Invalid server environment configuration: ${issues}`
    )
  }

  serverEnvData = serverResult.data
} else {
  // On client, populate mirror with client values; server-only secrets will throw on access
  serverEnvData = {
    ...clientEnv,
    DATABASE_URI: '',
    PAYLOAD_SECRET: '',
    PREVIEW_SECRET: '',
    OPENAI_API_KEY: undefined,
    SERPER_API_KEY: undefined,
    GEMINI_API_KEY: undefined,
    RESEND_API_KEY: undefined,
    RESEND_FROM_EMAIL: 'Alain Dave Tapiru <audit@mail.alaintapiru.com>',
    CONTACT_NOTIFICATION_EMAIL: 'alaintapiru@gmail.com',
    GOOGLE_SHEET_WEBHOOK_URL: undefined,
    INDEXNOW_KEY: 'a8f9c1b2d3e4f5061728394a5b6c7d8e',
    WEBSUB_HUB_URL: 'https://pubsubhubbub.appspot.com/',
  }
}

export const serverEnv: ServerEnv = serverEnvData

// ── 5. Universal Guarded Env Proxy ──────────────────────────────────────────
/**
 * Universal env export.
 * Server secrets are accessible on the server.
 * Any attempt to access server secrets on the client throws a Security Boundary Violation.
 */
export const env: ServerEnv = new Proxy({} as ServerEnv, {
  get(_target, prop: string | symbol) {
    if (typeof window !== 'undefined' && !isNode) {
      if (typeof prop === 'string' && prop.startsWith('NEXT_PUBLIC_')) {
        return clientEnv[prop as keyof ClientEnv]
      }
      if (prop === 'NODE_ENV') {
        return clientEnv.NODE_ENV
      }
      throw new Error(
        `[Security Boundary Violation] Attempted to access server-only environment variable "${String(
          prop
        )}" on the client.`
      )
    }
    return serverEnvData[prop as keyof ServerEnv]
  },
})
