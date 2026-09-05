import type { ServiceDeliverableArea, ServiceProblem, ServiceWorkflowStep, ServiceFaq } from '../types'

export const WEB_DEV_CAPABILITIES: ServiceDeliverableArea[] = [
  {
    id: 'nextjs-architecture',
    title: 'Custom Next.js & React Development',
    icon: 'code_blocks',
    description:
      'Code-first web applications built with the modern Next.js App Router, React 19, and Server Components for efficient navigation, server rendering, and streamlined search crawlability.',
    deliverables: [
      'Static Site Generation (SSG) & Server-Side Rendering (SSR)',
      'Clean modular TypeScript component architecture',
      'Interaction-deferred code and main-thread performance profiling',
      'API route handlers & secure server action pipelines',
    ],
  },
  {
    id: 'custom-wordpress-themes',
    title: 'Custom WordPress Theme Development',
    icon: 'edit_note',
    description:
      'Custom PHP and responsive WordPress themes developed from scratch without reliance on slow, bloated third-party page builders or heavy plugin stacks.',
    deliverables: [
      'Lightweight custom theme development without bloated templates',
      'Intuitive WordPress dashboard for easy non-technical publishing',
      'Semantic HTML5 markup with native block editor compatibility',
      'Hardened security configuration & database optimization',
    ],
  },
  {
    id: 'speed-core-web-vitals',
    title: 'Layout Stability & Core Web Vitals',
    icon: 'monitoring',
    description:
      'Every web page is engineered with reserved layout space, optimized asset delivery, and separate lab and real-user performance measurement.',
    deliverables: [
      'Intrinsic aspect-ratio image containers that reduce CLS risk',
      'Modern AVIF & WebP image compression pipelines',
      'Critical CSS inlining & asynchronous font preloading',
      'Composite-only GPU micro-animations with reduced-motion safety',
    ],
  },
  {
    id: 'built-in-seo-analytics',
    title: 'Built-in Search Architecture & GA4 Tracking',
    icon: 'dataset',
    description:
      'Search readiness is integrated into the source code rather than added as an afterthought, complete with JSON-LD schema, canonical tags, and analytics tracking.',
    deliverables: [
      'Complete Schema.org JSON-LD linked entity graphs',
      'Dynamic XML sitemaps, RSS delta feeds & robots.txt directives',
      'OpenGraph & Twitter Card metadata for social discovery',
      'Google Analytics 4 event tracking & Google Search Console verification',
    ],
  },
]

export const COMMON_DEV_PITFALLS: ServiceProblem[] = [
  {
    title: 'Bloated Drag-and-Drop Page Builders',
    problem: 'Some generic templates and visual builders add unnecessary CSS, JavaScript, nested markup, and unoptimized assets that can hurt page performance.',
    solution: 'I build clean, modular templates with semantic HTML and focused CSS, then measure the result against an agreed performance budget.',
  },
  {
    title: 'SEO Treated as a Post-Launch Add-on',
    problem: 'Websites designed purely for visuals without considering URL hierarchy, heading structure, or schema often require expensive post-launch rewrites.',
    solution: 'I plan crawlable URL groups, clear heading outlines, and supported JSON-LD relationships in the core templates before launch.',
  },
  {
    title: 'Mobile Unfriendliness & Visual Layout Shifts',
    problem: 'Images loading without explicit width/height dimensions cause content to jump around (high CLS), frustrating mobile users and failing Google audits.',
    solution: 'I use reserved image ratios, touch targets of at least 44px, and responsive navigation as part of the base implementation.',
  },
]

export const WORKFLOW_STEPS: ServiceWorkflowStep[] = [
  {
    step: '01',
    title: 'Information Architecture & Wireframing',
    desc: 'Mapping semantic URL hierarchies, mobile layouts, conversion CTA touchpoints, and technical requirements.',
  },
  {
    step: '02',
    title: 'Component & Theme Engineering',
    desc: 'Developing custom Next.js components or WordPress templates with clear code standards.',
  },
  {
    step: '03',
    title: 'SEO & Performance Hardening',
    desc: 'Integrating structured JSON-LD schema, optimizing image pipelines, and measuring lab results separately from real-user Core Web Vitals.',
  },
  {
    step: '04',
    title: 'Analytics, Testing & Launch',
    desc: 'Configuring GA4 conversion tracking, validating Search Console coverage, and providing CMS walkthroughs.',
  },
]

export const FAQS: ServiceFaq[] = [
  {
    question: 'Should I choose Next.js or WordPress for my project?',
    answer:
      'Choose Next.js if you want tighter control over asset delivery, layout stability, modern React component architecture, and a code-first foundation. Choose WordPress if you need a flexible content management dashboard where non-technical team members can easily create and update blog posts and pages. I build both with performance measurement and clear scope boundaries.',
  },
  {
    question: 'Do you use pre-made commercial WordPress templates or build from scratch?',
    answer:
      'I build custom WordPress themes from scratch when the project needs that level of control. This avoids unnecessary template code and keeps the implementation focused on the agreed features.',
  },
  {
    question: 'Will I be able to easily update and manage my website content?',
    answer:
      'Yes. Whether built on WordPress or headless CMS architectures like Payload CMS, you receive a clean, organized dashboard to edit text, publish articles, and manage images without writing code.',
  },
  {
    question: 'How do you ensure the website achieves fast loading speeds on mobile?',
    answer:
      'I optimize images with AVIF/WebP formats, define explicit container aspect ratios to reduce layout movement, defer non-essential JavaScript, and maintain semantic HTML.',
  },
]

export const WEB_DEV_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/web-development/#service',
      name: 'SEO-Ready Web Design & Development Services',
      url: 'https://www.alaintapiru.com/services/web-development/',
      serviceType: 'Web Design & Development',
      description:
        'Practical, SEO-ready web design and development. Code-first Next.js App Router builds and custom WordPress themes with clean code and search crawlability.',
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
        name: 'Web Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Next.js & React Code-First Development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom WordPress Theme Development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Core Web Vitals & Speed Hardening',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.alaintapiru.com/services/web-development/#faq',
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
      '@id': 'https://www.alaintapiru.com/services/web-development/#breadcrumbs',
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
          name: 'Web Development',
          item: 'https://www.alaintapiru.com/services/web-development/',
        },
      ],
    },
  ],
}
