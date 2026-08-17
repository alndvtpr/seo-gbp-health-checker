import React from 'react'

export const JsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://alaintapiru.com/#website',
        url: 'https://alaintapiru.com',
        name: 'Alain Dave Tapiru — SEO Specialist & Web Designer',
        description: 'SEO Specialist in the Philippines providing technical SEO audits, local SEO, and search-ready web development.',
        publisher: {
          '@id': 'https://alaintapiru.com/#person',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': ['Person', 'ProfilePage'],
        '@id': 'https://alaintapiru.com/#person',
        name: 'Alain Dave G. Tapiru',
        alternateName: 'Alain Tapiru',
        url: 'https://alaintapiru.com',
        image: 'https://alaintapiru.com/about_me.jpg',
        jobTitle: 'SEO Specialist & Technical Web Designer',
        description: 'Data-driven SEO Specialist and Technical Web Designer in the Philippines specializing in technical SEO, local SEO, Core Web Vitals, and Next.js development.',
        knowsAbout: [
          'Search Engine Optimization (SEO)',
          'Technical SEO',
          'Local SEO & Google Business Profile (GBP)',
          'Core Web Vitals Optimization',
          'Web Design & Next.js Development',
          'Generative Engine Optimization (GEO)',
          'AI Workflow Automation',
        ],
        sameAs: [
          'https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/',
          'https://github.com/alndvtpr',
          'https://facebook.com/dcrazedave',
        ],
        email: 'mailto:alaintapiru@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PH',
          addressLocality: 'Tuguegarao City',
          addressRegion: 'Cagayan',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://alaintapiru.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://alaintapiru.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://alaintapiru.com/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Projects',
            item: 'https://alaintapiru.com/projects',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'GBP Health Checker',
            item: 'https://alaintapiru.com/tools',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Contact',
            item: 'https://alaintapiru.com/contact',
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://alaintapiru.com/#creativework',
        name: 'Alain Dave Tapiru Portfolio & Design System',
        author: {
          '@id': 'https://alaintapiru.com/#person',
        },
        copyrightHolder: {
          '@id': 'https://alaintapiru.com/#person',
        },
        copyrightYear: 2026,
        license: 'https://alaintapiru.com/llms.txt',
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
