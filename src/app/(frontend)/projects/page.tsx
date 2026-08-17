import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'

export const metadata = generateMetadata({
  title: 'Projects & Case Studies | Alain Dave Tapiru',
  description: 'Explore technical SEO case studies, web design projects, and optimization success stories by Alain Dave Tapiru.',
  url: 'https://alaintapiru.com/projects',
})

const projects = [
  {
    title: 'Local SEO & GBP Health Checker',
    category: 'LOCAL SEO • PERSONAL PROJECT',
    description: 'A self-built tool for analyzing key Google Business Profile and local SEO signals, helping identify practical opportunities for better local search visibility.',
    tools: ['Next.js', 'React', 'Tailwind CSS', 'Local SEO API'],
    link: '/tools',
    ctaText: 'View Project',
    isLive: true,
  },
  {
    title: 'AlainTapiru.com — Technical SEO & Web Project',
    category: 'TECHNICAL SEO • PERSONAL PROJECT',
    description: 'My personal portfolio built with a modern web stack, combining technical SEO, search-friendly architecture, performance considerations, and AI-assisted development workflows.',
    tools: ['Next.js 15', 'Tailwind CSS', 'Vercel', 'SEO Metadata'],
    link: 'https://github.com/alndvtpr',
    ctaText: 'View Project',
  },
]

export default function ProjectsPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-10 sm:space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Proven Track Record
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6">
          Projects &amp; SEO Case Studies
        </h1>
        <p className="font-sans text-on-surface/70 text-xs sm:text-base leading-relaxed">
          Deep dives into technical search engine optimization, web architecture, and digital growth campaigns.
        </p>
      </div>


      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {projects.map((proj) => (
          <div
            key={proj.title}
            className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              {proj.isLive ? (
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-heading text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                    {proj.category}
                  </span>
                </div>
              ) : (
                <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-2 font-semibold">
                  {proj.category}
                </span>
              )}
              <h2 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-2 sm:mb-3 group-hover:text-primary-container transition-colors">
                {proj.title}
              </h2>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed mb-4 sm:mb-6">
                {proj.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6 sm:mb-8">
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
              href={proj.link}
              target={proj.link.startsWith('http') ? '_blank' : undefined}
              rel={proj.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 font-heading text-xs uppercase tracking-wider font-bold text-on-surface group-hover:text-primary-container transition-colors py-1"
            >
              {proj.ctaText}
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
