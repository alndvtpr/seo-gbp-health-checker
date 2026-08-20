import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

interface PackageTier {
  id: string
  name: string
  cadence: string
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
    cadence: 'One-Time Project',
    badge: 'Audit & Roadmap',
    targetAudience: 'Existing sites needing technical fixes and AI-search modernization.',
    includes: [
      'Full Technical Audit',
      'Schema Architecture',
      'AEO/GEO Gap Analysis',
      'Keyword Strategy',
      'Prioritized Fix Roadmap + Video Walkthrough',
    ],
    ctaText: 'Book a Readiness Sprint',
  },
  {
    id: 'tier-2-launch',
    name: 'High-Performance Website + SEO Launch',
    cadence: 'Build & Launch',
    badge: 'Recommended',
    popularBadge: 'Most Popular',
    isFeatured: true,
    targetAudience: 'Businesses rebranding or building a new high-converting site.',
    includes: [
      'Custom Static or WordPress Site',
      'Built-in Technical SEO & Schema',
      'GA4/GSC Setup',
      'On-Page Content Optimization',
      'Speed Optimization Guarantee',
    ],
    ctaText: 'Start Your Website Project',
  },
  {
    id: 'tier-3-retainer',
    name: 'Total Search Growth Retainer',
    cadence: 'Ongoing Monthly',
    badge: 'Scale & Dominate',
    targetAudience: 'Established brands wanting sustained Google + AI engine dominance.',
    includes: [
      'Continuous On-Page & Content Sprints',
      'AEO/GEO Optimization',
      'Link Acquisition',
      'Live Looker Studio Dashboard',
      'Monthly Strategy Calls',
    ],
    ctaText: 'Apply for Monthly Retainer',
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
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          ENGAGEMENT MODELS
        </span>
        <h2
          id="packages-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          Choose Your Path to Search Dominance
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Transparent, ROI-focused packaging engineered for high-impact audits, complete web launches, or continuous organic scaling.
        </p>
      </div>

      {/* 3-Tier Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-6">
        {PACKAGES.map((pkg) => (
          <article
            key={pkg.id}
            className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-all duration-300 relative ${
              pkg.isFeatured
                ? 'bg-gradient-to-b from-primary-container/20 via-[#1a1c1d] to-[#141617] border-2 border-primary-container shadow-[0_0_40px_rgba(224,123,32,0.25)] lg:-translate-y-2 z-10 pt-10 sm:pt-12'
                : 'bg-surface-1/90 border border-white/10 hover:border-primary-container/40'
            }`}
          >
            {/* Floating Featured Badge */}
            {pkg.isFeatured && pkg.popularBadge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary-container text-on-primary-container font-heading text-xs font-extrabold uppercase tracking-[0.06em] shadow-md whitespace-nowrap">
                  <Icon name="auto_awesome" size={13} />
                  {pkg.popularBadge}
                </span>
              </div>
            )}

            <div>
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-on-surface/70">
                  {pkg.cadence}
                </span>
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-primary-container">
                  {pkg.badge}
                </span>
              </div>

              {/* Package Title */}
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 leading-snug">
                {pkg.name}
              </h3>

              {/* Target Audience Description */}
              <p className="font-sans text-sm text-on-surface/75 leading-relaxed mb-6 sm:mb-8 min-h-[44px]">
                <strong className="text-on-surface font-semibold">Best For: </strong>
                {pkg.targetAudience}
              </p>

              {/* Deliverables / Includes List */}
              <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                <span className="font-heading text-xs text-primary-container uppercase tracking-wider block font-semibold">
                  What&apos;s Included:
                </span>
                <ul className="space-y-3 font-sans text-sm text-on-surface/85">
                  {pkg.includes.map((item) => (
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

            {/* Action CTA Button */}
            <Link
              href="/contact/"
              aria-label={`${pkg.ctaText} - ${pkg.name}`}
              className={`inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] transition-all min-h-[48px] text-center leading-normal ${
                pkg.isFeatured
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/5 hover:bg-primary-container hover:text-on-primary-container text-on-surface border border-white/10 hover:border-transparent hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <span>{pkg.ctaText}</span>
              <Icon name="arrow_forward" size={15} className="ml-2 shrink-0" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesPackages
