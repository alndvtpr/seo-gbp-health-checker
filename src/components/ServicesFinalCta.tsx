import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': 'https://www.alaintapiru.com/#business',
      name: 'Alain Tapiru | SEO, AEO, GEO & Web Development Services',
      url: 'https://www.alaintapiru.com/services/',
      image: 'https://www.alaintapiru.com/alain-dave-tapiru-seo-specialist-philippines.avif',
      telephone: '+63-906-324-9560',
      email: 'alaintapiru@gmail.com',
      priceRange: '$$',
      currenciesAccepted: 'USD, PHP',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer, PayPal, Wise, GCash',
      provider: {
        '@type': 'Person',
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'SEO, AEO, GEO & Web Development Service Catalog',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Technical SEO Audit',
              serviceType: 'Technical Search Engine Optimization',
              description:
                'Comprehensive crawlability, indexability, Core Web Vitals, and server speed profiling.',
              sameAs: 'https://en.wikipedia.org/wiki/Search_engine_optimization',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Schema Markup & Structured Data Implementation',
              serviceType: 'Semantic Web & Schema Architecture',
              description:
                'Custom JSON-LD implementation, schema validation, and structured data testing.',
              sameAs: 'https://en.wikipedia.org/wiki/JSON-LD',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Keyword Research & Competitor Benchmarking',
              serviceType: 'Search Intent & Topic Modeling',
              description:
                'Granular search intent mapping, semantic topic clustering, and competitor gap discovery.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'On-Page SEO',
              serviceType: 'On-Page SEO Optimization',
              description:
                'Semantic heading hierarchy, click-optimized metadata, and strategic internal linking frameworks.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AEO & GEO Optimization',
              serviceType: 'Answer Engine & Generative Engine Optimization',
              description:
                'Structuring content and semantic data for search snippets and emerging AI search engines.',
              sameAs: 'https://en.wikipedia.org/wiki/Generative_artificial_intelligence',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'WordPress & React Website Development',
              serviceType: 'Web Design & Next.js Development',
              description:
                'High-performance React & Next.js builds, responsive WordPress architectures, and custom speed-optimized themes.',
              sameAs: 'https://en.wikipedia.org/wiki/WordPress',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SEO Analytics & Reporting',
              serviceType: 'SEO Analytics & Performance Tracking',
              description:
                'Custom GA4/GSC setups, conversion tracking, real-time performance dashboards, and automated reporting.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Local SEO & Google Business Profile (GBP) Optimization',
              serviceType: 'Local SEO Optimization',
              description:
                'Local search optimization, Google Business Profile setup, local citation consistency, and geo-targeted landing page structuring.',
              sameAs: 'https://en.wikipedia.org/wiki/Local_search_(Internet)',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Competitive Analysis SEO',
              serviceType: 'Competitive SEO Intelligence',
              description:
                'Comprehensive market share analysis, competitor backlink profiling, and SERP visibility gap analysis.',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between traditional SEO, AEO, and GEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional SEO optimizes your web pages to rank in search engine results. AEO (Answer Engine Optimization) structures content for quick, direct answers like Featured Snippets. GEO (Generative Engine Optimization) organizes facts, entities, and structured data so AI models (such as ChatGPT, Perplexity, and Google AI Overviews) can easily understand and reference your brand.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you optimize my existing website, or do I need a new build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I can audit and optimize your existing site directly. If your current CMS is severely bloated or slow, I will provide specific recommendations on whether a rebuild or technical refactor is most practical.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why choose a React / Next.js site over WordPress (or vice versa)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'React & Next.js sites offer fast loading speeds, zero layout shift, and code-first scalability. WordPress offers flexibility and an easy content management dashboard for non-technical teams. I build both cleanly.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you track and report progress?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reporting follows the agreed scope. Monthly support includes an activity log, a review of relevant Search Console and GA4 patterns, and a prioritized next-step plan. A configured Looker Studio and GA4 dashboard is available as an optional add-on when the required access and measurement setup are in place.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/services/#breadcrumbs',
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
          name: 'Services',
          item: 'https://www.alaintapiru.com/services/',
        },
      ],
    },
  ],
}

export function ServicesFinalCta() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />

      {/* High-Impact Closing CTA Banner */}
      <section
        id="contact-cta"
        aria-labelledby="final-cta-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto"
      >
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-primary-container/20 via-surface-1 to-surface-1 border-2 border-primary-container/40 text-center space-y-6 sm:space-y-8 shadow-[0_0_50px_rgba(224,123,32,0.15)] motion-reveal">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-[0.08em]">
            <Icon name="check_circle" size={14} className="text-primary-container" />
            <span>Free entry-point diagnostic • Clear scope • No obligations</span>
          </div>

          {/* Headline */}
          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready for Practical SEO or Website Support?
          </h2>

          {/* Subheadline */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s review your website, clarify what needs fixing, and map out a practical implementation plan.
          </p>

          {/* Action Row */}
          <div className="pt-2">
            <Link
              href="/tools/#website-audit"
              aria-label="Request a Website Health Check"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Request a Website Health Check</span>
              <Icon name="search_check" size={16} className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicesFinalCta
