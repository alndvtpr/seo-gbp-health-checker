import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ResumePdfPreview } from '@/features/credentials'
import {
  ResumeHeader,
  ResumeSummary,
  ResumeSkills,
  ResumeExperience,
  ResumeProjects,
  ResumeEducation,
  ResumeCertifications,
  ResumeCallout,
} from '@/features/resume'

export const metadata = generateMetadata({
  title: 'Resume | Alain Dave Tapiru — Junior SEO Specialist | Technical & On-Page SEO',
  description:
    'Professional resume of Alain Dave Tapiru, SEO Specialist and Technical Virtual Assistant in the Philippines. Hands-on experience in technical SEO, web development, BPO customer support, and AI workflows.',
  url: 'https://www.alaintapiru.com/resume/',
})

const resumeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.alaintapiru.com/resume/#webpage',
      url: 'https://www.alaintapiru.com/resume/',
      name: 'Resume | Alain Dave Tapiru — Junior SEO Specialist | Technical & On-Page SEO',
      description:
        'Professional resume of Alain Dave Tapiru. Technical SEO, web design, BPO support, and client-facing digital operations.',
      isPartOf: {
        '@id': 'https://www.alaintapiru.com/#website',
      },
      about: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      mainEntity: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      breadcrumb: {
        '@id': 'https://www.alaintapiru.com/resume/#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/resume/#breadcrumb',
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
          name: 'Resume',
          item: 'https://www.alaintapiru.com/resume/',
        },
      ],
    },
  ],
}

export default function ResumePage() {
  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10 lg:px-12 max-w-4xl mx-auto relative z-20 space-y-6 sm:space-y-8">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(resumeJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Resume', url: '/resume/' }]} showJsonLd={false} />

      {/* Modern 2026 Executive Header Card */}
      <ResumeHeader />

      {/* Resume PDF Viewer / ATS Preview */}
      <ResumePdfPreview />

      {/* Professional Summary */}
      <ResumeSummary />

      {/* Skills & Tools Matrix */}
      <ResumeSkills />

      {/* Work Experience */}
      <ResumeExperience />

      {/* Selected Practical Projects */}
      <ResumeProjects />

      {/* Education */}
      <ResumeEducation />

      {/* Verified Certifications & Specialized Training */}
      <ResumeCertifications />

      {/* Hire / Contact Callout Banner */}
      <ResumeCallout />
    </div>
  )
}
