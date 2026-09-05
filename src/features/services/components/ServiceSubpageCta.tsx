import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export interface ServiceSubpageCtaProps {
  id?: string
  headingId?: string
  badgeText: string
  title: string
  description: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export function ServiceSubpageCta({
  id = 'contact-cta',
  headingId = 'final-cta-heading',
  badgeText,
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText = 'Back to Services Hub',
  secondaryCtaHref = '/services/',
}: ServiceSubpageCtaProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto"
    >
      <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-primary-container/20 via-surface-1 to-surface-1 border-2 border-primary-container/40 text-center space-y-6 sm:space-y-8 shadow-[0_0_50px_rgba(224,123,32,0.15)] motion-reveal">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-[0.08em]">
          <Icon name="check_circle" size={14} className="text-primary-container" />
          <span>{badgeText}</span>
        </div>

        <h2
          id={headingId}
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
        >
          {title}
        </h2>

        <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={primaryCtaHref}
            aria-label={primaryCtaText}
            className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>{primaryCtaText}</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          <Link
            href={secondaryCtaHref}
            className="inline-flex items-center justify-center gap-2 border border-black/15 dark:border-white/15 hover:border-primary-container/50 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px]"
          >
            <span>{secondaryCtaText}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
