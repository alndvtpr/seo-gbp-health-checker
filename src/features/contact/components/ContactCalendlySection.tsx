import React from 'react'
import { CalendlyScheduler } from '@/components/CalendlyScheduler'

export function ContactCalendlySection() {
  return (
    <section className="space-y-6 motion-reveal">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          PREFER TO TALK IT THROUGH?
        </span>
        <h2 className="font-heading text-xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Book a 20-Minute Call
        </h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed max-w-xl mx-auto">
          Pick a time that works for you. I can talk through your website, SEO priorities, or project requirements with you and help identify the most practical next step.
        </p>
      </div>

      <CalendlyScheduler />
    </section>
  )
}
