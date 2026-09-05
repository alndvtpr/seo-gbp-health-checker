import React from 'react'
import { Icon } from '@/components/icons'

export const PersonalFitSection = () => {
  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-16">
      <div className="max-w-3xl motion-reveal">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
          Personal fit
        </span>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
          Focused support for a defined problem or backlog
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
          I work directly with small businesses and delivery teams that need a specific SEO or website task diagnosed, implemented, and handed off without adding an agency layer.
        </p>
      </div>

      <div className="mt-10 grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
        <div className="py-8 md:pr-10">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.08em] text-primary-container">
            Small businesses &amp; founders
          </p>
          <h3 className="mt-3 font-heading text-xl font-bold text-on-surface sm:text-2xl">
            A good fit when one website problem needs a clear starting point
          </h3>
          <ul className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-on-surface/80 sm:text-base">
            <li className="flex gap-3">
              <Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-primary-container" />
              Your site needs a technical or on-page baseline.
            </li>
            <li className="flex gap-3">
              <Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-primary-container" />
              Your local search setup needs a structured review.
            </li>
            <li className="flex gap-3">
              <Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-primary-container" />
              You need a focused WordPress or Next.js fix or build.
            </li>
          </ul>
        </div>

        <div className="border-t border-black/10 py-8 dark:border-white/10 md:border-l md:border-t-0 md:pl-10">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-500">
            Agencies &amp; web teams
          </p>
          <h3 className="mt-3 font-heading text-xl font-bold text-on-surface sm:text-2xl">
            A good fit when the backlog already has a defined owner and outcome
          </h3>
          <ul className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-on-surface/80 sm:text-base">
            <li className="flex gap-3">
              <Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-500" />
              A technical SEO ticket needs implementation capacity.
            </li>
            <li className="flex gap-3">
              <Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-500" />
              Schema or on-page updates need documented delivery.
            </li>
            <li className="flex gap-3">
              <Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-500" />
              A WordPress or Next.js backlog item needs focused support.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
