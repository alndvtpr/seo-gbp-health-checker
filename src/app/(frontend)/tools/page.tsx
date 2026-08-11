'use client'

import React, { useState } from 'react'
import { GBPHealthChecker } from '@/components/GBPHealthChecker'

export default function ToolsPage() {
  // Salary Calculator State
  const [exp, setExp] = useState('mid')
  const [employment, setEmployment] = useState('fulltime')
  const [skill, setSkill] = useState('tech')

  const calculateSalary = () => {
    let base = 40000
    if (exp === 'junior') base = 25000
    if (exp === 'senior') base = 75000
    if (exp === 'lead') base = 110000

    if (employment === 'freelance') base *= 1.2
    if (employment === 'agency') base *= 0.9

    if (skill === 'tech') base += 10000
    if (skill === 'fullstack') base += 20000

    return base.toLocaleString()
  }

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Free Resources &amp; Tools
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6">
          SEO &amp; Digital Growth Calculators
        </h1>
        <p className="font-sans text-on-surface/70 text-xs sm:text-base leading-relaxed">
          Interactive tools designed for website owners, hiring managers, and SEO professionals in the Philippines.
        </p>
      </div>

      {/* Tool 1: SEO Specialist Salary Calculator */}
      <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#181a1b]/80 border border-white/10 space-y-6 sm:space-y-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-container shrink-0">
            calculate
          </span>
          <div>
            <h2 className="font-heading text-lg sm:text-2xl font-bold text-on-surface">
              SEO Specialist Salary Calculator (PH Market)
            </h2>
            <p className="font-sans text-[11px] sm:text-xs text-on-surface/60">
              Estimate average monthly compensation based on experience, skill domain, and employment model.
            </p>
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
              className="w-full bg-[#181a1b] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
            >
              <option value="junior" className="bg-[#181a1b]">Junior (1-2 Years)</option>
              <option value="mid" className="bg-[#181a1b]">Mid-Level (3-4 Years)</option>
              <option value="senior" className="bg-[#181a1b]">Senior Specialist (5+ Years)</option>
              <option value="lead" className="bg-[#181a1b]">SEO Lead / Manager</option>
            </select>
          </div>

          <div>
            <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-bold">
              Employment Type
            </label>
            <select
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="w-full bg-[#181a1b] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
            >
              <option value="fulltime" className="bg-[#181a1b]">Full-time Remote</option>
              <option value="agency" className="bg-[#181a1b]">Local Agency</option>
              <option value="freelance" className="bg-[#181a1b]">Freelance / Retainer</option>
            </select>
          </div>

          <div>
            <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-bold">
              Primary Skillset
            </label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full bg-[#181a1b] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
            >
              <option value="content" className="bg-[#181a1b]">Content &amp; On-Page SEO</option>
              <option value="tech" className="bg-[#181a1b]">Technical SEO &amp; Auditing</option>
              <option value="fullstack" className="bg-[#181a1b]">SEO + Frontend Web Development</option>
            </select>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-primary-container/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="font-heading text-[10px] sm:text-xs text-on-surface/60 uppercase tracking-widest block">Estimated Monthly Compensation</span>
            <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-container">
              ₱{calculateSalary()} <span className="text-xs text-on-surface/60 font-sans font-normal">/ month (PHP)</span>
            </span>
          </div>
          <span className="font-sans text-[11px] sm:text-xs text-on-surface/50 max-w-xs text-left md:text-right leading-relaxed">
            Based on current industry averages for remote and local SEO professionals.
          </span>
        </div>
      </div>

      {/* Tool 2 & Tool 3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/80 border border-white/10 space-y-4 sm:space-y-6">
          <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-container">
            travel_explore
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
            Request an SEO Website Audit
          </h2>
          <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
            Enter your domain below for a manual preliminary audit checking indexation status, mobile speed, security headers, and meta tags.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
              required
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-primary transition-colors min-h-[48px] flex items-center justify-center"
            >
              Submit Audit Request
            </button>
          </form>
        </div>

        {/* Tool 3: Local SEO / GBP Health Checker — fully interactive */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/80 border border-white/10 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-container">
              distance
            </span>
            <a
              href="https://github.com/alndvtpr/seo-gbp-health-checker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-on-surface/80 hover:text-on-surface hover:bg-white/10 text-xs font-heading font-medium transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub Repo
            </a>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
            Local SEO &amp; GBP Health Checker
          </h2>
          <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
            Assess your Google Business Profile optimization score, NAP consistency, and local map pack rankings.
          </p>

          <GBPHealthChecker />
        </div>
      </div>
    </div>
  )
}
