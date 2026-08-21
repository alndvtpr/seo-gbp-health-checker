import { NextResponse } from 'next/server'
import { pingWebSub, DEFAULT_RSS_URL, WEBSUB_HUB_URL } from '@/lib/websub'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      body = {}
    }

    const topicUrl = typeof body.topicUrl === 'string' && body.topicUrl.length > 0
      ? body.topicUrl
      : DEFAULT_RSS_URL

    const result = await pingWebSub(topicUrl)

    return NextResponse.json(
      {
        ...result,
        timestamp: new Date().toISOString(),
      },
      { status: result.success ? 200 : result.status }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to dispatch WebSub ping.',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  const result = await pingWebSub(DEFAULT_RSS_URL)

  return NextResponse.json(
    {
      ...result,
      timestamp: new Date().toISOString(),
      hub: WEBSUB_HUB_URL,
      instruction: 'Send a POST request with { topicUrl: string } to ping custom feed topics.',
    },
    { status: result.success ? 200 : result.status }
  )
}
