import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import {
  ServiceSubpageHero,
  ServiceProblemsSolved,
  ServiceDeliverablesGrid,
  ServiceWorkflowSteps,
  TechnicalSeoProof,
  ServiceFaqSection,
  ServiceRelatedLinks,
  ServiceSubpageCta,
  ServiceSectionDivider,
} from '@/features/services'
import {
  TECHNICAL_AUDIT_AREAS,
  PROBLEMS_SOLVED,
  WORKFLOW_STEPS,
  FAQS,
  TECHNICAL_SEO_SCHEMA,
} from '@/features/services/data/technicalSeoData'

export const metadata = generateMetadata({
  title: 'Technical SEO Services Philippines | Crawlability & Speed | Alain Dave Tapiru',
  description:
    'Practical Technical SEO support in the Philippines. Find crawl bottlenecks, improve indexation signals, review Core Web Vitals, and implement appropriate JSON-LD schema.',
  url: 'https://www.alaintapiru.com/services/technical-seo/',
})

export default function TechnicalSeoPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(TECHNICAL_SEO_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <ServiceSubpageHero
        breadcrumbName="Technical SEO"
        breadcrumbUrl="/services/technical-seo/"
        badgeIcon="search_check"
        badgeText="FOUNDATION FIRST • CRAWLABILITY & ARCHITECTURE"
        headingId="technical-seo-hero-heading"
        title={
          <>
            <span className="font-extrabold text-on-surface">Technical SEO Services</span>{' '}
            <span className="font-medium text-on-surface/85">&amp; Semantic Architecture</span>
          </>
        }
        description="Find crawl and indexation roadblocks, review Core Web Vitals, and build connected JSON-LD graphs so search engines and AI crawlers can more easily discover, render, and understand your website."
        primaryCtaText="Request a Technical Audit"
        primaryCtaHref="/contact/?service=Technical%20SEO%20Audit"
        secondaryCtaText="Explore Audit Areas ↓"
        secondaryCtaHref="#what-we-audit"
        trustPoints={[
          'Manual Diagnostics (No Automated Spam)',
          'Actionable Code-Level Fixes',
          'Performance Budget Targeting',
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 2. What Technical SEO Solves */}
      <ServiceProblemsSolved
        id="problems-solved"
        headingId="problems-heading"
        eyebrow="BOTTLENECKS ELIMINATED"
        title="Common Technical Roadblocks I Can Help Resolve"
        description="Content and backlinks cannot perform if search engines are blocked by server latency, broken directives, or crawl traps."
        problems={PROBLEMS_SOLVED}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 3. What I Audit & Optimize */}
      <ServiceDeliverablesGrid
        id="what-we-audit"
        headingId="audit-areas-heading"
        eyebrow="CORE AUDIT CRITERIA"
        title="What I Inspect, Diagnose & Improve"
        description="Every technical audit covers server health, indexability directives, rendering pipelines, and semantic schema architectures."
        deliverablesEyebrow="Specific Checks & Deliverables"
        deliverables={TECHNICAL_AUDIT_AREAS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 4. Technical SEO Process */}
      <ServiceWorkflowSteps
        id="audit-process"
        headingId="process-heading"
        eyebrow="METHODOLOGY"
        title="4-Step Technical Audit Sprint"
        description="A structured workflow ensuring every critical technical issue is documented, prioritized, and resolved with validation."
        steps={WORKFLOW_STEPS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 5. Tools & Practical Proof Case Study */}
      <TechnicalSeoProof />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 6. Technical SEO FAQs */}
      <ServiceFaqSection
        id="technical-seo-faq"
        headingId="faq-heading"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Technical SEO Questions & Answers"
        description="Direct answers regarding technical crawl diagnostics, implementation timelines, and code-level fixes."
        faqs={FAQS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* Related Services Navigation */}
      <ServiceRelatedLinks
        eyebrow="RELATED DISCIPLINES"
        services={[
          {
            badge: 'Next.js & WordPress',
            title: 'SEO-Ready Web Design & Development',
            desc: 'Code-first Next.js apps and custom WordPress themes engineered with reserved layout space and layout-shift checks.',
            href: '/services/web-development/',
            linkText: 'View Web Development Scope',
          },
          {
            badge: 'Content & Metadata',
            title: 'On-Page SEO & Content Optimization',
            desc: 'Search intent mapping, semantic heading outlines, and click-optimized metadata.',
            href: '/services/on-page-seo/',
            linkText: 'View On-Page SEO Scope',
          },
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 7. Closing Conversion CTA Banner */}
      <ServiceSubpageCta
        id="contact-cta"
        headingId="final-cta-heading"
        badgeText="Ready for a clean crawl foundation • Direct Discovery Call"
        title="Ready to Fix Technical Bottlenecks and Accelerate Crawl Velocity?"
        description="Let's diagnose indexing roadblocks, fix slow Core Web Vitals, and implement clean structured schema across your web architecture."
        primaryCtaText="Request a Technical Audit"
        primaryCtaHref="/contact/?service=Technical%20SEO%20Audit"
      />
    </div>
  )
}
