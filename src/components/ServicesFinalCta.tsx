import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://alaintapiru.com/#service',
      name: 'Alain Tapiru — Data-Driven SEO, AEO, GEO & Web Development Services',
      url: 'https://alaintapiru.com/services/',
      provider: {
        '@type': 'Person',
        '@id': 'https://alaintapiru.com/#person',
        name: 'Alain Tapiru',
        url: 'https://alaintapiru.com',
      },
      description:
        'Rank on Google and get cited by AI engines like ChatGPT & Perplexity. Fast static/WordPress sites, technical audits, Schema markup, and analytics.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'SEO & Web Engineering Offerings',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Technical SEO Audit',
              description:
                'Crawlability, indexability, Core Web Vitals, speed profiling, and prioritized technical action roadmaps.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Advanced Schema & Entity Structuring',
              description:
                'Custom JSON-LD schema architectures, Knowledge Graph entity linking, and rich snippet validation.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Keyword Research & Competitor Benchmarking',
              description:
                'Commercial vs. informational search intent mapping, topic clustering, and competitor gap analysis.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'On-Page SEO',
              description:
                'CTR-engineered titles and metas, semantic heading structures, internal linking, and image optimization.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AEO & GEO Optimization',
              description:
                'Direct answer formatting for Featured Snippets and source-citable content structuring for AI models.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'WordPress & Static Website Development',
              description:
                'Ultra-fast, lightweight static sites and clean custom WordPress theme builds.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SEO Analytics & Reporting',
              description:
                'Custom GA4/GSC conversion setups, 24/7 Looker Studio dashboards, and monthly video walkthroughs.',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services#faq',
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
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-primary-container/20 via-[#181a1b] to-[#181a1b] border-2 border-primary-container/40 text-center space-y-6 sm:space-y-8 shadow-[0_0_50px_rgba(230,126,34,0.15)]">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-wider">
            <Icon name="check_circle" size={14} className="text-primary-container" />
            <span>Free 20-minute audit review • No pressure</span>
          </div>

          {/* Headline */}
          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready to Dominate Search and Get Cited by AI?
          </h2>

          {/* Subheadline */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s diagnose your technical bottlenecks and build a search strategy that drives real business growth.
          </p>

          {/* Action Row */}
          <div className="pt-2">
            <Link
              href="/contact/"
              aria-label="Schedule a Discovery Call"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-wider px-9 py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:shadow-[0_0_40px_rgba(230,126,34,0.7)] hover:scale-105 active:scale-95 transition-all min-h-[48px]"
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
