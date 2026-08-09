'use client'

import React, { useState } from 'react'

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
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Free Resources &amp; Tools
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-on-surface mb-6">
          SEO &amp; Digital Growth Calculators
        </h1>
        <p className="font-sans text-on-surface/70 text-base leading-relaxed">
          Interactive tools designed for website owners, hiring managers, and SEO professionals in the Philippines.
        </p>
      </div>

      {/* Tool 1: SEO Specialist Salary Calculator */}
      <div className="p-8 md:p-12 rounded-3xl bg-[#181a1b]/80 border border-white/10 backdrop-blur-xl space-y-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary-container">
            calculate
          </span>
          <div>
            <h2 className="font-heading text-2xl font-bold text-on-surface">
              SEO Specialist Salary Calculator (PH Market)
            </h2>
            <p className="font-sans text-xs text-on-surface/60">
              Estimate average monthly compensation based on experience, skill domain, and employment model.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-bold">
              Experience Level
            </label>
            <select
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container"
            >
              <option value="content" className="bg-[#181a1b]">Content &amp; On-Page SEO</option>
              <option value="tech" className="bg-[#181a1b]">Technical SEO &amp; Auditing</option>
              <option value="fullstack" className="bg-[#181a1b]">SEO + Frontend Web Development</option>
            </select>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-primary-container/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-heading text-xs text-on-surface/60 uppercase tracking-widest block">Estimated Monthly Compensation</span>
            <span className="font-heading text-3xl md:text-4xl font-extrabold text-primary-container">
              ₱{calculateSalary()} <span className="text-xs text-on-surface/60 font-sans font-normal">/ month (PHP)</span>
            </span>
          </div>
          <span className="font-sans text-xs text-on-surface/50 max-w-xs text-right">
            Based on current industry averages for remote and local SEO professionals.
          </span>
        </div>
      </div>

      {/* Tool 2: Free Instant Audit Request */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-[#181a1b]/80 border border-white/10 backdrop-blur-xl space-y-6">
          <span className="material-symbols-outlined text-4xl text-primary-container">
            travel_explore
          </span>
          <h2 className="font-heading text-2xl font-bold text-on-surface">
            Request an SEO Website Audit
          </h2>
          <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
            Enter your domain below for a manual preliminary audit checking indexation status, mobile speed, security headers, and meta tags.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container"
              required
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-primary transition-colors"
            >
              Submit Audit Request
            </button>
          </form>
        </div>

        {/* Tool 3: Local SEO / GBP Auditor Shell */}
        <div className="p-8 rounded-3xl bg-[#181a1b]/80 border border-white/10 backdrop-blur-xl space-y-6">
          <span className="material-symbols-outlined text-4xl text-primary-container">
            distance
          </span>
          <h2 className="font-heading text-2xl font-bold text-on-surface">
            Local SEO &amp; GBP Health Checker
          </h2>
          <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
            Assess your Google Business Profile optimization score, NAP consistency, and local map pack rankings.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="text"
              placeholder="Business Name (as on Google Maps)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container"
              required
            />
            <input
              type="text"
              placeholder="Target Location / City (e.g. Manila, Cebu)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container"
              required
            />
            <button
              type="submit"
              className="w-full bg-white/10 text-on-surface border border-white/10 font-heading text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/20 transition-colors"
            >
              Check GBP Score
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
