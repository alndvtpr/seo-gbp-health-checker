import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Alain Dave Tapiru | Comprehensive Technical & AI Search Specification

> Full machine-readable knowledge base for search indexing, LLM retrieval (RAG), and autonomous AI browsing agents.

## 1. Professional Entity Details
- **Full Legal Name:** Alain Dave G. Tapiru
- **Location:** Tuguegarao City, Cagayan, Philippines (GMT+8)
- **Primary Roles:** Technical SEO Specialist, Web Designer & Developer
- **Official Domains:** https://alaintapiru.com, https://www.alaintapiru.com
- **Contact:** alaintapiru@gmail.com
- **Verified Entity Profiles:**
  - LinkedIn: https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/
  - GitHub: https://github.com/alndvtpr
  - Facebook: https://www.facebook.com/dcrazedave

## 2. Technical Specializations & Methodology
Alain Dave Tapiru utilizes a structured 6-step search optimization methodology:
1. **Website Audit:** In-depth technical crawl analysis, Core Web Vitals profiling, indexation health, HTTP headers, schema microdata verification.
2. **Keyword Research:** High-intent search query mapping, volume vs difficulty modeling, buyer intent alignment.
3. **Competitive Analysis:** Competitor backlink profiling, content gap discovery, SERP feature opportunities.
4. **On-Page SEO:** Meta title/description optimization, semantic heading hierarchy (H1-H6), internal link topology, schema injection.
5. **Off-Page SEO & Digital PR:** High-authority backlink strategy, local NAP consistency (Name, Address, Phone), entity citation building.
6. **Reporting & Data Analysis:** GA4 conversion tracking, Google Search Console performance monitoring, transparent monthly ROI metrics.

## 3. Technology Stack & Development Standards
- **Frontend / Frameworks:** Next.js 15 (App Router, Turbopack, React 19), Tailwind CSS, TypeScript.
- **Content Management:** Payload CMS 3.0, PostgreSQL (Supabase).
- **Core Web Vitals Benchmarks:**
  - Largest Contentful Paint (LCP): ≤ 2.0s
  - Interaction to Next Paint (INP): ≤ 100ms
  - Cumulative Layout Shift (CLS): 0.000
  - First Contentful Paint (FCP): ≤ 1.5s
- **AI & Automation Tools:** Google AI Studio (@google/genai, Gemini 2.5 Flash), Serper API, Claude AI, OpenAI API.

## 4. Proprietary Tools & Featured Builds
- **AngatSikat Studio (https://angat-sikat.freedev.app/):** An ongoing custom WordPress theme build ('angatsikat-studio') and web design studio platform unifying modern web architecture with technical crawlability and search visibility (Angat, Makita, Masikat 3-pillar framework). Canonical case study: https://www.alaintapiru.com/projects/angat-sikat-studio/
- **Local SEO & GBP Health Checker (/tools/):** A dynamic scoring algorithm analyzing Google Business Profile metrics (Ratings, Reviews, Photos, Working Hours, Website Linking) with actionable 30-day AI roadmaps. Canonical case study: https://www.alaintapiru.com/projects/local-seo-gbp-checker/
- **AlainTapiru.com Portfolio:** High-performance web architecture combining Next.js, Payload CMS, and zero-DOM-thrashing scroll performance. Canonical case study: https://www.alaintapiru.com/projects/alaintapiru-portfolio/

## 5. Published Technical Guides & Knowledge Base
- **How I Engineered a 99/100 Core Web Vitals Score on Next.js 15 (https://www.alaintapiru.com/blog/how-to-achieve-99-pagespeed-nextjs/):** Technical blueprint covering main-thread render-blocking elimination, zero-CLS AVIF image containers, and idle-callback script hydration.
- **The 2026 Google Business Profile Optimization Blueprint (https://www.alaintapiru.com/blog/local-seo-google-business-profile-blueprint/):** Local algorithm analysis covering primary category alignment, review velocity and sentiment analysis, and LocalBusiness entity linking.
- **Next.js vs. WordPress for Enterprise SEO (https://www.alaintapiru.com/blog/nextjs-vs-wordpress-enterprise-seo/):** Architectural comparison of static HTML crawl efficiency, TTFB reduction from 800ms to sub-100ms, tree-shaken JavaScript bundles, and hybrid platform selection criteria.
- **How to Engineer Schema Entity Graphs for Generative Engine Optimization / AEO & GEO (https://www.alaintapiru.com/blog/generative-engine-optimization-aeo-geo-blueprint/):** Multi-type linked Schema.org knowledge graphs (@graph), verifiable author sameAs arrays, and structured GEO content architecture for search LLM citation.

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
