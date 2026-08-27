import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'SEO-Ready Web Design & Development | Next.js & WordPress | Alain Dave Tapiru',
  description:
    'High-performance, SEO-ready web design and development. Code-first Next.js App Router architectures and bespoke WordPress themes engineered for speed, clean code, and search crawlability.',
  url: 'https://www.alaintapiru.com/services/web-development/',
})

const WEB_DEV_CAPABILITIES = [
  {
    id: 'nextjs-architecture',
    title: 'Custom Next.js & React Development',
    icon: 'code_blocks',
    description:
      'Code-first web applications built with the modern Next.js App Router, React 19, and Server Components for fast navigation, sub-second TTFB, and streamlined search crawlability.',
    deliverables: [
      'Static Site Generation (SSG) & Server-Side Rendering (SSR)',
      'Clean modular TypeScript component architecture',
      'Interaction-deferred hydration for 0ms Total Blocking Time',
      'API route handlers & secure server action pipelines',
    ],
  },
  {
    id: 'custom-wordpress-themes',
    title: 'Bespoke WordPress Theme Development',
    icon: 'edit_note',
    description:
      'Custom PHP and responsive WordPress themes developed from scratch without reliance on slow, bloated third-party page builders or heavy plugin stacks.',
    deliverables: [
      'Lightweight bespoke theme development (no bloated templates)',
      'Intuitive WordPress dashboard for easy non-technical publishing',
      'Semantic HTML5 markup with native block editor compatibility',
      'Hardened security configuration & database optimization',
    ],
  },
  {
    id: 'speed-core-web-vitals',
    title: 'Zero-CLS & Core Web Vitals Engineering',
    icon: 'monitoring',
    description:
      'Every web page is engineered from the first line of code to achieve 95+ PageSpeed scores, zero visual layout shift, and immediate interactive responsiveness.',
    deliverables: [
      'Intrinsic aspect-ratio image containers eliminating CLS',
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

const COMMON_DEV_PITFALLS = [
  {
    title: 'Bloated Drag-and-Drop Page Builders',
    problem: 'Generic templates and visual builders inject massive CSS/JS payloads, hundreds of nested DIVs, and unoptimized assets that destroy Core Web Vitals.',
    solution: 'We handcraft clean, modular code using modern semantic HTML5 and streamlined CSS tokens that load in under 1 second.',
  },
  {
    title: 'SEO Treated as a Post-Launch Add-on',
    problem: 'Websites designed purely for visuals without considering URL hierarchy, heading structure, or schema often require expensive post-launch rewrites.',
    solution: 'We architect crawlable URL silos, single-H1 semantic outlines, and structured JSON-LD graphs directly into the core templates before launch.',
  },
  {
    title: 'Mobile Unfriendliness & Visual Layout Shifts',
    problem: 'Images loading without explicit width/height dimensions cause content to jump around (high CLS), frustrating mobile users and failing Google audits.',
    solution: 'We enforce responsive intrinsic aspect-ratio containers, optimized touch targets (≥44px), and fluid mobile navigation out of the box.',
  },
]

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Information Architecture & Wireframing',
    desc: 'Mapping semantic URL hierarchies, mobile layouts, conversion CTA touchpoints, and technical requirements.',
  },
  {
    step: '02',
    title: 'Component & Theme Engineering',
    desc: 'Developing custom Next.js components or bespoke WordPress templates with clean code standards.',
  },
  {
    step: '03',
    title: 'SEO & Performance Hardening',
    desc: 'Integrating structured JSON-LD schema, optimizing image pipelines, and tuning for 95+ Core Web Vitals.',
  },
  {
    step: '04',
    title: 'Analytics, Testing & Launch',
    desc: 'Configuring GA4 conversion tracking, validating Search Console coverage, and providing CMS walkthroughs.',
  },
]


const FAQS = [
  {
    question: 'Should I choose Next.js or WordPress for my project?',
    answer:
      'Choose Next.js if you want maximum speed, zero layout shift, modern React component architecture, and a code-first foundation. Choose WordPress if you need a flexible content management dashboard where non-technical team members can easily create and update blog posts and pages. I build both with high-performance standards.',
  },
  {
    question: 'Do you use pre-made commercial WordPress templates or build from scratch?',
    answer:
      'I build bespoke WordPress themes from scratch. This eliminates the heavy code bloat, slow page builder plugins, and unnecessary scripts that typical off-the-shelf themes introduce.',
  },
  {
    question: 'Will I be able to easily update and manage my website content?',
    answer:
      'Yes. Whether built on WordPress or headless CMS architectures like Payload CMS, you receive a clean, organized dashboard to edit text, publish articles, and manage images without writing code.',
  },
  {
    question: 'How do you ensure the website achieves fast loading speeds on mobile?',
    answer:
      'We optimize images with next-gen AVIF/WebP formats, define explicit container aspect ratios to eliminate layout shifts, inline critical styles, defer non-essential JavaScript, and maintain clean semantic HTML.',
  },
]

const WEB_DEV_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.alaintapiru.com/services/web-development/#service',
      name: 'SEO-Ready Web Design & Development Services',
      url: 'https://www.alaintapiru.com/services/web-development/',
      serviceType: 'Web Design & Development',
      description:
        'High-performance, SEO-ready web design and development. Code-first Next.js App Router architectures and bespoke WordPress themes engineered for speed, clean code, and search crawlability.',
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

export default function WebDevelopmentPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_DEV_SCHEMA) }}
      />

      {/* 1. Hero Section */}
      <section
        aria-labelledby="web-dev-hero-heading"
        className="relative z-20 pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto text-center"
      >
        {/* Breadcrumbs */}
        <div className="motion-reveal">
          <Breadcrumbs
            items={[
              { name: 'Services', url: '/services/' },
              { name: 'Web Development', url: '/services/web-development/' },
            ]}
            align="center"
            className="mb-6"
            showJsonLd={false}
          />
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-6 motion-reveal">
          <Icon name="code_blocks" size={14} className="text-primary-container" />
          <span>PERFORMANCE • CLEAN ARCHITECTURE • SEARCH-READY</span>
        </div>

        {/* Headline */}
        <h1
          id="web-dev-hero-heading"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-6 motion-reveal"
        >
          <span className="font-extrabold text-on-surface">SEO-Ready Web Design</span>{' '}
          <span className="font-medium text-on-surface/85">&amp; Modern Web Development</span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-on-surface/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-normal motion-reveal">
          Build fast, accessible, and easily discoverable websites. We build code-first Next.js architectures and bespoke WordPress themes engineered with clean semantics, sub-second load times, and built-in search crawlability.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full sm:w-auto motion-reveal">
          <Link
            href="/contact/?service=Web%20Design%20%26%20Development"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Start Web Build Project
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          <a
            href="#what-we-build"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 hover:border-primary-container/50 bg-white/5 hover:bg-white/10 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Explore Capabilities ↓
          </a>
        </div>

        {/* 3-Item Trust Bar */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            'Next.js & Custom WordPress Themes',
            'Core Web Vitals & Zero-CLS Engineering',
            'Built-in Schema & Analytics Tracking',
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

      {/* 2. Why Most Web Builds Hurt SEO */}
      <section
        id="dev-pitfalls"
        aria-labelledby="pitfalls-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            THE ENGINEERING GAP
          </span>
          <h2
            id="pitfalls-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Why Standard Website Builds Fail to Rank
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Visual design without technical SEO foundations creates bloated codebases that load slowly and struggle to get indexed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMON_DEV_PITFALLS.map((item, idx) => (
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
                  <strong className="font-semibold block mb-0.5">The Pitfall:</strong>
                  {item.problem}
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/85 leading-relaxed">
                  <strong className="font-semibold text-primary-container block mb-0.5">Our Solution:</strong>
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

      {/* 3. What I Build & Deliver */}
      <section
        id="what-we-build"
        aria-labelledby="capabilities-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12 scroll-mt-24"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            DEVELOPMENT CAPABILITIES
          </span>
          <h2
            id="capabilities-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Engineering Fast, SEO-First Web Experiences
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            From modern React/Next.js applications to custom bespoke WordPress themes, built cleanly from scratch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {WEB_DEV_CAPABILITIES.map((capability, idx) => (
            <article
              key={capability.id}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 group flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/20 transition-colors">
                  <Icon name={capability.icon} size={26} className="text-primary-container" />
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {capability.title}
                </h3>
                <p className="font-sans text-sm text-on-surface/75 leading-relaxed mb-6">
                  {capability.description}
                </p>

                <div className="space-y-3 pt-5 border-t border-black/10 dark:border-white/10">
                  <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
                    Core Technical Deliverables
                  </span>
                  <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface/85">
                    {capability.deliverables.map((item) => (
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

      {/* 4. Development Workflow */}
      <section
        id="dev-workflow"
        aria-labelledby="workflow-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            DEVELOPMENT PROCESS
          </span>
          <h2
            id="workflow-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            4-Step Engineering &amp; Launch Sprints
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            A transparent build process ensuring clean code, rigorous performance testing, and full analytics integration.
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

      {/* 5. Live Portfolio Proofs & Technology Stack */}
      <section
        id="proof-and-stack"
        aria-labelledby="proof-stack-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="space-y-4 max-w-3xl motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
            LIVE TECHNICAL PROOFS
          </span>
          <h2
            id="proof-stack-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight"
          >
            Live Codebases &amp; Real Performance Metrics
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Explore live builds demonstrating fast Core Web Vitals, clean crawlability, and responsive architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Proof Card 1: Next.js Portfolio */}
          <article className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
                  Next.js &bull; Self-Initiated Build
                </span>
                <span className="text-xs font-heading font-bold text-primary-container">
                  99 Desktop Lab &bull; 0.000 CLS
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-2">
                AlainTapiru.com Custom Next.js Architecture
              </h3>
              <p className="font-sans text-sm text-on-surface/80 leading-relaxed mb-6">
                Engineered with Next.js App Router, React 19 Server Components, Tailwind CSS variables, structured JSON-LD entity graphs, and zero layout shift.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10 dark:border-white/10 mb-6">
                {['App Router', 'React 19', 'Tailwind CSS', 'Payload CMS', 'Zero CLS'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-mono text-on-surface/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/projects/alaintapiru-portfolio/"
                className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-primary-container hover:underline uppercase tracking-wider"
              >
                Read Case Study <Icon name="arrow_forward" size={14} />
              </Link>
            </div>
          </article>

          {/* Proof Card 2: AngatSikat Studio WordPress Theme */}
          <article className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-on-surface/70 px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
                  WordPress &bull; Staging Build
                </span>
                <span className="text-xs font-heading font-bold text-primary-container">
                  98+ Mobile Lab Score
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-2">
                AngatSikat Studio Bespoke Theme
              </h3>
              <p className="font-sans text-sm text-on-surface/80 leading-relaxed mb-6">
                Custom PHP WordPress theme developed from scratch without slow page builders, featuring clean semantic markup and fast mobile loading speeds.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10 dark:border-white/10 mb-6">
                {['Custom PHP Theme', 'Semantic HTML5', 'Speed Hardening', 'Schema.org'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-mono text-on-surface/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/projects/angat-sikat-studio/"
                className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-primary-container hover:underline uppercase tracking-wider"
              >
                Read Case Study <Icon name="arrow_forward" size={14} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. FAQ Section */}
      <section
        id="faq"
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
            Web Development Questions &amp; Answers
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Practical guidance on framework choices, CMS dashboards, and Core Web Vitals optimization.
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
            href="/services/technical-seo/"
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm motion-reveal"
          >
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container mb-2 block">Speed &amp; Architecture</span>
              <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                Technical SEO &amp; Schema Architecture
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                Core Web Vitals tuning, structured data implementation, and crawl velocity audits.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>View Technical SEO Scope</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/services/on-page-seo/"
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm motion-reveal"
          >
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container mb-2 block">Content Structure &amp; Copy</span>
              <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                On-Page SEO &amp; Content Optimization
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                Search intent keyword mapping, semantic HTML5 headings, and metadata CTR tuning.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>View On-Page SEO Scope</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-on-surface/80 font-heading text-xs font-semibold uppercase tracking-[0.08em]">
            <Icon name="check_circle" size={14} className="text-primary-container" />
            <span>Built Fast • Built to Rank • Free 20-Minute Discovery Call</span>
          </div>

          <h2
            id="final-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Ready to Build a Fast, Search-Ready Website from Scratch?
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s build a high-performance Next.js app or custom WordPress website engineered with clean code and built-in search crawlability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact/?service=Web%20Design%20%26%20Development"
              aria-label="Start a Web Development Project"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-9 py-4 rounded-full shadow-[0_0_30px_rgba(224,123,32,0.4)] hover:shadow-[0_0_40px_rgba(224,123,32,0.6)] btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Start Web Build Project</span>
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
