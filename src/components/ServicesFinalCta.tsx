import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.alaintapiru.com/#service',
      name: 'Alain Tapiru — Data-Driven SEO, AEO, GEO & Web Development Services',
      url: 'https://www.alaintapiru.com/services/',
      image: 'https://www.alaintapiru.com/about_me.jpg',
      priceRange: '$$',
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
      areaServed: [
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
              name: 'Advanced Schema & Entity Structuring',
              serviceType: 'Semantic Web & Schema Architecture',
              description:
                'Custom JSON-LD architecture, semantic web modeling, and Knowledge Graph linking.',
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
                'Semantic heading hierarchy, CTR-engineered metadata, and contextual internal linking frameworks.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AEO & GEO Optimization',
              serviceType: 'Answer Engine & Generative Engine Optimization',
              description:
                'Featured snippet formatting, zero-click answer engineering, and AI citation structure for LLM search engines.',
              sameAs: 'https://en.wikipedia.org/wiki/Generative_artificial_intelligence',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'WordPress & Static Website Development',
              serviceType: 'Web Design & Next.js Development',
              description:
                'Lightweight static Next.js builds, headless WordPress architectures, and high-performance custom themes.',
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
                'Custom GA4/GSC setups, conversion tracking, real-time performance dashboards, and automated Google Docs reporting.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Off-Page SEO & Authority Building',
              serviceType: 'Off-Page SEO & Link Acquisition',
              description:
                'High-authority link acquisition, digital PR, backlink profile disavow audits, and domain authority acceleration.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Local SEO & Google Business Profile (GBP) Optimization',
              serviceType: 'Local SEO Optimization',
              description:
                'Local map pack rankings, Google Business Profile optimization, local citation cleanup, and geo-targeted landing page structuring.',
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
            text: 'Traditional SEO ranks your links on Google search result pages. AEO (Answer Engine Optimization) structures content to win Featured Snippets and voice answers. GEO (Generative Engine Optimization) optimizes facts, entities, and citations so AI models (ChatGPT, Perplexity, Google AI Overviews) mention and recommend your brand in generated answers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you optimize my existing website, or do I need a new build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We can audit and optimize your existing site directly. If your current CMS is severely bloated or slow, we will provide specific recommendations on whether a rebuild or technical refactor is most cost-effective.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why choose a static site over WordPress (or vice versa)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Static sites offer unmatched speed, bulletproof security, and zero maintenance overhead. WordPress offers unmatched flexibility and an easy content management dashboard for non-technical teams. We build both cleanly.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you track and report progress?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You get 24/7 access to a custom Looker Studio dashboard tracking organic traffic, keyword movement, and conversions, supported by monthly video walkthroughs.',
          },
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
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-primary-container/20 via-surface-1 to-surface-1 border-2 border-primary-container/40 text-center space-y-6 sm:space-y-8 shadow-[0_0_50px_rgba(224,123,32,0.15)]">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-[0.08em]">
            <Icon name="check_circle" size={14} className="text-primary-container" />
            <span>Free 20-minute audit review • No pressure</span>
          </div>

          {/* Headline */}
          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready to Dominate Search and Get Cited by AI?
          </h2>

          {/* Subheadline */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s diagnose your technical bottlenecks and build a search strategy that drives real business growth.
          </p>

          {/* Action Row */}
          <div className="pt-2">
            <Link
              href="/contact/"
              aria-label="Schedule a Discovery Call"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] hover:scale-105 active:scale-95 transition-all min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Schedule a Discovery Call</span>
              <Icon name="calendar_month" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicesFinalCta
