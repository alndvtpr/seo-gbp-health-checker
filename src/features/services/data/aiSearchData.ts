import type { ServiceDeliverableArea, ServiceProblem, ServiceWorkflowStep, ServiceFaq } from '../types'

export const AI_OPTIMIZATION_AREAS: ServiceDeliverableArea[] = [
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

export const AI_PARADIGM_SHIFTS: ServiceProblem[] = [
  {
    title: 'From Keyword Strings to Semantic Entities',
    problem: 'Traditional keyword stuffing is ineffective for modern LLMs that understand context, entity relationships, and topical authority.',
    solution: 'I structure content around named entities, related topics, and clear subject relationships that machines can parse more reliably.',
  },
  {
    title: 'Direct Answer Synthesis Over Blue Links',
    problem: 'Searchers increasingly receive synthesized summaries in Google AI Overviews and conversational engines before scrolling to standard search results.',
    solution: 'I format key facts with concise definitions and structured tables that are easier for search and AI systems to extract.',
  },
  {
    title: 'Verifiable Evidence & Source Attribution',
    problem: 'AI models prioritize sources with verifiable facts, clear author authority, and distinct first-hand experience rather than generic regurgitated copy.',
    solution: 'I connect supported case-study evidence, author credentials, and technical data to the pages where those facts are relevant.',
  },
]

export const WORKFLOW_STEPS: ServiceWorkflowStep[] = [
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

export const FAQS: ServiceFaq[] = [
  {
    question: 'Can you guarantee that ChatGPT, Perplexity, or Google AI Overviews will cite my site?',
    answer:
      'No. Generative AI systems produce answers probabilistically, so no consultant can promise a specific citation. I can improve factual structure, entity clarity, schema, and machine-readable feeds so those systems can read and attribute the site more clearly.',
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

export const AI_SEARCH_SCHEMA = {
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
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/services/ai-search-optimization/#breadcrumbs',
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
          name: 'AI Search Optimization',
          item: 'https://www.alaintapiru.com/services/ai-search-optimization/',
        },
      ],
    },
  ],
}
