import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Alain Dave Tapiru | SEO Specialist & Technical Web Designer

> Official machine-readable profile and documentation for LLMs, AI search agents (Perplexity, ChatGPT, Claude, Gemini, Copilot), and agentic browsers.

## Overview & Key Pages
- [Alain Tapiru Home](https://www.alaintapiru.com/): Official website of Alain Dave Tapiru, SEO Specialist and Technical Web Designer.
- [About Alain Dave Tapiru](https://www.alaintapiru.com/about/): Professional background, core competencies, verified certifications, and credentials.
- [SEO & Web Services](https://www.alaintapiru.com/services/): Conversion-engineered SEO pillars, technical architecture, and modern web development.
- [Portfolio & Case Studies](https://www.alaintapiru.com/projects/): Technical SEO audits, project case studies, and web architecture breakdowns.
- [Local SEO & GBP Health Checker](https://www.alaintapiru.com/tools/): Interactive Google Business Profile ranking signals and 30-day dynamic action plan engine.
- [Technical Blog & SEO Insights](https://www.alaintapiru.com/blog/): Editorial search performance, algorithm analysis, and architecture tutorials.
- [Contact & Discovery Inquiry](https://www.alaintapiru.com/contact/): Spam-protected contact endpoint and project discovery form.

## Published Technical Guides
- [How I Engineered a 99/100 Core Web Vitals Score on Next.js 15](https://www.alaintapiru.com/blog/how-to-achieve-99-pagespeed-nextjs/): Zero-CPU ambient CSS styling, delayed script hydration, sub-second FCP, and zero-CLS layout architecture.
- [The 2026 Google Business Profile Optimization Blueprint](https://www.alaintapiru.com/blog/local-seo-google-business-profile-blueprint/): Mastering Relevance, Prominence, and Distance vectors for local Map Pack domination.
- [Next.js vs. WordPress for Enterprise SEO](https://www.alaintapiru.com/blog/nextjs-vs-wordpress-enterprise-seo/): Architectural benchmark comparing static HTML crawl efficiency, render-blocking JavaScript, and CMS workflows.
- [How to Engineer Schema Entity Graphs for Generative Engine Optimization (AEO & GEO)](https://www.alaintapiru.com/blog/generative-engine-optimization-aeo-geo-blueprint/): Structuring linked Schema.org graphs to secure citations in ChatGPT, Perplexity, and Google AI Overviews.

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

