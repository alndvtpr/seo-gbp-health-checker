import React from 'react'
import Link from 'next/link'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import {
  ResumePdfPreview,
  RESUME_CERTIFICATION_GROUPS,
  RESUME_CERTIFICATIONS,
  CANONICAL_EDUCATION,
} from '@/features/credentials'

export const metadata = generateMetadata({
  title: 'Resume | Alain Dave Tapiru — Junior SEO Specialist | Technical & On-Page SEO',
  description:
    'Professional resume of Alain Dave Tapiru, SEO Specialist and Technical Virtual Assistant in the Philippines. Hands-on experience in technical SEO, web development, BPO customer support, and AI workflows.',
  url: 'https://www.alaintapiru.com/resume/',
})

const resumeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.alaintapiru.com/resume/#webpage',
      url: 'https://www.alaintapiru.com/resume/',
      name: 'Resume | Alain Dave Tapiru — Junior SEO Specialist | Technical & On-Page SEO',
      description:
        'Professional resume of Alain Dave Tapiru. Technical SEO, web design, BPO support, and client-facing digital operations.',
      isPartOf: {
        '@id': 'https://www.alaintapiru.com/#website',
      },
      about: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      mainEntity: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      breadcrumb: {
        '@id': 'https://www.alaintapiru.com/resume/#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/resume/#breadcrumb',
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
          name: 'Resume',
          item: 'https://www.alaintapiru.com/resume/',
        },
      ],
    },
  ],
}

interface SkillCategory {
  title: string
  icon: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
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

interface ExperienceItem {
  role: string
  company: string
  type: string
  period: string
  location?: string
  highlights: string[]
}

const EXPERIENCES: ExperienceItem[] = [
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

interface ProjectFeature {
  title: string
  tagline: string
  proofLabel: string
  status?: string
  description: string
  link: string
  isExternal?: boolean
  tags: string[]
}

const SELECTED_PROJECTS: ProjectFeature[] = [
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
export default function ResumePage() {
  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10 lg:px-12 max-w-4xl mx-auto relative z-20 space-y-6 sm:space-y-8">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(resumeJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Resume', url: '/resume/' }]} showJsonLd={false} />

      {/* Modern 2026 Executive Header Card */}
      <header className="bg-surface-1 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 p-5 sm:p-7 md:p-8 shadow-sm relative overflow-hidden motion-reveal">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 border border-emerald-500/20 uppercase tracking-[0.06em]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for Work
              </span>
            </div>

            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
              Alain Dave G. Tapiru
            </h1>

            <p className="font-heading text-base sm:text-lg font-bold text-primary-container">
              Junior SEO Specialist | Technical &amp; On-Page SEO
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs font-sans text-on-surface/70 pt-0.5">
              <span className="inline-flex items-center gap-1">
                <Icon name="location_on" size={13} className="text-primary-container shrink-0" />
                Mabalacat City, Pampanga, Philippines
              </span>
              <span className="text-on-surface/30 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1">
                <Icon name="schedule" size={13} className="text-primary-container shrink-0" />
                UTC+8 (PHT)
              </span>
            </div>
          </div>

        </div>

        {/* Integrated Contact & Profiles Bar */}
        <div className="pt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
          <a
            href="mailto:alaintapiru@gmail.com"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
          >
            <Icon name="mail" size={13} className="text-primary-container shrink-0" />
            alaintapiru@gmail.com
          </a>
          <a
            href="tel:+639063249560"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
          >
            <Icon name="call" size={13} className="text-primary-container shrink-0" />
            +63 906 324 9560
          </a>
          <a
            href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true" focusable="false" className="text-primary-container shrink-0">
              <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/alndvtpr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true" focusable="false" className="text-primary-container shrink-0">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
        </div>
      </header>

      <ResumePdfPreview />

      {/* Professional Summary */}
      <section className="space-y-3 motion-reveal" aria-labelledby="summary-heading">
        <div className="flex items-center gap-2">
          <Icon name="description" size={18} className="text-primary-container" />
          <h2 id="summary-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
            Professional Summary
          </h2>
        </div>
        <div className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-xs leading-relaxed">
          <p className="font-sans text-sm sm:text-[15px] text-on-surface/85 leading-relaxed">
            Detail-oriented virtual assistant with over a year of hands-on experience across customer support, solid skills &amp; knowledge in SEO, and AI-assisted web design, gained through BPO, freelance, and bootcamp work. Works independently and communicates clearly with clients, asking the right questions early and following through until tasks are complete. Comfortable across SEO and web tools including Ahrefs, SEMrush, Screaming Frog, WordPress, and Google Analytics, plus AI tools such as ChatGPT, Claude, and Gemini for research and workflow support. Adapts quickly to new systems and processes, bringing consistent attention to detail and reliable, well-organized output. Looking to bring that resourcefulness to a full-time virtual assistant role supporting a digital agency across SEO, web, and client-facing work.
          </p>
        </div>
      </section>

      {/* Skills & Tools Matrix (Clean 2-Column Balanced Architecture) */}
      <section className="space-y-4 motion-reveal" aria-labelledby="skills-heading">
        <div className="flex items-center gap-2">
          <Icon name="build" size={18} className="text-primary-container" />
          <h2 id="skills-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
            Skills &amp; Tools Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 space-y-3 shadow-xs hover:border-primary-container/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon name={cat.icon} size={16} className="text-primary-container" />
                <h3 className="font-heading text-xs font-bold text-primary-container uppercase tracking-[0.06em]">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-sans font-medium bg-surface-2 text-on-surface/85 border border-black/5 dark:border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience (Sleek Vertical Timeline Architecture) */}
      <section className="space-y-5 motion-reveal" aria-labelledby="experience-heading">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="work" size={18} className="text-primary-container" />
            <h2 id="experience-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
              Work Experience
            </h2>
          </div>
          <span className="font-heading text-xs text-on-surface/60 font-semibold uppercase tracking-wider hidden sm:inline">
            Digital Marketing, SEO &amp; Support
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l border-primary-container/25 space-y-6 sm:space-y-8 ml-2 sm:ml-3">
          {EXPERIENCES.map((exp, idx) => (
            <div key={`${exp.company}-${idx}`} className="relative group">
              {/* Timeline Indicator Dot */}
              <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-primary-container ring-4 ring-background border border-black/10 dark:border-white/20 transition-transform group-hover:scale-125" />

              <div className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 space-y-3 shadow-xs hover:border-primary-container/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                  <div>
                    <h3 className="font-heading text-base font-bold text-on-surface">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="font-sans text-xs sm:text-sm font-semibold text-primary-container">
                        {exp.company}
                      </span>
                      <span className="text-[11px] font-sans px-2 py-0.5 rounded-md bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <span className="font-heading text-xs font-medium text-on-surface/60 whitespace-nowrap self-start sm:self-auto px-2.5 py-0.5 rounded-full bg-surface-2">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                  {exp.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-on-surface/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Practical Projects */}
      <section className="space-y-4 motion-reveal" aria-labelledby="projects-heading">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="code" size={18} className="text-primary-container" />
            <h2 id="projects-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
              Selected Projects &amp; Live Implementations
            </h2>
          </div>
          <Link
            href="/projects/"
            className="text-xs font-heading font-bold text-primary-container hover:underline inline-flex items-center gap-1"
          >
            All Case Studies <Icon name="arrow_forward" size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SELECTED_PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 space-y-3 flex flex-col justify-between shadow-xs hover:border-primary-container/40 transition-colors group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-black/5 dark:bg-white/5 text-on-surface/80 border border-black/10 dark:border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                    {proj.proofLabel}
                  </span>
                  {proj.status && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-amber-500/10 text-amber-700 dark:text-amber-500 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {proj.status}
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  {proj.isExternal ? (
                    <Icon name="open_in_new" size={14} className="text-primary-container shrink-0 opacity-70 group-hover:opacity-100" />
                  ) : (
                    <Icon name="arrow_forward" size={14} className="text-primary-container shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
                <p className="font-heading text-xs font-semibold text-primary-container">
                  {proj.tagline}
                </p>
                <p className="font-sans text-xs text-on-surface/75 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-sans px-2 py-0.5 rounded bg-surface-2 text-on-surface/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {proj.isExternal ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-[11px] font-bold text-primary-container hover:underline shrink-0"
                  >
                    View Project
                  </a>
                ) : (
                  <Link
                    href={proj.link}
                    className="font-heading text-[11px] font-bold text-primary-container hover:underline shrink-0"
                  >
                    Explore
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4 motion-reveal" aria-labelledby="education-heading">
        <div className="flex items-center gap-2">
          <Icon name="school" size={18} className="text-primary-container" />
          <h2 id="education-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CANONICAL_EDUCATION.map((edu) => (
            <div
              key={edu.id}
              className={`bg-surface-1 rounded-2xl border p-5 space-y-1.5 shadow-xs ${
                edu.id === 'mmdc-bsit'
                  ? 'border-cyan-500/20 dark:border-cyan-400/25'
                  : 'border-black/10 dark:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    edu.id === 'mmdc-bsit'
                      ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30'
                      : 'bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5'
                  }`}
                >
                  {edu.resumeBadge}
                </span>
                <span className="text-xs font-sans text-on-surface/60">
                  {edu.expectedYear || edu.timeline}
                </span>
              </div>
              <h3 className="font-heading text-sm font-bold text-on-surface pt-1">
                {edu.resumeDegree}
              </h3>
              {edu.resumeSpecialization && (
                <p className="font-sans text-xs text-primary-container font-medium">
                  {edu.resumeSpecialization}
                </p>
              )}
              <p className="font-sans text-xs text-on-surface/70">
                {edu.institution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Certifications & Specialized Training */}
      <section className="space-y-6 motion-reveal" aria-labelledby="certifications-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon name="check_circle" size={18} className="text-primary-container" />
            <h2 id="certifications-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
              Certifications &amp; Specialized Training
            </h2>
            <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5">
              {RESUME_CERTIFICATIONS.length} Total
            </span>
          </div>

          <Link
            href="/about/"
            className="text-xs font-heading font-bold text-primary-container hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            View Certificate Previews on About Page <Icon name="arrow_forward" size={13} />
          </Link>
        </div>

        <div className="space-y-6">
          {RESUME_CERTIFICATION_GROUPS.map((group) => (
            <div key={group.category} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-container inline-block" />
                <h3 className="font-heading text-xs uppercase tracking-[0.08em] font-semibold text-on-surface/80">
                  {group.category}
                </h3>
                <span className="text-[11px] font-sans text-on-surface/50">
                  ({group.items.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.items.map((cert) => {
                  const isProfessional = cert.badge === 'Professional Certificate'
                  return (
                    <div
                      key={cert.title}
                      className={`bg-surface-1 rounded-2xl border p-4 space-y-2.5 shadow-xs hover:border-primary-container/40 transition-colors flex flex-col justify-between ${
                        isProfessional
                          ? 'border-primary-container/40 dark:border-primary-container/50 sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary-container/[0.04] to-transparent'
                          : 'border-black/10 dark:border-white/10'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                            {cert.title}
                          </h4>
                          <span
                            className={`text-[10px] font-heading font-medium px-2 py-0.5 rounded-full shrink-0 ${
                              isProfessional
                                ? 'bg-primary-container/15 text-primary-container border border-primary-container/30'
                                : 'bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5'
                            }`}
                          >
                            {cert.badge}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-0.5">
                          <p className="font-sans text-xs text-primary-container font-medium">
                            {cert.issuer}
                          </p>
                          <span className="font-sans text-[11px] text-on-surface/50 shrink-0">
                            {cert.date}
                          </span>
                        </div>
                      </div>

                      {cert.verifyUrl && (
                        <div className="pt-2 border-t border-black/5 dark:border-white/5">
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Verify Alain Dave Tapiru's ${cert.title} on official registry (opens in new tab)`}
                            className="inline-flex items-center gap-1 text-[11px] font-heading font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                          >
                            <Icon name="check_circle" size={12} />
                            Verify Official Registry
                          </a>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hire / Contact Callout Banner */}
      <div className="bg-surface-1 rounded-2xl sm:rounded-3xl border border-primary-container/30 p-6 sm:p-8 text-center space-y-4 shadow-md relative overflow-hidden motion-reveal">
        <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
          Ready to Discuss a Role, Sprint, or Overflow Task?
        </h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface/80 max-w-xl mx-auto leading-relaxed">
          I am available for full-time technical virtual assistant positions, agency SEO sprints, and web maintenance overflow tasks. Let&apos;s connect to review fit and requirements.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <Link
            href="/contact/"
            className="h-11 px-7 inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] rounded-full shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:bg-primary btn-motion transition-all"
          >
            Get in Touch <Icon name="arrow_forward" size={15} className="btn-icon" />
          </Link>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="h-11 px-6 inline-flex items-center justify-center gap-2 bg-surface-2 hover:bg-black/5 dark:hover:bg-white/10 text-on-surface font-heading text-xs font-semibold uppercase tracking-[0.06em] rounded-full border border-black/10 dark:border-white/15 transition-colors"
          >
            <Icon name="mail" size={15} className="text-primary-container" />
            Direct Email
          </a>
        </div>
      </div>
    </div>
  )
}
