import { NextResponse } from 'next/server'
import { BLOG_POSTS } from '@/data/posts'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const BASE_URL = 'https://www.alaintapiru.com'

interface FeedItem {
  title: string
  link: string
  pubDate: Date
  description: string
  category?: string
  author?: string
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getFeedItems(): FeedItem[] {
  const items = BLOG_POSTS.map((post): FeedItem => {
    const lastSignificantUpdate = post.dateModified ?? post.datePublished

    return {
      title: post.title,
      link: `${BASE_URL}/blog/${post.slug}/`,
      pubDate: new Date(`${lastSignificantUpdate}T00:00:00Z`),
      description: post.excerpt,
      category: post.category,
      author: 'Alain Dave Tapiru',
    }
  })

  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
  return items.slice(0, 25)
}

export async function GET() {
  const items = getFeedItems()
  const latestBuildDate = items[0]?.pubDate.toUTCString()

  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
      ${item.category ? `<category>${escapeXml(item.category)}</category>` : ''}
      ${item.author ? `<author>${escapeXml(item.author)}</author>` : ''}
    </item>`
    )
    .join('\n')

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Alain Dave Tapiru | Technical SEO &amp; Web Engineering Updates</title>
    <link>${BASE_URL}/</link>
    <description>Evidence-dated feed of published technical guides and meaningful article updates by Alain Dave Tapiru.</description>
    <language>en</language>
    ${latestBuildDate ? `<lastBuildDate>${latestBuildDate}</lastBuildDate>` : ''}
    <generator>AlainTapiru FastIndexing Engine 1.0</generator>
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/"/>
    <atom:link rel="self" href="${BASE_URL}/rss.xml" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
