import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { ProjectsDirectory } from '@/components/ProjectsDirectory'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'SEO, Web Design & Development Projects | Alain Dave Tapiru',
  description:
    'See SEO, web design and development in action. Explore Alain Dave Tapiru’s projects in technical SEO, WordPress, performance and website optimization.',
  url: 'https://www.alaintapiru.com/projects/',
})

export default function ProjectsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-10 sm:space-y-16">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Projects', url: '/projects/' }]} />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Practical Projects &amp; Active Builds
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-[-0.025em]">
          Projects &amp; Practical SEO Work
        </h1>
        <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
          Practical implementations in custom WordPress development, technical search engine optimization, web architecture, and local search tools.
        </p>
      </div>

      {/* Projects Directory with Interactive Filter & Modal */}
      <ProjectsDirectory />
    </div>
  )
}
