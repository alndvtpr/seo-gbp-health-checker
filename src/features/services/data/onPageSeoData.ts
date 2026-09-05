import type { ServiceDeliverableArea, ServiceProblem, ServiceWorkflowStep, ServiceFaq } from '../types'

export const ON_PAGE_OPTIMIZATION_AREAS: ServiceDeliverableArea[] = [
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
      'Write clear, snippet-safe title tags and meta descriptions that match the page intent and support more relevant clicks.',
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

export const PROBLEMS_SOLVED: ServiceProblem[] = [
  {
    title: 'High Impressions but Weak Click-Through Rates (CTR)',
    problem: 'Your pages rank in search results, but users scroll past due to generic, automated, or truncated title tags and vague meta descriptions.',
    solution: 'I write clear metadata that matches the page intent, explains the value, and gives searchers a useful reason to click.',
  },
  {
    title: 'Targeting Keywords with the Wrong Search Intent',
    problem: 'Publishing blog posts for commercial buying terms, or product pages for broad research queries, causing immediate visitor bounce.',
    solution: 'I classify each query by intent and align the target page format with the kinds of results already serving that search.',
  },
  {
    title: 'Content Cannibalization & Scattered Link Equity',
    problem: 'Multiple pages targeting overlapping keywords, confusing search bots and diluting rankings between competing internal URLs.',
    solution: 'I audit the keyword map, consolidate overlapping topics, assign distinct canonical targets, and create clear parent-child internal links.',
  },
]

export const WORKFLOW_STEPS: ServiceWorkflowStep[] = [
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

export const FAQS: ServiceFaq[] = [
  {
    question: 'How is On-Page SEO different from Technical SEO?',
    answer:
      'Technical SEO focuses on how search bots crawl, render, and index your website (crawlability, site speed, robots.txt, schema). On-Page SEO focuses on the content, keywords, headings, metadata, and internal links on each individual page to make it relevant and compelling for searchers.',
  },
  {
    question: 'Will you rewrite all of my website copy?',
    answer:
      'No. I can improve existing copy by adjusting headings, opening sections, keyword placement, and metadata while preserving your brand voice.',
  },
  {
    question: 'How do you prevent keyword cannibalization?',
    answer:
      'I create a keyword map that gives each URL a distinct primary search intent. If two pages target the same query, I recommend consolidating them or separating their focus.',
  },
  {
    question: 'How long does it take for on-page SEO changes to show results?',
    answer:
      'Unlike technical migrations which can take weeks to recrawl, on-page changes (such as title tag and heading optimizations) often begin showing CTR and ranking shifts within 2 to 4 weeks after Google re-indexes the page.',
  },
]

export const ON_PAGE_SEO_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/on-page-seo/#service',
      name: 'On-Page SEO & Content Optimization Services',
      url: 'https://www.alaintapiru.com/services/on-page-seo/',
      serviceType: 'On-Page Search Engine Optimization',
      description:
        'Practical On-Page SEO support in the Philippines. Search intent mapping, keyword clustering, semantic heading structure, metadata improvements, and internal linking.',
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
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/services/on-page-seo/#breadcrumbs',
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
          name: 'On-Page SEO',
          item: 'https://www.alaintapiru.com/services/on-page-seo/',
        },
      ],
    },
  ],
}
