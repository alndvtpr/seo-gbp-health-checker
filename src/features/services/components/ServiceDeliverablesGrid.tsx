import React from 'react'
import { Icon } from '@/components/icons'
import type { ServiceDeliverableArea } from '../types'

export interface ServiceDeliverablesGridProps {
  id: string
  headingId?: string
  eyebrow: string
  title: string
  description: string
  deliverablesEyebrow?: string
  deliverables: ServiceDeliverableArea[]
}

export function ServiceDeliverablesGrid({
  id,
  headingId = 'deliverables-heading',
  eyebrow,
  title,
  description,
  deliverablesEyebrow = 'Specific Checks & Deliverables',
  deliverables,
}: ServiceDeliverablesGridProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12 scroll-mt-24"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {deliverables.map((area, idx) => (
          <article
            key={area.id}
            style={{ transitionDelay: `${idx * 80}ms` }}
            className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 group flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/20 transition-colors">
                <Icon name={area.icon} size={26} className="text-primary-container" />
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {area.title}
              </h3>
              <p className="font-sans text-sm text-on-surface/75 leading-relaxed mb-6">
                {area.description}
              </p>

              <div className="space-y-3 pt-5 border-t border-black/10 dark:border-white/10">
                <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                  {deliverablesEyebrow}
                </span>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface/85">
                  {area.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Icon
                        name="check_circle"
                        size={16}
                        className="text-primary-container shrink-0 mt-0.5"
                      />
                      <span className="leading-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
