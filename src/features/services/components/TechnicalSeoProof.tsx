import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { TECH_STACK_TOOLS } from '../data/technicalSeoData'

export function TechnicalSeoProof() {
  return (
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
              See this technical SEO framework applied on this website: Next.js App Router architecture, August 2026 PageSpeed lab screenshots recording 99 Desktop / 96 Mobile, sub-1.2s LCP and 0.000 CLS, plus connected Schema.org entity graphs. These are dated simulated results, not field Core Web Vitals.
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
  )
}
