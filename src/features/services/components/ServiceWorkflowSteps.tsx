import React from 'react'
import type { ServiceWorkflowStep } from '../types'

export interface ServiceWorkflowStepsProps {
  id: string
  headingId?: string
  eyebrow: string
  title: string
  description: string
  steps: ServiceWorkflowStep[]
}

export function ServiceWorkflowSteps({
  id,
  headingId = 'process-heading',
  eyebrow,
  title,
  description,
  steps,
}: ServiceWorkflowStepsProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
    >
      <div className="max-w-3xl motion-reveal">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={step.step}
            style={{ transitionDelay: `${idx * 80}ms` }}
            className="p-6 sm:p-7 rounded-2xl bg-surface-1/90 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="font-heading text-2xl sm:text-3xl font-black text-primary-container/90">
                  {step.step}
                </span>
                <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5">
                  Phase 0{idx + 1}
                </span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
