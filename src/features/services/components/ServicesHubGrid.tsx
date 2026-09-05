import React from 'react'
import Link from 'next/link'
import { Icon, IconName } from '@/components/icons'

interface ServiceHubCard {
  id: string
  pillar: string
  title: string
  description: string
  href: string
  icon: IconName
  badge?: string
  isFeatured?: boolean
  deliverables: string[]
  ctaText: string
}

const SERVICE_HUB_CARDS: ServiceHubCard[] = [
  {
    id: 'technical-seo',
    pillar: 'Pillar 01 • Foundation',
    title: 'Technical SEO & Semantic Architecture',
    description:
      'Crawlability audits, Core Web Vitals speed optimization, and semantic JSON-LD entity markup to ensure search bots and AI crawlers index your site without friction.',
    href: '/services/technical-seo/',
    icon: 'search_check',
    deliverables: [
      'Crawlability, indexability & robots.txt diagnostics',
      'Core Web Vitals speed profiling & mobile usability',
      'Structured JSON-LD schema entity graphs',
      'Prioritized 30-day technical fix blueprint',
    ],
    ctaText: 'Explore Technical SEO',
  },
  {
    id: 'on-page-seo',
    pillar: 'Pillar 02 • Content & Intent',
    title: 'On-Page SEO & Content Optimization',
    description:
      'Search intent mapping, competitor gap analysis, and semantic content structuring that aligns your web pages directly with user demand and search algorithms.',
    href: '/services/on-page-seo/',
    icon: 'edit_note',
    deliverables: [
      'Commercial vs. informational search intent mapping',
      'Competitor keyword gap discovery & topic clusters',
      'Click-optimized title tags & meta descriptions',
      'Semantic heading hierarchy (H1–H3) & internal linking',
    ],
    ctaText: 'Explore On-Page SEO',
  },
  {
    id: 'local-seo',
    pillar: 'Pillar 03 • Local Visibility',
    title: 'Local SEO & Google Business Profile Optimization',
    description:
      'Local search signal auditing, Google Business Profile optimization, and citation consistency to help nearby customers find your business on Google Search and Maps.',
    href: '/services/local-seo/',
    icon: 'location_on',
    badge: 'Interactive Tool',
    deliverables: [
      '10-point Google Business Profile signal diagnostic',
      'Primary & secondary category mismatch detection',
      'NAP consistency & local citation structuring',
      'Actionable local search ranking roadmap',
    ],
    ctaText: 'Explore Local SEO',
  },
  {
    id: 'ai-search-optimization',
    pillar: 'Pillar 04 • Emerging Search',
    title: 'AI Search Optimization (AEO & GEO)',
    description:
      'Structuring content, entities, and data sources for direct answer retrieval across Featured Snippets, Google AI Overviews, Perplexity, and conversational search platforms.',
    href: '/services/ai-search-optimization/',
    icon: 'auto_awesome',
    badge: 'Next-Gen Search',
    isFeatured: true,
    deliverables: [
      'Direct answer formatting for Featured Snippets & PAA',
      'Information-dense, source-citable content structuring',
      'Brand entity structuring & Knowledge Graph alignment',
      'Machine discoverability & /llms.txt standard endpoints',
    ],
    ctaText: 'Explore AI Search Optimization',
  },
  {
    id: 'web-development',
    pillar: 'Pillar 05 • Web Engineering',
    title: 'SEO-Ready Web Design & Development',
    description:
      'High-performance Next.js App Router web apps and custom WordPress themes engineered with clean code, performance budgets, and built-in search architecture.',
    href: '/services/web-development/',
    icon: 'code_blocks',
    deliverables: [
      'Custom Next.js & React code-first architectures',
      'Custom WordPress theme builds without bloated templates',
      'Performance engineering targeting fast Core Web Vitals',
      'Integrated GA4 analytics & Search Console tracking',
    ],
    ctaText: 'Explore Web Development',
  },
]

const PROOF_ITEMS = [
  {
    title: 'AlainTapiru.com Architecture',
    category: 'Technical SEO & Next.js',
    metric: 'Aug 2026 Lab: 99 Desktop / 96 Mobile',
    description: 'Code-first Next.js portfolio with a structured JSON-LD entity graph and reserved layout space. Lab scores are not field Core Web Vitals.',
    href: '/projects/alaintapiru-portfolio/',
  },
  {
    title: 'AngatSikat Studio',
    category: 'WordPress & On-Page SEO',
    metric: 'Performance Report Not Maintained',
    description: 'Custom WordPress theme build engineered for fast crawlability and clean semantics without an unsupported exact score.',
    href: '/projects/angat-sikat-studio/',
  },
  {
    title: 'Local SEO & GBP Health Checker',
    category: 'Local SEO & Diagnostics',
    metric: '10-Point Signal Diagnostic Engine',
    description: 'Interactive Google Business Profile audit engine with Serper & Gemini API integration.',
    href: '/projects/local-seo-gbp-checker/',
  },
]

export function ServicesHubGrid() {
  return (
    <section
      id="service-directory"
      aria-labelledby="service-directory-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-12 sm:space-y-16 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          SERVICE DIRECTORY • CLEARLY SCOPED DELIVERABLES
        </span>
        <h2
          id="service-directory-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          Core SEO &amp; Web Support Capabilities
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Select a specialized service pillar below to explore clearly scoped deliverables, turnaround times, and practical implementation details.
        </p>
      </div>

      {/* 5-Card Service Hub Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {SERVICE_HUB_CARDS.map((service, idx) => (
          <article
            key={service.id}
            style={{ transitionDelay: `${idx * 60}ms` }}
            className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border flex flex-col justify-between shadow-lg relative backdrop-blur-md card-interactive-glow motion-reveal ${
              service.isFeatured
                ? 'bg-surface-1/95 border-primary-container/50 hover:border-primary-container shadow-[0_0_30px_rgba(224,123,32,0.15)] md:col-span-2 lg:col-span-1'
                : 'bg-surface-1/95 border-black/10 dark:border-white/10 hover:border-primary-container/40'
            }`}
          >
            <div>
              {/* Card Header: Icon & Optional Badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                    service.isFeatured
                      ? 'bg-primary-container/20 border-primary-container/40 text-primary-container shadow-[0_0_15px_rgba(224,123,32,0.3)]'
                      : 'bg-primary-container/10 border-primary-container/20 text-primary-container'
                  }`}
                >
                  <Icon name={service.icon} size={24} className="text-primary-container" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    {service.pillar}
                  </span>
                  {service.badge && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-heading text-[10px] font-bold uppercase tracking-[0.06em]">
                      {service.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-on-surface/75 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-3 pt-5 border-t border-black/10 dark:border-white/10 mb-8">
                <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                  Core Capabilities
                </span>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface/85">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Icon
                        name="check_circle"
                        size={15}
                        className="text-primary-container shrink-0 mt-0.5"
                      />
                      <span className="leading-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Link to Dedicated Child Route */}
            <Link
              href={service.href}
              aria-label={`${service.ctaText} - ${service.title}`}
              className={`inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] btn-motion min-h-[46px] focus-visible:ring-2 focus-visible:ring-primary-container transition-all ${
                service.isFeatured
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:shadow-[0_0_30px_rgba(224,123,32,0.5)]'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-primary-container hover:text-on-primary-container text-on-surface border border-black/10 dark:border-white/10 hover:border-transparent'
              }`}
            >
              <span>{service.ctaText}</span>
              <Icon name="arrow_forward" size={14} className="ml-2 btn-icon" />
            </Link>
          </article>
        ))}
      </div>

      {/* Practical Implementation & Proofs Section */}
      <div className="pt-8 border-t border-black/10 dark:border-white/10 space-y-6 motion-reveal">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
              EVIDENCE &amp; CASE STUDIES
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              Grounded in Real Technical Implementations
            </h3>
          </div>
          <Link
            href="/projects/"
            className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wider text-primary-container hover:underline"
          >
            <span>View All Projects</span>
            <Icon name="arrow_forward" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROOF_ITEMS.map((item, idx) => (
            <Link
              key={item.title}
              href={item.href}
              style={{ transitionDelay: `${idx * 60}ms` }}
              className="p-5 rounded-2xl bg-surface-1/90 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm card-interactive-glow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-heading font-bold text-primary-container">
                    {item.metric}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-on-surface/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center gap-1 text-xs font-heading font-semibold text-primary-container group-hover:translate-x-0.5 transition-transform">
                <span>Read Case Study</span>
                <Icon name="arrow_forward" size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesHubGrid
