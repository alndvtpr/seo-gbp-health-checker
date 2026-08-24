import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

interface Pillar2Service {
  id: string
  title: string
  subhead?: string
  badge?: string
  isFeatured?: boolean
  icon: 'key' | 'edit_note' | 'auto_awesome'
  deliverables: string[]
  ctaText: string
}

const PILLAR_2_SERVICES: Pillar2Service[] = [
  {
    id: 'keyword-intelligence',
    title: 'Competitor Benchmarking & Keyword Intelligence',
    icon: 'key',
    ctaText: 'Discover Keyword Gaps',
    deliverables: [
      'Intent mapping (Commercial vs. Informational)',
      'Competitor gap analysis',
      'Topic clusters',
      'Master keyword matrix',
    ],
  },
  {
    id: 'on-page-optimization',
    title: 'On-Page SEO & Content Optimization',
    icon: 'edit_note',
    ctaText: 'Optimize My Content',
    deliverables: [
      'Click-optimized title tags & meta descriptions',
      'Semantic heading hierarchy (H1–H3)',
      'Image SEO, compression & alt text',
      'Strategic internal linking structure',
    ],
  },
  {
    id: 'aeo-geo-optimization',
    title: 'AEO & GEO (Answer & Generative Engine Optimization)',
    subhead: 'Structure content for search snippets and emerging AI search experiences.',
    badge: 'Next-Gen Search',
    isFeatured: true,
    icon: 'auto_awesome',
    ctaText: 'Structure Content for AI Search',
    deliverables: [
      'Direct answer formatting for Featured Snippets & "People Also Ask"',
      'Information-dense, source-citable content structuring for LLMs',
      'Brand entity structuring across key digital touchpoints',
    ],
  },
]

export function ServicesPillar2() {
  return (
    <section
      id="pillar-visibility"
      aria-labelledby="pillar-2-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
    >
      {/* Section Header */}
      <div className="max-w-3xl motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          PILLAR 02: VISIBILITY
        </span>
        <h2
          id="pillar-2-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          Built for Traditional Search &amp; Emerging AI Discovery
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Strengthen search visibility across classic Google search results while structuring content for emerging AI search experiences in ChatGPT, Perplexity, and AI Overviews. Discover our full on-page execution in the{' '}
          <Link href="/projects/angat-sikat-studio/" className="text-primary-container font-semibold hover:underline">
            AngatSikat Studio Case Study
          </Link>.
        </p>
      </div>

      {/* 3-Card Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PILLAR_2_SERVICES.map((service, idx) => (
          <article
            key={service.id}
            style={{ transitionDelay: `${idx * 80}ms` }}
            className={`p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border group flex flex-col justify-between shadow-lg relative backdrop-blur-md card-interactive-glow motion-reveal ${
              service.isFeatured
                ? 'bg-surface-1/95 border-primary-container/50 hover:border-primary-container shadow-[0_0_30px_rgba(224,123,32,0.15)]'
                : 'bg-surface-1/95 border-black/10 dark:border-white/10 hover:border-primary-container/40'
            }`}
          >
            <div>
              {/* Card Header: Icon + Optional Badge */}
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

                {service.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-heading text-[11px] font-bold uppercase tracking-[0.06em] shadow-sm">
                    <Icon name="auto_awesome" size={12} />
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Card Title & Subhead */}
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              {service.subhead && (
                <p className="font-sans text-sm text-primary-container/90 font-medium leading-relaxed mb-6 sm:mb-8">
                  {service.subhead}
                </p>
              )}

              {/* Deliverables List */}
              <div className="space-y-3 pt-6 border-t border-black/10 dark:border-white/10 mb-8">
                <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                  Key Deliverables
                </span>
                <ul className="space-y-2.5 font-sans text-sm text-on-surface/85">
                  {service.deliverables.map((item) => (
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

            {/* Action Link */}
            <Link
              href="/contact/"
              aria-label={`${service.ctaText} for ${service.title}`}
              className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary-container hover:text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-on-surface border border-black/10 dark:border-white/10 hover:border-transparent transition-all min-h-[46px] group-hover:bg-primary-container group-hover:text-on-primary-container focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>{service.ctaText}</span>
              <Icon name="arrow_forward" size={14} className="ml-2" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesPillar2
