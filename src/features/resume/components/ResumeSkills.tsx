import React from 'react'
import { Icon } from '@/components/icons'
import { SKILL_CATEGORIES } from '../data/resumeData'

export function ResumeSkills() {
  return (
    <section className="space-y-4 motion-reveal" aria-labelledby="skills-heading">
      <div className="flex items-center gap-2">
        <Icon name="build" size={18} className="text-primary-container" />
        <h2 id="skills-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
          Skills &amp; Tools Matrix
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 space-y-3 shadow-xs hover:border-primary-container/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icon name={cat.icon} size={16} className="text-primary-container" />
              <h3 className="font-heading text-xs font-bold text-primary-container uppercase tracking-[0.06em]">
                {cat.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-sans font-medium bg-surface-2 text-on-surface/85 border border-black/5 dark:border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
