import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Projects & Case Studies | Alain Dave Tapiru',
  description: 'Explore technical SEO case studies, web design projects, and optimization success stories by Alain Dave Tapiru.',
  url: 'https://alaintapiru.com/projects',
})

const projects = [
  {
    title: 'Executive Optical Local SEO Campaign',
    category: 'Local SEO & Multi-Location Strategy',
    description: 'Scaled organic visibility across 100+ retail branches through structured schema data, Google Business Profile optimization, and local backlink campaigns.',
    tools: ['Ahrefs', 'Google Business Profile', 'Schema Markup', 'WordPress'],
    slug: 'executive-optical-local-seo',
  },
  {
    title: 'Claimscale.ai Portfolio & Web Design',
    category: 'Full-Stack Next.js & Film-Noir Design',
    description: 'Designed and developed a custom high-performance Next.js application with interactive 3D WebGL background shaders and AI CMS integration.',
    tools: ['Next.js 16', 'Payload CMS 3.0', 'Tailwind CSS', 'WebGL'],
    slug: 'claimscale-ai-portfolio',
  },
  {
    title: '[PLACEHOLDER] E-Commerce Organic Traffic Surge',
    category: 'Technical SEO & Speed Optimization',
    description: '[PLACEHOLDER - EDIT LATER] Reduced LCP by 40% and grew organic keywords in top 3 rankings by 150% in 6 months.',
    tools: ['Google Search Console', 'PageSpeed Insights', 'Cloudflare'],
    slug: 'ecommerce-seo-case-study',
  },
]

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Proven Track Record
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-on-surface mb-6">
          Projects &amp; SEO Case Studies
        </h1>
        <p className="font-sans text-on-surface/70 text-base leading-relaxed">
          Deep dives into technical search engine optimization, web architecture, and digital growth campaigns.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.slug}
            className="p-8 rounded-3xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-2 font-semibold">
                {proj.category}
              </span>
              <h2 className="font-heading text-xl font-bold text-on-surface mb-3 group-hover:text-primary-container transition-colors">
                {proj.title}
              </h2>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed mb-6">
                {proj.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {proj.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-heading text-on-surface/60 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/projects/${proj.slug}`}
              className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 font-heading text-xs uppercase tracking-wider font-bold text-on-surface group-hover:text-primary-container transition-colors"
            >
              Read Case Study
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
