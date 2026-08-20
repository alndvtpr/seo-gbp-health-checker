import { NextResponse } from 'next/server'
import { PROJECTS } from '@/data/projects'
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
  const items: FeedItem[] = []

  // 1. Technical Guides & In-Depth Articles
  BLOG_POSTS.forEach((post) => {
    items.push({
      title: post.title,
      link: `${BASE_URL}/blog/${post.slug}/`,
      pubDate: new Date(`${post.datePublished}T10:00:00Z`),
      description: post.excerpt,
      category: post.category,
      author: 'Alain Dave Tapiru',
    })
  })

  // 2. Featured and Active Case Studies
  PROJECTS.forEach((project) => {
    const updateDate = project.slug === 'angat-sikat-studio'
      ? new Date('2026-08-19T08:00:00Z')
      : project.slug === 'local-seo-gbp-checker'
      ? new Date('2026-08-18T14:30:00Z')
      : new Date('2026-08-17T10:00:00Z')

    items.push({
      title: `${project.title} — ${project.tagline}`,
      link: `${BASE_URL}/projects/${project.slug}/`,
      pubDate: updateDate,
      description: project.shortDescription || project.fullDescription,
      category: project.category,
      author: 'Alain Dave Tapiru',
    })
  })

  // 2. Interactive Tools
  items.push({
    title: 'Interactive Google Business Profile Health Checker & Local SEO Engine',
    link: `${BASE_URL}/tools/`,
    pubDate: new Date('2026-08-19T06:00:00Z'),
    description:
      'Free 10-point public diagnostic audit engine analyzing GBP completeness, operating hours, categories, reviews, and generating tailored 30-day dynamic SEO action plans.',
    category: 'Interactive Tools',
    author: 'Alain Dave Tapiru',
  })

  // 3. Core Services
  items.push({
    title: 'Technical SEO, Semantic Web Architecture & Web Development Services',
    link: `${BASE_URL}/services/`,
    pubDate: new Date('2026-08-18T12:00:00Z'),
    description:
      'Full-stack technical SEO audits, Core Web Vitals remediation, JSON-LD knowledge graph engineering, generative search optimization (GEO/AEO), and custom WordPress development.',
    category: 'Services',
    author: 'Alain Dave Tapiru',
  })

  // 4. Case Studies Directory
  items.push({
    title: 'SEO Case Studies & Web Architecture Portfolio Directory',
    link: `${BASE_URL}/projects/`,
    pubDate: new Date('2026-08-18T10:00:00Z'),
    description:
      'Curated index of technical SEO case studies, custom WordPress builds, and performance engineering projects by Alain Dave Tapiru.',
    category: 'Portfolio',
    author: 'Alain Dave Tapiru',
  })

  // 5. Professional Credentials & Biography
  items.push({
    title: 'About Alain Dave Tapiru — Senior SEO Specialist & Technical Web Designer',
    link: `${BASE_URL}/about/`,
    pubDate: new Date('2026-08-17T16:00:00Z'),
    description:
      'Professional biography, core technical competencies, verified certifications, and search engineering credentials of Alain Dave Tapiru.',
    category: 'About',
    author: 'Alain Dave Tapiru',
  })

  // 6. Homepage / Master Profile
  items.push({
    title: 'Alain Dave Tapiru — Technical SEO Specialist & Web Architect',
    link: `${BASE_URL}/`,
    pubDate: new Date('2026-08-19T08:30:00Z'),
    description:
      'Official portfolio of Alain Dave Tapiru. Senior SEO Specialist and Technical Web Designer specializing in Core Web Vitals, JSON-LD semantic architecture, and AI search visibility.',
    category: 'Homepage',
    author: 'Alain Dave Tapiru',
  })

  // 7. Blog & Insights
  items.push({
    title: 'SEO Insights, Core Web Vitals & Algorithm Analysis',
    link: `${BASE_URL}/blog/`,
    pubDate: new Date('2026-08-16T12:00:00Z'),
    description:
      'Technical insights, search engine algorithm updates, structured data strategies, and modern web development tutorials.',
    category: 'Blog',
    author: 'Alain Dave Tapiru',
  })

  // 8. Contact & Discovery
  items.push({
    title: 'Contact Alain Dave Tapiru — SEO Consulting & Project Discovery',
    link: `${BASE_URL}/contact/`,
    pubDate: new Date('2026-08-15T09:00:00Z'),
    description:
      'Get in touch for technical SEO audits, site speed optimization, knowledge graph implementation, or custom web development projects.',
    category: 'Contact',
    author: 'Alain Dave Tapiru',
  })

  // Sort descending by date (most recently modified first)
  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  // Strictly enforce top 15–25 items
  return items.slice(0, 25)
}

export async function GET() {
  const items = getFeedItems()
  const latestBuildDate = items.length > 0 ? items[0].pubDate.toUTCString() : new Date().toUTCString()

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
    <description>Dynamic delta feed tracking the latest published case studies, SEO tools, and technical articles by Alain Dave Tapiru.</description>
    <language>en</language>
    <lastBuildDate>${latestBuildDate}</lastBuildDate>
    <generator>AlainTapiru FastIndexing Engine 1.0</generator>
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/"/>
    <atom:link rel="self" href="${BASE_URL}/rss.xml" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
