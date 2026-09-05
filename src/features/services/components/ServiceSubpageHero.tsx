import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export interface ServiceSubpageHeroProps {
  breadcrumbName: string
  breadcrumbUrl: string
  badgeIcon: string
  badgeText: string
  headingId: string
  title: React.ReactNode
  description: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  trustPoints: string[]
}

export function ServiceSubpageHero({
  breadcrumbName,
  breadcrumbUrl,
  badgeIcon,
  badgeText,
  headingId,
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  trustPoints,
}: ServiceSubpageHeroProps) {
  const isSecondaryHash = secondaryCtaHref.startsWith('#')

  return (
    <section
      aria-labelledby={headingId}
      className="relative z-20 pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
    >
      {/* Breadcrumbs */}
      <div className="motion-reveal">
        <Breadcrumbs
          items={[
            { name: 'Services', url: '/services/' },
            { name: breadcrumbName, url: breadcrumbUrl },
          ]}
          align="center"
          className="mb-6"
          showJsonLd={false}
        />
      </div>

      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-6 motion-reveal">
        <Icon name={badgeIcon} size={14} className="text-primary-container" />
        <span>{badgeText}</span>
      </div>

      {/* Headline */}
      <h1
        id={headingId}
        className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-6 motion-reveal"
      >
        {title}
      </h1>

      {/* Subhead */}
      <p className="font-sans text-on-surface/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-normal motion-reveal">
        {description}
      </p>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto motion-reveal">
        <Link
          href={primaryCtaHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          {primaryCtaText}
          <Icon name="arrow_forward" size={16} className="btn-icon" />
        </Link>

        {isSecondaryHash ? (
          <a
            href={secondaryCtaHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-black/15 dark:border-white/15 hover:border-primary-container/50 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            {secondaryCtaText}
          </a>
        ) : (
          <Link
            href={secondaryCtaHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-black/15 dark:border-white/15 hover:border-primary-container/50 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            {secondaryCtaText}
          </Link>
        )}
      </div>

      {/* 3-Item Trust Bar */}
      <div className="pt-8 border-t border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {trustPoints.map((point, idx) => (
          <div
            key={point}
            style={{ transitionDelay: `${idx * 60}ms` }}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-on-surface/90 font-sans text-xs sm:text-sm font-medium motion-reveal"
          >
            <Icon name="check_circle" size={18} className="text-primary-container shrink-0" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
