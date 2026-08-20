import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function ServicesPillars3And4() {
  return (
    <section
      id="pillar-execution"
      aria-labelledby="pillar-3-4-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
    >
      {/* Section Header */}
      <div className="max-w-3xl">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          PILLAR 03 &amp; 04: EXECUTION &amp; MEASUREMENT
        </span>
        <h2
          id="pillar-3-4-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          High-Performance Builds &amp; Transparent Data
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Clean Next.js architectures, custom WordPress themes, and high-impact authority building. Browse all live implementations in our{' '}
          <Link href="/projects/" className="text-primary-container font-semibold hover:underline">
            Featured Projects Directory
          </Link>.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Block A: Web Development (7 cols on lg) */}
        <article className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center group-hover:scale-105 transition-all">
                <Icon name="code_blocks" size={26} className="text-primary-container" />
              </div>
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Pillar 03 • Web Dev
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
              Static &amp; WordPress Web Design &amp; Development
            </h3>

            <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                Highlights
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-sm text-on-surface/85">
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>Lightweight WordPress themes (no bloat)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>Ultra-fast static builds</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>SEO-first semantic code</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>100% mobile-first design</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/contact/"
            aria-label="Build a high-performance website"
            className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-white/5 hover:bg-primary-container hover:text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-on-surface border border-white/10 hover:border-transparent transition-all min-h-[46px] group-hover:bg-primary-container group-hover:text-on-primary-container focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Start Web Build Project</span>
            <Icon name="arrow_forward" size={14} className="ml-2" />
          </Link>
        </article>

        {/* Block B: Authority Link Building (5 cols on lg) */}
        <article className="lg:col-span-5 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center group-hover:scale-105 transition-all">
                <Icon name="hub" size={26} className="text-primary-container" />
              </div>
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Pillar 03 • Authority
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
              Off-Page SEO &amp; Authority Link Building
            </h3>

            <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                Highlights
              </span>
              <ul className="space-y-2.5 font-sans text-sm text-on-surface/85">
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>Toxic link cleanup</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>High-quality contextual outreach</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>NAP/local citations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                  <span>Unlinked brand mention reclamation</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/contact/"
            aria-label="Build search authority and backlinks"
            className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-white/5 hover:bg-primary-container hover:text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-on-surface border border-white/10 hover:border-transparent transition-all min-h-[46px] group-hover:bg-primary-container group-hover:text-on-primary-container focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Scale Backlink Authority</span>
            <Icon name="arrow_forward" size={14} className="ml-2" />
          </Link>
        </article>

        {/* Block C: Analytics & Reporting (Full 12 cols on lg) */}
        <article className="md:col-span-2 lg:col-span-12 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/10 via-surface-1 to-surface-1 border border-white/10 hover:border-primary-container/40 transition-all duration-300 group flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-lg">
          <div className="lg:max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center group-hover:scale-105 transition-all">
                <Icon name="monitoring" size={26} className="text-primary-container" />
              </div>
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Pillar 04 • Analytics
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
              SEO Analytics, Benchmarking &amp; Custom Reporting
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-sans text-sm text-on-surface/85 pt-4 border-t border-white/10">
              <li className="flex items-start gap-2.5">
                <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                <span>Custom GA4 &amp; GSC conversion tracking</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                <span>24/7 interactive Looker Studio dashboard</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                <span>Monthly executive video walkthroughs</span>
              </li>
            </ul>
          </div>

          <div className="shrink-0 lg:w-72">
            <Link
              href="/contact/"
              aria-label="Set up custom SEO analytics and dashboards"
              className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] shadow-[0_0_20px_rgba(224,123,32,0.35)] hover:shadow-[0_0_30px_rgba(224,123,32,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Setup Analytics Dashboard</span>
              <Icon name="arrow_forward" size={14} className="ml-2" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ServicesPillars3And4
