export interface ProjectPillar {
  name: string
  meaning: string
}

export interface ProjectMetric {
  label: string
  value: string
  detail: string
}

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  status: 'Ongoing' | 'Completed' | 'Concept'
  shortDescription: string
  fullDescription: string
  category: 'WordPress' | 'Web Design' | 'Technical SEO' | 'Local SEO'
  tags: string[]
  role: string
  liveUrl: string
  rel?: string
  featured: boolean
  coreServices: string[]
  pillars: ProjectPillar[]
  metrics?: ProjectMetric[]
  techStack: string[]
  image: string
  gallery?: string[]
  ctaText?: string
}

export const angatSikatProject: Project = {
  id: 'angat-sikat-studio',
  slug: 'angat-sikat-studio',
  title: 'AngatSikat Studio',
  tagline: 'Websites Built to Be Found.',
  status: 'Ongoing',
  shortDescription:
    'A WordPress and web design studio platform built to unify modern website creation with technical crawlability and search visibility.',
  fullDescription:
    "AngatSikat Studio is an ongoing development build created as a dedicated platform for SEO-ready websites. Built using a custom WordPress theme ('angatsikat-studio'), the platform structures distinct offerings across custom WordPress builds, responsive design, and core technical SEO implementations without relying on bloated templates.",
  category: 'WordPress',
  tags: [
    'WordPress',
    'Custom Theme',
    'Technical SEO',
    'Ongoing Build',
  ],
  role: 'Web Developer & Designer',
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
      meaning: 'Turn search visibility into real client and business reach.',
    },
  ],
  techStack: [
    'WordPress',
    'PHP (Custom Theme)',
    'Semantic HTML5',
    'CSS3 (Flexbox/Grid)',
    'Elementor Compatible',
  ],
  metrics: [
    { label: 'Mobile Speed', value: '98+', detail: 'Lightweight PHP theme build' },
    { label: 'Crawl Cleanliness', value: '100%', detail: 'Semantic HTML5 outline' },
    { label: 'Load Duration', value: '<1.2s', detail: 'Zero template bloat' },
  ],
  image: '/images/projects/angat-sikat-homepage-preview.webp',
  gallery: [
    '/images/projects/angat-sikat-homepage-preview.webp',
    '/images/projects/angat-sikat-philosophy-preview.webp',
    '/images/projects/angat-sikat-core-capabilities-preview.webp',
    '/images/projects/angat-sikat-mobile-webview-preview.webp',
  ],
  ctaText: 'View Live Build',
}

export const localSeoGbpProject: Project = {
  id: 'local-seo-gbp-checker',
  slug: 'local-seo-gbp-checker',
  title: 'Local SEO & GBP Health Checker',
  tagline: 'Interactive Google Business Profile Signal Analyzer.',
  status: 'Completed',
  shortDescription:
    'A self-built tool for analyzing key Google Business Profile and local SEO signals, helping identify practical opportunities for better local search visibility.',
  fullDescription:
    'An interactive Google Business Profile and local search diagnostic tool. Analyzes NAP consistency, rating metrics, review momentum, operating hours integrity, and outputs tailored 30-day dynamic SEO roadmaps.',
  category: 'Local SEO',
  tags: ['Local SEO', 'GBP Audit', 'Interactive Tool', 'Next.js', 'AI Insights'],
  role: 'Full Stack Developer & SEO Specialist',
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
    { label: 'Audit Speed', value: '3.2s', detail: 'Instant multi-signal scan' },
    { label: 'Signal Vector', value: '10 Points', detail: 'Category, NAP, hours, rating, photos' },
    { label: 'Report Format', value: '3 Pages', detail: 'Printable executive PDF roadmap' },
  ],
  techStack: ['Next.js', 'React', 'Tailwind CSS', 'Serper Places API', 'Google AI Studio'],
  image: '/images/projects/local-seo-gbp-checker-preview.webp',
  ctaText: 'Launch Tool',
}

export const portfolioProject: Project = {
  id: 'alaintapiru-portfolio',
  slug: 'alaintapiru-portfolio',
  title: 'AlainTapiru.com — Technical SEO & Web Project',
  tagline: 'High-Performance Portfolio & Technical Architecture.',
  status: 'Completed',
  shortDescription:
    'My personal portfolio built with a modern web stack, combining technical SEO, search-friendly architecture, performance considerations, and AI-assisted development workflows.',
  fullDescription:
    'A performance-first personal portfolio combining Next.js 15, Tailwind CSS, and Payload CMS 3.0. Features zero-DOM layout thrashing, interaction-deferred WebGL canvas rendering, schema microdata injection, and LLM-friendly content endpoints.',
  category: 'Technical SEO',
  tags: ['Technical SEO', 'Next.js 15', 'Tailwind CSS', 'Payload CMS', 'Core Web Vitals'],
  role: 'Lead Architect & Designer',
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
    { label: 'Desktop PageSpeed', value: '99', detail: 'Verified Google PageSpeed Insights' },
    { label: 'Mobile PageSpeed', value: '96', detail: 'Verified Google PageSpeed Insights' },
    { label: 'SEO & Best Practices', value: '100/100', detail: 'Zero audit violations' },
  ],
  techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Payload CMS 3.0', 'Supabase'],
  image: '/images/projects/alaintapiru-website-preview.webp',
  gallery: [
    '/images/projects/alaintapiru-website-preview.webp',
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
