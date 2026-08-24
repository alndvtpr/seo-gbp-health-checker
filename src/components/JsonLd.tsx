import React from 'react'

export const JsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://www.alaintapiru.com/#website',
        url: 'https://www.alaintapiru.com/',
        name: 'Alain Dave Tapiru | SEO Specialist & Web Developer',
        description:
          'Technical SEO, Local Search Optimization, Core Web Vitals, and Next.js / WordPress development services.',
        publisher: {
          '@id': 'https://www.alaintapiru.com/#business',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://www.alaintapiru.com/#profilepage',
        url: 'https://www.alaintapiru.com/',
        name: 'Alain Dave G. Tapiru - Profile',
        isPartOf: {
          '@id': 'https://www.alaintapiru.com/#website',
        },
        about: {
          '@id': 'https://www.alaintapiru.com/#person',
        },
        mainEntity: {
          '@id': 'https://www.alaintapiru.com/#person',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://www.alaintapiru.com/#person',
        name: 'Alain Dave G. Tapiru',
        alternateName: ['Alain Tapiru', 'Alain Dave Tapiru'],
        url: 'https://www.alaintapiru.com/',
        image: 'https://www.alaintapiru.com/alain-dave-tapiru-professional-portrait.webp',
        jobTitle: 'SEO Specialist & Web Developer',
        description:
          'SEO Specialist and Technical Web Developer in the Philippines specializing in technical SEO, local SEO, Core Web Vitals, and Next.js development.',
        email: 'mailto:alaintapiru@gmail.com',
        telephone: '+63-906-324-9560',
        worksFor: {
          '@id': 'https://www.alaintapiru.com/#business',
        },
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
          'https://wa.me/639063249560',
        ],
      },
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': 'https://www.alaintapiru.com/#business',
        name: 'Alain Tapiru - SEO & Web Development',
        alternateName: 'Alain Dave Tapiru Freelance & Consulting',
        url: 'https://www.alaintapiru.com/',
        logo: 'https://www.alaintapiru.com/logo.png',
        image: 'https://www.alaintapiru.com/alain-dave-tapiru-professional-portrait.webp',
        description:
          'Professional Technical SEO, Local Search Optimization, Google Business Profile management, and custom Next.js/WordPress web development.',
        telephone: '+63-906-324-9560',
        email: 'alaintapiru@gmail.com',
        priceRange: '$$',
        currenciesAccepted: 'USD, PHP',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer, PayPal, Wise, GCash',
        founder: {
          '@id': 'https://www.alaintapiru.com/#person',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '10231 Everlasting Street, Dau',
          addressLocality: 'Mabalacat City',
          addressRegion: 'Pampanga',
          postalCode: '2010',
          addressCountry: 'PH',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 15.1788,
          longitude: 120.5843,
        },
        hasMap:
          'https://www.google.com/maps/search/?api=1&query=10231+Everlasting+Street+Dau+Mabalacat+City+Pampanga',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
            ],
            opens: '09:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:00',
            closes: '13:00',
          },
        ],
        areaServed: [
          {
            '@type': 'City',
            name: 'Mabalacat City',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Pampanga',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Central Luzon',
          },
          {
            '@type': 'Country',
            name: 'Philippines',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Worldwide',
          },
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
