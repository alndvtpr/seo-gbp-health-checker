import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function LocalSeoProof() {
  return (
    <section
      id="proof-tool"
      aria-labelledby="proof-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
    >
      <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/15 via-surface-1/95 to-surface-1/95 border border-primary-container/35 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-lg motion-reveal">
        <div className="lg:max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-heading text-[11px] font-bold uppercase tracking-[0.06em]">
              <Icon name="auto_awesome" size={13} />
              Self-Initiated Diagnostic Tool
            </span>
            <span className="text-xs font-heading font-bold text-primary-container">
              Interactive Diagnostic Build
            </span>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Local SEO &amp; Google Business Profile Health Checker
          </h3>
          <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed mb-6">
            Try my live Google Business Profile signal checker built with Next.js, Serper Places API, and Google AI Studio. It reviews 10 public profile indicators and prepares a 30-day action plan.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/10 dark:border-white/10 text-center max-w-lg">
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
              <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">10</span>
              <span className="font-sans text-[10px] text-on-surface/70">Signal Vectors</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
              <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">3.2s</span>
              <span className="font-sans text-[10px] text-on-surface/70">Audit Runtime</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
              <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">100pt</span>
              <span className="font-sans text-[10px] text-on-surface/70">Health Scoring</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-3 lg:w-72">
          <Link
            href="/tools/#gbp-checker"
            className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] shadow-[0_0_20px_rgba(224,123,32,0.35)] hover:shadow-[0_0_30px_rgba(224,123,32,0.5)] btn-motion min-h-[46px] text-center"
          >
            <span>Launch Diagnostic Tool</span>
            <Icon name="arrow_forward" size={14} className="ml-2 btn-icon" />
          </Link>

          <Link
            href="/projects/local-seo-gbp-checker/"
            className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary-container/40 bg-black/5 dark:bg-white/5 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] btn-motion min-h-[44px] text-center"
          >
            <span>Read Tool Case Study</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
