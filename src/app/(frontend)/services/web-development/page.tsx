import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import {
  ServiceSubpageHero,
  ServiceProblemsSolved,
  ServiceDeliverablesGrid,
  ServiceWorkflowSteps,
  WebDevProof,
  ServiceFaqSection,
  ServiceRelatedLinks,
  ServiceSubpageCta,
  ServiceSectionDivider,
} from '@/features/services'
import {
  WEB_DEV_CAPABILITIES,
  COMMON_DEV_PITFALLS,
  WORKFLOW_STEPS,
  FAQS,
  WEB_DEV_SCHEMA,
} from '@/features/services/data/webDevData'

export const metadata = generateMetadata({
  title: 'SEO-Ready Web Design & Development | Next.js & WordPress | Alain Dave Tapiru',
  description:
    'Practical, SEO-ready web design and development. Code-first Next.js App Router builds and custom WordPress themes with clean code and search crawlability.',
  url: 'https://www.alaintapiru.com/services/web-development/',
})

export default function WebDevelopmentPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(WEB_DEV_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <ServiceSubpageHero
        breadcrumbName="Web Development"
        breadcrumbUrl="/services/web-development/"
        badgeIcon="code_blocks"
        badgeText="CODE-FIRST ENGINEERING • NEXT.JS & WORDPRESS"
        headingId="web-dev-hero-heading"
        title={
          <>
            <span className="font-extrabold text-on-surface">SEO-Ready Web Design</span>{' '}
            <span className="font-medium text-on-surface/85">&amp; Development</span>
          </>
        }
        description="High-performance websites built from scratch with modern Next.js App Router and custom WordPress themes. Engineered with clean semantic markup, fast Core Web Vitals, and built-in search architecture."
        primaryCtaText="Discuss a Web Project"
        primaryCtaHref="/contact/?service=Web%20Design%20%26%20Development"
        secondaryCtaText="Explore Capabilities ↓"
        secondaryCtaHref="#capabilities"
        trustPoints={[
          'Code-First (Zero Heavy Page Builders)',
          'Fast Core Web Vitals Targets',
          'Built-in Schema & Analytics',
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 2. Pitfalls Solved */}
      <ServiceProblemsSolved
        id="dev-pitfalls"
        headingId="pitfalls-heading"
        eyebrow="COMMON WEB DEVELOPMENT FLAWS"
        title="Why Most Websites Fail to Perform in Search"
        description="Generic templates and bloated drag-and-drop builders often compromise speed, layout stability, and crawlability."
        problems={COMMON_DEV_PITFALLS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 3. Capabilities */}
      <ServiceDeliverablesGrid
        id="capabilities"
        headingId="capabilities-heading"
        eyebrow="DEVELOPMENT CAPABILITIES"
        title="Full-Stack Web Engineering with SEO in Mind"
        description="Every website I build combines clean design aesthetics, modular code architecture, and high search engine discoverability."
        deliverablesEyebrow="Specific Deliverables"
        deliverables={WEB_DEV_CAPABILITIES}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 4. Development Process */}
      <ServiceWorkflowSteps
        id="dev-process"
        headingId="process-heading"
        eyebrow="ENGINEERING WORKFLOW"
        title="4-Step Web Development Sprint"
        description="From initial wireframes to production deployment and analytics calibration, every step follows strict quality standards."
        steps={WORKFLOW_STEPS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 5. Live Technical Proofs */}
      <WebDevProof />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 6. Web Development FAQs */}
      <ServiceFaqSection
        id="web-dev-faq"
        headingId="faq-heading"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Web Design & Development Questions & Answers"
        description="Transparent details on tech stacks, content management dashboards, and performance guarantees."
        faqs={FAQS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* Related Services Navigation */}
      <ServiceRelatedLinks
        eyebrow="RELATED DISCIPLINES"
        services={[
          {
            badge: 'Search Architecture',
            title: 'Technical SEO & Crawl Optimization',
            desc: 'Fast crawlability, Core Web Vitals profiling, and structured JSON-LD entity graphs.',
            href: '/services/technical-seo/',
            linkText: 'View Technical SEO Scope',
          },
          {
            badge: 'Content Architecture',
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
        badgeText="Code-First Web Craft • Direct Discovery Call"
        title="Ready to Build a Fast, SEO-Engineered Website That Converts?"
        description="Let's build a modern Next.js application or custom WordPress theme engineered for search speed, brand credibility, and measurable growth."
        primaryCtaText="Start Your Project"
        primaryCtaHref="/contact/?service=Web%20Design%20%26%20Development"
      />
    </div>
  )
}
