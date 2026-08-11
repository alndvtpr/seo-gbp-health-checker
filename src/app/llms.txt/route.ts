import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Alain Dave Tapiru - Portfolio & Technical Profile

> Data-Driven SEO Specialist, Modern Web Developer, and Cybersecurity Enthusiast.

## About
Alain Dave Tapiru bridges the gap between technical search engine optimization, modern frontend engineering (Next.js & React), and cybersecurity fundamentals.

## Core Capabilities
- Technical & On-Page SEO (Crawl resolution, schema markup, Core Web Vitals)
- Modern Web Development (Next.js, React, Tailwind CSS, Payload CMS)
- Cybersecurity Fundamentals (Network security, header hardening, threat mitigation)
- AI Workflow Automation (Custom AI agents, programmatic content workflows)

## Contact & Links
- Website: https://alaintapiru.com
- Contact: https://alaintapiru.com/contact
- Projects: https://alaintapiru.com/projects
- Services: https://alaintapiru.com/services
`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
