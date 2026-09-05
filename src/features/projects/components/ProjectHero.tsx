import React from 'react'
import Image from 'next/image'
import type { Project } from '../data/projects'

export function ProjectHero({ project }: { project: Project }) {
  return (
    <>
      {/* Hero Header */}
      <div className="space-y-4 motion-reveal">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-black/5 dark:bg-white/5 text-on-surface border border-black/10 dark:border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
            {project.proofLabel}
          </span>
          {project.status === 'Ongoing' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Ongoing Staging Build
            </span>
          )}
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold">
            {project.category}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-[-0.025em]">
          {project.title}
        </h1>
        <p className="font-sans text-primary-container text-sm sm:text-base italic font-medium">
          &ldquo;{project.tagline}&rdquo;
        </p>
        <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed max-w-3xl">
          {project.shortDescription}
        </p>
      </div>

      {/* Primary Visual Media Banner */}
      <div className="relative w-full h-[240px] sm:h-[400px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-black/5 dark:bg-black/60 motion-reveal">
        <Image
          src={project.image}
          alt={project.imageAlt || project.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain object-center"
        />
      </div>
    </>
  )
}
