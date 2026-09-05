import type { ServiceDeliverableArea, ServiceProblem, ServiceWorkflowStep, ServiceFaq } from '../types'

export const TECHNICAL_AUDIT_AREAS: ServiceDeliverableArea[] = [
  {
    id: 'crawlability-indexation',
    title: 'Crawlability & Indexation Architecture',
    icon: 'search_check',
    description:
      'Ensure search engine bots and AI crawlers can discover, crawl, and index your critical pages without running into crawl traps or wasted budget.',
    deliverables: [
      'Robots.txt directive auditing & AI crawler permissions',
      'XML sitemap validation, segmentation & canonical alignment',
      'HTTP status code cleanup (301 chains, 302s, 404s, 500 errors)',
      'Noindex, nofollow, and meta robots directive inspection',
      'Pagination, parameter handling & faceted navigation control',
    ],
  },
  {
    id: 'core-web-vitals',
    title: 'Core Web Vitals & Speed Optimization',
    icon: 'monitoring',
    description:
      'Profile real-world loading speed, interactivity, and visual stability to pass Google’s Core Web Vitals benchmarks across mobile and desktop.',
    deliverables: [
      'Largest Contentful Paint (LCP) resource discovery optimization',
      'Cumulative Layout Shift (CLS) elimination & image pipeline fixes',
      'Interaction to Next Paint (INP) & JavaScript execution audit',
      'Font preloading, render-blocking CSS & critical asset hygiene',
      'Server response time (TTFB) & HTTP caching header review',
    ],
  },
  {
    id: 'structured-data',
    title: 'Semantic Schema & JSON-LD Entity Graph',
    icon: 'dataset',
    description:
      'Implement connected Schema.org structured data so search engines and generative AI models understand your business, offerings, and author entities.',
    deliverables: [
      'Custom JSON-LD implementation (Organization, Person, Service, Article)',
      'Google Rich Results validation & syntax error resolution',
      'Knowledge Graph entity disambiguation via sameAs linking',
      'FAQPage, BreadcrumbList, and ItemList schema structuring',
      'LLM machine discoverability preparation via /llms.txt standard',
    ],
  },
  {
    id: 'site-architecture',
    title: 'Site Hierarchy & Internal Link Mesh',
    icon: 'hub',
    description:
      'Reorganize URL structure and contextual internal linking to ensure high-priority commercial pages receive optimal search equity.',
    deliverables: [
      'Click-depth optimization (keeping critical pages ≤ 3 clicks)',
      'Orphaned page identification & contextual link recovery',
      'Topical cluster internal link mapping & anchor text distribution',
      'Canonical tag auditing to eliminate internal self-cannibalization',
      'Clean semantic URL directory structure normalization',
    ],
  },
]

export const PROBLEMS_SOLVED: ServiceProblem[] = [
  {
    title: 'Pages Not Indexing or Dropping from SERPs',
    problem: 'Search engines are ignoring new pages, displaying "Crawled - currently not indexed", or dropping established URLs due to low crawl priority or soft 404s.',
    solution: 'I audit crawl paths, resolve canonical conflicts, clean up sitemap inconsistencies, and direct internal links toward priority URLs.',
  },
  {
    problem: 'Slow mobile speeds, unstable layouts, and heavy script payloads hurt user experience, driving up bounce rates and pulling down organic rankings.',
    title: 'Poor Mobile Performance & Core Web Vitals',
    solution: 'I identify render-blocking bottlenecks, reserve image dimensions to reduce layout movement, and defer non-critical JavaScript where appropriate.',
  },
  {
    problem: 'Search engines and AI answer engines cannot distinguish your brand, services, or author credentials due to missing or invalid structured data.',
    title: 'Missing Rich Snippets & Zero Entity Clarity',
    solution: 'I write custom JSON-LD graphs that connect supported business, service, author, and credential entities without adding claims the page cannot verify.',
  },
]

export const WORKFLOW_STEPS: ServiceWorkflowStep[] = [
  {
    step: '01',
    title: 'Technical SEO Audit',
    desc: 'Deep multi-crawler scan analyzing status codes, directives, rendering behavior, and sitemap integrity.',
  },
  {
    step: '02',
    title: 'Prioritized 30-Day Fix Blueprint',
    desc: 'Actionable breakdown categorizing issues into Critical Roadblocks, Speed Optimizations, and Entity Enhancements.',
  },
  {
    step: '03',
    title: 'Direct Code & Schema Execution',
    desc: 'Ready-to-deploy JSON-LD scripts, robots.txt directives, redirect maps, and code optimization recommendations.',
  },
  {
    step: '04',
    title: 'Search Console Re-crawl & Validation',
    desc: 'Submitting updated sitemaps, verifying rich results, and benchmarking live PageSpeed improvements.',
  },
]

export const TECH_STACK_TOOLS: string[] = [
  'Google Search Console',
  'Screaming Frog SEO Spider',
  'PageSpeed Insights',
  'Chrome DevTools Profiler',
  'Schema.org Validator',
  'Next.js App Router',
  'WordPress Core',
  'Cloudflare / Security Headers',
]

export const FAQS: ServiceFaq[] = [
  {
    question: 'How long does a technical SEO audit take?',
    answer:
      'A thorough technical audit typically takes 3 to 5 business days depending on site size and complexity. You receive an executive summary, a prioritized fix checklist, and exact code snippets ready for implementation.',
  },
  {
    question: 'Do you provide direct code fixes or only an audit report?',
    answer:
      'Both. I can provide copy-paste code snippets and schema scripts for your development team, or directly implement fixes on Next.js, React, HTML, and WordPress platforms.',
  },
  {
    question: 'How does technical SEO impact AI search experiences (GEO / AEO)?',
    answer:
      'AI search engines like Google AI Overviews and Perplexity rely heavily on fast crawlability, clean HTML DOM structures, and explicit JSON-LD schema to extract facts and cite sources reliably. Technical SEO is the foundation for AI discoverability.',
  },
  {
    question: 'Can you audit and optimize JavaScript-heavy Single Page Applications (SPAs)?',
    answer:
      'Yes. I specialize in modern JavaScript frameworks (Next.js, React) and inspect server-side rendering (SSR), static site generation (SSG), hydration overhead, and Googlebot rendering parity.',
  },
]

export const TECHNICAL_SEO_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/technical-seo/#service',
      name: 'Technical SEO Services & Semantic Architecture',
      url: 'https://www.alaintapiru.com/services/technical-seo/',
      serviceType: 'Technical Search Engine Optimization',
      description:
        'Practical Technical SEO support in the Philippines. Crawlability audits, Core Web Vitals review, structured JSON-LD entity markup, and site architecture.',
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
        name: 'Technical SEO Deliverables',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Crawlability & Indexability Audit',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Core Web Vitals Speed Optimization',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Structured JSON-LD Schema Architecture',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services/technical-seo/#faq',
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
      '@id': 'https://www.alaintapiru.com/services/technical-seo/#breadcrumbs',
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
          name: 'Technical SEO',
          item: 'https://www.alaintapiru.com/services/technical-seo/',
        },
      ],
    },
  ],
}
