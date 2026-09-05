import React from 'react'

export function ContactHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto motion-reveal">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-3 font-semibold">
        LET&apos;S TALK • NO PRESSURE
      </span>
      <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-4 sm:mb-6">
        Tell Me What You&apos;re Working On
      </h1>
      <p className="font-sans text-on-surface/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Need help with SEO, a website issue, or an extra pair of hands for an agency project? Send me the details or book a quick 20-minute call. I&apos;ll take a look at what you&apos;re working on, ask a few questions, and tell you where I can realistically help.
      </p>
    </div>
  )
}
