import React from 'react'
import type { ServiceFaq } from '../types'

export interface ServiceFaqSectionProps {
  id: string
  headingId?: string
  eyebrow: string
  title: string
  description: string
  faqs: ServiceFaq[]
}

export function ServiceFaqSection({
  id,
  headingId = 'faq-heading',
  eyebrow,
  title,
  description,
  faqs,
}: ServiceFaqSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto space-y-8 sm:space-y-12"
    >
      <div className="text-center max-w-3xl mx-auto motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          {eyebrow}
        </span>
        <h2
          id={headingId}
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
        >
          {title}
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            style={{ transitionDelay: `${index * 60}ms` }}
            className="p-5 sm:p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 shadow-sm motion-reveal"
          >
            <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mb-2.5">
              {faq.question}
            </h3>
            <p className="font-sans text-sm sm:text-base text-on-surface/80 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
