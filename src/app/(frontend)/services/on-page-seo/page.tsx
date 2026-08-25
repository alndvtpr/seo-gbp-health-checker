import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'On-Page SEO Services Philippines | Content & Keyword Optimization | Alain Dave Tapiru',
  description:
    'Professional On-Page SEO services in the Philippines. Search intent mapping, keyword clustering, semantic heading architecture, metadata CTR optimization, and strategic internal linking.',
  url: 'https://www.alaintapiru.com/services/on-page-seo/',
})

const ON_PAGE_OPTIMIZATION_AREAS = [
  {
    id: 'search-intent-keywords',
    title: 'Search Intent & Keyword Intelligence',
    icon: 'key',
    description:
      'Map commercial, informational, and transactional keywords directly to the most appropriate page types, eliminating internal competition.',
    deliverables: [
      'Search intent classification (Commercial, Informational, Transactional)',
      'Primary, secondary & semantic LSI keyword mapping',
      'Competitor content gap discovery & topic cluster planning',
      'Cannibalization resolution matrix for overlapping URLs',
    ],
  },
  {
    id: 'content-structure-headings',
    title: 'Semantic Content Architecture & Headings',
    icon: 'edit_note',
    description:
      'Organize web copy with clear H1–H3 heading hierarchies, direct answer callouts, and structured sections that both users and algorithms can digest quickly.',
    deliverables: [
      'Single H1 per page alignment with primary search intent',
      'Logical H2 & H3 hierarchy for comprehensive topic coverage',
      'Information-dense introductory hooks & direct answers',
      'Scannable bullet takeaways, tables & FAQ integration',
    ],
  },
  {
    id: 'metadata-ctr',
    title: 'Click-Optimized Title Tags & Metadata',
    icon: 'travel_explore',
    description:
      'Craft compelling, snippet-safe title tags and meta descriptions that stand out on SERPs to maximize organic click-through rates (CTR).',
    deliverables: [
      'Pixel-width safe title tags (55–60 characters) with brand anchors',
      'Action-oriented meta descriptions (150–160 characters)',
      'OpenGraph & Twitter Card metadata for social sharing',
      'CTR benchmarking & snippet testing via Google Search Console',
    ],
  },
  {
    id: 'internal-links-images',
    title: 'Strategic Internal Linking & Image SEO',
    icon: 'hub',
    description:
      'Distribute link equity strategically across high-priority commercial routes while optimizing all visual assets for search discovery.',
    deliverables: [
      'Contextual in-body internal link mesh with natural anchor text',
      'Descriptive, keyword-relevant image alt text for accessibility',
      'Image file naming convention cleanup & format optimization',
      'Orphaned content recovery & topical silo cross-linking',
    ],
  },
]

const PROBLEMS_SOLVED = [
  {
    title: 'High Impressions but Weak Click-Through Rates (CTR)',
    problem: 'Your pages rank in search results, but users scroll past due to generic, automated, or truncated title tags and vague meta descriptions.',
    solution: 'We craft human-first, value-focused metadata designed to match searcher psychology and capture higher click volume from existing rankings.',
  },
  {
    title: 'Targeting Keywords with the Wrong Search Intent',
    problem: 'Publishing blog posts for commercial buying terms, or product pages for broad research queries, causing immediate visitor bounce.',
    solution: 'We classify query intent accurately (informational vs. commercial) and align each target page format to what Google expects to rank.',
  },
  {
    title: 'Content Cannibalization & Scattered Link Equity',
    problem: 'Multiple pages targeting overlapping keywords, confusing search bots and diluting rankings between competing internal URLs.',
    solution: 'We audit your keyword matrix, consolidate duplicate topics, assign distinct canonical targets, and establish a clear parent-child linking silo.',
  },
]

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Content & Query Audit',
    desc: 'Analyzing Search Console query performance, impressions, average position, and keyword cannibalization gaps.',
  },
  {
    step: '02',
    title: 'Keyword Mapping Matrix',
    desc: 'Assigning targeted primary and secondary keyword entities to specific URLs based on commercial relevance.',
  },
  {
    step: '03',
    title: 'On-Page Optimization Tuning',
    desc: 'Optimizing titles, meta descriptions, H1–H3 hierarchies, direct answer paragraphs, and in-body internal links.',
  },
  {
    step: '04',
    title: 'CTR & Ranking Measurement',
    desc: 'Tracking organic CTR improvements and ranking position shifts across target topic clusters in Search Console.',
  },
]

const FAQS = [
  {
    question: 'How is On-Page SEO different from Technical SEO?',
    answer:
      'Technical SEO focuses on how search bots crawl, render, and index your website (crawlability, site speed, robots.txt, schema). On-Page SEO focuses on the content, keywords, headings, metadata, and internal links on each individual page to make it relevant and compelling for searchers.',
  },
  {
    question: 'Will you rewrite all of my website copy?',
    answer:
      'No. We optimize existing copy surgically, adjusting headings, introductory hooks, keyword placements, and metadata while preserving your brand voice and authentic tone.',
  },
  {
    question: 'How do you prevent keyword cannibalization?',
    answer:
      'We create a centralized keyword mapping matrix ensuring every URL on your site has one distinct primary search intent. If two pages target the exact same query, we recommend consolidating them or differentiating their topical focus.',
  },
  {
    question: 'How long does it take for on-page SEO changes to show results?',
    answer:
      'Unlike technical migrations which can take weeks to recrawl, on-page changes (such as title tag and heading optimizations) often begin showing CTR and ranking shifts within 2 to 4 weeks after Google re-indexes the page.',
  },
]

const ON_PAGE_SEO_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/on-page-seo/#service',
      name: 'On-Page SEO & Content Optimization Services',
      url: 'https://www.alaintapiru.com/services/on-page-seo/',
      serviceType: 'On-Page Search Engine Optimization',
      description:
        'Professional On-Page SEO services in the Philippines. Search intent mapping, keyword clustering, semantic heading architecture, metadata CTR optimization, and internal linking.',
      provider: {
        '@type': 'Person',
        '@id': 'https://www.alaintapiru.com/#person',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Worldwide',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'On-Page SEO Deliverables',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Search Intent & Keyword Mapping Matrix',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Click-Optimized Title Tags & Meta Descriptions',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Semantic Content & Heading Architecture',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services/on-page-seo/#faq',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
}

export default function OnPageSeoPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ON_PAGE_SEO_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <section
        aria-labelledby="on-page-seo-hero-heading"
        className="relative z-20 pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
      >
        {/* Breadcrumbs */}
        <div className="motion-reveal">
          <Breadcrumbs
            items={[
              { name: 'Services', url: '/services/' },
              { name: 'On-Page SEO', url: '/services/on-page-seo/' },
            ]}
            align="center"
            className="mb-6"
          />
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-6 motion-reveal">
          <Icon name="edit_note" size={14} className="text-primary-container" />
          <span>INTENT • RELEVANCE • ENGAGEMENT</span>
        </div>

        {/* Headline */}
        <h1
          id="on-page-seo-hero-heading"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-6 motion-reveal"
        >
          <span className="font-extrabold text-on-surface">On-Page SEO Services</span>{' '}
          <span className="font-medium text-on-surface/85">&amp; Content Optimization</span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-on-surface/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-normal motion-reveal">
          Align your website content directly with real user search intent. We optimize keyword mapping, semantic heading structures, click-focused metadata, and internal linking to turn search visibility into qualified inquiries.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto motion-reveal">
          <Link
            href="/contact/?service=On-Page%20SEO%20Optimization"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Request On-Page Optimization
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          <a
            href="#what-we-optimize"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Explore Optimization Scope ↓
          </a>
        </div>

        {/* 3-Item Trust Bar */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            'Search Intent-Aligned Mapping',
            'Zero Keyword Stuffing (Natural Copy)',
            'Topical Cluster Architecture',
          ].map((point, idx) => (
            <div
              key={point}
              style={{ transitionDelay: `${idx * 60}ms` }}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-on-surface/90 font-sans text-xs sm:text-sm font-medium motion-reveal"
            >
              <Icon name="check_circle" size={18} className="text-primary-container shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 2. Problems Solved */}
      <section
        id="problems-solved"
        aria-labelledby="problems-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            CHALLENGES SOLVED
          </span>
          <h2
            id="problems-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Why Good Content Fails to Rank and Convert
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Traffic without commercial intent produces zero inquiries. We fix search alignment, snippet presentation, and content structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS_SOLVED.map((item, idx) => (
            <div
              key={item.title}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-8 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal"
            >
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-3">
                  {item.title}
                </h3>
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                  <strong className="font-semibold block mb-0.5">The Bottleneck:</strong>
                  {item.problem}
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/85 leading-relaxed">
                  <strong className="font-semibold text-primary-container block mb-0.5">The Fix:</strong>
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 3. What I Optimize */}
      <section
        id="what-we-optimize"
        aria-labelledby="optimization-areas-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12 scroll-mt-24"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            ON-PAGE DELIVERABLES
          </span>
          <h2
            id="optimization-areas-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            What We Optimize on Every Target Page
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Every on-page sprint combines granular search intent modeling with structured HTML semantic elements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {ON_PAGE_OPTIMIZATION_AREAS.map((area, idx) => (
            <article
              key={area.id}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 group flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/20 transition-colors">
                  <Icon name={area.icon} size={26} className="text-primary-container" />
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="font-sans text-sm text-on-surface/75 leading-relaxed mb-6">
                  {area.description}
                </p>

                <div className="space-y-3 pt-5 border-t border-black/10 dark:border-white/10">
                  <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                    Key Execution Deliverables
                  </span>
                  <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface/85">
                    {area.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Icon
                          name="check_circle"
                          size={16}
                          className="text-primary-container shrink-0 mt-0.5"
                        />
                        <span className="leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 4. On-Page SEO Process */}
      <section
        id="on-page-process"
        aria-labelledby="process-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            SYSTEMATIC APPROACH
          </span>
          <h2
            id="process-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            4-Step Content Optimization Workflow
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Data-backed intent mapping ensuring every page modification produces measurable search relevance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={step.step}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-7 rounded-2xl bg-surface-1/90 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="font-heading text-2xl sm:text-3xl font-black text-primary-container/90">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5">
                    Phase 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 5. Connected Practical Proof (AngatSikat Studio) */}
      <section
        id="proof-case-study"
        aria-labelledby="proof-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/15 via-surface-1/95 to-surface-1/95 border border-primary-container/35 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-lg motion-reveal">
          <div className="lg:max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-heading text-[11px] font-bold uppercase tracking-[0.06em]">
                <Icon name="auto_awesome" size={13} />
                Live Case Study
              </span>
              <span className="text-xs font-heading font-bold text-primary-container">
                WordPress &amp; On-Page SEO
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3">
              AngatSikat Studio Content &amp; Theme Architecture
            </h3>
            <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed mb-6">
              Explore how on-page search intent and semantic HTML5 headings were unified in a custom WordPress theme build without bloated templates: 98+ mobile speed, clean crawl paths, and distinct service landing page silos.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/10 dark:border-white/10 text-center max-w-lg">
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">98+</span>
                <span className="font-sans text-[10px] text-on-surface/70">Mobile Speed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">100%</span>
                <span className="font-sans text-[10px] text-on-surface/70">Semantic HTML</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">&lt;1.2s</span>
                <span className="font-sans text-[10px] text-on-surface/70">Load Duration</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 lg:w-72">
            <Link
              href="/projects/angat-sikat-studio/"
              className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] shadow-[0_0_20px_rgba(224,123,32,0.35)] hover:shadow-[0_0_30px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] text-center"
            >
              <span>Explore AngatSikat Case Study</span>
              <Icon name="arrow_forward" size={14} className="ml-2 btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. On-Page SEO FAQs */}
      <section
        id="on-page-faq"
        aria-labelledby="faq-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="text-center max-w-3xl mx-auto motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2
            id="faq-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            On-Page SEO Questions &amp; Answers
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Clear explanations regarding keyword targeting, content optimization workflows, and timeline expectations.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={faq.question}
              style={{ transitionDelay: `${index * 60}ms` }}
              className="p-5 sm:p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 shadow-sm motion-reveal"
            >
              <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mb-2.5">
                {faq.question}
              </h3>
              <p className="font-sans text-sm sm:text-base text-on-surface/80 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Closing Conversion CTA Banner */}
      <section
        id="contact-cta"
        aria-labelledby="final-cta-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto"
      >
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-primary-container/20 via-surface-1 to-surface-1 border-2 border-primary-container/40 text-center space-y-6 sm:space-y-8 shadow-[0_0_50px_rgba(224,123,32,0.15)] motion-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-[0.08em]">
            <Icon name="check_circle" size={14} className="text-primary-container" />
            <span>Targeted Search Relevance • Free 20-Minute Strategy Call</span>
          </div>

          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready to Align Your Content with Real Search Demand?
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s map commercial keyword intent, craft click-focused metadata, and organize your headings to capture higher organic visibility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact/?service=On-Page%20SEO%20Optimization"
              aria-label="Request On-Page SEO Optimization"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Request On-Page Optimization</span>
              <Icon name="arrow_forward" size={16} className="btn-icon" />
            </Link>

            <Link
              href="/services/"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px]"
            >
              <span>Back to Services Hub</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
