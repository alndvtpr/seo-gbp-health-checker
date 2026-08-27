import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'Technical SEO Services Philippines | Crawlability & Speed | Alain Dave Tapiru',
  description:
    'Professional Technical SEO services in the Philippines. Fix crawl bottlenecks, eliminate indexation errors, optimize Core Web Vitals, and implement custom JSON-LD schema.',
  url: 'https://www.alaintapiru.com/services/technical-seo/',
})

const TECHNICAL_AUDIT_AREAS = [
  {
    id: 'crawlability-indexation',
    title: 'Crawlability & Indexation Architecture',
    icon: 'search_check',
    description:
      'Ensure search engine bots and AI crawlers can discover, crawl, and index your critical pages without running into crawl traps or wasted budget.',
    deliverables: [
      'Robots.txt directive auditing & AI crawler permissions',
      'XML sitemap validation, segmentation & canonical alignment',
      'HTTP status code cleanup (301 chains, 302s, 404s, 500 errors)',
      'Noindex, nofollow, and meta robots directive inspection',
      'Pagination, parameter handling & faceted navigation control',
    ],
  },
  {
    id: 'core-web-vitals',
    title: 'Core Web Vitals & Speed Optimization',
    icon: 'monitoring',
    description:
      'Profile real-world loading speed, interactivity, and visual stability to pass Google’s Core Web Vitals benchmarks across mobile and desktop.',
    deliverables: [
      'Largest Contentful Paint (LCP) resource discovery optimization',
      'Cumulative Layout Shift (CLS) elimination & image pipeline fixes',
      'Interaction to Next Paint (INP) & JavaScript execution audit',
      'Font preloading, render-blocking CSS & critical asset hygiene',
      'Server response time (TTFB) & HTTP caching header review',
    ],
  },
  {
    id: 'structured-data',
    title: 'Semantic Schema & JSON-LD Entity Graph',
    icon: 'dataset',
    description:
      'Implement connected Schema.org structured data so search engines and generative AI models understand your business, offerings, and author entities.',
    deliverables: [
      'Custom JSON-LD implementation (Organization, Person, Service, Article)',
      'Google Rich Results validation & syntax error resolution',
      'Knowledge Graph entity disambiguation via sameAs linking',
      'FAQPage, BreadcrumbList, and ItemList schema structuring',
      'LLM machine discoverability preparation via /llms.txt standard',
    ],
  },
  {
    id: 'site-architecture',
    title: 'Site Hierarchy & Internal Link Mesh',
    icon: 'hub',
    description:
      'Reorganize URL structure and contextual internal linking to ensure high-priority commercial pages receive optimal search equity.',
    deliverables: [
      'Click-depth optimization (keeping critical pages ≤ 3 clicks)',
      'Orphaned page identification & contextual link recovery',
      'Topical cluster internal link mapping & anchor text distribution',
      'Canonical tag auditing to eliminate internal self-cannibalization',
      'Clean semantic URL directory structure normalization',
    ],
  },
]

const PROBLEMS_SOLVED = [
  {
    title: 'Pages Not Indexing or Dropping from SERPs',
    problem: 'Search engines are ignoring new pages, displaying "Crawled - currently not indexed", or dropping established URLs due to low crawl priority or soft 404s.',
    solution: 'We audit crawl paths, eliminate canonical conflicts, clean up sitemap inconsistencies, and streamline internal link equity directly to priority URLs.',
  },
  {
    problem: 'Slow mobile speeds, unstable layouts, and heavy script payloads hurt user experience, driving up bounce rates and pulling down organic rankings.',
    title: 'Poor Mobile Performance & Core Web Vitals',
    solution: 'We identify render-blocking bottlenecks, optimize image pipelines with zero-CLS dimensions, and defer non-critical JavaScript execution.',
  },
  {
    problem: 'Search engines and AI answer engines cannot distinguish your brand, services, or author credentials due to missing or invalid structured data.',
    title: 'Missing Rich Snippets & Zero Entity Clarity',
    solution: 'We write bespoke, nested JSON-LD schema graphs connecting your business entity, services, authors, and credentials directly to the Knowledge Graph.',
  },
]

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Comprehensive Technical Audit',
    desc: 'Deep multi-crawler scan analyzing status codes, directives, rendering behavior, and sitemap integrity.',
  },
  {
    step: '02',
    title: 'Prioritized 30-Day Fix Blueprint',
    desc: 'Actionable breakdown categorizing issues into Critical Roadblocks, Speed Optimizations, and Entity Enhancements.',
  },
  {
    step: '03',
    title: 'Direct Code & Schema Execution',
    desc: 'Ready-to-deploy JSON-LD scripts, robots.txt directives, redirect maps, and code optimization recommendations.',
  },
  {
    step: '04',
    title: 'Search Console Re-crawl & Validation',
    desc: 'Submitting updated sitemaps, verifying rich results, and benchmarking live PageSpeed improvements.',
  },
]

const TECH_STACK_TOOLS = [
  'Google Search Console',
  'Screaming Frog SEO Spider',
  'PageSpeed Insights',
  'Chrome DevTools Profiler',
  'Schema.org Validator',
  'Next.js App Router',
  'WordPress Core',
  'Cloudflare / Security Headers',
]

const FAQS = [
  {
    question: 'How long does a comprehensive technical SEO audit take?',
    answer:
      'A thorough technical audit typically takes 3 to 5 business days depending on site size and complexity. You receive an executive summary, a prioritized fix checklist, and exact code snippets ready for implementation.',
  },
  {
    question: 'Do you provide direct code fixes or only an audit report?',
    answer:
      'Both. I can provide copy-paste code snippets and schema scripts for your development team, or directly implement fixes on Next.js, React, HTML, and WordPress platforms.',
  },
  {
    question: 'How does technical SEO impact AI search experiences (GEO / AEO)?',
    answer:
      'AI search engines like Google AI Overviews and Perplexity rely heavily on fast crawlability, clean HTML DOM structures, and explicit JSON-LD schema to extract facts and cite sources reliably. Technical SEO is the foundation for AI discoverability.',
  },
  {
    question: 'Can you audit and optimize JavaScript-heavy Single Page Applications (SPAs)?',
    answer:
      'Yes. I specialize in modern JavaScript frameworks (Next.js, React) and inspect server-side rendering (SSR), static site generation (SSG), hydration overhead, and Googlebot rendering parity.',
  },
]

const TECHNICAL_SEO_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/technical-seo/#service',
      name: 'Technical SEO Services & Semantic Architecture',
      url: 'https://www.alaintapiru.com/services/technical-seo/',
      serviceType: 'Technical Search Engine Optimization',
      description:
        'Professional Technical SEO services in the Philippines. Crawlability audits, Core Web Vitals speed optimization, structured JSON-LD entity markup, and site architecture.',
      provider: {
        '@type': 'Person',
        '@id': 'https://www.alaintapiru.com/#person',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Worldwide',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Technical SEO Deliverables',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Crawlability & Indexability Audit',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Core Web Vitals Speed Optimization',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Structured JSON-LD Schema Architecture',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services/technical-seo/#faq',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/services/technical-seo/#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.alaintapiru.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://www.alaintapiru.com/services/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Technical SEO',
          item: 'https://www.alaintapiru.com/services/technical-seo/',
        },
      ],
    },
  ],
}

export default function TechnicalSeoPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TECHNICAL_SEO_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <section
        aria-labelledby="technical-seo-hero-heading"
        className="relative z-20 pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
      >
        {/* Breadcrumbs */}
        <div className="motion-reveal">
          <Breadcrumbs
            items={[
              { name: 'Services', url: '/services/' },
              { name: 'Technical SEO', url: '/services/technical-seo/' },
            ]}
            align="center"
            className="mb-6"
            showJsonLd={false}
          />
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-6 motion-reveal">
          <Icon name="search_check" size={14} className="text-primary-container" />
          <span>FOUNDATION FIRST • CRAWLABILITY &amp; ARCHITECTURE</span>
        </div>

        {/* Headline */}
        <h1
          id="technical-seo-hero-heading"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-6 motion-reveal"
        >
          <span className="font-extrabold text-on-surface">Technical SEO Services</span>{' '}
          <span className="font-medium text-on-surface/85">&amp; Semantic Architecture</span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-on-surface/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-normal motion-reveal">
          Eliminate indexation roadblocks, optimize Core Web Vitals, and build connected JSON-LD entity graphs so search engines and AI crawlers can discover, render, and understand your website effortlessly.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto motion-reveal">
          <Link
            href="/contact/?service=Technical%20SEO%20Audit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Request a Technical Audit
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          <a
            href="#what-we-audit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Explore Audit Areas ↓
          </a>
        </div>

        {/* 3-Item Trust Bar */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            'Manual Diagnostics (No Automated Spam)',
            'Actionable Code-Level Fixes',
            'Sub-Second PageSpeed Targeting',
          ].map((point, idx) => (
            <div
              key={point}
              style={{ transitionDelay: `${idx * 60}ms` }}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-on-surface/90 font-sans text-xs sm:text-sm font-medium motion-reveal"
            >
              <Icon name="check_circle" size={18} className="text-primary-container shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 2. What Technical SEO Solves */}
      <section
        id="problems-solved"
        aria-labelledby="problems-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            BOTTLENECKS ELIMINATED
          </span>
          <h2
            id="problems-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Common Technical Roadblocks We Solve
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Content and backlinks cannot perform if search engines are blocked by server latency, broken directives, or crawl traps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS_SOLVED.map((item, idx) => (
            <div
              key={item.title}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-8 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal"
            >
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-3">
                  {item.title}
                </h3>
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                  <strong className="font-semibold block mb-0.5">The Bottleneck:</strong>
                  {item.problem}
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/85 leading-relaxed">
                  <strong className="font-semibold text-primary-container block mb-0.5">The Fix:</strong>
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 3. What I Audit & Optimize */}
      <section
        id="what-we-audit"
        aria-labelledby="audit-areas-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12 scroll-mt-24"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            CORE AUDIT CRITERIA
          </span>
          <h2
            id="audit-areas-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            What We Inspect, Diagnose &amp; Optimize
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Every technical audit covers server health, indexability directives, rendering pipelines, and semantic schema architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {TECHNICAL_AUDIT_AREAS.map((area, idx) => (
            <article
              key={area.id}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 group flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/20 transition-colors">
                  <Icon name={area.icon} size={26} className="text-primary-container" />
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="font-sans text-sm text-on-surface/75 leading-relaxed mb-6">
                  {area.description}
                </p>

                <div className="space-y-3 pt-5 border-t border-black/10 dark:border-white/10">
                  <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                    Specific Checks &amp; Deliverables
                  </span>
                  <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface/85">
                    {area.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Icon
                          name="check_circle"
                          size={16}
                          className="text-primary-container shrink-0 mt-0.5"
                        />
                        <span className="leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 4. Technical SEO Process */}
      <section
        id="audit-process"
        aria-labelledby="process-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            METHODOLOGY
          </span>
          <h2
            id="process-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            4-Step Technical Audit Sprint
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            A structured workflow ensuring every critical technical issue is documented, prioritized, and resolved with validation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={step.step}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-7 rounded-2xl bg-surface-1/90 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="font-heading text-2xl sm:text-3xl font-black text-primary-container/90">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5">
                    Phase 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 5. Tools & Practical Proof Case Study */}
      <section
        id="proof-and-tools"
        aria-labelledby="proof-tools-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Diagnostic Tools Column (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal">
            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
                DIAGNOSTIC SUITE
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-4">
                Industry-Standard Diagnostic Tools
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed mb-6">
                Audits are conducted using rigorous testing environments and multi-crawler simulations without relying on automated generic report generators.
              </p>

              <div className="flex flex-wrap gap-2">
                {TECH_STACK_TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface font-heading text-xs font-semibold"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Practical Proof Banner (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/15 via-surface-1/95 to-surface-1/95 border border-primary-container/35 flex flex-col justify-between shadow-lg motion-reveal">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-heading text-[11px] font-bold uppercase tracking-[0.06em]">
                  <Icon name="auto_awesome" size={13} />
                  Self-Initiated Production Build
                </span>
                <span className="text-xs font-heading font-bold text-primary-container">
                  Live Portfolio
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3">
                AlainTapiru.com Technical Architecture
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed mb-6">
                See this exact technical SEO framework applied in practice on this website: Next.js App Router architecture, 99 Desktop / 96 Mobile PageSpeed lab scores, sub-second LCP, zero CLS, and fully connected Schema.org entity graphs.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 pt-4 border-t border-black/10 dark:border-white/10 text-center">
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">99</span>
                  <span className="font-sans text-[10px] text-on-surface/70">Desktop Lab Score</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">96</span>
                  <span className="font-sans text-[10px] text-on-surface/70">Mobile Lab Score</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">0.000</span>
                  <span className="font-sans text-[10px] text-on-surface/70">Cumulative Shift</span>
                </div>
              </div>
            </div>

            <Link
              href="/projects/alaintapiru-portfolio/"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-6 py-3.5 rounded-xl btn-motion min-h-[46px] shadow-sm"
            >
              <span>Explore Technical Architecture Case Study</span>
              <Icon name="arrow_forward" size={14} className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. Technical SEO FAQs */}
      <section
        id="technical-seo-faq"
        aria-labelledby="faq-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="text-center max-w-3xl mx-auto motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2
            id="faq-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Technical SEO Questions &amp; Answers
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Direct answers regarding technical crawl diagnostics, implementation timelines, and code-level fixes.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={faq.question}
              style={{ transitionDelay: `${index * 60}ms` }}
              className="p-5 sm:p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 shadow-sm motion-reveal"
            >
              <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mb-2.5">
                {faq.question}
              </h3>
              <p className="font-sans text-sm sm:text-base text-on-surface/80 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* Related Services Navigation */}
      <section className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold">
            RELATED DISCIPLINES
          </span>
          <Link
            href="/services/"
            className="text-xs font-heading font-semibold text-on-surface/70 hover:text-primary-container transition-colors flex items-center gap-1"
          >
            <span>All Services Hub</span>
            <Icon name="arrow_forward" size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/services/web-development/"
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm motion-reveal"
          >
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container mb-2 block">Next.js &amp; WordPress</span>
              <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                SEO-Ready Web Design &amp; Development
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                Code-first Next.js apps and custom WordPress themes engineered for zero layout shift.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>View Web Development Scope</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/services/on-page-seo/"
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm motion-reveal"
          >
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container mb-2 block">Content &amp; Metadata</span>
              <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                On-Page SEO &amp; Content Optimization
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                Search intent mapping, semantic heading outlines, and click-optimized metadata.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>View On-Page SEO Scope</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 7. Closing Conversion CTA Banner */}
      <section
        id="contact-cta"
        aria-labelledby="final-cta-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto"
      >
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-primary-container/20 via-surface-1 to-surface-1 border-2 border-primary-container/40 text-center space-y-6 sm:space-y-8 shadow-[0_0_50px_rgba(224,123,32,0.15)] motion-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-[0.08em]">
            <Icon name="check_circle" size={14} className="text-primary-container" />
            <span>Ready for a clean crawl foundation • Direct Discovery Call</span>
          </div>

          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready to Fix Technical Bottlenecks and Accelerate Crawl Velocity?
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s diagnose indexing roadblocks, fix slow Core Web Vitals, and implement clean structured schema across your web architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact/?service=Technical%20SEO%20Audit"
              aria-label="Request a Technical SEO Audit"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Request a Technical Audit</span>
              <Icon name="arrow_forward" size={16} className="btn-icon" />
            </Link>

            <Link
              href="/services/"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px]"
            >
              <span>Back to Services Hub</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
