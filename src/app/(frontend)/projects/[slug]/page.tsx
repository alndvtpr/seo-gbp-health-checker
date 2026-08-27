import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/icons'
import { generateMetadata as buildSeoMetadata } from '@/lib/seo'
import { getProjectBySlug, PROJECTS } from '@/data/projects'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PerformanceAuditProof } from '@/components/PerformanceAuditProof'

export async function generateStaticParams() {
  return PROJECTS.map((proj) => ({
    slug: proj.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)

  if (!project) {
    return buildSeoMetadata({
      title: 'Project Not Found | Alain Dave Tapiru',
      description: 'The requested project could not be found.',
      url: `https://www.alaintapiru.com/projects/${resolvedParams.slug}/`,
    })
  }

  return buildSeoMetadata({
    title: `${project.title} | ${project.category} Project Breakdown | Alain Dave Tapiru`,
    description: project.shortDescription,
    url: `https://www.alaintapiru.com/projects/${project.slug}/`,
  })
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://www.alaintapiru.com/projects/${project.slug}/#article`,
        headline: `${project.title}: ${project.category} Project Breakdown`,
        description: project.shortDescription,
        image: `https://www.alaintapiru.com${project.image}`,
        inLanguage: 'en-US',
        author: {
          '@id': 'https://www.alaintapiru.com/#person',
        },
        publisher: {
          '@id': 'https://www.alaintapiru.com/#business',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.alaintapiru.com/projects/${project.slug}/#webpage`,
          url: `https://www.alaintapiru.com/projects/${project.slug}/`,
          isPartOf: {
            '@id': 'https://www.alaintapiru.com/#website',
          },
          breadcrumb: {
            '@id': `https://www.alaintapiru.com/projects/${project.slug}/#breadcrumb`,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://www.alaintapiru.com/projects/${project.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.alaintapiru.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: 'https://www.alaintapiru.com/projects/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `https://www.alaintapiru.com/projects/${project.slug}/`,
          },
        ],
      },
    ],
  }

  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto relative z-20 space-y-10 sm:space-y-16">
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      {/* Breadcrumb Navigation & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Breadcrumbs
          showJsonLd={false}
          items={[
            { name: 'Projects', url: '/projects/' },
            { name: project.title, url: `/projects/${project.slug}/` },
          ]}
        />
        <Link
          href="/projects/"
          className="inline-flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider text-primary-container font-bold hover:underline shrink-0"
        >
          <Icon name="arrow_back" size={16} /> Back to Projects Directory
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 motion-reveal">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-black/5 dark:bg-white/5 text-on-surface border border-black/10 dark:border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
            {project.proofLabel}
          </span>
          {project.status === 'Ongoing' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
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

      {/* Metadata Bar */}
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
          <span className="font-heading text-xs sm:text-sm font-bold text-amber-500 dark:text-amber-400">
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

      {/* 5-Part Structured Breakdown */}
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
          <span className="font-heading text-xs text-emerald-500 font-bold uppercase tracking-[0.08em] block">
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

        {/* PageSpeed Audit Proof Component for alaintapiru-portfolio */}
        {project.slug === 'alaintapiru-portfolio' && (
          <PerformanceAuditProof
            eyebrow="Empirical Validation & Audit Proof"
            title="Google PageSpeed Insights Audit Scores"
            subtitle="Google PageSpeed Insights and Lighthouse lab audit scores (August 2026) for alaintapiru.com across Desktop and Mobile devices, demonstrating sub-second load velocity, 0ms Total Blocking Time in lab testing, and 100/100 SEO health."
          />
        )}

        {/* Methodology Pillars */}
        {project.pillars && project.pillars.length > 0 && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
            <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
              Strategic Framework
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              The 3-Pillar Methodology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.pillars.map((pillar, idx) => (
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
        )}

        {/* Visual Gallery */}
        {project.gallery && project.gallery.length > 1 && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
            <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
              Visual Captures
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Staging &amp; Interface Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-60 sm:h-72 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40"
                >
                  <Image
                    src={img}
                    alt={`${project.title} Preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain bg-black/5 dark:bg-black/60"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Semantic Cross-Linking: Related Case Studies & Interactive Tools */}
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
          {PROJECTS.filter((p) => p.slug !== project.slug).map((rel) => (
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
              <span className="font-heading text-[10px] text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.08em] block mb-1 font-semibold">
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

      {/* Bottom Contextual CTA Banner */}
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
              ? 'Achieve fast loading speeds, clean semantic HTML, and verified 99+ PageSpeed scores on Next.js.'
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
    </div>
  )
}
