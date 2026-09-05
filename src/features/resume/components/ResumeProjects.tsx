import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { SELECTED_PROJECTS } from '../data/resumeData'

export function ResumeProjects() {
  return (
    <section className="space-y-4 motion-reveal" aria-labelledby="projects-heading">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="code" size={18} className="text-primary-container" />
          <h2 id="projects-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
            Selected Projects &amp; Live Implementations
          </h2>
        </div>
        <Link
          href="/projects/"
          className="text-xs font-heading font-bold text-primary-container hover:underline inline-flex items-center gap-1"
        >
          All Case Studies <Icon name="arrow_forward" size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SELECTED_PROJECTS.map((proj) => (
          <div
            key={proj.title}
            className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 space-y-3 flex flex-col justify-between shadow-xs hover:border-primary-container/40 transition-colors group"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-black/5 dark:bg-white/5 text-on-surface/80 border border-black/10 dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  {proj.proofLabel}
                </span>
                {proj.status && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-amber-500/10 text-amber-700 dark:text-amber-500 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {proj.status}
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                {proj.isExternal ? (
                  <Icon name="open_in_new" size={14} className="text-primary-container shrink-0 opacity-70 group-hover:opacity-100" />
                ) : (
                  <Icon name="arrow_forward" size={14} className="text-primary-container shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                )}
              </div>
              <p className="font-heading text-xs font-semibold text-primary-container">
                {proj.tagline}
              </p>
              <p className="font-sans text-xs text-on-surface/75 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-sans px-2 py-0.5 rounded bg-surface-2 text-on-surface/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {proj.isExternal ? (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-[11px] font-bold text-primary-container hover:underline shrink-0"
                >
                  View Project
                </a>
              ) : (
                <Link
                  href={proj.link}
                  className="font-heading text-[11px] font-bold text-primary-container hover:underline shrink-0"
                >
                  Explore
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
