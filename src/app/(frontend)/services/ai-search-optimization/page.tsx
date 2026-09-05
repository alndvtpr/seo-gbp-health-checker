import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import {
  ServiceSubpageHero,
  ServiceProblemsSolved,
  ServiceDeliverablesGrid,
  ServiceWorkflowSteps,
  AiSearchProof,
  ServiceFaqSection,
  ServiceRelatedLinks,
  ServiceSubpageCta,
  ServiceSectionDivider,
  AI_OPTIMIZATION_AREAS,
  AI_PARADIGM_SHIFTS,
  WORKFLOW_STEPS,
  FAQS,
  AI_SEARCH_SCHEMA,
} from '@/features/services'

export const metadata = generateMetadata({
  title: 'AI Search Optimization (AEO & GEO) | Modern Search Readiness | Alain Dave Tapiru',
  description:
    'Structure your website content, semantic entities, and data sources for better machine understanding and discoverability across Google AI Overviews, Perplexity, ChatGPT, and answer engines.',
  url: 'https://www.alaintapiru.com/services/ai-search-optimization/',
})

export default function AiSearchOptimizationPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(AI_SEARCH_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <ServiceSubpageHero
        breadcrumbName="AI Search Optimization"
        breadcrumbUrl="/services/ai-search-optimization/"
        badgeIcon="auto_awesome"
        badgeText="AI DISCOVERABILITY • AEO & GEO ARCHITECTURE"
        headingId="ai-search-hero-heading"
        title={
          <>
            <span className="font-extrabold text-on-surface">AI Search Optimization</span>{' '}
            <span className="font-medium text-on-surface/85">(AEO &amp; GEO)</span>
          </>
        }
        description="Structure your content, semantic entities, and data endpoints for clearer machine understanding across Google AI Overviews, Perplexity, ChatGPT, and answer engines."
        primaryCtaText="Prepare for AI Search"
        primaryCtaHref="/contact/?service=AI%20Search%20Optimization"
        secondaryCtaText="Explore What I Optimize ↓"
        secondaryCtaHref="#what-we-optimize"
        trustPoints={[
          'Direct Answer Synthesis (AEO)',
          'Knowledge Graph Disambiguation',
          'Machine-Readable /llms.txt Feeds',
        ]}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 2. AI Paradigm Shifts */}
      <ServiceProblemsSolved
        id="ai-paradigm-shift"
        headingId="paradigm-heading"
        eyebrow="SEARCH EVOLUTION"
        title="The Shift from 10 Blue Links to AI Answers"
        description="Modern search engines increasingly synthesize direct answers rather than serving lists of links. Sites lacking structured facts and entity clarity get overlooked."
        problems={AI_PARADIGM_SHIFTS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 3. What I Optimize */}
      <ServiceDeliverablesGrid
        id="what-we-optimize"
        headingId="optimization-areas-heading"
        eyebrow="AEO & GEO DELIVERABLES"
        title="How I Prepare Your Website for AI Discovery"
        description="From concise definition blocks to open machine-readable endpoints, I help search engines and LLM crawlers understand and reference your work."
        deliverablesEyebrow="Specific Tasks & Deliverables"
        deliverables={AI_OPTIMIZATION_AREAS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 4. AI Search Process */}
      <ServiceWorkflowSteps
        id="ai-process"
        headingId="process-heading"
        eyebrow="IMPLEMENTATION METHODOLOGY"
        title="4-Step AI Search Readiness Sprint"
        description="A structured engineering process transforming traditional web pages into structured, machine-digestible knowledge sources."
        steps={WORKFLOW_STEPS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 5. Proof Research */}
      <AiSearchProof />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 6. AI Search FAQs */}
      <ServiceFaqSection
        id="ai-search-faq"
        headingId="faq-heading"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="AI Search Optimization Questions & Answers"
        description="Transparent insights on AI citations, /llms.txt standards, and generative search readiness."
        faqs={FAQS}
      />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* Related Services Navigation */}
      <ServiceRelatedLinks
        eyebrow="RELATED DISCIPLINES"
        services={[
          {
            badge: 'Semantic Foundation',
            title: 'Technical SEO & Schema Architecture',
            desc: 'Fast crawlability, clean DOM structures, and connected JSON-LD entity graphs.',
            href: '/services/technical-seo/',
            linkText: 'View Technical SEO Scope',
          },
          {
            badge: 'Content Structure',
            title: 'On-Page SEO & Content Optimization',
            desc: 'Information architecture, clear heading outlines, and intent-focused copywriting.',
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
        badgeText="Future-Proof Your Search Visibility • Direct Discovery Call"
        title="Ready to Make Your Content Understandable to AI Search Engines?"
        description="Let's structure your data, format direct answers, and set up machine discovery endpoints so modern search engines and AI models can reference your brand accurately."
        primaryCtaText="Schedule an AI Search Audit"
        primaryCtaHref="/contact/?service=AI%20Search%20Optimization"
      />
    </div>
  )
}
