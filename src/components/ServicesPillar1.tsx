import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

interface ServiceCardData {
  id: string
  title: string
  subhead: string
  icon: 'search_check' | 'dataset'
  deliverables: string[]
  ctaText: string
}

const PILLAR_1_SERVICES: ServiceCardData[] = [
  {
    id: 'technical-seo-audit',
    title: 'Comprehensive SEO Website Audit & Diagnostics',
    subhead: 'Uncover hidden technical bottlenecks before they cost you traffic.',
    icon: 'search_check',
    ctaText: 'Request an Audit',
    deliverables: [
      'Crawlability & Indexability Audit (Googlebot & AI crawler accessibility)',
      'Core Web Vitals, speed profiling, and mobile usability check',
      'URL structure & internal linking hierarchy optimization',
      'Prioritized Action Roadmap (Immediate Fixes vs. Growth Sprints)',
    ],
  },
  {
    id: 'schema-markup-entities',
    title: 'Advanced Schema Markup & Entity Structuring',
    subhead: 'Disambiguate your brand so search engines and AI models understand your entities.',
    icon: 'dataset',
    ctaText: 'Structure My Entities',
    deliverables: [
      'Custom JSON-LD Schema (Organization, ProfessionalService, Person/E-E-A-T, FAQPage, Article)',
      'Entity linking to trusted Knowledge Graph sources',
      'Rich snippet qualification (FAQs, Star Ratings, Breadcrumbs)',
      'Google Rich Results validation and syntax error cleanup',
    ],
  },
]

export function ServicesPillar1() {
  return (
    <section
      id="pillar-foundation"
      aria-labelledby="pillar-1-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
    >
      {/* Section Header */}
      <div className="max-w-3xl">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          PILLAR 01: FOUNDATION
        </span>
        <h2
          id="pillar-1-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          Technical Health &amp; Semantic Architecture
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Ensuring your site is easily crawled, indexed, and understood by search bots and LLMs alike. See this implemented in the{' '}
          <Link href="/projects/alaintapiru-portfolio/" className="text-primary-container font-semibold hover:underline">
            AlainTapiru.com Architecture Case Study
          </Link>{' '}
          or test your local search health with our{' '}
          <Link href="/tools/" className="text-primary-container font-semibold hover:underline">
            Free GBP Diagnostic Tool
          </Link>.
        </p>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {PILLAR_1_SERVICES.map((service) => (
          <article
            key={service.id}
            className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          >
            <div>
              {/* Card Icon Header */}
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-primary-container/20 transition-all">
                <Icon name={service.icon} size={26} className="text-primary-container" />
              </div>

              {/* Card Title & Subhead */}
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-on-surface/75 leading-relaxed mb-6 sm:mb-8">
                {service.subhead}
              </p>

              {/* Deliverables List */}
              <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
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
              className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-white/5 hover:bg-primary-container hover:text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-on-surface border border-white/10 hover:border-transparent transition-all min-h-[46px] group-hover:bg-primary-container group-hover:text-on-primary-container focus-visible:ring-2 focus-visible:ring-primary-container"
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

export default ServicesPillar1
