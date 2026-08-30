import React from 'react'
import Link from 'next/link'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'Local SEO Services Philippines | Google Business Profile Optimization | Alain Dave Tapiru',
  description:
    'Practical Local SEO support in the Philippines. Google Business Profile review, 10-point signal diagnostics, local landing page structure, and citation consistency.',
  url: 'https://www.alaintapiru.com/services/local-seo/',
})

const LOCAL_OPTIMIZATION_AREAS = [
  {
    id: 'gbp-optimization',
    title: 'Google Business Profile (GBP) Calibration',
    icon: 'location_on',
    description:
      'Audit and optimize your Google Business Profile to ensure primary categories, attributes, operating hours, and photo assets send strong local trust signals.',
    deliverables: [
      'Primary & secondary category taxonomy alignment',
      'Profile attribute completeness and description review',
      'High-resolution geotag-safe photo uploads & visual guidelines',
      'Special hours, holiday schedules & operational status verification',
    ],
  },
  {
    id: 'local-citations-nap',
    title: 'NAP Consistency & Citation Structuring',
    icon: 'distance',
    description:
      'Standardize your business Name, Address, and Phone number (NAP) across key Philippine and international business directories to prevent algorithmic confusion.',
    deliverables: [
      'NAP consistency audit across websites, socials & directories',
      'Duplicate listing identification & resolution guidance',
      'Relevant local directory citation setup',
      'Google Maps pin placement & service area boundary verification',
    ],
  },
  {
    id: 'local-landing-pages',
    title: 'Geo-Targeted Landing Pages & Schema',
    icon: 'dataset',
    description:
      'Build useful local service pages with appropriate structured data when the business details and schema eligibility are verified.',
    deliverables: [
      'Eligible local business markup using verified location details',
      'City/municipality-specific service area landing page outlines',
      'Localized heading structure and geographic keyword integration',
      'Interactive Google Maps embed integration with zero performance penalty',
    ],
  },
  {
    id: 'reviews-local-engagement',
    title: 'Review Momentum & Local Engagement',
    icon: 'travel_explore',
    description:
      'Implement practical, authentic systems for capturing steady customer reviews, optimizing keyword-rich review responses, and managing local Q&A sections.',
    deliverables: [
      'Ethical review acquisition framework (direct shortlink generation)',
      'Strategic keyword-aligned review response templates',
      'Google Q&A seeding with high-frequency customer queries',
      'Negative review mitigation and resolution workflows',
    ],
  },
]

const PROBLEMS_SOLVED = [
  {
    title: 'Missing from the Google Maps 3-Pack',
    problem: 'Nearby customers search for your exact services, but your business does not appear in the top 3 Map Pack results due to category mismatches or weak profile signals.',
    solution: 'I review 10 public GBP signals, check the primary category, and identify profile fields that may need correction or completion.',
  },
  {
    title: 'Inconsistent Address & Phone Information',
    problem: 'Conflicting phone numbers, old addresses, or mismatched business names across web directories confuse search engines and damage local trust.',
    solution: 'I conduct a NAP audit, standardize the verified business details, and identify external citations that need correction.',
  },
  {
    title: 'Serving Multiple Locations with Only One Generic Page',
    problem: 'A business serves several nearby cities or regions but attempts to rank with a single generic homepage without location-specific signals.',
    solution: 'I structure local service-area pages and add location markup only when the business details and eligibility are verified.',
  },
]

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: '10-Point GBP Diagnostic Scan',
    desc: 'Scanning your live Google Business Profile with my diagnostic tool to review status, ratings, reviews, photos, and categories.',
  },
  {
    step: '02',
    title: 'Category & Profile Optimization',
    desc: 'Aligning primary and secondary categories, completing business attributes, and optimizing descriptions for local search relevance.',
  },
  {
    step: '03',
    title: 'Local Schema & Page Architecture',
    desc: 'Implementing appropriate local structured data only when verified details and schema eligibility support it.',
  },
  {
    step: '04',
    title: 'Citation & Review Roadmap',
    desc: 'Delivering a structured 30-day action plan for relevant citations, review responses, and profile improvements.',
  },
]

const FAQS = [
  {
    question: 'Can you guarantee a #1 ranking in Google Maps or the Local Pack?',
    answer:
      'No legitimate SEO specialist can guarantee #1 rankings on Google Maps. Local results depend on proximity, relevance, and prominence. I can improve controllable profile and website signals, but location, competition, and Google’s systems still affect what each searcher sees.',
  },
  {
    question: 'How does the free GBP Health Checker tool work?',
    answer:
      'My self-built GBP Health Checker uses public Places data to review 10 profile indicators: operational status, website link, phone, address, operating hours, categories, rating, review count, photos, and map pack presence. It produces a heuristic 100-point score and action plan.',
  },
  {
    question: 'Do I need a physical storefront address to do Local SEO?',
    answer:
      'Not necessarily. If you operate as a Service Area Business (SAB) where you travel to customers (e.g., consultants, plumbers, cleaning services), you can hide your residential address on Google and define specific service area radius boundaries.',
  },
  {
    question: 'What is the difference between primary and secondary categories?',
    answer:
      'Your primary category carries the heaviest algorithmic weight in Google Maps rankings and directly influences which queries trigger your profile. Secondary categories help broaden your reach for secondary services you offer.',
  },
]

const LOCAL_SEO_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/local-seo/#service',
      name: 'Local SEO & Google Business Profile Optimization Services',
      url: 'https://www.alaintapiru.com/services/local-seo/',
      serviceType: 'Local Search Engine Optimization',
      description:
        'Professional Local SEO services in the Philippines. Google Business Profile setup, 10-point signal diagnostics, local landing page architecture, and citation consistency.',
      provider: {
        '@type': 'Person',
        '@id': 'https://www.alaintapiru.com/#person',
      },
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
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Local SEO Deliverables',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Google Business Profile Diagnostic & Calibration',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Eligible Local Business Markup & Local Landing Pages',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'NAP Consistency & Citation Structuring',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services/local-seo/#faq',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/services/local-seo/#breadcrumbs',
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
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Local SEO',
          item: 'https://www.alaintapiru.com/services/local-seo/',
        },
      ],
    },
  ],
}

export default function LocalSeoPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(LOCAL_SEO_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <section
        aria-labelledby="local-seo-hero-heading"
        className="relative z-20 pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
      >
        {/* Breadcrumbs */}
        <div className="motion-reveal">
          <Breadcrumbs
            items={[
              { name: 'Services', url: '/services/' },
              { name: 'Local SEO', url: '/services/local-seo/' },
            ]}
            align="center"
            className="mb-6"
            showJsonLd={false}
          />
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-6 motion-reveal">
          <Icon name="location_on" size={14} className="text-primary-container" />
          <span>LOCAL SEARCH • GOOGLE BUSINESS PROFILE &amp; MAP PACK</span>
        </div>

        {/* Headline */}
        <h1
          id="local-seo-hero-heading"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-6 motion-reveal"
        >
          <span className="font-extrabold text-on-surface">Local SEO Services</span>{' '}
          <span className="font-medium text-on-surface/85">&amp; Google Business Profile Optimization</span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-on-surface/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-normal motion-reveal">
          Help nearby searchers find clearer, more consistent business information. I review your Google Business Profile, identify category and NAP inconsistencies, and structure useful local landing pages.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto motion-reveal">
          <Link
            href="/tools/#gbp-checker"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Run Free 10-Point GBP Audit
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          <Link
            href="/contact/?service=Local%20SEO%20Optimization"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-black/15 dark:border-white/15 hover:border-primary-container/50 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Inquire About Local SEO Sprints
          </Link>
        </div>

        {/* 3-Item Trust Bar */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            '10-Point Live Signal Diagnostic',
            'Primary & Secondary Category Tuning',
            'Zero Artificial Ranking Guarantees',
          ].map((point, idx) => (
            <div
              key={point}
              style={{ transitionDelay: `${idx * 60}ms` }}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-on-surface/90 font-sans text-xs sm:text-sm font-medium motion-reveal"
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
        id="local-problems"
        aria-labelledby="problems-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            LOCAL VISIBILITY GAPS
          </span>
          <h2
            id="problems-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Why Local Customers Can’t Find Your Business
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Local searchers have high commercial intent. Missing profile details or inaccurate categories divert customers directly to competitors.
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
            LOCAL SEO CAPABILITIES
          </span>
          <h2
            id="optimization-areas-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            What I Review for Local Search Visibility
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            From your Google Maps presence to eligible on-site local business markup, I check that published details are supported and consistent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {LOCAL_OPTIMIZATION_AREAS.map((area, idx) => (
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
                    Specific Tasks &amp; Deliverables
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

      {/* 4. Local SEO Process */}
      <section
        id="local-process"
        aria-labelledby="process-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            SPRINT METHODOLOGY
          </span>
          <h2
            id="process-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            4-Step Local Optimization Framework
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            A concrete process connecting automated diagnostic scans with manual category tuning and structured schema.
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

      {/* 5. Interactive Tool & Case Study Proof */}
      <section
        id="proof-tool"
        aria-labelledby="proof-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/15 via-surface-1/95 to-surface-1/95 border border-primary-container/35 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-lg motion-reveal">
          <div className="lg:max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-heading text-[11px] font-bold uppercase tracking-[0.06em]">
                <Icon name="auto_awesome" size={13} />
                Self-Initiated Diagnostic Tool
              </span>
              <span className="text-xs font-heading font-bold text-primary-container">
                Interactive Diagnostic Build
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3">
              Local SEO &amp; Google Business Profile Health Checker
            </h3>
            <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed mb-6">
              Try my live Google Business Profile signal checker built with Next.js, Serper Places API, and Google AI Studio. It reviews 10 public profile indicators and prepares a 30-day action plan.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/10 dark:border-white/10 text-center max-w-lg">
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">10</span>
                <span className="font-sans text-[10px] text-on-surface/70">Signal Vectors</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">3.2s</span>
                <span className="font-sans text-[10px] text-on-surface/70">Audit Runtime</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-container block">100pt</span>
                <span className="font-sans text-[10px] text-on-surface/70">Health Scoring</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3 lg:w-72">
            <Link
              href="/tools/#gbp-checker"
              className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] shadow-[0_0_20px_rgba(224,123,32,0.35)] hover:shadow-[0_0_30px_rgba(224,123,32,0.5)] btn-motion min-h-[46px] text-center"
            >
              <span>Launch Diagnostic Tool</span>
              <Icon name="arrow_forward" size={14} className="ml-2 btn-icon" />
            </Link>

            <Link
              href="/projects/local-seo-gbp-checker/"
              className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary-container/40 bg-black/5 dark:bg-white/5 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] btn-motion min-h-[44px] text-center"
            >
              <span>Read Tool Case Study</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. Local SEO FAQs */}
      <section
        id="local-faq"
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
            Local SEO Questions &amp; Answers
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Clear, practical guidance on Google Business Profile management, local categories, and rankings.
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

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* Related Services Navigation */}
      <section className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold">
            RELATED DISCIPLINES
          </span>
          <Link
            href="/services/"
            className="text-xs font-heading font-semibold text-on-surface/70 hover:text-primary-container transition-colors flex items-center gap-1"
          >
            <span>All Services Hub</span>
            <Icon name="arrow_forward" size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/services/on-page-seo/"
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm motion-reveal"
          >
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container mb-2 block">Local Content &amp; Headings</span>
              <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                On-Page SEO &amp; Content Optimization
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                Local keyword mapping, city-level landing page copy, and CTR-focused metadata.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>View On-Page SEO Scope</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/services/technical-seo/"
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm motion-reveal"
          >
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container mb-2 block">Local Business Markup</span>
              <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                Technical SEO &amp; Schema Architecture
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                Structured local-search markup, privacy-appropriate location data, and measured mobile performance.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>View Technical SEO Scope</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 7. Closing Conversion CTA Banner */}
      <section
        id="contact-cta"
        aria-labelledby="final-cta-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto"
      >
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-primary-container/20 via-surface-1 to-surface-1 border-2 border-primary-container/40 text-center space-y-6 sm:space-y-8 shadow-[0_0_50px_rgba(224,123,32,0.15)] motion-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-[0.08em]">
            <Icon name="check_circle" size={14} className="text-primary-container" />
            <span>Turn Local Searches Into Inquiries • Direct Discovery Call</span>
          </div>

          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready to Improve Your Local Search Visibility and Google Maps Presence?
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s review your Google Business Profile signals, check your categories, and add appropriate local structured data where the verified business details support it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact/?service=Local%20SEO%20Optimization"
              aria-label="Request Local SEO Optimization"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Request Local SEO Sprint</span>
              <Icon name="arrow_forward" size={16} className="btn-icon" />
            </Link>

            <Link
              href="/services/"
              className="inline-flex items-center justify-center gap-2 border border-black/15 dark:border-white/15 hover:border-primary-container/50 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px]"
            >
              <span>Back to Services Hub</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
