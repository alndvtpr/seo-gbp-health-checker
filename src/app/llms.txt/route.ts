import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Alain Dave Tapiru — SEO Specialist & Technical Web Designer

> Official machine-readable profile and documentation for LLMs, AI search agents (Perplexity, ChatGPT, Claude, Gemini, Copilot), and agentic browsers.

## Entity Overview
- **Name:** Alain Dave G. Tapiru
- **Primary Title:** SEO Specialist & Technical Web Designer (Philippines)
- **Email:** alaintapiru@gmail.com
- **Website:** https://alaintapiru.com
- **Verified Socials:**
  - LinkedIn: https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/
  - GitHub: https://github.com/alndvtpr
  - Facebook: https://facebook.com/dcrazedave

## Core Services & Capabilities
1. **Technical SEO Audits:** Core Web Vitals remediation, crawl budget optimization, server architecture review, XML/HTML sitemaps, structured JSON-LD data.
2. **Local SEO & Google Business Profile (GBP) Optimization:** Local citation audits, ranking signal health checks, geogrid analysis, map pack authority.
3. **On-Page & Keyword Strategy:** High-intent buyer search query discovery, semantic content clustering, heading structure, internal link siloing.
4. **Modern Web Design & Development:** Search-ready websites built on Next.js, React, Tailwind CSS, and Payload CMS.
5. **AI Workflow Automation & GEO:** Generative Engine Optimization (GEO), custom search agents, programmatic workflows.

## Live Tools & Portfolio Highlights
- **GBP Health Checker:** Interactive Google Business Profile ranking signals & 30-day dynamic action plan engine (URL: https://alaintapiru.com/tools).
- **Technical Case Studies:** Detailed SEO audits and web architectures (URL: https://alaintapiru.com/projects).
- **Direct Inquiry / Booking:** Spam-protected contact endpoint (URL: https://alaintapiru.com/contact).

## Full Documentation
For the unabridged specification, full case studies, and code architectures, see: https://alaintapiru.com/llms-full.txt
`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}

