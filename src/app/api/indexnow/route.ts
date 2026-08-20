import { NextResponse } from 'next/server'
import { pingIndexNow, DEFAULT_BASE_URL } from '@/lib/indexnow'
import { PROJECTS } from '@/data/projects'
import { BLOG_POSTS } from '@/data/posts'

export const dynamic = 'force-dynamic'

const DEFAULT_CORE_ROUTES = [
  '/',
  '/about/',
  '/projects/',
  '/tools/',
  '/services/',
  '/blog/',
  '/contact/',
]

function getAllKnownCanonicalUrls(): string[] {
  const projectUrls = PROJECTS.map((p) => `/projects/${p.slug}/`)
  const blogUrls = BLOG_POSTS.map((b) => `/blog/${b.slug}/`)
  const allRoutes = [...DEFAULT_CORE_ROUTES, ...projectUrls, ...blogUrls]
  return allRoutes.map((route) => `${DEFAULT_BASE_URL}${route}`)
}

export async function POST(request: Request) {
  try {
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      body = {}
    }

    const requestedUrls = Array.isArray(body.urls) && body.urls.length > 0
      ? body.urls
      : getAllKnownCanonicalUrls()

    const result = await pingIndexNow(requestedUrls)

    return NextResponse.json(
      {
        ...result,
        timestamp: new Date().toISOString(),
      },
      { status: result.status === 200 || result.status === 202 ? 200 : result.status }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to dispatch IndexNow request.',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const singleUrl = searchParams.get('url')

  const targetUrls = singleUrl ? [singleUrl] : getAllKnownCanonicalUrls()
  const result = await pingIndexNow(targetUrls)

  return NextResponse.json(
    {
      ...result,
      timestamp: new Date().toISOString(),
      instruction: 'Send a POST request with { urls: string[] } to dispatch custom URLs to IndexNow.',
    },
    { status: result.status === 200 || result.status === 202 ? 200 : result.status }
  )
}
