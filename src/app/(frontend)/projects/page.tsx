import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Projects & Case Studies – Alain Dave Tapiru',
  description:
    'Explore technical SEO case studies, high-speed Next.js web applications, and local search growth campaigns delivered by Alain Dave Tapiru.',
  url: 'https://alaintapiru.com/projects',
})

export const PROJECTS_LIST = [
  {
    slug: 'executive-optical-local-seo',
    title: 'Executive Optical Local SEO & Map Pack Optimization',
    category: 'Local SEO & Strategy',
    metrics: '+340% Organic Traffic | #1 Map Pack',
    description:
      'Engineered a multi-location local search optimization campaign, geotargeted landing pages, and Google Business Profile automated updates.',
    tags: ['Google Business Profile', 'Local Schema', 'Ahrefs', 'GSC'],
  },
  {
    slug: 'claimscale-ai-resume-portfolio',
    title: 'Claimscale.ai Technical Web Architecture',
    category: 'Web Engineering',
    metrics: '99/100 Core Web Vitals | 0.4s LCP',
    description:
      'High-speed Next.js dynamic application featuring serverless edge caching, dynamic import code-splitting, and Schema.org rich results.',
    tags: ['Next.js App Router', 'Tailwind CSS', 'TypeScript', 'Vercel'],
  },
  {
    slug: 'saas-growth-engine-seo',
    title: 'Enterprise B2B SaaS Growth Engine',
    category: 'Technical SEO & Content Strategy',
    metrics: '+180% Qualified Leads | 50+ Top 3 Rankings',
    description:
      'Comprehensive crawl budget auditing, programmatic landing page generation, and technical backlink acquisition.',
    tags: ['Programmatic SEO', 'Screaming Frog', 'Cloudflare WAF'],
  },
]

export default function ProjectsPage() {
  return (
    <main className="relative z-10 flex-grow pt-28 sm:pt-32 md:pt-36 pb-20 px-6 md:px-16 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="max-w-4xl space-y-4">
          <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest block font-semibold">
            Success Stories &amp; Portfolio
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-extrabold leading-tight">
            Featured Projects &amp; Technical SEO Case Studies
          </h1>
          <p className="font-body-lg text-on-surface-variant text-base">
            Demonstrated traffic growth metrics, high-speed web architectures, and local ranking campaigns engineered with technical precision.
          </p>
        </header>

        <div className="space-y-8">
          {PROJECTS_LIST.map((prj) => (
            <div
              key={prj.slug}
              className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-primary-container/40 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
            >
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest px-3 py-1 bg-primary-container/10 border border-primary-container/20 rounded-full">
                    {prj.category}
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant font-semibold">
                    ⚡ {prj.metrics}
                  </span>
                </div>
                <h2 className="font-headline-md text-2xl text-on-surface font-bold group-hover:text-primary transition-colors">
                  {prj.title}
                </h2>
                <p className="font-body-md text-secondary-fixed-dim text-sm max-w-3xl leading-relaxed">
                  {prj.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {prj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-surface-container-high text-xs font-label-sm text-on-surface-variant rounded border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/projects/${prj.slug}`}
                className="bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-sm text-xs uppercase tracking-widest px-6 py-3 rounded-full border border-white/10 transition-all whitespace-nowrap"
              >
                View Case Study →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
