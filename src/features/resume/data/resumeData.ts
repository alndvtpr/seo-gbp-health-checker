import type { SkillCategory, ExperienceItem, ProjectFeature } from '../types'

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Expertise & SEO',
    icon: 'search',
    skills: [
      'Technical SEO Audits',
      'On-Page & Off-Page SEO',
      'Keyword Research & Intent Mapping',
      'Local SEO & GBP Management',
      'AI-Powered Web Design & Development',
      'Data Entry, Reporting & Analytics',
      'Project Coordination',
      'Customer Service & Client Communication',
    ],
  },
  {
    title: 'SEO & Marketing Tools (Daily Practice)',
    icon: 'build',
    skills: [
      'Ahrefs',
      'SEMrush',
      'Ubersuggest',
      'Google Search Console',
      'Google Analytics (GA4)',
      'Screaming Frog SEO Spider',
    ],
  },
  {
    title: 'Web & CMS Technologies',
    icon: 'code',
    skills: [
      'WordPress',
      'Elementor',
      'Payload CMS',
      'Next.js App Router',
      'React 19',
      'Tailwind CSS',
      'Semantic HTML5 / CSS3',
    ],
  },
  {
    title: 'Productivity & AI Workflows',
    icon: 'smart_toy',
    skills: [
      'ChatGPT',
      'Claude',
      'Gemini Pro',
      'Google AI Studio',
      'Google Workspace',
      'Microsoft 365',
      'Zoho CRM',
      'Slack',
      'Microsoft Teams',
      'Discord',
      'Figma',
      'Stitch',
    ],
  },
]

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'SEO Sales Staff',
    company: 'Frelas Media',
    type: 'Freelance',
    period: 'Jul 2025 – Aug 2025',
    highlights: [
      'Sold website and SEO packages directly to prospective clients, managing outreach, follow-up, and communication independently from first contact to close.',
      'Explained technical SEO and web services in clear, client-friendly terms to support informed purchase decisions.',
    ],
  },
  {
    role: 'SEO Trainee & Contributor',
    company: 'PinoySEO Bootcamp (Batch 32)',
    type: 'Remote Training & Live Audits',
    period: 'Aug 2025 – Sep 2025',
    highlights: [
      'Completed an intensive, hands-on SEO bootcamp covering technical SEO, on/off-page optimization, and data analysis.',
      'Contributed to hands-on technical SEO audits, keyword research, and on-page optimization exercises during bootcamp training under mentor Rene Leandro Padilla.',
      'Audited sites using Screaming Frog, Ahrefs, SEMrush, and Ubersuggest, catching technical issues automated tools often miss.',
    ],
  },
  {
    role: 'Customer Experience Agent',
    company: 'Alorica',
    type: 'Full-Time BPO',
    period: 'Apr 2024 – Oct 2024',
    highlights: [
      'Delivered consistent, professional support in a high-volume BPO environment, resolving customer inquiries efficiently while maintaining service quality standards.',
      'Documented customer interactions accurately and followed established procedures to ensure a smooth, dependable experience.',
    ],
  },
  {
    role: 'Customer Service Representative',
    company: 'ERC Global',
    type: 'Full-Time BPO',
    period: 'Jun 2023 – Nov 2023',
    highlights: [
      'Handled inbound customer inquiries with professionalism and patience, resolving issues promptly to maintain satisfaction.',
      'Strengthened communication and problem-solving skills within a structured, metrics-driven support environment.',
    ],
  },
]

export const SELECTED_PROJECTS: ProjectFeature[] = [
  {
    title: 'AngatSikat Studio',
    tagline: 'Custom WordPress Theme & Technical SEO Platform',
    proofLabel: 'Self-initiated build',
    status: 'Ongoing build',
    description:
      'A bespoke WordPress theme architecture built without template bloat, featuring structured schema and clean semantic crawlability. Exact performance is not published without a maintained dated report.',
    link: '/projects/angat-sikat-studio/',
    tags: ['WordPress', 'Custom Theme', 'Technical SEO'],
  },
  {
    title: 'Local SEO & GBP Health Checker',
    tagline: 'Interactive 10-Point Diagnostic Engine',
    proofLabel: 'Self-initiated build',
    description:
      'A self-built web tool analyzing Google Business Profile trust signals, review momentum, category alignment, and synthesizing 30-day dynamic optimization roadmaps.',
    link: '/tools/#gbp-checker',
    tags: ['Next.js', 'Local SEO', 'Interactive Tool'],
  },
  {
    title: 'AlainTapiru.com Architecture',
    tagline: 'High-Performance Next.js Portfolio',
    proofLabel: 'Self-initiated build',
    description:
      'Personal portfolio and technical playground built on Next.js App Router, featuring reserved layout space, dual-theme styling, JSON-LD linked entity graphs, and /llms.txt discoverability.',
    link: '/projects/alaintapiru-portfolio/',
    tags: ['Next.js', 'Tailwind CSS', 'Schema Graph'],
  },
]
