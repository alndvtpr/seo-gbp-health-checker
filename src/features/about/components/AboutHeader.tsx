import React from 'react'

export function AboutHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto motion-reveal">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
        Biography &amp; Professional Background
      </span>
      <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-tight">
        Practical SEO &amp; Website Support for Growing Businesses
      </h1>
      <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
        I help small business owners and digital agency teams fix technical website errors, optimize local search presence, and improve organic crawlability with clear scopes, predictable rates, and direct communication.
      </p>
    </div>
  )
}
