import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { PROJECTS } from '../data/projects'

export function ProjectRelatedSection({ currentSlug }: { currentSlug: string }) {
  return (
    <section className="space-y-6 pt-4 border-t border-black/10 dark:border-white/10 motion-reveal">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
            Explore More Work
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Related Projects &amp; Diagnostic Tools
          </h2>
        </div>
        <Link
          href="/projects/"
          className="font-heading text-xs uppercase tracking-[0.06em] font-bold text-primary-container hover:underline inline-flex items-center gap-1"
        >
          All Projects <Icon name="arrow_forward" size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {PROJECTS.filter((p) => p.slug !== currentSlug).map((rel) => (
          <Link
            key={rel.slug}
            href={`/projects/${rel.slug}/`}
            className="p-5 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
                {rel.category}
              </span>
              <h3 className="font-heading text-base font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                {rel.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed line-clamp-2">
                {rel.shortDescription}
              </p>
            </div>
            <div className="pt-3 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between text-xs font-heading font-bold text-primary-container">
              <span>View 5-Part Breakdown</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
        {/* Interactive Tool Card */}
        <Link
          href="/tools/#gbp-checker"
          className="p-5 rounded-2xl bg-gradient-to-br from-primary-container/15 via-surface-1 to-surface-1 border border-primary-container/30 hover:border-primary-container transition-all duration-300 group flex flex-col justify-between shadow-sm"
        >
          <div>
            <span className="font-heading text-[10px] text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.08em] block mb-1 font-semibold">
              Live Diagnostic Suite
            </span>
            <h3 className="font-heading text-base font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
              Local SEO &amp; GBP Health Checker
            </h3>
            <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed line-clamp-2">
              Run an instant diagnostic on Google Business Profile and local search signals.
            </p>
          </div>
          <div className="pt-3 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between text-xs font-heading font-bold text-primary-container">
            <span>Launch Diagnostic Tool</span>
            <Icon name="north_east" size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  )
}
