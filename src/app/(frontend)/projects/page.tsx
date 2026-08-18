import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { ProjectsDirectory } from '@/components/ProjectsDirectory'

export const metadata = generateMetadata({
  title: 'Projects & SEO Case Studies | Alain Dave Tapiru',
  description:
    'Explore technical SEO case studies, custom WordPress builds, web architecture, and live projects by Alain Dave Tapiru.',
  url: 'https://alaintapiru.com/projects/',
})

export default function ProjectsPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-10 sm:space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Proven Track Record &amp; Active Builds
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6">
          Projects &amp; SEO Case Studies
        </h1>
        <p className="font-sans text-on-surface/70 text-xs sm:text-base leading-relaxed">
          Deep dives into custom WordPress development, technical search engine optimization, web architecture, and digital growth platforms.
        </p>
      </div>

      {/* Projects Directory with Interactive Filter & Modal */}
      <ProjectsDirectory />
    </div>
  )
}
