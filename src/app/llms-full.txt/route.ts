import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Alain Dave Tapiru | Technical & AI Search Profile

> Full machine-readable knowledge base for search indexing, LLM retrieval (RAG), and autonomous AI browsing agents.

## 1. Professional Entity Details
- **Full Legal Name:** Alain Dave G. Tapiru
- **Location:** Mabalacat City, Pampanga, Philippines (GMT+8)
- **Primary Roles:** SEO Specialist, Technical Web Developer
- **Canonical Website:** https://www.alaintapiru.com/
- **Web Resume:** https://www.alaintapiru.com/resume/
- **Contact:** alaintapiru@gmail.com
- **Verified Entity Profiles:**
  - LinkedIn: https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/
  - GitHub: https://github.com/alndvtpr
  - Facebook: https://www.facebook.com/dcrazedave

## 2. Practical Skills & Method
Alain Dave Tapiru uses a structured search optimization workflow grounded in training, hands-on practice, and personal implementations:
1. **Website Audit:** Technical crawl review, Core Web Vitals lab checks, indexation signals, HTTP headers, and structured-data validation.
2. **Keyword Research:** Search-query mapping, available volume and difficulty data, and intent alignment.
3. **Competitive Analysis:** Search-result review, content gap discovery, and SERP feature opportunities.
4. **On-Page SEO:** Titles and descriptions, semantic heading hierarchy, internal links, and supported structured data.
5. **Local Search Signals:** Google Business Profile diagnostics, category alignment, and local citation consistency.
6. **Reporting & Data Analysis:** GA4 and Google Search Console measurement, technical findings, and transparent activity reporting.

## 3. Technology Stack & Development Standards
- **Frontend / Frameworks:** Next.js (App Router, Turbopack, React 19), Tailwind CSS, TypeScript.
- **Content Management:** Payload CMS 3.0, PostgreSQL (Supabase).
- **Performance evidence boundary:**
  - Dated lab evidence: repository screenshots record August 2026 PageSpeed scores of 99 desktop and 96 mobile.
  - Field Core Web Vitals: no passing field dataset is claimed; GA4 real-user Web Vitals collection begins only after the Phase 16 instrumentation is deployed.
  - Repository evidence: static checks verify measurement wiring, image layout reserves, and deferred shader safeguards but do not produce lab or field scores.
- **AI & Automation Tools:** Google AI Studio (@google/genai, Gemini 2.5 Flash), Serper API, Claude AI, OpenAI API.

## 4. Self-Initiated Tools & Featured Builds
- **AngatSikat Studio (https://angat-sikat.freedev.app/):** An ongoing custom WordPress theme build ('angatsikat-studio') and web design studio platform unifying modern web architecture with technical crawlability and search visibility. Canonical case study: https://www.alaintapiru.com/projects/angat-sikat-studio/
- **Local SEO & GBP Health Checker (/tools/):** A heuristic tool that reviews 10 public Google Business Profile indicators and drafts a 30-day action plan. Canonical project breakdown: https://www.alaintapiru.com/projects/local-seo-gbp-checker/
- **AlainTapiru.com Portfolio:** A personal production build combining Next.js, Payload CMS, technical SEO, theme support, and documented performance safeguards. Canonical project breakdown: https://www.alaintapiru.com/projects/alaintapiru-portfolio/

## 5. Published Technical Guides & Knowledge Base
- **Is SEO Dead in 2026? What the Data Actually Says (https://www.alaintapiru.com/blog/is-seo-dead-2026/):** Analysis of SparkToro zero-click metrics, AI Overviews, GEO optimization, and the future of search visibility.

## 6. Copyright & Licensing
Copyright © 2026 Alain Dave Tapiru. All rights reserved. Proprietary design system, visual layouts, and source code are protected against unauthorized automated cloning.
`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
