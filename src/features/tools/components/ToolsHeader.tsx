import React from 'react'

export function ToolsHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto motion-reveal">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
        Free Resources &amp; Tools
      </span>
      <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-[-0.025em]">
        Free SEO Tools &amp; Practical Web Utilities
      </h1>
      <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
        Interactive diagnostic and estimation tools designed for website owners, teams, and SEO practitioners. All diagnostics provide practical heuristic evaluations based on public web signals without algorithmic ranking guarantees.
      </p>
    </div>
  )
}
