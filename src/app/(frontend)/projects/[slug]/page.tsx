import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/icons'
import { generateMetadata as buildSeoMetadata } from '@/lib/seo'
import { getProjectBySlug, PROJECTS } from '@/data/projects'
import { Breadcrumbs } from '@/components/Breadcrumbs'

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
      description: 'The requested project case study could not be found.',
      url: `https://alaintapiru.com/projects/${resolvedParams.slug}/`,
    })
  }

  return buildSeoMetadata({
    title: `${project.title} — ${project.category} Project | Alain Dave Tapiru`,
    description: project.shortDescription,
    url: `https://alaintapiru.com/projects/${project.slug}/`,
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
    '@type': 'Article',
    headline: `${project.title} — ${project.category} Case Study`,
    description: project.shortDescription,
    image: `https://alaintapiru.com${project.image}`,
    author: {
      '@type': 'Person',
      name: 'Alain Dave G. Tapiru',
      url: 'https://alaintapiru.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Alain Dave G. Tapiru',
      url: 'https://alaintapiru.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://alaintapiru.com/projects/${project.slug}/`,
    },
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
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {project.status === 'Ongoing' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Ongoing Build
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Live Project
            </span>
          )}
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest font-bold">
            {project.category}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface">
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
      <div className="relative w-full h-[240px] sm:h-[400px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/60">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain object-center"
        />
      </div>

      {/* Metadata Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-[#181a1b]/80 border border-white/10">
        <div>
          <span className="font-heading text-[10px] text-on-surface/50 uppercase tracking-widest block mb-1">
            Project / Entity
          </span>
          <span className="font-heading text-xs sm:text-sm font-bold text-on-surface">
            {project.title}
          </span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/50 uppercase tracking-widest block mb-1">
            Role
          </span>
          <span className="font-heading text-xs sm:text-sm font-bold text-on-surface">
            {project.role}
          </span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/50 uppercase tracking-widest block mb-1">
            Status
          </span>
          <span className="font-heading text-xs sm:text-sm font-bold text-amber-400">
            {project.status === 'Ongoing' ? 'Active Staging Build' : 'Production'}
          </span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/50 uppercase tracking-widest block mb-1">
            Primary Stack
          </span>
          <span className="font-heading text-xs sm:text-sm font-bold text-primary-container">
            {project.category}
          </span>
        </div>
      </div>

      {/* Detailed Content Sections */}
      <div className="space-y-8 sm:space-y-12 font-sans text-on-surface/80 text-xs sm:text-sm leading-relaxed">
        {/* Section 1: Overview & Architecture */}
        <section className="space-y-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/60 border border-white/5">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
            01. Structural Overview
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
            Platform Purpose &amp; Architecture
          </h2>
          <p className="leading-relaxed">{project.fullDescription}</p>
        </section>

        {/* Section 2: 3-Pillar Methodology */}
        {project.pillars && project.pillars.length > 0 && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/60 border border-white/5">
            <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
              02. Core Methodology
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              The 3-Pillar Strategic Framework
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading text-base font-black text-on-surface tracking-wider">
                      {pillar.name}
                    </span>
                    <span className="font-heading text-xs font-bold text-primary-container">
                      Pillar 0{idx + 1}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                    {pillar.meaning}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Core Service Offerings */}
        {project.coreServices && project.coreServices.length > 0 && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/60 border border-white/5">
            <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
              03. Core Capabilities
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              Structured Service Offerings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {project.coreServices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <Icon name="check_circle" size={16} className="text-primary-container shrink-0" />
                  <span className="font-sans text-xs font-medium text-on-surface">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Technology Stack */}
        <section className="space-y-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/60 border border-white/5">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
            04. Development Stack
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
            Technologies Applied
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-heading font-medium text-on-surface"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Section 5: Image Showcase / Gallery */}
        {project.gallery && project.gallery.length > 1 && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/60 border border-white/5">
            <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
              05. Visual Gallery
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              Staging &amp; Design Captures
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-60 sm:h-72 rounded-xl overflow-hidden border border-white/10 bg-black/40"
                >
                  <Image
                    src={img}
                    alt={`${project.title} Preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Semantic Cross-Linking: Related Case Studies & Interactive Tools */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-1 font-bold">
              Explore More Work
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              Related Case Studies &amp; Tools
            </h2>
          </div>
          <Link
            href="/projects/"
            className="font-heading text-xs uppercase tracking-wider font-bold text-primary-container hover:underline inline-flex items-center gap-1"
          >
            All Case Studies <Icon name="arrow_forward" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PROJECTS.filter((p) => p.slug !== project.slug).map((rel) => (
            <Link
              key={rel.slug}
              href={`/projects/${rel.slug}/`}
              className="p-5 rounded-2xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="font-heading text-[10px] text-primary-container uppercase tracking-widest block mb-1 font-bold">
                  {rel.category}
                </span>
                <h3 className="font-heading text-base font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                  {rel.title}
                </h3>
                <p className="font-sans text-xs text-on-surface/70 leading-relaxed line-clamp-2">
                  {rel.shortDescription}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-heading font-bold text-primary-container">
                <span>View Case Study</span>
                <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
          {/* Interactive Tool Card */}
          <Link
            href="/tools/"
            className="p-5 rounded-2xl bg-gradient-to-br from-primary-container/15 via-[#181a1b] to-[#181a1b] border border-primary-container/30 hover:border-primary-container transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <span className="font-heading text-[10px] text-emerald-400 uppercase tracking-widest block mb-1 font-bold">
                Live Diagnostic Suite
              </span>
              <h3 className="font-heading text-base font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                Local SEO &amp; GBP Health Checker
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed line-clamp-2">
                Run an instant AI-powered audit on your Google Business Profile and local search signals.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-heading font-bold text-primary-container">
              <span>Launch Diagnostic Tool</span>
              <Icon name="north_east" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#181a1b]/80 border border-primary-container/30 shadow-[0_0_40px_rgba(230,126,34,0.15)] text-center space-y-6">
        <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-on-surface">
          Explore the Live {project.title} Build
        </h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface/70 max-w-xl mx-auto leading-relaxed">
          Inspect the live site, responsive layouts, technical markup, and SEO-first hierarchy.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={project.liveUrl}
            target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
            rel={
              project.liveUrl.startsWith('http')
                ? 'noopener noreferrer'
                : undefined
            }
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.4)] hover:bg-primary hover:scale-105 transition-all cursor-pointer"
          >
            <span>{project.ctaText || 'View Live Build'}</span>
            <Icon name="north_east" size={16} />
          </a>

          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-on-surface font-heading text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all"
          >
            <span>Discuss A Project</span>
            <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
