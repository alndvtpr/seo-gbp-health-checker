'use client'

import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function TrustCommitment() {
  return (
    <section
      id="trust-commitment"
      aria-labelledby="trust-commitment-heading"
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Honest Trust &amp; Operating Standards
        </span>
        <h2
          id="trust-commitment-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight"
        >
          Practical Work, Clear Scope &amp; No Fluff
        </h2>
        <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
          I provide hands-on technical SEO, local search setup, and website support. Here is a clear, transparent breakdown of how I work and what you can expect.
        </p>
      </div>

      {/* 2-Column Grid: What You Can Expect vs. What I Do Not Promise */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-12">
        {/* Column 1: What You Can Expect (Emerald / Positive) */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-lg motion-reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-heading font-semibold uppercase tracking-[0.08em] mb-4">
              <Icon name="check_circle" size={14} />
              <span>What You Can Expect</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-4">
              Structured Deliverables &amp; Direct Execution
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-on-surface/85">
              <div className="flex items-start gap-3">
                <Icon name="check_circle" size={18} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    Clearly Defined Scope
                  </strong>
                  <span>
                    Exact task milestones, page counts, and issue caps defined and agreed upon before work begins.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="check_circle" size={18} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    Direct Communication
                  </strong>
                  <span>
                    Work directly with Alain. No agency middlemen, account managers, or delayed handoffs.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="check_circle" size={18} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    Clean Handoff Documentation
                  </strong>
                  <span>
                    Clear task logs, before-and-after test proofs, and straightforward guidance for your team.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="check_circle" size={18} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    Honest Technical Reporting
                  </strong>
                  <span>
                    Real diagnostics from Google Search Console, Lighthouse, and Screaming Frog without inflated metrics.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: What I Do Not Promise (Amber / Boundaries) */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-amber-500/30 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-lg motion-reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-heading font-semibold uppercase tracking-[0.08em] mb-4">
              <Icon name="verified_user" size={14} />
              <span>What I Do Not Promise</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-4">
              No Fabricated Guarantees or Buzzwords
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-on-surface/85">
              <div className="flex items-start gap-3">
                <Icon name="close" size={18} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    No Guaranteed #1 Rankings
                  </strong>
                  <span>
                    Search engine algorithms and competitor moves cannot be ethically guaranteed by anyone.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="close" size={18} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    No Overnight / Instant Traffic Spikes
                  </strong>
                  <span>
                    Organic search optimization takes methodical crawling, indexing, and steady relevance building.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="close" size={18} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    No Guaranteed AI Citations
                  </strong>
                  <span>
                    LLM search platforms synthesize dynamically. I optimize technical schema and entity clarity without false claims.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="close" size={18} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface font-semibold block text-sm mb-0.5">
                    No Proprietary &lsquo;Secret Formulas&rsquo;
                  </strong>
                  <span>
                    All work follows documented Google Search Central guidelines, clean code, and open web standards.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof Labels Legend & Verified Credentials Bar */}
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 motion-reveal">
        <div className="space-y-2 max-w-xl">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold block">
            Proof Classification Standard
          </span>
          <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
            All work across this site is labeled by its true origin: <strong className="text-on-surface">Self-initiated build</strong>, <strong className="text-on-surface">Ongoing build</strong>, or <strong className="text-on-surface">Training contribution</strong>. No fabricated client reviews or stars.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://www.sova.ph/search-engine-optimization-bootcamp-graduates/search-engine-optimization-graduates-batch-32/#:~:text=Alain%20Dave%20Tapiru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary-container/20 border border-primary-container/30 text-xs font-heading font-bold text-on-surface hover:text-primary-container transition-all"
          >
            <Icon name="school" size={14} className="text-primary-container" />
            <span>Verify SOVA Batch 32</span>
            <Icon name="north_east" size={12} />
          </a>

          <Link
            href="/about/#credentials"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container/10 hover:bg-primary-container/20 border border-primary-container/40 text-xs font-heading font-bold text-primary-container transition-all"
          >
            <span>View All Credentials</span>
            <Icon name="arrow_forward" size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TrustCommitment
