import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { generateMetadata as buildSeoMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const title = resolvedParams.slug.replace(/-/g, ' ').toUpperCase()
  return buildSeoMetadata({
    title: `${title} Case Study | Alain Dave Tapiru`,
    description: `Detailed case study breakdown for ${title}.`,
    url: `https://www.alaintapiru.com/projects/${resolvedParams.slug}/`,
  })
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const formattedTitle = resolvedParams.slug.replace(/-/g, ' ')

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-5xl mx-auto relative z-20 space-y-16">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/projects/"
          className="inline-flex items-center gap-1 font-heading text-xs uppercase tracking-[0.06em] text-primary-container font-bold hover:underline"
        >
          <Icon name="arrow_back" size={16} /> Back to Case Studies
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          Case Study Breakdown
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-on-surface capitalize tracking-[-0.025em]">
          {formattedTitle}
        </h1>
        <p className="font-sans text-on-surface/80 text-base leading-relaxed max-w-3xl">
          Detailed technical analysis, keyword indexing trajectory, technical SEO fixes, and modern UI engineering for this platform.
        </p>
      </div>

      {/* Overview Metadata Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-surface-1/90 border border-white/10">
        <div>
          <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block font-semibold">Client / Project</span>
          <span className="font-heading text-sm font-bold text-on-surface capitalize">{formattedTitle}</span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block font-semibold">Role</span>
          <span className="font-heading text-sm font-bold text-on-surface">Lead SEO &amp; Web Architect</span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block font-semibold">Timeline</span>
          <span className="font-heading text-sm font-bold text-amber-400">Active Build</span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/70 uppercase tracking-[0.08em] block font-semibold">Core Tech</span>
          <span className="font-heading text-sm font-bold text-primary-container">Next.js / SEO</span>
        </div>
      </div>

      {/* Case Study Body Content */}
      <div className="space-y-12 font-sans text-on-surface/80 text-base leading-relaxed">
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-on-surface tracking-tight">Executive Summary &amp; Problem Statement</h2>
          <p>
            Every project begins with deep auditing. By examining structural crawl efficiency, entity mapping, and user behavior metrics, we uncover low-hanging fruit and high-impact ranking opportunities that traditional web design agencies routinely overlook.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-on-surface tracking-tight">Architecture &amp; Strategic Execution</h2>
          <p>
            Modern search engine optimization requires tight integration between content design and code delivery. We eliminate layout shift (CLS), ensure instant First Contentful Paint (FCP), and embed rich schema graphs that clarify context to both Google and AI search engines.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <h3 className="font-heading text-base font-bold text-primary-container">Core Web Vitals Optimization</h3>
              <p className="text-sm text-on-surface/70">
                Zero main-thread blocking, optimized next/image assets, and asynchronous resource hydration for sub-second page loads.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <h3 className="font-heading text-base font-bold text-primary-container">Semantic JSON-LD Graphs</h3>
              <p className="text-sm text-on-surface/70">
                Custom schema architectures linking local business profiles, organization entities, and verified service offerings.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery / Mockups Placeholder */}
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-on-surface tracking-tight">Visual Artifacts &amp; Staging Previews</h2>
          <div className="h-48 w-full rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-on-surface/60 font-heading text-xs uppercase tracking-[0.08em]">
            Artifact Previews in Staging
          </div>
        </section>
      </div>

      {/* CTA Footer */}
      <div className="p-12 rounded-3xl bg-surface-1/90 border border-primary-container/30 text-center space-y-6 shadow-[0_0_50px_rgba(230,126,34,0.15)]">
        <h2 className="font-heading text-3xl font-bold text-on-surface tracking-tight">Need Similar Growth Results for Your Platform?</h2>
        <p className="font-sans text-on-surface/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Let&apos;s build a search-ready website or run a full technical SEO audit on your current digital infrastructure.
        </p>
        <Link
          href="/contact/"
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.4)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <span>Request Technical Discovery</span>
          <Icon name="arrow_forward" size={16} className="btn-icon" />
        </Link>
      </div>
    </div>
  )
}
