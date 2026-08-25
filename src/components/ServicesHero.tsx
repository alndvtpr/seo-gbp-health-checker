import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const TRUST_POINTS = [
  'Search Engine & AI-Ready',
  'Performance-Focused (<1s Load Target)',
  'Practical SEO Measurement',
] as const

export function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative z-20 pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
    >
      {/* Breadcrumb Navigation */}
      <div className="motion-reveal">
        <Breadcrumbs items={[{ name: 'Services', url: '/services/' }]} align="center" className="mb-6" />
      </div>

      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-6 motion-reveal">
        <Icon name="auto_awesome" size={14} className="text-primary-container" />
        <span>SEARCH ENGINE OPTIMIZATION • AEO &amp; GEO • WEB DEVELOPMENT</span>
      </div>

      <h1
        id="services-hero-heading"
        className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-6 motion-reveal"
      >
        <span className="font-extrabold text-on-surface">Professional SEO Services</span>{' '}
        <span className="font-medium text-on-surface/85">&amp; Search-Ready Web Development</span>
      </h1>

      {/* Subheadline */}
      <p className="font-sans text-on-surface/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-normal motion-reveal">
        Explore practical SEO services in the Philippines: technical crawlability, structured schema markup, local search optimization, and high-performance web development.
      </p>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto motion-reveal">
        <Link
          href="/contact/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          Book a Free Discovery Call
          <Icon name="arrow_forward" size={16} className="btn-icon" />
        </Link>

        <a
          href="#service-directory"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          Explore Service Pillars ↓
        </a>
      </div>

      {/* 3-Item Trust Bar */}
      <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {TRUST_POINTS.map((point, idx) => (
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
  )
}

export default ServicesHero
