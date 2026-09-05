import React from 'react'
import { RssButton } from '@/components/RssButton'

export function BlogHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 motion-reveal">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
        Insights &amp; Technical Notes
      </span>
      <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-on-surface tracking-[-0.025em]">
        SEO Guides, Experiments &amp; Technical Notes
      </h1>
      <p className="font-sans text-on-surface/80 text-base leading-relaxed max-w-2xl mx-auto">
        Practical technical breakdowns, SEO research notes, and modern web performance experiments.
      </p>
      <div className="flex justify-center items-center pt-2">
        <RssButton variant="button" label="Subscribe via RSS Feed" iconSize={16} />
      </div>
    </div>
  )
}
