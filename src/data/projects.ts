export interface ProjectPillar {
  name: string
  meaning: string
}

export interface ProjectMetric {
  label: string
  value: string
  detail: string
}

export type ProofLabel = 'Self-initiated build' | 'Training contribution' | 'Client work' | 'Ongoing build'

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  status: 'Ongoing' | 'Completed' | 'Concept'
  proofLabel: ProofLabel
  shortDescription: string
  fullDescription: string
  category: 'WordPress' | 'Web Design' | 'Technical SEO' | 'Local SEO'
  tags: string[]
  role: string
  exactRole: string
  problemOrGoal: string
  workCompleted: string[]
  methodsAndTools: string[]
  validationNotes: string
  liveUrl: string
  rel?: string
  featured: boolean
  coreServices: string[]
  pillars: ProjectPillar[]
  metrics?: ProjectMetric[]
  techStack: string[]
  image: string
  imageAlt?: string
  gallery?: string[]
  ctaText?: string
}

export const angatSikatProject: Project = {
  id: 'angat-sikat-studio',
  slug: 'angat-sikat-studio',
  title: 'AngatSikat Studio',
  tagline: 'Websites Built to Be Found.',
  status: 'Ongoing',
  proofLabel: 'Self-initiated build',
  shortDescription:
    'A custom WordPress theme platform built to unify modern website design with search engine crawlability and mobile speed.',
  fullDescription:
    "AngatSikat Studio is a self-directed, ongoing development build created as a dedicated platform for SEO-ready websites. Built using a custom WordPress theme ('angatsikat-studio'), the platform structures distinct offerings across custom WordPress builds, responsive layout design, and core technical SEO implementations without relying on bloated off-the-shelf templates.",
  category: 'WordPress',
  tags: [
    'WordPress',
    'Custom Theme',
    'Technical SEO',
    'Ongoing Build',
  ],
  role: 'Web Developer & Designer',
  exactRole: 'Sole Developer & Designer (Self-Initiated Staging Build)',
  problemOrGoal:
    'Many small business WordPress websites suffer from sluggish load times and poor crawl hierarchy due to bloated multipurpose themes. The goal was to build a clean, custom WordPress theme architecture optimized for mobile speed, clean semantic HTML5 markup, and search engine discoverability from day one.',
  workCompleted: [
    'Developed custom WordPress theme structure (angatsikat-studio) using native PHP templates without heavy page builders.',
    'Implemented semantic HTML5 hierarchy (header, nav, main, article, section, footer) and structured Schema markup.',
    'Configured responsive viewport breakpoints, accessible typography scales, and optimized CSS asset delivery.',
    'Integrated on-page SEO best practices: automated title tag management, meta descriptions, and clean URL permalinks.',
  ],
  methodsAndTools: [
    'WordPress CMS (Core API & Template Hierarchy)',
    'PHP 8.x (Custom theme functions & template partials)',
    'Semantic HTML5 & Vanilla CSS3 (Flexbox/Grid)',
    'Lighthouse & Chrome DevTools Performance Profiling',
    'Elementor compatibility for client-friendly content editing',
  ],
  validationNotes:
    'Validated on active staging environment (https://angat-sikat.freedev.app/) with 98+ Mobile Lighthouse performance score and sub-1.2s local benchmark load times.',
  liveUrl: 'https://angat-sikat.freedev.app/',
  rel: 'noopener noreferrer nofollow',
  featured: true,
  coreServices: [
    'SEO-Ready Website Design',
    'WordPress Development',
    'Custom Theme Architecture',
    'Technical SEO',
    'On-Page SEO',
    'Local SEO',
  ],
  pillars: [
    {
      name: 'ANGAT',
      meaning: 'Build a stronger digital and technical foundation.',
    },
    {
      name: 'MAKITA',
      meaning: 'Make the site crawlable, indexable, and easy to discover.',
    },
    {
      name: 'MASIKAT',
      meaning: 'Turn search visibility into genuine business inquiries and engagement.',
    },
  ],
  metrics: [
    { label: 'Mobile Speed', value: '98+', detail: 'Lighthouse Performance Score' },
    { label: 'Crawl Cleanliness', value: '100%', detail: 'Semantic HTML5 structure' },
    { label: 'Load Duration', value: '<1.2s', detail: 'Local benchmark test' },
  ],
  techStack: [
    'WordPress',
    'PHP (Custom Theme)',
    'Semantic HTML5',
    'CSS3 (Flexbox/Grid)',
    'Elementor Compatible',
  ],
  image: '/images/projects/angatsikat-studio-wordpress-website-preview.avif',
  imageAlt: 'AngatSikat Studio WordPress website design and custom theme preview',
  gallery: [
    '/images/projects/angatsikat-studio-wordpress-website-preview.avif',
    '/images/projects/angat-sikat-philosophy-preview.webp',
    '/images/projects/angat-sikat-core-capabilities-preview.webp',
    '/images/projects/angat-sikat-mobile-webview-preview.avif',
  ],
  ctaText: 'View Live Build',
}

export const localSeoGbpProject: Project = {
  id: 'local-seo-gbp-checker',
  slug: 'local-seo-gbp-checker',
  title: 'Local SEO & GBP Health Checker',
  tagline: 'Interactive Google Business Profile Signal Analyzer.',
  status: 'Completed',
  proofLabel: 'Self-initiated build',
  shortDescription:
    'A self-built interactive tool for analyzing Google Business Profile trust signals, review momentum, and local search opportunities.',
  fullDescription:
    'An interactive, self-built Google Business Profile and local search diagnostic tool. Analyzes public profile completeness, NAP consistency, rating metrics, review momentum, operating hours integrity, and outputs structured, client-friendly 30-day dynamic SEO roadmaps.',
  category: 'Local SEO',
  tags: ['Local SEO', 'GBP Audit', 'Interactive Tool', 'Next.js', 'AI Insights'],
  role: 'Developer & SEO Specialist',
  exactRole: 'Tool Architect, Full-Stack Developer & SEO Specialist',
  problemOrGoal:
    'Small business owners often do not understand why competitors outrank them on Google Maps or local search. The goal was to build a fast, transparent diagnostic tool that scans public Google Business Profile signals and translates technical local ranking factors into actionable weekly milestones.',
  workCompleted: [
    'Engineered real-time business search and profile data ingestion using Serper Places API.',
    'Built algorithmic health scoring across 10 critical local SEO trust vectors (NAP, primary/secondary categories, review count, rating velocity, photo recency, operating hours).',
    'Integrated Google Gemini AI via structured prompts to generate customized 30-day tactical action plans.',
    'Implemented client-side PDF executive report generation for immediate download and sharing.',
  ],
  methodsAndTools: [
    'Next.js 16 (App Router & Server Actions)',
    'React 19 & Tailwind CSS (Accessible interactive UI)',
    'Serper.dev Places API (Google Maps signal ingestion)',
    'Google AI Studio / Gemini Pro (Contextual roadmap synthesis)',
    'jsPDF / html2canvas (Executive PDF summary export)',
  ],
  validationNotes:
    'Live and functional directly on this website at /tools/#gbp-checker. Delivers complete diagnostic signal breakdowns in ~3.2 seconds without requiring client account access.',
  liveUrl: '/tools',
  featured: true,
  coreServices: [
    'Local Search Signal Audit',
    'Google Business Profile Analysis',
    'Automated Health Scoring',
    '30-Day SEO Roadmaps',
  ],
  pillars: [
    {
      name: 'AUDIT',
      meaning: 'Scan profile completeness, reviews, and core local SEO signals.',
    },
    {
      name: 'DIAGNOSE',
      meaning: 'Pinpoint critical ranking gaps in categories and citation health.',
    },
    {
      name: 'EXECUTE',
      meaning: 'Deliver concrete weekly milestones to elevate local pack presence.',
    },
  ],
  metrics: [
    { label: 'Audit Speed', value: '3.2s', detail: 'Places API diagnostic runtime' },
    { label: 'Signal Vector', value: '10 Points', detail: 'Public profile trust indicators' },
    { label: 'Report Format', value: '3 Pages', detail: 'Executive PDF roadmap export' },
  ],
  techStack: ['Next.js', 'React', 'Tailwind CSS', 'Serper Places API', 'Google AI Studio'],
  image: '/images/projects/local-seo-gbp-health-checker-preview.webp',
  imageAlt: 'Local SEO and Google Business Profile Health Checker interface',
  ctaText: 'Launch Tool',
}

export const portfolioProject: Project = {
  id: 'alaintapiru-portfolio',
  slug: 'alaintapiru-portfolio',
  title: 'AlainTapiru.com: Technical SEO & Web Project',
  tagline: 'High-Performance Portfolio & Technical Architecture.',
  status: 'Completed',
  proofLabel: 'Self-initiated build',
  shortDescription:
    'My personal portfolio built with a modern web stack, combining technical SEO, search-friendly architecture, Core Web Vitals optimization, and AI discoverability.',
  fullDescription:
    'A performance-focused personal portfolio combining Next.js 16, Tailwind CSS, and Payload CMS 3.0. Features zero layout shift, interaction-deferred WebGL canvas rendering, complete JSON-LD structured data graph hierarchy, and LLM-friendly content endpoints (/llms.txt).',
  category: 'Technical SEO',
  tags: ['Technical SEO', 'Next.js 16', 'Tailwind CSS', 'Payload CMS', 'Core Web Vitals'],
  role: 'Technical SEO & Web Architecture',
  exactRole: 'Lead Architect, Designer & Developer (Personal Production Build)',
  problemOrGoal:
    'Demonstrate practical mastery of modern technical SEO and front-end engineering by building a website that achieves exceptional Core Web Vitals, flawless semantic crawlability, structured JSON-LD entity graphs, and smooth dual-theme accessibility.',
  workCompleted: [
    'Architected Next.js 16 App Router application with static generation (SSG) across 30+ routes.',
    'Implemented comprehensive Schema.org JSON-LD graph (Person, WebSite, ProfessionalService, BreadcrumbList, CollectionPage).',
    'Engineered zero Cumulative Layout Shift (CLS) with explicit image sizing and system fallback typography.',
    'Built lightweight WebGL shader background that auto-pauses during idle states to maintain 0ms Total Blocking Time.',
    'Created /llms.txt and /llms-full.txt endpoints for automated AI model discoverability.',
  ],
  methodsAndTools: [
    'Next.js 16 & React 19 (App Router, Turbopack)',
    'TypeScript & Tailwind CSS v4 (Strict token-based design system)',
    'Payload CMS 3.0 & Supabase PostgreSQL (Structured headless data)',
    'Google Search Console & Google Analytics 4',
    'Google PageSpeed Insights & Lighthouse Automated CI Checks',
  ],
  validationNotes:
    'Production build independently verified with Google PageSpeed Insights: 99 Desktop, 96 Mobile, and 100/100 Lighthouse SEO & Best Practices scores.',
  liveUrl: 'https://github.com/alndvtpr',
  featured: true,
  coreServices: [
    'Core Web Vitals Optimization',
    'Structured Data & JSON-LD Graph',
    'Semantic Web Architecture',
    'Agentic AI Discoverability (llms.txt)',
  ],
  pillars: [
    {
      name: 'SPEED',
      meaning: 'Sub-2.0s LCP and zero Total Blocking Time through deferred hydration.',
    },
    {
      name: 'STRUCTURE',
      meaning: 'Complete JSON-LD graph hierarchy and strict semantic HTML5.',
    },
    {
      name: 'SECURITY',
      meaning: 'Strict CSP headers, anti-scraping shields, and isolated server actions.',
    },
  ],
  metrics: [
    { label: 'Desktop PageSpeed', value: '99', detail: 'Google PageSpeed Insights (Production)' },
    { label: 'Mobile PageSpeed', value: '96', detail: 'Google PageSpeed Insights (Production)' },
    { label: 'SEO & Best Practices', value: '100/100', detail: 'Lighthouse Production Audit' },
  ],
  techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Payload CMS 3.0', 'Supabase'],
  image: '/images/projects/alaintapiru-technical-seo-web-project-preview.webp',
  imageAlt: 'AlainTapiru.com technical SEO and web architecture project preview',
  gallery: [
    '/images/projects/alaintapiru-technical-seo-web-project-preview.webp',
    '/images/projects/alaintapiru-pagespeed-desktop-audit-scores.avif',
    '/images/projects/alaintapiru-pagespeed-mobile-audit-scores.avif',
  ],
  ctaText: 'View Repository',
}

export const PROJECTS: Project[] = [
  angatSikatProject,
  localSeoGbpProject,
  portfolioProject,
]

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
