'use client'

import React, { useState } from 'react'
import { GBPHealthChecker } from '@/components/GBPHealthChecker'
import { WebsiteAuditRequestForm } from '@/components/WebsiteAuditRequestForm'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const toolsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.alaintapiru.com/tools/#webpage',
      url: 'https://www.alaintapiru.com/tools/',
      name: 'Free SEO Tools & Diagnostic Calculators | Alain Dave Tapiru',
      description:
        'Free, practical SEO tools and calculators. Audit Google Business Profile signals, estimate SEO compensation, and request website technical reviews.',
      isPartOf: {
        '@id': 'https://www.alaintapiru.com/#website',
      },
      breadcrumb: {
        '@id': 'https://www.alaintapiru.com/tools/#breadcrumb',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://www.alaintapiru.com/tools/#gbp-checker-app',
      name: 'Local SEO & Google Business Profile Health Checker',
      url: 'https://www.alaintapiru.com/tools/',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Interactive 10-point local search diagnostic tool analyzing Google Business Profile completeness, category alignment, review velocity, and generating 30-day dynamic SEO roadmaps.',
      author: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      creator: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      provider: {
        '@id': 'https://www.alaintapiru.com/#business',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://www.alaintapiru.com/tools/#salary-calculator-app',
      name: 'SEO Specialist Compensation Calculator',
      url: 'https://www.alaintapiru.com/tools/',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Interactive compensation estimator for Philippine and offshore SEO professionals across experience levels, employment models, and skill domains.',
      author: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      provider: {
        '@id': 'https://www.alaintapiru.com/#business',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/tools/#breadcrumb',
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
          name: 'Tools',
          item: 'https://www.alaintapiru.com/tools/',
        },
      ],
    },
  ],
}

export default function ToolsPage() {
  // Salary Calculator State
  const [currency, setCurrency] = useState<'PHP' | 'USD'>('PHP')
  const [exp, setExp] = useState('mid')
  const [employment, setEmployment] = useState('fulltime')
  const [skill, setSkill] = useState('tech')

  const calculateSalary = () => {
    // Calibrated baseline for SEO / Web Virtual Assistant & Specialist (PH Market):
    // Junior ($6-10/hr): ~₱20,000 - ₱28,000/mo ($350 - $500/mo)
    // Mid ($10-14/hr): ~₱35,000 - ₱42,000/mo ($600 - $750/mo)
    // Senior: ~₱55,000 - ₱70,000/mo
    let base = 25000
    if (exp === 'junior') base = 20000
    if (exp === 'mid') base = 32000
    if (exp === 'senior') base = 55000
    if (exp === 'lead') base = 80000

    if (employment === 'freelance') base *= 1.15
    if (employment === 'agency') base *= 0.9

    if (skill === 'tech') base += 5000
    if (skill === 'fullstack') base += 10000

    if (currency === 'USD') {
      // Benchmark exchange rate: ~57.5 PHP/USD
      return Math.round(base / 57.5).toLocaleString()
    }

    return Math.round(base).toLocaleString()
  }

  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-20">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Tools', url: '/tools/' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Free Resources &amp; Tools
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-[-0.025em]">
          Free SEO Tools &amp; Practical Web Utilities
        </h1>
        <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
          Interactive diagnostic and estimation tools designed for website owners, teams, and SEO practitioners. All diagnostics provide practical heuristic evaluations based on public web signals without algorithmic ranking guarantees.
        </p>
      </div>

      {/* Tool 1: SEO Specialist Salary Calculator */}
      <div id="salary-calculator" className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 space-y-6 sm:space-y-8 motion-reveal shadow-sm scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="calculate" size={36} className="text-primary-container shrink-0" />
            <div>
              <h2 className="font-heading text-lg sm:text-2xl font-bold text-on-surface">
                SEO Specialist Compensation Calculator
              </h2>
              <p className="font-sans text-xs sm:text-sm text-on-surface/70">
                Estimate average monthly compensation based on experience, skill domain, and employment model.
              </p>
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-surface-2 border border-black/10 dark:border-white/10 text-xs shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setCurrency('PHP')}
              className={`px-3 py-1 rounded-lg font-heading font-bold transition-all cursor-pointer ${
                currency === 'PHP'
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'text-on-surface/70 hover:text-on-surface'
              }`}
            >
              PHP (₱)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-lg font-heading font-bold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'text-on-surface/70 hover:text-on-surface'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-bold">
              Experience Level
            </label>
            <select
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              className="w-full bg-surface-2/70 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[46px]"
            >
              <option value="junior" className="bg-surface-1 text-on-surface">Junior (1-2 Years)</option>
              <option value="mid" className="bg-surface-1 text-on-surface">Mid-Level (3-4 Years)</option>
              <option value="senior" className="bg-surface-1 text-on-surface">Senior Specialist (5+ Years)</option>
              <option value="lead" className="bg-surface-1 text-on-surface">SEO Lead / Manager</option>
            </select>
          </div>

          <div>
            <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-bold">
              Employment Type
            </label>
            <select
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="w-full bg-surface-2/70 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[46px]"
            >
              <option value="fulltime" className="bg-surface-1 text-on-surface">Full-time Remote</option>
              <option value="agency" className="bg-surface-1 text-on-surface">Local Agency</option>
              <option value="freelance" className="bg-surface-1 text-on-surface">Freelance / Retainer</option>
            </select>
          </div>

          <div>
            <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-bold">
              Primary Skillset
            </label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full bg-surface-2/70 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[46px]"
            >
              <option value="content" className="bg-surface-1 text-on-surface">Content &amp; On-Page SEO</option>
              <option value="tech" className="bg-surface-1 text-on-surface">Technical SEO &amp; Auditing</option>
              <option value="fullstack" className="bg-surface-1 text-on-surface">SEO + Frontend Web Development</option>
            </select>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-white/5 border border-primary-container/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="font-heading text-[10px] sm:text-xs text-on-surface/70 uppercase tracking-[0.08em] block font-semibold">Estimated Monthly Compensation</span>
            <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-container">
              {currency === 'PHP' ? `₱${calculateSalary()}` : `$${calculateSalary()}`}{' '}
              <span className="text-xs text-on-surface/70 font-sans font-normal">/ month ({currency})</span>
            </span>
          </div>
          <span className="font-sans text-xs text-on-surface/70 max-w-xs text-left md:text-right leading-relaxed">
            Based on current industry averages for remote and local SEO professionals in the Philippine and global offshore market.
          </span>
        </div>
      </div>

      {/* Tool 2 & Tool 3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div id="website-audit" className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 space-y-4 sm:space-y-6 flex flex-col justify-between motion-reveal shadow-sm scroll-mt-28">
          <div className="space-y-3">
            <Icon name="travel_explore" size={36} className="text-primary-container" />
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              Request an SEO Website Audit
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
              Enter your domain below for a manual preliminary audit inspecting indexation status, Core Web Vitals speed, security headers, metadata, and AI search entity readiness.
            </p>
          </div>

          <WebsiteAuditRequestForm />
        </div>

        {/* Tool 3: Local SEO / GBP Health Checker (fully interactive) */}
        <div id="gbp-checker" style={{ transitionDelay: '100ms' }} className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 space-y-4 sm:space-y-6 motion-reveal shadow-sm scroll-mt-28">
          <div className="flex items-center justify-between">
            <Icon name="distance" size={36} className="text-primary-container" />
            <a
              href="https://github.com/alndvtpr/seo-gbp-health-checker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-on-surface/80 hover:text-on-surface hover:bg-white/10 text-xs font-heading font-medium transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" focusable="false">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub Repo
            </a>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
            Local SEO &amp; GBP Health Checker
          </h2>
          <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
            Assess your Google Business Profile optimization score, NAP consistency, and local map pack rankings.
          </p>

          <GBPHealthChecker />
        </div>
      </div>
    </div>
  )
}
