import React from 'react'

export const JsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: 'https://alaintapiru.com/',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://alaintapiru.com/#person',
      name: 'Alain Dave G. Tapiru',
      alternateName: 'Alain Tapiru',
      url: 'https://alaintapiru.com/',
      image: 'https://alaintapiru.com/about_me.jpg',
      jobTitle: 'SEO Specialist & Web Designer & Developer',
      description:
        'Data-driven SEO Specialist and Technical Web Designer in the Philippines specializing in technical SEO, local SEO, Core Web Vitals, and Next.js development.',
      email: 'mailto:alaintapiru@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '10231 Everlasting Street, Dau',
        addressLocality: 'Mabalacat City',
        addressRegion: 'Pampanga',
        postalCode: '2010',
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
        'Off-page Search Engine Optimization(SEO)',
        'Answer Engine Optimization(AEO)',
        'Generative Engine Optimization (GEO)',
        'AI Workflow Automation',
      ],
      sameAs: [
        'https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/',
        'https://github.com/alndvtpr',
        'https://www.facebook.com/dcrazedave',
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
