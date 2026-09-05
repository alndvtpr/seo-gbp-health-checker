import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import {
  ServiceSubpageHero,
  ServiceProblemsSolved,
  ServiceDeliverablesGrid,
  ServiceWorkflowSteps,
  OnPageSeoProof,
  ServiceFaqSection,
  ServiceRelatedLinks,
  ServiceSubpageCta,
  ServiceSectionDivider,
} from '@/features/services'
import {
  ON_PAGE_OPTIMIZATION_AREAS,
  PROBLEMS_SOLVED,
  WORKFLOW_STEPS,
  FAQS,
  ON_PAGE_SEO_SCHEMA,
} from '@/features/services/data/onPageSeoData'

export const metadata = generateMetadata({
  title: 'On-Page SEO Services Philippines | Content & Keyword Optimization | Alain Dave Tapiru',
  description:
    'Professional On-Page SEO services in the Philippines. Search intent mapping, keyword clustering, semantic heading architecture, metadata CTR optimization, and strategic internal linking.',
  url: 'https://www.alaintapiru.com/services/on-page-seo/',
})

export default function OnPageSeoPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(ON_PAGE_SEO_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <ServiceSubpageHero
        breadcrumbName="On-Page SEO"
        breadcrumbUrl="/services/on-page-seo/"
        badgeIcon="key"
        badgeText="SEARCH INTENT & CONTENT ARCHITECTURE"
        headingId="on-page-seo-hero-heading"
        title={
          <>
            <span className="font-extrabold text-on-surface">On-Page SEO Services</span>{' '}
            <span className="font-medium text-on-surface/85">&amp; Content Optimization</span>
          </>
        }
        description="Map search intent, structure semantic heading outlines, and optimize metadata so your high-value pages can attract more qualified search clicks."
        primaryCtaText="Request On-Page Optimization"
        primaryCtaHref="/contact/?service=On-Page%20SEO"
        secondaryCtaText="Explore What I Optimize ↓"
        secondaryCtaHref="#what-we-optimize"
        trustPoints={[
          'Intent-Driven Keyword Mapping',
          'CTR-Tested Meta Copywriting',
          'Clean Heading Hierarchy',
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 2. Problems Solved */}
      <ServiceProblemsSolved
        id="content-problems"
        headingId="problems-heading"
        eyebrow="CONTENT GAPS RESOLVED"
        title="Common On-Page Bottlenecks Damaging Click-Through Rates"
        description="Even high-ranking content fails to convert if the search intent is misaligned, snippet copy is truncated, or internal link equity is scattered."
        problems={PROBLEMS_SOLVED}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 3. What I Optimize */}
      <ServiceDeliverablesGrid
        id="what-we-optimize"
        headingId="optimization-areas-heading"
        eyebrow="ON-PAGE SCOPE OF WORK"
        title="What I Inspect, Map & Optimize"
        description="Every on-page sprint aligns user intent with algorithmic clarity across search intent, content structure, metadata, and link equity."
        deliverablesEyebrow="Specific Tasks & Deliverables"
        deliverables={ON_PAGE_OPTIMIZATION_AREAS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 4. On-Page Process */}
      <ServiceWorkflowSteps
        id="optimization-process"
        headingId="process-heading"
        eyebrow="METHODOLOGY"
        title="4-Step On-Page Optimization Framework"
        description="A systematic workflow ensuring keyword targeting, content structure, and metadata improvements translate into measurable CTR gains."
        steps={WORKFLOW_STEPS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 5. Proof Case Study */}
      <OnPageSeoProof />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 6. On-Page SEO FAQs */}
      <ServiceFaqSection
        id="on-page-faq"
        headingId="faq-heading"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="On-Page SEO Questions & Answers"
        description="Clear explanations regarding keyword targeting, content optimization workflows, and timeline expectations."
        faqs={FAQS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* Related Services Navigation */}
      <ServiceRelatedLinks
        eyebrow="RELATED DISCIPLINES"
        services={[
          {
            badge: 'Technical & Schema',
            title: 'Technical SEO & Crawl Architecture',
            desc: 'Fast crawlability, Core Web Vitals profiling, and structured JSON-LD entity graphs.',
            href: '/services/technical-seo/',
            linkText: 'View Technical SEO Scope',
          },
          {
            badge: 'Modern AI Search',
            title: 'AI Search Optimization (AEO & GEO)',
            desc: 'Direct answer structuring, entity disambiguation, and machine-readable /llms.txt feeds.',
            href: '/services/ai-search-optimization/',
            linkText: 'View AI Search Scope',
          },
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 7. Closing Conversion CTA Banner */}
      <ServiceSubpageCta
        id="contact-cta"
        headingId="final-cta-heading"
        badgeText="Intent-Driven Organic Growth • Direct Discovery Call"
        title="Ready to Match Search Intent and Drive More Organic Conversions?"
        description="Let's review your page titles, clean up keyword overlap, and structure content that satisfies searchers and search engines alike."
        primaryCtaText="Request On-Page Sprint"
        primaryCtaHref="/contact/?service=On-Page%20SEO"
      />
    </div>
  )
}
