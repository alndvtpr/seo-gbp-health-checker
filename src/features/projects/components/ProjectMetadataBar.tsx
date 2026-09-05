import React from 'react'
import type { Project } from '../data/projects'

export function ProjectMetadataBar({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 shadow-sm motion-reveal">
      <div>
        <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block mb-1 font-semibold">
          Proof Classification
        </span>
        <span className="font-heading text-xs sm:text-sm font-bold text-primary-container">
          {project.proofLabel}
        </span>
      </div>
      <div>
        <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block mb-1 font-semibold">
          Role
        </span>
        <span className="font-heading text-xs sm:text-sm font-bold text-on-surface">
          {project.role}
        </span>
      </div>
      <div>
        <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block mb-1 font-semibold">
          Status
        </span>
        <span className="font-heading text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400">
          {project.status === 'Ongoing' ? 'Active Staging Build' : 'Production'}
        </span>
      </div>
      <div>
        <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block mb-1 font-semibold">
          Category
        </span>
        <span className="font-heading text-xs sm:text-sm font-bold text-on-surface">
          {project.category}
        </span>
      </div>
    </div>
  )
}
