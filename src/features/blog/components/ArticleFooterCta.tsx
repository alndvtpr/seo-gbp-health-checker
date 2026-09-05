import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function ArticleFooterCta() {
  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-surface-1/95 border border-primary-container/30 space-y-6 text-center shadow-xl motion-reveal">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
        Technical Collaboration
      </span>
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
        Need Practical Help Implementing These Strategies?
      </h2>
      <p className="font-sans text-on-surface/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
        From Core Web Vitals speed tuning to structured data implementation and local SEO diagnostics, let&apos;s build search-ready digital foundations.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
        <Link
          href="/contact/"
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <span>Get in Touch</span>
          <Icon name="arrow_forward" size={16} className="btn-icon" />
        </Link>
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] px-6 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <span>Back to All Articles</span>
        </Link>
      </div>
    </div>
  )
}
