import React from 'react'
import { Icon } from '@/components/icons'
import { CANONICAL_EDUCATION } from '@/features/credentials'

export function ResumeEducation() {
  return (
    <section className="space-y-4 motion-reveal" aria-labelledby="education-heading">
      <div className="flex items-center gap-2">
        <Icon name="school" size={18} className="text-primary-container" />
        <h2 id="education-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
          Education
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CANONICAL_EDUCATION.map((edu) => (
          <div
            key={edu.id}
            className={`bg-surface-1 rounded-2xl border p-5 space-y-1.5 shadow-xs ${
              edu.id === 'mmdc-bsit'
                ? 'border-cyan-500/20 dark:border-cyan-400/25'
                : 'border-black/10 dark:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  edu.id === 'mmdc-bsit'
                    ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30'
                    : 'bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5'
                }`}
              >
                {edu.resumeBadge}
              </span>
              <span className="text-xs font-sans text-on-surface/60">
                {edu.expectedYear || edu.timeline}
              </span>
            </div>
            <h3 className="font-heading text-sm font-bold text-on-surface pt-1">
              {edu.resumeDegree}
            </h3>
            {edu.resumeSpecialization && (
              <p className="font-sans text-xs text-primary-container font-medium">
                {edu.resumeSpecialization}
              </p>
            )}
            <p className="font-sans text-xs text-on-surface/70">
              {edu.institution}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
