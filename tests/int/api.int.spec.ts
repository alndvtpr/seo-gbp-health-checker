import { getPayload, Payload, type AccessArgs } from 'payload'
import config from '@/payload.config'
import { Pages } from '@/collections/Pages'
import { GET, isSafeRelativePath } from '@/app/(frontend)/api/preview/route'
import { env } from '@/lib/env'

import { describe, it, beforeAll, expect, vi } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  describe('Pages Collection Access Control', () => {
    it('defines explicit authenticated-only access rules for all operations', () => {
      expect(Pages.access).toBeDefined()
      expect(Pages.access?.read).toBeDefined()
      expect(Pages.access?.create).toBeDefined()
      expect(Pages.access?.update).toBeDefined()
      expect(Pages.access?.delete).toBeDefined()
      expect(Pages.access?.admin).toBeDefined()
      expect(Pages.access?.readVersions).toBeDefined()
    })

    it('rejects unauthenticated requests across all access operations', async () => {
      const unauthenticatedReq = { req: { user: null } } as unknown as AccessArgs

      expect(await Pages.access!.read!(unauthenticatedReq)).toBe(false)
      expect(await Pages.access!.create!(unauthenticatedReq)).toBe(false)
      expect(await Pages.access!.update!(unauthenticatedReq)).toBe(false)
      expect(await Pages.access!.delete!(unauthenticatedReq)).toBe(false)
      expect(await Pages.access!.admin!(unauthenticatedReq)).toBe(false)
      expect(await Pages.access!.readVersions!(unauthenticatedReq)).toBe(false)
    })

    it('allows authenticated users across all access operations', async () => {
      const authenticatedReq = {
        req: { user: { id: 'admin-1', email: 'admin@alaintapiru.com' } },
      } as unknown as AccessArgs

      expect(await Pages.access!.read!(authenticatedReq)).toBe(true)
      expect(await Pages.access!.create!(authenticatedReq)).toBe(true)
      expect(await Pages.access!.update!(authenticatedReq)).toBe(true)
      expect(await Pages.access!.delete!(authenticatedReq)).toBe(true)
      expect(await Pages.access!.admin!(authenticatedReq)).toBe(true)
      expect(await Pages.access!.readVersions!(authenticatedReq)).toBe(true)
    })

    it('generates safe relative path in livePreview url config', () => {
      const livePreviewUrl = Pages.admin?.livePreview?.url
      expect(typeof livePreviewUrl).toBe('function')

      if (typeof livePreviewUrl === 'function') {
        const getPreviewUrl = livePreviewUrl as unknown as (args: {
          data: { slug?: string }
        }) => string

        const homePreview = getPreviewUrl({ data: { slug: 'home' } })
        expect(homePreview).toContain('url=%2F')

        const indexPreview = getPreviewUrl({ data: { slug: 'index' } })
        expect(indexPreview).toContain('url=%2F')

        const aboutPreview = getPreviewUrl({ data: { slug: 'about' } })
        expect(aboutPreview).toContain('url=%2Fabout')

        const projectPreview = getPreviewUrl({ data: { slug: '/projects/angat' } })
        expect(projectPreview).toContain('url=%2Fprojects%2Fangat')
      }
    })

    it('allows Local API to read pages without explicit user session (overrideAccess default)', async () => {
      const pages = await payload.find({
        collection: 'pages',
        limit: 1,
      })
      expect(pages).toBeDefined()
      expect(Array.isArray(pages.docs)).toBe(true)
    })

    it('blocks unauthenticated requests when overrideAccess is false', async () => {
      await expect(
        payload.find({
          collection: 'pages',
          overrideAccess: false,
        }),
      ).rejects.toThrow(/not allowed to perform this action/i)
    })
  })
})

vi.mock('next/headers', () => ({
  draftMode: vi.fn().mockResolvedValue({
    enable: vi.fn(),
    disable: vi.fn(),
    isEnabled: false,
  }),
}))

describe('Preview Route Open Redirect Hardening', () => {
  describe('isSafeRelativePath', () => {
    it('accepts valid relative paths', () => {
      expect(isSafeRelativePath('/')).toBe(true)
      expect(isSafeRelativePath('/about')).toBe(true)
      expect(isSafeRelativePath('/about/')).toBe(true)
      expect(isSafeRelativePath('/projects/angat-sikat-studio')).toBe(true)
      expect(isSafeRelativePath('/projects/angat-sikat-studio/')).toBe(true)
      expect(isSafeRelativePath('/services/seo-strategy?mode=preview')).toBe(true)
      expect(isSafeRelativePath('/services/seo-strategy?ref=home#summary')).toBe(true)
    })

    it('rejects external absolute URLs', () => {
      expect(isSafeRelativePath('https://malicious.com')).toBe(false)
      expect(isSafeRelativePath('http://malicious.com')).toBe(false)
      expect(isSafeRelativePath('https://malicious.com/phish')).toBe(false)
      expect(isSafeRelativePath('http://localhost:3000/evil')).toBe(false)
    })

    it('rejects protocol-relative and scheme-relative tricks', () => {
      expect(isSafeRelativePath('//malicious.com')).toBe(false)
      expect(isSafeRelativePath('//malicious.com/test')).toBe(false)
      expect(isSafeRelativePath('///malicious.com')).toBe(false)
      expect(isSafeRelativePath('/\\malicious.com')).toBe(false)
      expect(isSafeRelativePath('/\\\\malicious.com')).toBe(false)
      expect(isSafeRelativePath('\\\\malicious.com')).toBe(false)
    })

    it('rejects malicious schemes', () => {
      expect(isSafeRelativePath('javascript:alert(1)')).toBe(false)
      expect(isSafeRelativePath('javascript://test%0Aalert(1)')).toBe(false)
      expect(isSafeRelativePath('data:text/html,<script>alert(1)</script>')).toBe(false)
      expect(isSafeRelativePath('vbscript:msgbox(1)')).toBe(false)
    })

    it('rejects URL-encoded bypass attempts', () => {
      expect(isSafeRelativePath('/%2Fmalicious.com')).toBe(false)
      expect(isSafeRelativePath('/%5Cmalicious.com')).toBe(false)
      expect(isSafeRelativePath('/about%5Cevil.com')).toBe(false)
    })

    it('rejects CRLF and control characters', () => {
      expect(isSafeRelativePath('/about\r\nSet-Cookie:evil=1')).toBe(false)
      expect(isSafeRelativePath('/about\nLocation:evil.com')).toBe(false)
    })

    it('rejects empty, whitespace-only, or non-slash paths', () => {
      expect(isSafeRelativePath('')).toBe(false)
      expect(isSafeRelativePath('   ')).toBe(false)
      expect(isSafeRelativePath('about')).toBe(false)
      expect(isSafeRelativePath(null)).toBe(false)
      expect(isSafeRelativePath(undefined)).toBe(false)
    })
  })

  describe('GET handler', () => {
    it('returns 404 when no url is provided', async () => {
      const req = new Request(`http://localhost:3000/api/preview?secret=${env.PREVIEW_SECRET}`)
      const res = await GET(req)
      expect(res.status).toBe(404)
      const body = await res.text()
      expect(body).toBe('No URL provided')
    })

    it('returns 400 when an unsafe/external url is provided (even with valid secret)', async () => {
      const maliciousUrls = [
        'https://malicious.com',
        'http://evil.com/phish',
        '//malicious.com',
        '/\\malicious.com',
        'javascript:alert(1)',
        '/%2Fmalicious.com',
      ]

      for (const badUrl of maliciousUrls) {
        const req = new Request(
          `http://localhost:3000/api/preview?url=${encodeURIComponent(badUrl)}&secret=${env.PREVIEW_SECRET}`,
        )
        const res = await GET(req)
        expect(res.status).toBe(400)
        const body = await res.text()
        expect(body).toBe('Invalid or unsafe redirect URL')
      }
    })

    it('returns 400 when an unsafe url is provided without secret', async () => {
      const req = new Request('http://localhost:3000/api/preview?url=https://malicious.com')
      const res = await GET(req)
      expect(res.status).toBe(400)
      const body = await res.text()
      expect(body).toBe('Invalid or unsafe redirect URL')
    })

    it('returns 401 when safe url provided but secret is missing', async () => {
      const req = new Request('http://localhost:3000/api/preview?url=/about')
      const res = await GET(req)
      expect(res.status).toBe(401)
      const body = await res.text()
      expect(body).toBe('No secret provided')
    })

    it('returns 401 when safe url provided but secret is invalid', async () => {
      const req = new Request('http://localhost:3000/api/preview?url=/about&secret=wrong-secret')
      const res = await GET(req)
      expect(res.status).toBe(401)
      const body = await res.text()
      expect(body).toBe('Invalid token')
    })

    it('initiates redirect for valid relative url and valid secret', async () => {
      const req = new Request(`http://localhost:3000/api/preview?url=/about&secret=${env.PREVIEW_SECRET}`)
      try {
        const res = await GET(req)
        if (res) {
          expect([302, 307, 308]).toContain(res.status)
        }
      } catch (error: unknown) {
        // Next.js redirect() throws an internal NEXT_REDIRECT error in server action / route handler context
        const message = error instanceof Error ? error.message : String(error)
        expect(message).toMatch(/NEXT_REDIRECT/)
      }
    })
  })
})

