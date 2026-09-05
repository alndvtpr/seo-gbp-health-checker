import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/icons'
import { generateMetadata as buildSeoMetadata, serializeJsonLd } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import {
  getProjectBySlug,
  PROJECTS,
  ProjectHero,
  ProjectMetadataBar,
  ProjectBreakdown,
  ProjectPillars,
  ProjectGallery,
  ProjectRelatedSection,
  ProjectContextualCta,
  PerformanceAuditProof,
} from '@/features/projects'

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
          '@id': 'https://www.alaintapiru.com/#person',
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd) }}
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

      {/* Hero Header & Primary Visual Media Banner */}
      <ProjectHero project={project} />

      {/* Metadata Bar */}
      <ProjectMetadataBar project={project} />

      {/* 5-Part Structured Breakdown */}
      <ProjectBreakdown project={project} />

      {/* PageSpeed Audit Proof Component for alaintapiru-portfolio */}
      {project.slug === 'alaintapiru-portfolio' && (
        <PerformanceAuditProof
          eyebrow="Dated Lab Evidence"
          title="Google PageSpeed Insights Audit Scores"
          subtitle="Repository screenshots record August 2026 Google PageSpeed Insights and Lighthouse lab results for alaintapiru.com across desktop and mobile. They are simulated lab evidence, not field Core Web Vitals or a guarantee of current real-user performance."
        />
      )}

      {/* Methodology Pillars */}
      <ProjectPillars pillars={project.pillars} />

      {/* Visual Gallery */}
      <ProjectGallery gallery={project.gallery} title={project.title} />

      {/* Semantic Cross-Linking: Related Case Studies & Interactive Tools */}
      <ProjectRelatedSection currentSlug={project.slug} />

      {/* Bottom Contextual CTA Banner */}
      <ProjectContextualCta project={project} />
    </div>
  )
}
