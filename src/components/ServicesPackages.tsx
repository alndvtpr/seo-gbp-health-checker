import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

interface PackageTier {
  id: string
  name: string
  cadence: string
  startingPrice: string
  subPrice?: string
  badge: string
  targetAudience: string
  scopeCap: string
  isFeatured?: boolean
  popularBadge?: string
  includes: string[]
  exclusions: string
  ctaText: string
  ctaHref: string
}

const STARTER_PACKAGES: PackageTier[] = [
  {
    id: 'health-check',
    name: 'Website SEO Health Check',
    cadence: 'Diagnostic Evaluation',
    startingPrice: '₱3,500 PHP',
    subPrice: 'approx. $65 USD',
    badge: 'Evaluation',
    targetAudience: 'Small businesses needing an honest, clear audit of technical search health before spending on fixes.',
    scopeCap: 'Up to 15 website pages • 1 primary domain',
    includes: [
      'Full technical crawl & indexability diagnostics',
      'Core Web Vitals & mobile speed diagnostic',
      'Robots.txt & XML sitemap health check',
      'Prioritized action report with severity ratings',
      'Credited toward sprint if booked within 14 days',
    ],
    exclusions: 'Direct code fixes (available in Technical Sprint)',
    ctaText: 'Request Health Check',
    ctaHref: '/tools/#website-audit',
  },
  {
    id: 'technical-sprint',
    name: 'Technical SEO Fix Sprint',
    cadence: '1-Week Technical Sprint',
    startingPrice: '₱8,500 PHP',
    subPrice: 'approx. $155 USD',
    badge: 'Foundation Sprint',
    popularBadge: 'Popular for Quick Fixes',
    isFeatured: true,
    targetAudience: 'Websites with crawl errors, indexing drops, or missing structured data needing direct fixes.',
    scopeCap: 'Up to 10 identified technical issues or 1 focused sprint',
    includes: [
      'Direct fixes for indexing, 404s & redirect chains',
      'JSON-LD Schema Markup (Org, LocalBusiness, Breadcrumbs)',
      'Robots.txt & XML sitemap configuration in GSC',
      'Basic Core Web Vitals speed optimizations',
      'Post-fix verification & Search Console re-submission',
    ],
    exclusions: 'Full site redesigns or backend database migrations',
    ctaText: 'Book Technical Sprint',
    ctaHref: '/contact/?service=Technical%20SEO%20Audit',
  },
  {
    id: 'on-page-sprint',
    name: 'On-Page SEO Sprint',
    cadence: 'Content & Intent Sprint',
    startingPrice: '₱6,500 PHP',
    subPrice: 'approx. $120 USD',
    badge: 'Relevance Sprint',
    targetAudience: 'Service pages or homepages that exist but are not ranking for their target local or service terms.',
    scopeCap: 'Up to 5 priority target pages',
    includes: [
      'Search intent mapping (commercial vs. informational)',
      'Single-H1 heading hierarchy audit & rewrite',
      'Click-focused meta titles & meta descriptions',
      'Semantic internal linking structure & anchor text',
      'Image alt text & content structure optimization',
    ],
    exclusions: 'Net-new long-form copywriting from scratch',
    ctaText: 'Book On-Page Sprint',
    ctaHref: '/contact/?service=On-Page%20SEO%20Optimization',
  },
  {
    id: 'local-foundation',
    name: 'Local SEO Foundation',
    cadence: 'Local Search Setup',
    startingPrice: '₱7,500 PHP',
    subPrice: 'approx. $135 USD',
    badge: 'Visibility Sprint',
    targetAudience: 'Local contractors, clinics, studios, and shops serving a defined geographic radius.',
    scopeCap: '1 primary Google Business Profile location',
    includes: [
      '10-point Google Business Profile signal calibration',
      'Primary & secondary category alignment',
      'NAP consistency audit across core local citations',
      'Local landing page schema with GeoCoordinates',
      '30-Day Local Visibility Action Plan',
    ],
    exclusions: 'Guaranteed #1 Map Pack rankings or paid local ads',
    ctaText: 'Book Local SEO Setup',
    ctaHref: '/contact/?service=Local%20SEO%20Optimization',
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
          TRANSPARENT ENGAGEMENT OFFERS
        </span>
        <h2
          id="packages-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          Clear Scope, Honest Pricing &amp; Real Deliverables
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Practical SEO sprints, local visibility setup, monthly maintenance, and agency overflow support with transparent PHP pricing, explicit scope caps, and zero hidden fees.
        </p>
      </div>

      {/* 4-Tier Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-4">
        {STARTER_PACKAGES.map((pkg, idx) => (
          <article
            key={pkg.id}
            style={{ transitionDelay: `${idx * 80}ms` }}
            className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-md motion-reveal ${
              pkg.isFeatured
                ? 'bg-surface-1/95 border-2 border-primary-container/80 shadow-[0_0_50px_rgba(224,123,32,0.22)] lg:-translate-y-1 z-10 pt-9 sm:pt-10'
                : 'bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 hover:bg-surface-2 shadow-sm'
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
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface/80">
                  {pkg.cadence}
                </span>
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container">
                  {pkg.badge}
                </span>
              </div>

              {/* Package Title & Price */}
              <div className="mb-4">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-1 leading-snug">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-xl sm:text-2xl font-extrabold text-primary-container">
                    {pkg.startingPrice}
                  </span>
                </div>
                {pkg.subPrice && (
                  <span className="text-[11px] font-sans text-on-surface/60 block mt-0.5">
                    {pkg.subPrice}
                  </span>
                )}
              </div>

              {/* Target Audience Description */}
              <p className="font-sans text-xs text-on-surface/75 leading-relaxed mb-4 min-h-[38px]">
                <strong className="text-on-surface font-semibold">Best For: </strong>
                {pkg.targetAudience}
              </p>

              {/* Scope Cap Badge */}
              <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-4 text-[11px] font-sans text-on-surface/80">
                <strong className="font-heading font-bold text-primary-container uppercase text-[10px] tracking-wider block mb-0.5">
                  Scope Cap:
                </strong>
                <span>{pkg.scopeCap}</span>
              </div>

              {/* Deliverables / Includes List */}
              <div className="space-y-2 pt-3 border-t border-black/10 dark:border-white/10 mb-4">
                <span className="font-heading text-[11px] text-primary-container uppercase tracking-wider block font-semibold">
                  What&apos;s Included:
                </span>
                <ul className="space-y-2 font-sans text-xs text-on-surface/85">
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

              {/* Exclusions Notice */}
              <div className="pt-2.5 border-t border-black/5 dark:border-white/5 mb-6 text-[11px] font-sans text-on-surface/65">
                <strong className="text-on-surface/80 font-medium">Excludes: </strong>
                {pkg.exclusions}
              </div>
            </div>

            {/* Action CTA Button */}
            <Link
              href={pkg.ctaHref}
              aria-label={`${pkg.ctaText} - ${pkg.name}`}
              className={`inline-flex items-center justify-center w-full py-3 px-4 rounded-xl font-heading text-xs font-bold uppercase tracking-[0.06em] btn-motion min-h-[44px] text-center leading-normal focus-visible:ring-2 focus-visible:ring-primary-container ${
                pkg.isFeatured
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)]'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-primary-container hover:text-on-primary-container text-on-surface border border-black/10 dark:border-white/10 hover:border-transparent'
              }`}
            >
              <span>{pkg.ctaText}</span>
              <Icon name="arrow_forward" size={14} className="ml-1.5 shrink-0 btn-icon" />
            </Link>
          </article>
        ))}
      </div>

      {/* 2-Column Secondary Engagement Grid: Monthly Support & Agency Overflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Card A: Monthly SEO Maintenance & Improvement Support */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-primary-container/30 hover:border-primary-container/60 shadow-lg relative flex flex-col justify-between motion-reveal">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container">
                Ongoing Monthly Care
              </span>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-emerald-500">
                Post-Audit Retainer
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-1">
              SEO Maintenance &amp; Improvement Support
            </h3>
            <div className="mb-3">
              <span className="font-heading text-2xl font-extrabold text-primary-container">
                from ₱8,000 PHP / month
              </span>
              <span className="text-xs font-sans text-on-surface/60 block mt-0.5">
                approx. $145 USD / mo • Limited to up to 8 hours/month
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed mb-4">
              <strong className="text-on-surface font-semibold">Best For: </strong>
              Small businesses that have completed an initial SEO setup or audit and want steady, proactive maintenance and technical care without full-time agency overhead.
            </p>

            <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-4 text-[11px] font-sans text-on-surface/80">
              <strong className="font-heading font-bold text-primary-container uppercase text-[10px] tracking-wider block mb-0.5">
                Requirement &amp; Scope:
              </strong>
              <span>Offered after an initial Website Health Check or Sprint • Capped at 8 hours/month</span>
            </div>

            <div className="space-y-2 pt-3 border-t border-black/10 dark:border-white/10 mb-4">
              <span className="font-heading text-[11px] text-primary-container uppercase tracking-wider block font-semibold">
                What&apos;s Included Each Month:
              </span>
              <ul className="space-y-2 font-sans text-xs text-on-surface/85">
                {[
                  'Up to 8 hours/month dedicated execution capacity',
                  'Monthly Search Console indexation & crawl health monitoring',
                  'Local search signal checks & Google Business Profile updates',
                  'Transparent activity log with verified before/after proof',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icon name="check_circle" size={14} className="text-primary-container shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-black/5 dark:border-white/5 mb-6 text-[11px] font-sans text-on-surface/65">
              <strong className="text-on-surface/80 font-medium">Excludes: </strong>
              Large-scale website rebuilds or aggressive third-party link building campaigns.
            </div>
          </div>

          <Link
            href="/contact/?service=Ongoing%20Monthly%20SEO%20Support"
            className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl font-heading text-xs font-bold uppercase tracking-[0.06em] bg-surface-2 hover:bg-primary-container hover:text-on-primary-container text-on-surface border border-black/10 dark:border-white/10 hover:border-transparent transition-all min-h-[46px]"
          >
            <span>Inquire for Monthly Support</span>
            <Icon name="arrow_forward" size={14} className="ml-1.5 shrink-0 btn-icon" />
          </Link>
        </div>

        {/* Card B: Agency Overflow Support & Custom Web Development */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Agency Overflow Block */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-emerald-500/30 hover:border-emerald-500/60 shadow-lg relative motion-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-heading text-[10px] font-bold uppercase tracking-wider mb-2">
              <Icon name="group" size={13} />
              <span>Agency &amp; Dev Team Capacity</span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-1">
              Agency Overflow Support
            </h3>
            <div className="mb-2">
              <span className="font-heading text-xl font-extrabold text-emerald-500 block">
                ₱500 / hour • ₱4,500 per 10-hour block
              </span>
              <span className="text-[11px] font-sans text-on-surface/60">
                approx. $80 USD per 10 hours • Discrete task execution
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface/75 leading-relaxed mb-4">
              Need extra hands for discrete technical audits, schema markup implementation, WordPress fixes, or on-page tickets? Book flexible 10-hour sprint blocks with clear task logs.
            </p>
            <Link
              href="/contact/?service=Overflow%20Task%20/%20Backlog%20Support"
              className="inline-flex items-center gap-2 font-heading text-xs font-bold text-emerald-500 hover:text-emerald-400 uppercase tracking-wider"
            >
              <span>Discuss Agency Overflow Support</span>
              <Icon name="arrow_forward" size={13} />
            </Link>
          </div>

          {/* Custom Web Development Block */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-sky-500/30 hover:border-sky-500/60 shadow-lg relative motion-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-heading text-[10px] font-bold uppercase tracking-wider mb-2">
              <Icon name="code" size={13} />
              <span>Custom Web Engineering</span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-1">
              Custom WordPress &amp; Next.js 15 Builds
            </h3>
            <div className="mb-2">
              <span className="font-heading text-xl font-extrabold text-sky-400 block">
                Request a Scoped Quote
              </span>
              <span className="text-[11px] font-sans text-on-surface/60">
                Bespoke themes &amp; code-first web apps • Quoted per project
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface/75 leading-relaxed mb-4">
              High-performance, semantic web builds engineered for sub-second LCP, zero CLS, and built-in search architecture. Quoted accurately based on design and page requirements.
            </p>
            <Link
              href="/contact/?service=React%20%26%20WordPress%20Web%20Development"
              className="inline-flex items-center gap-2 font-heading text-xs font-bold text-sky-400 hover:text-sky-300 uppercase tracking-wider"
            >
              <span>Request a Scoped Web Quote</span>
              <Icon name="arrow_forward" size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesPackages
