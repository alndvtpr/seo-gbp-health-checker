import React from 'react'
import { Icon } from '@/components/icons'
import { EXPERIENCES } from '../data/resumeData'

export function ResumeExperience() {
  return (
    <section className="space-y-5 motion-reveal" aria-labelledby="experience-heading">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="work" size={18} className="text-primary-container" />
          <h2 id="experience-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
            Work Experience
          </h2>
        </div>
        <span className="font-heading text-xs text-on-surface/60 font-semibold uppercase tracking-wider hidden sm:inline">
          Digital Marketing, SEO &amp; Support
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l border-primary-container/25 space-y-6 sm:space-y-8 ml-2 sm:ml-3">
        {EXPERIENCES.map((exp, idx) => (
          <div key={`${exp.company}-${idx}`} className="relative group">
            {/* Timeline Indicator Dot */}
            <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-primary-container ring-4 ring-background border border-black/10 dark:border-white/20 transition-transform group-hover:scale-125" />

            <div className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 space-y-3 shadow-xs hover:border-primary-container/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                <div>
                  <h3 className="font-heading text-base font-bold text-on-surface">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="font-sans text-xs sm:text-sm font-semibold text-primary-container">
                      {exp.company}
                    </span>
                    <span className="text-[11px] font-sans px-2 py-0.5 rounded-md bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <span className="font-heading text-xs font-medium text-on-surface/60 whitespace-nowrap self-start sm:self-auto px-2.5 py-0.5 rounded-full bg-surface-2">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                {exp.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-on-surface/80 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
