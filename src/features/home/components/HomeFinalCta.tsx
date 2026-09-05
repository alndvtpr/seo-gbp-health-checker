import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export const HomeFinalCta = () => {
  return (
    <section className="relative z-20 mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24 md:px-16">
      <div className="card-interactive-glow motion-reveal border border-primary-container/30 bg-surface-1/95 p-6 sm:p-10 md:p-12">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
          A defined first step
        </span>
        <h2 className="mx-auto mt-2 max-w-3xl font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
          Start with a free Website Health Check
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
          Share the website and concern you want reviewed. The request form captures the context needed to evaluate a useful starting scope.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/tools/#website-audit"
            data-agent-action="request-health-check"
            className="btn-motion flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary-container px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-primary-container shadow-[0_0_25px_rgba(224,123,32,0.25)] hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container sm:w-auto"
          >
            Request a Website Health Check <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>
          <a
            href="mailto:alaintapiru@gmail.com"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-surface-1 px-7 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.06em] text-on-surface hover:border-primary-container/50 hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:border-white/20 sm:w-auto"
          >
            Email Alain directly <Icon name="mail" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
