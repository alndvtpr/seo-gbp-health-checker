'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'

interface PerformanceAuditProofProps {
  className?: string
  eyebrow?: string
  title?: string
  subtitle?: string
  compact?: boolean
}

type TabType = 'desktop' | 'mobile' | 'compare'

export function PerformanceAuditProof({
  className = '',
  eyebrow = '02. Empirical Validation & Audit Proof',
  title = 'Google PageSpeed Insights Audit Scores',
  subtitle = 'Empirical Lighthouse and Core Web Vitals benchmarks for alaintapiru.com demonstrating sub-second load velocity, 0ms Total Blocking Time, and flawless 100/100 SEO health.',
  compact = false,
}: PerformanceAuditProofProps) {
  const [activeTab, setActiveTab] = useState<TabType>('compare')

  return (
    <section
      aria-labelledby="audit-proof-heading"
      className={`relative rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-amber-500/25 p-5 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(230,126,34,0.12)] backdrop-blur-sm overflow-hidden ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(230,126,34,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 space-y-3 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {eyebrow}
          </span>
          <span className="text-on-surface/40 text-xs hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Official PageSpeed Report
          </span>
        </div>

        <h2
          id="audit-proof-heading"
          className="font-heading text-xl sm:text-2xl md:text-4xl font-bold text-on-surface tracking-tight"
        >
          {title}
        </h2>
        <p className="font-sans text-sm sm:text-base text-on-surface/75 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Metric Highlight Pills */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
        <div className="p-3 sm:p-3.5 rounded-xl bg-surface-1/70 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-heading font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            ⚡ Desktop Score
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black font-heading text-on-surface">99</span>
            <span className="text-[11px] text-emerald-400 font-bold">/ 100</span>
          </div>
          <span className="text-[10px] text-on-surface/50 font-sans mt-0.5">0ms Total Blocking Time</span>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl bg-surface-1/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-heading font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            📱 Mobile Score
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black font-heading text-on-surface">96</span>
            <span className="text-[11px] text-emerald-400 font-bold">/ 100</span>
          </div>
          <span className="text-[10px] text-on-surface/50 font-sans mt-0.5">Moto G Power Emulation</span>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl bg-surface-1/70 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-heading font-bold text-primary-container uppercase tracking-wider flex items-center gap-1">
            🟢 Core Web Vitals
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black font-heading text-on-surface">100%</span>
            <span className="text-[11px] text-emerald-400 font-bold">Passed</span>
          </div>
          <span className="text-[10px] text-on-surface/50 font-sans mt-0.5">0.000 CLS &bull; Sub-1.2s LCP</span>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl bg-surface-1/70 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-heading font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
            🛡️ SEO &amp; Best Practices
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black font-heading text-on-surface">100 / 100</span>
          </div>
          <span className="text-[10px] text-on-surface/50 font-sans mt-0.5">Structured Data &amp; Security</span>
        </div>
      </div>

      {/* Interactive Responsive Tab Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="inline-flex p-1 rounded-xl bg-surface-2 border border-white/10 w-full sm:w-auto justify-center sm:justify-start">
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-[0.06em] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="hidden sm:inline">⚖️</span>
            <span>Side-by-Side</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('desktop')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-[0.06em] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'desktop'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>⚡ Desktop (99)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mobile')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-[0.06em] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mobile'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📱 Mobile (96)</span>
          </button>
        </div>

        <div className="text-xs font-sans text-on-surface/50 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span>Audit Engine: Lighthouse 12.2.0</span>
        </div>
      </div>

      {/* Audit Screenshots Showcase Cards */}
      <div
        className={`relative z-10 grid gap-6 ${
          activeTab === 'compare'
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}
      >
        {/* Desktop Audit Card */}
        {(activeTab === 'compare' || activeTab === 'desktop') && (
          <div className="rounded-2xl bg-surface-1 border border-white/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Mockup Top Window Bar */}
            <div className="px-4 py-3 bg-surface-2 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-sm px-3 py-1 rounded-md bg-black/50 border border-white/5 text-[10px] font-mono text-on-surface/60 truncate text-center flex items-center justify-center gap-1">
                <span className="text-emerald-400">🔒</span>
                <span>pagespeed.web.dev/analysis/https-www-alaintapiru-com</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-heading font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                Desktop Environment
              </span>
            </div>

            {/* Scoreboard Badges */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-[#1b1e1f] to-[#181a1b] border-b border-white/5 grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">99</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">Performance</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">96</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">Accessibility</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">100</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">Best Practices</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">100</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">SEO</div>
              </div>
            </div>

            {/* Fixed Aspect-Ratio Image Container for Zero CLS */}
            <div className="relative w-full aspect-[953/826] bg-black/40 p-2 sm:p-3 flex items-center justify-center">
              <Image
                src="/images/projects/alaintapiru-pagespeed-desktop-audit-scores.avif"
                alt="PageSpeed Insights desktop audit report for alaintapiru.com showing 99 Performance, 96 Accessibility, 100 Best Practices, and 100 SEO scores."
                width={953}
                height={826}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-contain rounded-lg border border-white/5 shadow-inner"
              />
            </div>

            {/* Card Footer Breakdown */}
            <div className="p-4 sm:p-5 border-t border-white/5 bg-surface-2 flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <Icon name="check_circle" size={16} className="text-emerald-400" />
                <span className="text-on-surface/80 font-medium">Desktop Speed Index: &lt; 0.9s</span>
              </div>
              <span className="text-primary-container font-heading font-bold">0ms TBT</span>
            </div>
          </div>
        )}

        {/* Mobile Audit Card */}
        {(activeTab === 'compare' || activeTab === 'mobile') && (
          <div className="rounded-2xl bg-surface-1 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Mockup Top Window Bar */}
            <div className="px-4 py-3 bg-surface-2 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-sm px-3 py-1 rounded-md bg-black/50 border border-white/5 text-[10px] font-mono text-on-surface/60 truncate text-center flex items-center justify-center gap-1">
                <span className="text-emerald-400">🔒</span>
                <span>pagespeed.web.dev/analysis/https-www-alaintapiru-com</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-heading font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                Mobile Environment
              </span>
            </div>

            {/* Scoreboard Badges */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-surface-3 to-surface-2 border-b border-white/5 grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">96</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">Performance</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">96</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">Accessibility</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">100</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">Best Practices</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg sm:text-xl font-black font-heading text-emerald-400">100</div>
                <div className="text-[10px] font-heading uppercase text-on-surface/70">SEO</div>
              </div>
            </div>

            {/* Fixed Aspect-Ratio Image Container for Zero CLS */}
            <div className="relative w-full aspect-[935/854] bg-black/40 p-2 sm:p-3 flex items-center justify-center">
              <Image
                src="/images/projects/alaintapiru-pagespeed-mobile-audit-scores.avif"
                alt="PageSpeed Insights mobile audit report for alaintapiru.com showing 96 Performance, 96 Accessibility, 100 Best Practices, and 100 SEO scores."
                width={935}
                height={854}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-contain rounded-lg border border-white/5 shadow-inner"
              />
            </div>

            {/* Card Footer Breakdown */}
            <div className="p-4 sm:p-5 border-t border-white/5 bg-surface-2 flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <Icon name="check_circle" size={16} className="text-emerald-400" />
                <span className="text-on-surface/80 font-medium">Mobile Simulated Slow 4G</span>
              </div>
              <span className="text-emerald-400 font-heading font-bold">Passed Vitals</span>
            </div>
          </div>
        )}
      </div>

      {/* Technical Optimizations Bento Bar */}
      {!compact && (
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 space-y-4">
          <span className="font-heading text-[11px] text-primary-container uppercase tracking-[0.08em] font-semibold block">
            How These Scores Were Engineered
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="text-amber-400">⚡</span> Zero-CPU CSS Ambient Layer
              </div>
              <p className="font-sans text-[11px] text-on-surface/70 leading-relaxed">
                Replaced blocking WebGL animation loops with GPU-composited CSS gradients, eliminating 4.5s of desktop CPU blocking.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="text-emerald-400">⏱️</span> Interaction-Deferred Analytics
              </div>
              <p className="font-sans text-[11px] text-on-surface/70 leading-relaxed">
                Google Analytics and third-party tags defer to idle callbacks (8000ms fallback) or first user pointer interaction.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="text-primary-container">📐</span> Explicit Image Aspect Reserves
              </div>
              <p className="font-sans text-[11px] text-on-surface/70 leading-relaxed">
                Every visual asset uses static dimensions and fixed aspect ratio wrappers, achieving a pristine 0.000 CLS score.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="text-sky-400">🛡️</span> Complete Schema Graph
              </div>
              <p className="font-sans text-[11px] text-on-surface/70 leading-relaxed">
                Automated JSON-LD schemas (`WebSite`, `Person`, `Article`, `BreadcrumbList`) ensuring 100/100 SEO &amp; Rich Snippet health.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
