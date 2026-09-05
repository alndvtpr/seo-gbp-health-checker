import React from 'react'
import type { ServiceProblem } from '../types'

export interface ServiceProblemsSolvedProps {
  id: string
  headingId?: string
  eyebrow: string
  title: string
  description: string
  problems: ServiceProblem[]
}

export function ServiceProblemsSolved({
  id,
  headingId = 'problems-heading',
  eyebrow,
  title,
  description,
  problems,
}: ServiceProblemsSolvedProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((item, idx) => (
          <div
            key={item.title}
            style={{ transitionDelay: `${idx * 80}ms` }}
            className="p-6 sm:p-8 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal"
          >
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-3">
                {item.title}
              </h3>
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                <strong className="font-semibold block mb-0.5">The Bottleneck:</strong>
                {item.problem}
              </div>
              <p className="font-sans text-xs sm:text-sm text-on-surface/85 leading-relaxed">
                <strong className="font-semibold text-primary-container block mb-0.5">The Fix:</strong>
                {item.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
