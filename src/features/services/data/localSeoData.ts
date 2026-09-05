import type { ServiceDeliverableArea, ServiceProblem, ServiceWorkflowStep, ServiceFaq } from '../types'

export const LOCAL_OPTIMIZATION_AREAS: ServiceDeliverableArea[] = [
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

export const PROBLEMS_SOLVED: ServiceProblem[] = [
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

export const WORKFLOW_STEPS: ServiceWorkflowStep[] = [
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

export const FAQS: ServiceFaq[] = [
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

export const LOCAL_SEO_SCHEMA = {
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
