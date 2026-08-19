import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const TRUST_POINTS = [
  'Google & AI-Engine Optimized',
  'Core Web Vitals Ready (<1s Load)',
  'Zero Vanity Metrics / Pure ROI',
] as const

export function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative z-20 pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
    >
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Services', url: '/services/' }]} align="center" className="mb-6" />

      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-wider mb-6">
        <Icon name="auto_awesome" size={14} className="text-primary-container" />
        <span>SEARCH ENGINE OPTIMIZATION • AEO &amp; GEO • WEB DEVELOPMENT</span>
      </div>

      {/* Headline (H1) */}
      <h1
        id="services-hero-heading"
        className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6"
      >
        Get Found on Google, Bing, and AI Search Engines.
      </h1>

      {/* Subheadline */}
      <p className="font-sans text-on-surface/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10">
        I build lightning-fast websites and deploy modern SEO, AEO, and GEO strategies that capture top search rankings, trigger AI citations, and turn organic traffic into paying clients.
      </p>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto">
        <Link
          href="/contact/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.4)] hover:shadow-[0_0_35px_rgba(230,126,34,0.6)] hover:scale-105 active:scale-95 transition-all min-h-[48px]"
        >
          Book a Free Strategy Call
          <Icon name="arrow_forward" size={16} />
        </Link>

        <a
          href="#packages"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all min-h-[48px]"
        >
          View Service Packages ↓
        </a>
      </div>

      {/* 3-Item Trust Bar */}
      <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {TRUST_POINTS.map((point) => (
          <div
            key={point}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-on-surface/90 font-sans text-xs sm:text-sm font-medium"
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
