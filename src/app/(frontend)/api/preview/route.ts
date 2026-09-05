import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { env } from '@/lib/env'

/**
 * Validates that a redirect target is a strictly safe relative path.
 * Must start with exactly one '/' and cannot be protocol-relative,
 * backslash-escaped, scheme-relative, or contain control characters.
 */
export function isSafeRelativePath(targetUrl: string | null | undefined): boolean {
  if (!targetUrl || typeof targetUrl !== 'string') {
    return false
  }

  const trimmed = targetUrl.trim()
  if (!trimmed) {
    return false
  }

  // Must start with exactly one '/' and NOT '//' or '/\'
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
    return false
  }

  // Reject backslashes anywhere in the target URL (prevent browser path normalization exploits)
  if (trimmed.includes('\\')) {
    return false
  }

  // Reject ASCII and Unicode control characters (prevent CRLF header injection)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false
  }

  // Check URL-decoded path to prevent encoded bypasses like /%2F or /%5C
  let decoded: string
  try {
    decoded = decodeURIComponent(trimmed)
  } catch {
    return false
  }

  if (
    !decoded.startsWith('/') ||
    decoded.startsWith('//') ||
    decoded.startsWith('/\\') ||
    decoded.includes('\\')
  ) {
    return false
  }

  // Validate with URL parser using localhost base to ensure origin/protocol cannot be spoofed
  try {
    const parsed = new URL(trimmed, 'http://localhost')
    if (parsed.origin !== 'http://localhost') {
      return false
    }
    if (parsed.protocol !== 'http:') {
      return false
    }
    if (!parsed.pathname.startsWith('/') || parsed.pathname.startsWith('//')) {
      return false
    }
    return true
  } catch {
    return false
  }
}

export async function GET(
  req: Request,
) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const url = searchParams.get('url')

  if (!url) {
    return new Response('No URL provided', { status: 404 })
  }

  if (!isSafeRelativePath(url)) {
    return new Response('Invalid or unsafe redirect URL', { status: 400 })
  }

  if (!secret) {
    return new Response('No secret provided', { status: 401 })
  }

  if (secret !== env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(url)
}
