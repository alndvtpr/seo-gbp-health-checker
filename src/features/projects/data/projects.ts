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
    'The active staging URL is repository-observed. No maintained dated Lighthouse artifact or field dataset supports the former exact performance figures, so they are not presented as verified results.',
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
      meaning: 'Create clearer paths from search visibility to useful inquiries.',
    },
  ],
  metrics: [
    { label: 'Performance Evidence', value: 'Lab only', detail: 'No maintained dated report' },
    { label: 'Markup Review', value: 'Semantic', detail: 'HTML5 structure inspected' },
    { label: 'Build Status', value: 'Ongoing', detail: 'Active staging implementation' },
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
  exactRole: 'Tool Architect, Full-Stack Developer & SEO Specialist (Self-Initiated Diagnostic Tool)',
  problemOrGoal:
    'Small business owners often do not understand why competitors outrank them on Google Maps or local search. The goal was to build a fast, transparent diagnostic tool that scans public Google Business Profile signals and translates technical local ranking factors into actionable weekly milestones.',
  workCompleted: [
    'Connected business search and public profile data through the Serper Places API.',
    'Built heuristic health scoring across 10 public profile indicators, including NAP, categories, review count, rating, photos, and operating hours.',
    'Integrated Gemini 2.5 Flash through structured prompts to draft 30-day action plans.',
    'Implemented client-side PDF report generation for download and sharing.',
  ],
  methodsAndTools: [
    'Next.js App Router (Server Actions & API Routes)',
    'React 19 & Tailwind CSS (Accessible interactive UI)',
    'Serper.dev Places API (Google Maps signal ingestion)',
    'Google AI Studio / Gemini 2.5 Flash (Contextual roadmap synthesis)',
    'jsPDF / html2canvas (Executive PDF summary export)',
  ],
  validationNotes:
    'Live and functional directly on this website at /tools/#gbp-checker. Runtime depends on the external Places and AI services; no maintained aggregate field-runtime dataset is claimed.',
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
      meaning: 'Organize practical weekly steps for profile and local search improvements.',
    },
  ],
  metrics: [
    { label: 'Audit Runtime', value: 'API-dependent', detail: 'No maintained field aggregate' },
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
  tagline: 'Personal Portfolio & Technical Architecture.',
  status: 'Completed',
  proofLabel: 'Self-initiated build',
  shortDescription:
    'My personal portfolio built with a modern web stack, combining technical SEO, search-friendly architecture, performance safeguards, and machine-readable content.',
  fullDescription:
    'A performance-focused personal portfolio combining Next.js App Router, Tailwind CSS, and Payload CMS 3.0. Features reserved image layout space, interaction-deferred WebGL canvas rendering, complete JSON-LD structured data graph hierarchy, and LLM-friendly content endpoints (/llms.txt).',
  category: 'Technical SEO',
  tags: ['Technical SEO', 'Next.js', 'Tailwind CSS', 'Payload CMS', 'Core Web Vitals'],
  role: 'Technical SEO & Web Architecture',
  exactRole: 'Architect, Designer & Developer (Personal Production Build)',
  problemOrGoal:
    'Demonstrate hands-on technical SEO and front-end implementation through a personal site with dated lab benchmarks, semantic crawlability, supported JSON-LD relationships, and a dual-theme interface.',
  workCompleted: [
    'Architected a Next.js App Router application with static generation for public pages.',
    'Implemented canonical Person and WebSite entities plus page-specific Schema.org markup where the visible content supports it.',
    'Reserved layout space for key images and configured fallback typography to reduce Cumulative Layout Shift risk.',
    'Built a lightweight WebGL shader background that initializes after interaction, caps its render loop, and auto-pauses during idle states.',
    'Created /llms.txt and /llms-full.txt endpoints for automated AI model discoverability.',
  ],
  methodsAndTools: [
    'Next.js & React 19 (App Router, Turbopack)',
    'TypeScript & Tailwind CSS v4 (Strict token-based design system)',
    'Payload CMS 3.0 & Supabase PostgreSQL (Structured headless data)',
    'Google Search Console & Google Analytics 4',
    'Dated PageSpeed screenshots & static performance regression checks',
  ],
  validationNotes:
    'Dated repository screenshots record August 2026 Google PageSpeed Insights lab results: 99 Desktop, 96 Mobile, and 100/100 Lighthouse SEO & Best Practices. They are not field Core Web Vitals.',
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
      meaning: 'August 2026 screenshots record sub-1.2s LCP and 0ms TBT under simulated lab conditions.',
    },
    {
      name: 'STRUCTURE',
      meaning: 'Connected JSON-LD relationships and semantic HTML5 structure.',
    },
    {
      name: 'SECURITY',
      meaning: 'Strict CSP headers, anti-scraping shields, and isolated server actions.',
    },
  ],
  metrics: [
    { label: 'Desktop PageSpeed', value: '99', detail: 'Google PageSpeed Insights Lab Score (August 2026)' },
    { label: 'Mobile PageSpeed', value: '96', detail: 'Google PageSpeed Insights Lab Score (August 2026)' },
    { label: 'SEO & Best Practices', value: '100/100', detail: 'Lighthouse Production Lab Audit' },
  ],
  techStack: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Payload CMS 3.0', 'Supabase'],
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
