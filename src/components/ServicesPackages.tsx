import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

interface PackageTier {
  id: string
  name: string
  cadence: string
  startingPrice: string
  badge: string
  targetAudience: string
  isFeatured?: boolean
  popularBadge?: string
  includes: string[]
  ctaText: string
}

const PACKAGES: PackageTier[] = [
  {
    id: 'tier-1-sprint',
    name: 'SEO & AI Readiness Sprint',
    cadence: 'Technical Audit & Strategy',
    startingPrice: '$280 USD (₱15,500)',
    badge: 'Search Foundation',
    targetAudience: 'Website owners seeking technical crawl fixes, structured data implementation, and search readiness.',
    includes: [
      'Full Technical SEO & Crawl Audit',
      'Structured JSON-LD Schema Implementation',
      'Search Intent & AI Search Readiness Review',
      'Keyword Mapping & Content Strategy',
      'Prioritized 30-Day Fix Blueprint + Video Walkthrough',
    ],
    ctaText: 'Book a Readiness Sprint',
  },
  {
    id: 'tier-2-wordpress',
    name: 'WordPress High-Speed Business Site',
    cadence: 'CMS Build & Launch',
    startingPrice: '$480 USD (₱27,000)',
    badge: 'WordPress / CMS',
    popularBadge: 'Popular for Small Business',
    isFeatured: true,
    targetAudience: 'Businesses wanting a modern, easily editable WordPress website built with high-speed foundations.',
    includes: [
      'Custom Responsive WordPress Theme Layout',
      'Built-in Technical SEO & Schema Integration',
      'Core Web Vitals Speed & Security Hardening',
      'GA4 / Google Search Console Integration',
      'CMS Hand-off & Guided Walkthrough',
    ],
    ctaText: 'Start WordPress Project',
  },
  {
    id: 'tier-3-nextjs',
    name: 'Custom Next.js & React Architecture',
    cadence: 'Code-First Engineering',
    startingPrice: '$850 USD (₱48,000)',
    badge: 'Code-First Web',
    targetAudience: 'Brands and projects requiring modern code-first development, fast Core Web Vitals, and clean web architecture.',
    includes: [
      'Bespoke Next.js 15 App Router & React Build',
      'Zero-CLS Image Pipelines & Tailwind / M3 Design',
      'Performance-focused build targeting fast Core Web Vitals',
      'Custom Schema Markup & JSON-LD Integration',
      'Scalable component architecture & clean code standards',
    ],
    ctaText: 'Build Custom Next.js Site',
  },
  {
    id: 'tier-4-retainer',
    name: 'Ongoing Monthly SEO Support',
    cadence: 'Ongoing Monthly Sprint',
    startingPrice: '$450 USD / mo (₱25,000 / mo)',
    badge: 'Ongoing Retainer',
    targetAudience: 'Businesses looking for consistent monthly optimization, technical maintenance, and ongoing search improvements.',
    includes: [
      'Dedicated 20–25 Hours / Month Focused Execution',
      'Ongoing Technical & On-Page SEO Sprints',
      'Google Business Profile (GBP) & Local Search Maintenance',
      'Monthly Strategy Call & Live Reporting Dashboard',
      'Transparent Hour-by-Hour Activity Log',
    ],
    ctaText: 'Inquire About Monthly Retainer',
  },
]

export function ServicesPackages() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          TRANSPARENT ENGAGEMENT MODELS
        </span>
        <h2
          id="packages-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          Engineered for Practical Search &amp; Web Visibility
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Structured, process-driven solutions differentiated by technical stack—from specialized SEO sprints and responsive WordPress sites to custom Next.js builds.
        </p>
      </div>

      {/* 4-Tier Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-4">
        {PACKAGES.map((pkg, idx) => (
          <article
            key={pkg.id}
            style={{ transitionDelay: `${idx * 80}ms` }}
            className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-md motion-reveal ${
              pkg.isFeatured
                ? 'bg-gradient-to-b from-primary-container/20 via-surface-2/85 to-surface-1/80 border-2 border-primary-container/80 shadow-[0_0_50px_rgba(224,123,32,0.22)] lg:-translate-y-1 z-10 pt-9 sm:pt-10'
                : 'bg-surface-1/80 border border-white/10 hover:border-primary-container/40 hover:bg-surface-2/80 shadow-lg'
            }`}
          >
            {/* Floating Featured Badge */}
            {pkg.isFeatured && pkg.popularBadge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary-container text-on-primary-container font-heading text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.06em] shadow-md whitespace-nowrap">
                  <Icon name="auto_awesome" size={12} />
                  {pkg.popularBadge}
                </span>
              </div>
            )}

            <div>
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-on-surface/70">
                  {pkg.cadence}
                </span>
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container">
                  {pkg.badge}
                </span>
              </div>

              {/* Package Title & Price */}
              <div className="mb-4">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-1.5 leading-snug">
                  {pkg.name}
                </h3>
                <span className="font-heading text-sm sm:text-base font-extrabold text-primary-container block">
                  {pkg.startingPrice}
                </span>
              </div>

              {/* Target Audience Description */}
              <p className="font-sans text-xs text-on-surface/75 leading-relaxed mb-5 min-h-[38px]">
                <strong className="text-on-surface font-semibold">Best For: </strong>
                {pkg.targetAudience}
              </p>

              {/* Deliverables / Includes List */}
              <div className="space-y-2.5 pt-5 border-t border-white/10 mb-6">
                <span className="font-heading text-[11px] text-primary-container uppercase tracking-wider block font-semibold">
                  What&apos;s Included:
                </span>
                <ul className="space-y-2.5 font-sans text-xs text-on-surface/85">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon
                        name="check_circle"
                        size={14}
                        className="text-primary-container shrink-0 mt-0.5"
                      />
                      <span className="leading-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA Button */}
            <Link
              href="/contact/"
              aria-label={`${pkg.ctaText} - ${pkg.name}`}
              className={`inline-flex items-center justify-center w-full py-3 px-4 rounded-xl font-heading text-xs font-bold uppercase tracking-[0.06em] btn-motion min-h-[44px] text-center leading-normal focus-visible:ring-2 focus-visible:ring-primary-container ${
                pkg.isFeatured
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)]'
                  : 'bg-white/5 hover:bg-primary-container hover:text-on-primary-container text-on-surface border border-white/10 hover:border-transparent'
              }`}
            >
              <span>{pkg.ctaText}</span>
              <Icon name="arrow_forward" size={14} className="ml-1.5 shrink-0 btn-icon" />
            </Link>
          </article>
        ))}
      </div>

      {/* Small Business & Flexible Negotiation Trust Banner */}
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-surface-1/95 via-surface-2/90 to-surface-1/95 border border-primary-container/35 shadow-xl relative overflow-hidden motion-reveal">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-heading text-xs font-bold uppercase tracking-[0.06em]">
              <Icon name="handshake" size={15} className="text-emerald-400" />
              <span>Small Business &amp; Custom Budget Friendly</span>
            </div>
            <h3 className="font-heading text-lg sm:text-2xl font-bold text-on-surface">
              Need a flexible scope tailored to your current budget?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
              If you have specific budget constraints or unique requirements, we can tailor custom milestone deliverables or sprint-based phases according to your exact needs.
            </p>
          </div>

          <Link
            href="/contact/?service=Flexible%20Small%20Business%20Scope"
            className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 font-heading text-xs font-bold uppercase tracking-[0.06em] px-6 py-3.5 rounded-xl btn-motion whitespace-nowrap min-h-[46px] shadow-md focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Discuss Custom Plan</span>
            <Icon name="arrow_forward" size={14} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesPackages
