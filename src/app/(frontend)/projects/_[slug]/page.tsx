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
    url: `https://alaintapiru.com/projects/${resolvedParams.slug}`,
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
          href="/projects"
          className="inline-flex items-center gap-1 font-heading text-xs uppercase tracking-wider text-primary-container font-bold hover:underline"
        >
          <Icon name="arrow_back" size={16} /> Back to Case Studies
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
          Case Study Breakdown
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-on-surface capitalize">
          {formattedTitle}
        </h1>
        <p className="font-sans text-on-surface/70 text-base leading-relaxed max-w-3xl">
        </p>
      </div>

      {/* Metadata Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#181a1b]/80 border border-white/10">
        <div>
          <span className="font-heading text-[10px] text-on-surface/50 uppercase tracking-widest block">Client / Project</span>
          <span className="font-heading text-sm font-bold text-on-surface capitalize">{formattedTitle}</span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/50 uppercase tracking-widest block">Role</span>
          <span className="font-heading text-sm font-bold text-on-surface">SEO &amp; Web Architect</span>
        </div>
        <div>
          <span className="font-heading text-sm font-bold text-on-surface"></span>
        </div>
        <div>
          <span className="font-heading text-[10px] text-on-surface/50 uppercase tracking-widest block">Core Tech</span>
          <span className="font-heading text-sm font-bold text-primary-container">Next.js &amp; Ahrefs</span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12 font-sans text-on-surface/80 text-sm leading-relaxed">
        {/* Section 1: The Challenge */}
        <section className="space-y-4 p-8 rounded-3xl bg-[#181a1b]/60 border border-white/5">
          <h2 className="font-heading text-2xl font-bold text-on-surface">1. The Challenge &amp; Objective</h2>
          <p>
          </p>
        </section>

        {/* Section 2: Strategy & Tools */}
        <section className="space-y-4 p-8 rounded-3xl bg-[#181a1b]/60 border border-white/5">
          <h2 className="font-heading text-2xl font-bold text-on-surface">2. Strategy &amp; Tools Applied</h2>
          <p>
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Ahrefs', 'Cloudflare WAF', 'Next.js', 'Google Search Console', 'PageSpeed'].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-heading font-medium text-on-surface">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Section 3: Results & Analytics */}
        <section className="space-y-4 p-8 rounded-3xl bg-[#181a1b]/60 border border-white/5">
          <h2 className="font-heading text-2xl font-bold text-on-surface">3. Key Results &amp; Analytics</h2>
          <p>
          </p>
          {/* Placeholder Graph UI */}
          <div className="h-48 w-full rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-on-surface/40 font-heading text-xs uppercase tracking-widest">
            
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="pt-8 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.4)] hover:scale-105 transition-all"
        >
          Request A Similar SEO Campaign <Icon name="arrow_forward" size={16} />
        </Link>
      </div>
    </div>
  )
}
