import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import type { Project } from '../data/projects'

export function ProjectContextualCta({ project }: { project: Project }) {
  return (
    <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-primary-container/30 shadow-[0_0_40px_rgba(224,123,32,0.15)] text-center space-y-6 motion-reveal">
      <div className="space-y-2">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold block">
          {project.slug === 'alaintapiru-portfolio'
            ? '⚡ High-Performance Web'
            : project.slug === 'local-seo-gbp-checker'
            ? '🔍 Local Search Diagnostic'
            : '🚀 Custom Web Architecture'}
        </span>
        <h2 className="font-heading text-xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Interested in Work Like {project.title}?
        </h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface/70 max-w-xl mx-auto leading-relaxed">
          {project.slug === 'alaintapiru-portfolio'
            ? 'Build with clean semantic HTML, reserved layout space, and performance checks across lab and real-user measurement paths.'
            : project.slug === 'local-seo-gbp-checker'
            ? 'Diagnose ranking signals, optimize Google Business Profile categories, and improve local search visibility.'
            : 'From custom WordPress development to technical SEO implementations, let’s build search-ready digital foundations.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={project.liveUrl}
          target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
          rel={
            project.rel ||
            (project.liveUrl.startsWith('http')
              ? 'noopener noreferrer'
              : undefined)
          }
          aria-label={`Open ${project.title} external live build (opens in new tab)`}
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.35)] hover:bg-primary btn-motion cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <span>{project.ctaText || 'View Live Build'}</span>
          <Icon name="north_east" size={16} className="btn-icon" />
        </a>

        {project.slug === 'alaintapiru-portfolio' ? (
          <Link
            href="/contact/?service=Custom+Next.js+%26+React+Architecture+%28%E2%82%B148%2C000+%2F+%24850%29"
            className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-1 border border-black/15 dark:border-white/20 text-on-surface font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Custom Next.js &amp; React (From ₱48,000 / $850)</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>
        ) : project.slug === 'local-seo-gbp-checker' ? (
          <Link
            href="/contact/?service=SEO+%26+AI+Readiness+Sprint+%28%E2%82%B115%2C500+%2F+%24280%29"
            className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-1 border border-black/15 dark:border-white/20 text-on-surface font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>SEO &amp; AI Readiness Sprint (From ₱15,500 / $280)</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>
        ) : (
          <Link
            href="/contact/?service=WordPress+High-Speed+Business+Site+%28%E2%82%B127%2C000+%2F+%24480%29"
            className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-1 border border-black/15 dark:border-white/20 text-on-surface font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>WordPress Business Site (From ₱27,000 / $480)</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>
        )}

        <Link
          href="/contact/"
          className="inline-flex items-center gap-2 bg-primary-container/10 hover:bg-primary-container/20 border border-primary-container/30 text-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-6 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <span>Get in Touch</span>
          <Icon name="arrow_forward" size={16} className="btn-icon" />
        </Link>
      </div>
    </div>
  )
}
