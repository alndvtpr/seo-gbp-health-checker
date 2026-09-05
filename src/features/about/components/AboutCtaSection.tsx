import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function AboutCtaSection() {
  return (
    <div className="text-center pt-4 sm:pt-8 motion-reveal flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
      <Link
        href="/resume/"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-1/90 hover:bg-surface-2 border border-black/15 dark:border-white/20 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-7 py-3.5 sm:py-4 rounded-full hover:border-primary-container/40 transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
      >
        <Icon name="description" size={16} className="text-primary-container" />
        View Full Resume
      </Link>
      <Link
        href="/contact/"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:bg-primary btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
      >
        Get in Touch <Icon name="arrow_forward" size={16} className="btn-icon" />
      </Link>
    </div>
  )
}
