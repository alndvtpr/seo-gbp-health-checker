import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'AI Search Optimization (AEO & GEO) | Modern Search Readiness | Alain Dave Tapiru',
  description:
    'Structure your website content, semantic entities, and data sources for better machine understanding and discoverability across Google AI Overviews, Perplexity, ChatGPT, and answer engines.',
  url: 'https://www.alaintapiru.com/services/ai-search-optimization/',
})

const AI_OPTIMIZATION_AREAS = [
  {
    id: 'answer-engine-structuring',
    title: 'Answer-Oriented Content Structuring (AEO)',
    icon: 'auto_awesome',
    description:
      'Format key content sections into concise, direct answers and scannable summaries that search algorithms can readily extract for Featured Snippets and AI Overviews.',
    deliverables: [
      'Direct definition blocks (40–60 words) targeting question queries',
      'Step-by-step process breakdowns & comparative data tables',
      'FAQ and "People Also Ask" conversational answer formatting',
      'Clear topical summaries positioned above the fold',
    ],
  },
  {
    id: 'entity-knowledge-graph',
    title: 'Entity Disambiguation & Knowledge Graph Mapping',
    icon: 'dataset',
    description:
      'Connect your brand, leadership, and services to authoritative Knowledge Graph nodes so LLMs clearly understand what your business does and who operates it.',
    deliverables: [
      'Nested Schema.org entity graphs (Organization, Person, Service)',
      'SameAs disambiguation linking to Wikidata, LinkedIn & official profiles',
      'Topical subject mapping using about and mentions schema properties',
      'Brand attribute consistency across key public web touchpoints',
    ],
  },
  {
    id: 'information-density-sources',
    title: 'Information Density & Source Attribution (GEO)',
    icon: 'travel_explore',
    description:
      'Eliminate shallow filler copy in favor of information-dense, source-citable statements supported by original data, case studies, and clear author credentials.',
    deliverables: [
      'Data-dense paragraph restructuring with clear factual citations',
      'Author entity credentials & experience attribution (E-E-A-T)',
      'Primary source linking & structured reference blocks',
      'Jargon-free, authoritative topical coverage across core themes',
    ],
  },
  {
    id: 'machine-discoverability-llmstxt',
    title: 'Machine Discoverability & /llms.txt Endpoints',
    icon: 'code_blocks',
    description:
      'Implement open machine-readable standards like /llms.txt and clean rendered HTML so automated AI agents and crawler bots can parse your knowledge base easily.',
    deliverables: [
      'Deployment of /llms.txt and /llms-full.txt markdown endpoints',
      'Robots.txt AI crawler permission management (GPTBot, Perplexity, ClaudeBot)',
      'Server-side rendered HTML optimization for script-deferred bots',
      'Structured XML and RSS delta feed synchronization for fast ingestion',
    ],
  },
]

const AI_PARADIGM_SHIFTS = [
  {
    title: 'From Keyword Strings to Semantic Entities',
    problem: 'Traditional keyword stuffing is ineffective for modern LLMs that understand context, entity relationships, and topical authority.',
    solution: 'We structure your content around named entities, semantic topics, and clear subject relationships that machines can map without ambiguity.',
  },
  {
    title: 'Direct Answer Synthesis Over Blue Links',
    problem: 'Searchers increasingly receive synthesized summaries in Google AI Overviews and conversational engines before scrolling to standard search results.',
    solution: 'We format your content with information-dense definitions and structured tables engineered for direct extraction and citation.',
  },
  {
    title: 'Verifiable Evidence & Source Attribution',
    problem: 'AI models prioritize sources with verifiable facts, clear author authority, and distinct first-hand experience rather than generic regurgitated copy.',
    solution: 'We integrate transparent case study proof, explicit author credentials, and verifiable technical data into your key commercial pages.',
  },
]

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Entity & Content Density Audit',
    desc: 'Evaluating existing content structure, heading clarity, entity connections, and factual density across target routes.',
  },
  {
    step: '02',
    title: 'AEO Content Restructuring',
    desc: 'Rewriting key sections with direct answer hooks, comparative tables, scannable lists, and verified source citations.',
  },
  {
    step: '03',
    title: 'Schema Graph Disambiguation',
    desc: 'Implementing unified JSON-LD schema graphs connecting business, person, service, and topical entities.',
  },
  {
    step: '04',
    title: 'Machine Feed & /llms.txt Deployment',
    desc: 'Setting up machine-readable discovery endpoints and verifying crawler access across major AI agent user agents.',
  },
]

const FAQS = [
  {
    question: 'Can you guarantee that ChatGPT, Perplexity, or Google AI Overviews will cite my site?',
    answer:
      'No. Generative AI engines and LLMs operate probabilistically and synthesize responses dynamically based on real-time queries. No legitimate consultant can promise or guarantee specific AI citations. What we do is optimize your website’s factual structure, entity clarity, schema, and machine-readable feeds so AI engines can easily read, parse, and attribute your content when answering relevant queries.',
  },
  {
    question: 'What is the difference between traditional SEO, AEO, and GEO?',
    answer:
      'Traditional SEO optimizes pages to rank in search engine results pages (SERPs). AEO (Answer Engine Optimization) structures content for quick, direct answers like Featured Snippets and "People Also Ask" boxes. GEO (Generative Engine Optimization) organizes facts, entities, and data sources so generative AI models (such as ChatGPT, Perplexity, and Google AI Overviews) can accurately understand and reference your brand.',
  },
  {
    question: 'What is the /llms.txt file format and why is it useful?',
    answer:
      '/llms.txt is an emerging web standard (similar to robots.txt or sitemap.xml) that provides a clean, markdown-formatted directory of your website’s most important information, designed specifically for AI models and automated agents to read without parsing complex HTML layouts.',
  },
  {
    question: 'Does AI search optimization replace traditional SEO?',
    answer:
      'No. AI search optimization builds on top of strong technical SEO, fast crawlability, clean semantic HTML, and high-quality content. Traditional search and generative search share the same core foundation: speed, clear structure, and verified topical relevance.',
  },
]

const AI_SEARCH_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/ai-search-optimization/#service',
      name: 'AI Search Optimization & Generative Engine Readiness (AEO & GEO)',
      url: 'https://www.alaintapiru.com/services/ai-search-optimization/',
      serviceType: 'Answer Engine & Generative Engine Optimization',
      description:
        'Structure your website content, semantic entities, and data sources for better machine understanding and discoverability across modern AI search experiences.',
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
        name: 'AI Search & AEO/GEO Deliverables',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Answer Engine Optimization (AEO) Content Structuring',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Entity Disambiguation & Knowledge Graph Schema',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Machine Discoverability & /llms.txt Endpoints',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services/ai-search-optimization/#faq',
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

export default function AiSearchOptimizationPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(AI_SEARCH_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <section
        aria-labelledby="ai-search-hero-heading"
        className="relative z-20 pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
      >
        {/* Breadcrumbs */}
        <div className="motion-reveal">
          <Breadcrumbs
            items={[
              { name: 'Services', url: '/services/' },
              { name: 'AI Search Optimization', url: '/services/ai-search-optimization/' },
            ]}
            align="center"
            className="mb-6"
          />
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-6 motion-reveal">
          <Icon name="auto_awesome" size={14} className="text-primary-container" />
          <span>MACHINE UNDERSTANDING • ENTITIES • AEO &amp; GEO</span>
        </div>

        {/* Headline */}
        <h1
          id="ai-search-hero-heading"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-6 motion-reveal"
        >
          <span className="font-extrabold text-on-surface">AI Search Optimization</span>{' '}
          <span className="font-medium text-on-surface/85">&amp; Generative Readiness (AEO &amp; GEO)</span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-on-surface/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-normal motion-reveal">
          Optimize your website&apos;s structure, entities, and factual content for better machine understanding and discoverability across Google AI Overviews, Perplexity, ChatGPT search, and traditional answer engines.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto motion-reveal">
          <Link
            href="/contact/?service=AI%20Search%20Readiness%20Sprint"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Request AI Readiness Review
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          <a
            href="#what-we-optimize"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Explore AEO &amp; GEO Scope ↓
          </a>
        </div>

        {/* 3-Item Trust Bar */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            'Source-Citable Content Formatting',
            'Entity & Knowledge Graph Alignment',
            'Realistic, Non-Guaranteed Methodologies',
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

      {/* 2. The AI Search Paradigm Shift */}
      <section
        id="ai-paradigm-shifts"
        aria-labelledby="paradigm-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            THE EVOLUTION OF SEARCH
          </span>
          <h2
            id="paradigm-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Why AI Search Requires a New Content Strategy
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Generative engines synthesize answers from trusted entities rather than counting keyword occurrences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_PARADIGM_SHIFTS.map((item, idx) => (
            <div
              key={item.title}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-8 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg motion-reveal"
            >
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-3">
                  {item.title}
                </h3>
                <div className="p-3.5 rounded-xl bg-primary-container/10 border border-primary-container/20 text-on-surface/90 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                  <strong className="font-semibold block mb-0.5 text-primary-container">The Challenge:</strong>
                  {item.problem}
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/85 leading-relaxed">
                  <strong className="font-semibold text-primary-container block mb-0.5">Our Optimization:</strong>
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
            CAPABILITIES &amp; DELIVERABLES
          </span>
          <h2
            id="optimization-areas-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            How We Structure Content for AI Discoverability
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            From direct definition formatting to machine-readable /llms.txt endpoints and connected entity graphs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {AI_OPTIMIZATION_AREAS.map((area, idx) => (
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
                    Key Deliverables
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

      {/* 4. AI Search Readiness Process */}
      <section
        id="ai-process"
        aria-labelledby="process-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            DELIVERY PROCESS
          </span>
          <h2
            id="process-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            4-Step AI Optimization Framework
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            A methodical sprint designed to turn ambiguous content into structured, machine-citable knowledge bases.
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

      {/* 5. Connected Technical Guides & Proof */}
      <section
        id="guides-proof"
        aria-labelledby="guides-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/15 via-surface-1/95 to-surface-1/95 border border-primary-container/35 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-lg motion-reveal">
          <div className="lg:max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-heading text-[11px] font-bold uppercase tracking-[0.06em]">
                <Icon name="auto_awesome" size={13} />
                Technical Research &amp; Guides
              </span>
              <span className="text-xs font-heading font-bold text-primary-container">
                AEO &amp; GEO Methodology
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3">
              Schema Entity Graphs &amp; 2026 Generative Search
            </h3>
            <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed mb-6">
              Read our deep-dive architectural guide on structuring connected Schema.org entity graphs, managing machine discoverability via /llms.txt, and navigating zero-click AI search experiences.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface font-heading text-xs font-semibold">
                Entity Disambiguation
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface font-heading text-xs font-semibold">
                Machine /llms.txt Standard
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface font-heading text-xs font-semibold">
                Google AI Overviews
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3 lg:w-72">
            <Link
              href="/blog/schema-entity-graphs-generative-search-aeo-geo/"
              className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] shadow-[0_0_20px_rgba(224,123,32,0.35)] hover:shadow-[0_0_30px_rgba(224,123,32,0.5)] btn-motion min-h-[46px] text-center"
            >
              <span>Read Schema Entity Guide</span>
              <Icon name="arrow_forward" size={14} className="ml-2 btn-icon" />
            </Link>

            <Link
              href="/blog/is-seo-dead-2026/"
              className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary-container/40 bg-black/5 dark:bg-white/5 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] btn-motion min-h-[44px] text-center"
            >
              <span>Is SEO Dead in 2026?</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. AI Search FAQs */}
      <section
        id="ai-search-faq"
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
            AI Search Optimization Questions &amp; Answers
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Transparent insights on AI citations, /llms.txt standards, and generative search readiness.
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
            <span>Future-Proof Your Search Presence • Direct Discovery Call</span>
          </div>

          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready to Prepare Your Content for Generative AI Search?
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s structure your entity graph, format direct answer content, and deploy machine-readable discoverability across your domain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact/?service=AI%20Search%20Readiness%20Sprint"
              aria-label="Request an AI Search Readiness Review"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Request AI Readiness Review</span>
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
