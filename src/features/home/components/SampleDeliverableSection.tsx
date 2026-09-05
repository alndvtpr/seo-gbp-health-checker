import React from 'react'
import Link from 'next/link'

export const SampleDeliverableSection = () => {
  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-16">
      <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="motion-reveal">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
            Sample deliverable
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
            What a useful technical finding looks like
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
            This is a real issue found and resolved on AlainTapiru.com during the repository review. It shows the level of context included with a scoped finding.
          </p>
        </div>

        <article className="card-interactive-glow motion-reveal overflow-hidden border border-black/10 bg-surface-1/95 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-5 py-4 dark:border-white/10 sm:px-7">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-surface">
              Internal anchor mismatch
            </span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.06em] text-emerald-700 dark:text-emerald-500">
              Resolved
            </span>
          </div>
          <dl className="divide-y divide-black/10 px-5 dark:divide-white/10 sm:px-7">
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
              <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Issue</dt>
              <dd className="font-sans text-sm leading-relaxed text-on-surface/80">The homepage linked to <code>/services/#estimator</code>, while the actual estimator ID is <code>scope-estimator</code>.</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
              <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Why it matters</dt>
              <dd className="font-sans text-sm leading-relaxed text-on-surface/80">The route loaded, but the visitor did not land on the promised tool, adding friction to the service-evaluation path.</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
              <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Priority</dt>
              <dd className="font-sans text-sm leading-relaxed text-on-surface/80">Medium — the page remained available, but the intended destination failed.</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
              <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Recommended action</dt>
              <dd className="font-sans text-sm leading-relaxed text-on-surface/80">Align the homepage link with the existing section ID instead of renaming the reusable estimator component.</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
              <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Verification</dt>
              <dd className="font-sans text-sm leading-relaxed text-on-surface/80">Confirm the link resolves to <Link href="/services/#scope-estimator" className="font-semibold text-primary-container underline decoration-primary-container/40 underline-offset-4">the live scope estimator</Link> and remains keyboard accessible.</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  )
}
