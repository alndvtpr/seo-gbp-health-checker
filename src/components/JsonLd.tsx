import React from 'react'
import { PERSON_ID, SITE_URL, WEBSITE_ID, serializeJsonLd } from '@/lib/seo'

export const GLOBAL_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: 'Alain Dave Tapiru | SEO Specialist & Web Developer',
        description:
          'Technical SEO, Local Search Optimization, Core Web Vitals, and Next.js / WordPress development services.',
        publisher: {
          '@id': PERSON_ID,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Alain Dave G. Tapiru',
        alternateName: ['Alain Tapiru', 'Alain Dave Tapiru'],
        url: SITE_URL,
        image: `${SITE_URL}alain-dave-tapiru-seo-specialist-philippines.avif`,
        jobTitle: 'SEO Specialist & Web Developer',
        description:
          'SEO Specialist and Technical Web Developer in the Philippines specializing in technical SEO, local SEO, Core Web Vitals, and Next.js development.',
        email: 'mailto:alaintapiru@gmail.com',
        telephone: '+63-906-324-9560',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mabalacat City',
          addressRegion: 'Pampanga',
          addressCountry: 'PH',
        },
        knowsAbout: [
          'SEO - Search Engine Optimization',
          'Technical Search Engine Optimization(SEO)',
          'Local Search Engine Optimization(SEO)',
          'On-Page Search Engine Optimization (SEO)',
          'Local SEO & Google Business Profile (GBP)',
          'Core Web Vitals Optimization',
          'Web Design & Web Development',
          'Answer Engine Optimization(AEO)',
          'Generative Engine Optimization (GEO)',
          'AI Workflow Automation',
        ],
        sameAs: [
          'https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/',
          'https://github.com/alndvtpr',
          'https://www.facebook.com/dcrazedave',
          'https://wa.me/639063249560',
        ],
      },
  ],
}

export const JsonLd = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(GLOBAL_JSON_LD) }}
    />
  )
}
