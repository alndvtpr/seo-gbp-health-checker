import React from 'react'
import type { ProjectPillar } from '../data/projects'

export function ProjectPillars({ pillars }: { pillars?: ProjectPillar[] }) {
  if (!pillars || pillars.length === 0) return null

  return (
    <section className="space-y-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
        Strategic Framework
      </span>
      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
        The 3-Pillar Methodology
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-surface-2/60 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-heading text-base font-bold text-on-surface tracking-wider">
                {pillar.name}
              </span>
              <span className="font-heading text-xs font-bold text-primary-container">
                Pillar 0{idx + 1}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed">
              {pillar.meaning}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
