import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProjectsDirectory, PROJECTS } from '@/features/projects'

export const metadata = generateMetadata({
  title: 'SEO Portfolio & Web Development Projects | Alain Dave Tapiru',
  description:
    'Explore the SEO portfolio and practical web projects of Alain Dave Tapiru. Real implementations across technical SEO, custom WordPress themes, and local search tools.',
  url: 'https://www.alaintapiru.com/projects/',
})

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.alaintapiru.com/projects/#webpage',
      url: 'https://www.alaintapiru.com/projects/',
      name: 'SEO Portfolio & Web Development Projects | Alain Dave Tapiru',
      description:
        'Explore the SEO portfolio and practical web projects of Alain Dave Tapiru. Real implementations across technical SEO, custom WordPress themes, and local search tools.',
      isPartOf: {
        '@id': 'https://www.alaintapiru.com/#website',
      },
      about: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PROJECTS.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://www.alaintapiru.com/projects/${project.slug}/`,
          name: project.title,
          description: project.shortDescription,
        })),
      },
      breadcrumb: {
        '@id': 'https://www.alaintapiru.com/projects/#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/projects/#breadcrumb',
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
      ],
    },
  ],
}

export default function ProjectsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-10 sm:space-y-16">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectsJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs showJsonLd={false} items={[{ name: 'Projects', url: '/projects/' }]} />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Practical Projects &amp; Active Builds
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-[-0.025em]">
          SEO Portfolio &amp; Practical Web Projects
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
