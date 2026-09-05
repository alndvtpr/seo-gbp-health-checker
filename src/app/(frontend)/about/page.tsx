import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AboutCredentials } from '@/features/credentials'
import {
  AboutHeader,
  AboutStorySection,
  AboutFitSection,
  AboutCtaSection,
} from '@/features/about'

export const metadata = generateMetadata({
  title: 'About Alain Dave Tapiru | Practical SEO & Web Support Philippines',
  description:
    'Learn more about Alain Dave Tapiru. Practical SEO and website support for small businesses and agencies. Background, hands-on projects, and technical skills.',
  url: 'https://www.alaintapiru.com/about/',
})

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.alaintapiru.com/about/#webpage',
      url: 'https://www.alaintapiru.com/about/',
      name: 'About Alain Dave Tapiru | Practical SEO & Web Support Philippines',
      description:
        'Learn more about Alain Dave Tapiru. Practical SEO and website support for small businesses and agencies. Background, hands-on projects, and technical skills.',
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
        '@id': 'https://www.alaintapiru.com/about/#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/about/#breadcrumb',
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
          name: 'About',
          item: 'https://www.alaintapiru.com/about/',
        },
      ],
    },
  ],
}

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-20">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(aboutJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'About', url: '/about/' }]} showJsonLd={false} />

      {/* Header */}
      <AboutHeader />

      {/* Main Grid: Portrait & Story */}
      <AboutStorySection />

      {/* Best Fit vs. Not the Right Fit Yet Section */}
      <AboutFitSection />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* Credentials & Education */}
      <AboutCredentials />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* CTA */}
      <AboutCtaSection />
    </div>
  )
}
