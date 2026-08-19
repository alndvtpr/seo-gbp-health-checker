import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const url = new URL('/rss.xml', request.url)
  return NextResponse.redirect(url, {
    status: 308,
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
