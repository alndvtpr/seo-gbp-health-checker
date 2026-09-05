import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function BlogToolsCallout() {
  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-surface-1/95 backdrop-blur-md border border-primary-container/30 text-center space-y-6 shadow-xl motion-reveal">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
        Interactive Diagnostic Tool
      </span>
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
        Want to Audit Your Own Local Search Signals?
      </h2>
      <p className="font-sans text-on-surface/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
        Run the free Google Business Profile diagnostic tool to inspect key local ranking signals and generate an actionable 30-day roadmap.
      </p>
      <Link
        href="/tools/"
        className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
      >
        <span>Run Free Profile Audit</span>
        <Icon name="auto_awesome" size={16} className="btn-icon" />
      </Link>
    </div>
  )
}
