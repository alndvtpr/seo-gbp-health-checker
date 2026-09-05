import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import {
  ServiceSubpageHero,
  ServiceProblemsSolved,
  ServiceDeliverablesGrid,
  ServiceWorkflowSteps,
  LocalSeoProof,
  ServiceFaqSection,
  ServiceRelatedLinks,
  ServiceSubpageCta,
  ServiceSectionDivider,
} from '@/features/services'
import {
  LOCAL_OPTIMIZATION_AREAS,
  PROBLEMS_SOLVED,
  WORKFLOW_STEPS,
  FAQS,
  LOCAL_SEO_SCHEMA,
} from '@/features/services/data/localSeoData'

export const metadata = generateMetadata({
  title: 'Local SEO Services Philippines | Google Business Profile Optimization | Alain Dave Tapiru',
  description:
    'Practical Local SEO support in the Philippines. Google Business Profile review, 10-point signal diagnostics, local landing page structure, and citation consistency.',
  url: 'https://www.alaintapiru.com/services/local-seo/',
})

export default function LocalSeoPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(LOCAL_SEO_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <ServiceSubpageHero
        breadcrumbName="Local SEO"
        breadcrumbUrl="/services/local-seo/"
        badgeIcon="location_on"
        badgeText="LOCAL SEARCH • GOOGLE BUSINESS PROFILE & MAP PACK"
        headingId="local-seo-hero-heading"
        title={
          <>
            <span className="font-extrabold text-on-surface">Local SEO Services</span>{' '}
            <span className="font-medium text-on-surface/85">&amp; Google Business Profile Optimization</span>
          </>
        }
        description="Help nearby searchers find clearer, more consistent business information. I review your Google Business Profile, identify category and NAP inconsistencies, and structure useful local landing pages."
        primaryCtaText="Run Free 10-Point GBP Audit"
        primaryCtaHref="/tools/#gbp-checker"
        secondaryCtaText="Inquire About Local SEO Sprints"
        secondaryCtaHref="/contact/?service=Local%20SEO%20Optimization"
        trustPoints={[
          '10-Point Live Signal Diagnostic',
          'Primary & Secondary Category Tuning',
          'Zero Artificial Ranking Guarantees',
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 2. Problems Solved */}
      <ServiceProblemsSolved
        id="local-problems"
        headingId="problems-heading"
        eyebrow="LOCAL VISIBILITY GAPS"
        title="Why Local Customers Can’t Find Your Business"
        description="Local searchers have high commercial intent. Missing profile details or inaccurate categories divert customers directly to competitors."
        problems={PROBLEMS_SOLVED}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 3. What I Optimize */}
      <ServiceDeliverablesGrid
        id="what-we-optimize"
        headingId="optimization-areas-heading"
        eyebrow="LOCAL SEO CAPABILITIES"
        title="What I Review for Local Search Visibility"
        description="From your Google Maps presence to eligible on-site local business markup, I check that published details are supported and consistent."
        deliverablesEyebrow="Specific Tasks & Deliverables"
        deliverables={LOCAL_OPTIMIZATION_AREAS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 4. Local SEO Process */}
      <ServiceWorkflowSteps
        id="local-process"
        headingId="process-heading"
        eyebrow="SPRINT METHODOLOGY"
        title="4-Step Local Optimization Framework"
        description="A concrete process connecting automated diagnostic scans with manual category tuning and structured schema."
        steps={WORKFLOW_STEPS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 5. Interactive Tool & Case Study Proof */}
      <LocalSeoProof />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 6. Local SEO FAQs */}
      <ServiceFaqSection
        id="local-faq"
        headingId="faq-heading"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Local SEO Questions & Answers"
        description="Clear, practical guidance on Google Business Profile management, local categories, and rankings."
        faqs={FAQS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* Related Services Navigation */}
      <ServiceRelatedLinks
        eyebrow="RELATED DISCIPLINES"
        services={[
          {
            badge: 'Local Content & Headings',
            title: 'On-Page SEO & Content Optimization',
            desc: 'Local keyword mapping, city-level landing page copy, and CTR-focused metadata.',
            href: '/services/on-page-seo/',
            linkText: 'View On-Page SEO Scope',
          },
          {
            badge: 'Local Business Markup',
            title: 'Technical SEO & Schema Architecture',
            desc: 'Structured local-search markup, privacy-appropriate location data, and measured mobile performance.',
            href: '/services/technical-seo/',
            linkText: 'View Technical SEO Scope',
          },
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 7. Closing Conversion CTA Banner */}
      <ServiceSubpageCta
        id="contact-cta"
        headingId="final-cta-heading"
        badgeText="Turn Local Searches Into Inquiries • Direct Discovery Call"
        title="Ready to Improve Your Local Search Visibility and Google Maps Presence?"
        description="Let's review your Google Business Profile signals, check your categories, and add appropriate local structured data where the verified business details support it."
        primaryCtaText="Request Local SEO Sprint"
        primaryCtaHref="/contact/?service=Local%20SEO%20Optimization"
      />
    </div>
  )
}
