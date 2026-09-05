import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function WebDevProof() {
  return (
    <section
      id="proof-stack"
      aria-labelledby="proof-stack-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
    >
      <div className="max-w-3xl motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          LIVE TECHNICAL PROOFS
        </span>
        <h2
          id="proof-stack-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight"
        >
          Live Codebases &amp; Real Performance Metrics
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Explore live builds demonstrating fast Core Web Vitals, clean crawlability, and responsive architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Proof Card 1: Next.js Portfolio */}
        <article className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
                Next.js &bull; Self-Initiated Build
              </span>
              <span className="text-xs font-heading font-bold text-primary-container">
                Aug 2026 Lab: 99 Desktop &bull; 0.000 CLS
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-2">
              AlainTapiru.com Custom Next.js Architecture
            </h3>
            <p className="font-sans text-sm text-on-surface/80 leading-relaxed mb-6">
              Engineered with Next.js App Router, React 19 Server Components, Tailwind CSS variables, structured JSON-LD entity graphs, and reserved layout space for key assets.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10 dark:border-white/10 mb-6">
              {['App Router', 'React 19', 'Tailwind CSS', 'Payload CMS', 'Layout Stability'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-mono text-on-surface/75">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects/alaintapiru-portfolio/"
              className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-primary-container hover:underline uppercase tracking-wider"
            >
              Read Case Study <Icon name="arrow_forward" size={14} />
            </Link>
          </div>
        </article>

        {/* Proof Card 2: AngatSikat Studio WordPress Theme */}
        <article className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
                WordPress &bull; Staging Build
              </span>
              <span className="text-xs font-heading font-bold text-primary-container">
                Staging Build &bull; Field Data Unavailable
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-2">
              AngatSikat Studio Custom Theme
            </h3>
            <p className="font-sans text-sm text-on-surface/80 leading-relaxed mb-6">
              Custom PHP WordPress theme developed from scratch without slow page builders, featuring clean semantic markup and fast mobile loading speeds.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10 dark:border-white/10 mb-6">
              {['Custom PHP Theme', 'Semantic HTML5', 'Speed Hardening', 'Schema.org'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-mono text-on-surface/75">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects/angat-sikat-studio/"
              className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-primary-container hover:underline uppercase tracking-wider"
            >
              Read Case Study <Icon name="arrow_forward" size={14} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
