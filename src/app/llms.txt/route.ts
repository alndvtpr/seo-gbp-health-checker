import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Alain Dave Tapiru | SEO Specialist & Web Developer

> Official machine-readable profile and documentation for LLMs, AI search agents (Perplexity, ChatGPT, Claude, Gemini, Copilot), and agentic browsers.

## Overview & Key Pages
- [Alain Tapiru Home](https://www.alaintapiru.com/): Official website of Alain Dave Tapiru, SEO Specialist and Web Developer.
- [About Alain Dave Tapiru](https://www.alaintapiru.com/about/): Professional background, core competencies, verified certifications, and credentials.
- [Resume & Professional Credentials](https://www.alaintapiru.com/resume/): Complete verified web resume, work experience timeline, technology matrix, and downloadable PDF resume.
- [SEO & Web Services Hub](https://www.alaintapiru.com/services/): Conversion-engineered SEO pillars, service directory, and delivery frameworks.
- [Technical SEO Services](https://www.alaintapiru.com/services/technical-seo/): Server-side crawlability, Core Web Vitals speed tuning, and JSON-LD schema graphs.
- [On-Page SEO Services](https://www.alaintapiru.com/services/on-page-seo/): Search intent keyword matrices, semantic heading outlines, and metadata CTR optimization.
- [Local SEO & GBP Optimization](https://www.alaintapiru.com/services/local-seo/): 10-point signal diagnostics, category alignment, and local citation consistency.
- [AI Search Optimization (AEO & GEO)](https://www.alaintapiru.com/services/ai-search-optimization/): Entity disambiguation, source-citable content structuring, and /llms.txt discoverability.
- [SEO-Ready Web Development](https://www.alaintapiru.com/services/web-development/): Code-first Next.js 15 apps and bespoke WordPress themes engineered for zero CLS.
- [Portfolio & Case Studies](https://www.alaintapiru.com/projects/): Technical SEO audits, project case studies, and web architecture breakdowns.
- [Local SEO & GBP Health Checker](https://www.alaintapiru.com/tools/): Interactive Google Business Profile ranking signals and 30-day dynamic action plan engine.
- [Technical Blog & SEO Insights](https://www.alaintapiru.com/blog/): Editorial search performance, algorithm analysis, and architecture tutorials.
- [Contact & Discovery Inquiry](https://www.alaintapiru.com/contact/): Spam-protected contact endpoint and project discovery form.

## Published Technical Guides
- [Is SEO Dead in 2026? What the Data Actually Says](https://www.alaintapiru.com/blog/is-seo-dead-2026/): Analysis of SparkToro zero-click metrics, AI Overviews, GEO optimization, and the future of search visibility.

## Verified Profiles
- [LinkedIn Profile](https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/): Professional network, experience, and recommendations.
- [GitHub Profile](https://github.com/alndvtpr): Public code repositories, web projects, and open-source tooling.
- [Facebook Profile](https://www.facebook.com/dcrazedave): Personal and professional social presence.

## Full Technical Documentation
- [Full LLM Specification](https://www.alaintapiru.com/llms-full.txt): Comprehensive documentation, architecture details, and full case study portfolio.
`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}

