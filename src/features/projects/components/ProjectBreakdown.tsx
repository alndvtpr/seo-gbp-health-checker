import React from 'react'
import { Icon } from '@/components/icons'
import type { Project } from '../data/projects'

export function ProjectBreakdown({ project }: { project: Project }) {
  return (
    <div className="space-y-8 sm:space-y-12 font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
      {/* 1. Problem & Goal */}
      <section className="space-y-3 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          01. Problem &amp; Project Goal
        </span>
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
          What Was Being Solved
        </h2>
        <p className="leading-relaxed">{project.problemOrGoal}</p>
      </section>

      {/* 2. Alain's Exact Role */}
      <section className="space-y-3 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          02. Alain&apos;s Exact Role &amp; Ownership
        </span>
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
          {project.exactRole}
        </h2>
        <p className="leading-relaxed">{project.fullDescription}</p>
      </section>

      {/* 3. Hands-On Work Completed */}
      {project.workCompleted && project.workCompleted.length > 0 && (
        <section className="space-y-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
            03. Hands-On Work Completed
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Deliverables &amp; Technical Execution
          </h2>
          <ul className="space-y-3 pt-2">
            {project.workCompleted.map((task, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Icon name="check_circle" size={18} className="text-primary-container shrink-0 mt-0.5" />
                <span className="text-on-surface/85 leading-relaxed">{task}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. Tools & Methods Used */}
      <section className="space-y-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          04. Tools &amp; Methods Applied
        </span>
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
          Technology Stack &amp; Workflow Tooling
        </h2>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.methodsAndTools.map((tool, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full bg-surface-2 border border-black/10 dark:border-white/10 text-xs font-heading font-medium text-on-surface"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* 5. Empirical Validation & Benchmarks */}
      <section className="space-y-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-emerald-500/5 border border-emerald-500/25 motion-reveal shadow-sm">
        <span className="font-heading text-xs text-emerald-700 dark:text-emerald-500 font-bold uppercase tracking-[0.08em] block">
          05. Practical Validation &amp; Live Link
        </span>
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
          Empirical Results &amp; Verification
        </h2>
        <p className="leading-relaxed text-on-surface/85">{project.validationNotes}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-1 border border-black/10 dark:border-white/10 space-y-1">
                <span className="font-heading text-xs text-on-surface/70 uppercase tracking-wider block">
                  {m.label}
                </span>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-container">
                  {m.value}
                </p>
                <p className="font-sans text-xs text-on-surface/65 leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
