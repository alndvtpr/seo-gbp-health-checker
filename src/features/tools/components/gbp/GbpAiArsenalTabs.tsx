'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowUpRight, CheckCircle } from 'lucide-react'
import type { GBPAuditResponse } from '@/types/gbp'
import { getAuditDeliverables } from '@/lib/gbp/auditDeliverables'

export interface GbpAiArsenalTabsProps {
  result: GBPAuditResponse
  activeTab: 'roadmap' | 'description' | 'templates' | 'keywords'
  setActiveTab: (tab: 'roadmap' | 'description' | 'templates' | 'keywords') => void
  onCopy: (text: string, label: string) => void
}

export function GbpAiArsenalTabs({
  result,
  activeTab,
  setActiveTab,
  onCopy,
}: GbpAiArsenalTabsProps) {
  const {
    defaultActionPlan,
    defaultDescription,
    defaultPositiveTemplate,
    defaultConstructiveTemplate,
    defaultKeywords,
  } = getAuditDeliverables(result)

  return (
    <div
      id="ai-arsenal-section"
      className="p-6 sm:p-8 print:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-surface-3 via-surface-2 to-surface-1 border border-primary-container/30 space-y-6 print:space-y-4 shadow-2xl relative overflow-hidden print-page-break-before"
    >
      {/* Header with Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:gap-1 pb-2 border-b border-black/10 dark:border-white/10 print-break-inside-avoid">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-on-surface">
              AI-Assisted Draft Deliverables
            </h3>
          </div>
          <p className="text-xs text-on-surface/60">
            Personalized deliverables &amp; local ranking assets generated for {result.businessName}.
          </p>
        </div>

        {/* Tab Switcher (Screen Only) */}
        <div
          role="group"
          aria-label="Generated audit deliverables"
          className="no-print flex items-center gap-1.5 p-1 rounded-xl bg-surface-2 border border-black/10 dark:border-white/10 overflow-x-auto max-w-full py-1.5 px-1.5 scrollbar-none"
        >
          <button
            type="button"
            onClick={() => setActiveTab('roadmap')}
            aria-pressed={activeTab === 'roadmap'}
            className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'roadmap'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface/70 hover:text-primary-container'
            }`}
          >
            30-Day Sprint
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            aria-pressed={activeTab === 'description'}
            className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'description'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface/70 hover:text-primary-container'
            }`}
          >
            750-Char Bio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            aria-pressed={activeTab === 'templates'}
            className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'templates'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface/70 hover:text-primary-container'
            }`}
          >
            Review Playbook
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('keywords')}
            aria-pressed={activeTab === 'keywords'}
            className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'keywords'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface/70 hover:text-primary-container'
            }`}
          >
            Local Keywords
          </button>
        </div>
      </div>

      {/* Tab 1: 30-Day Sprint Roadmap */}
      <div
        className={`space-y-3 print:space-y-1.5 print-deliverable-card ${activeTab === 'roadmap' ? 'block' : 'hidden'} print:mt-3`}
      >
        <div className="hidden print:flex items-center gap-2 pb-1 border-b border-black/10 dark:border-white/5">
          <span className="text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">
            Deliverable 01
          </span>
          <span className="text-on-surface/60 text-xs">•</span>
          <h4 className="font-heading font-bold text-sm text-on-surface">
            30-Day Roadmap &amp; Weekly Steps
          </h4>
        </div>
        <div className="prose dark:prose-invert prose-sm max-w-none prose-headings:font-heading prose-headings:text-primary-container prose-headings:font-bold prose-h3:text-sm prose-h4:text-xs prose-p:text-on-surface/80 prose-li:text-on-surface/80 prose-strong:text-on-surface prose-a:text-primary-container bg-surface-2 p-5 sm:p-7 print:p-4 rounded-2xl border border-black/10 dark:border-white/5 shadow-inner">
          <ReactMarkdown>{result.aiRecommendations || defaultActionPlan}</ReactMarkdown>
        </div>
      </div>

      {/* Tab 2: 750-Char SEO Optimized Business Description */}
      <div
        className={`space-y-3 print:space-y-1.5 print-deliverable-card ${activeTab === 'description' ? 'block' : 'hidden'} print-break-inside-avoid print:mt-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="hidden print:inline-block text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">
              Deliverable 02 •
            </span>
            <span className="font-heading text-xs font-bold text-on-surface">
              Keyword-Optimized Google Business Description
            </span>
            <span className="text-[11px] font-sans text-emerald-700 dark:text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {(result.aiDescription || defaultDescription).length} / 750 Characters
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              onCopy(result.aiDescription || defaultDescription, 'Business Description')
            }
            className="no-print inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-heading font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Copy Description</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 print:p-3 rounded-xl bg-surface-2 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-on-surface/90 leading-relaxed font-sans select-all whitespace-pre-wrap">
          {result.aiDescription || defaultDescription}
        </div>
        <p className="text-[11px] text-on-surface/70 italic">
          Paste this directly into your Google Business Profile &gt; Edit Profile &gt; Description
          field.
        </p>
      </div>

      {/* Tab 3: Review Response Playbook */}
      <div
        className={`space-y-3 print:space-y-1.5 print-deliverable-card print-page-break-before ${activeTab === 'templates' ? 'block' : 'hidden'} print-break-inside-avoid print:mt-0`}
      >
        <div className="hidden print:flex items-center gap-2 pb-1 border-b border-black/10 dark:border-white/5">
          <span className="text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">
            Deliverable 03
          </span>
          <span className="text-on-surface/60 text-xs">•</span>
          <h4 className="font-heading font-bold text-sm text-on-surface">
            AI Review Response Playbook
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 print-grid-templates gap-4 print:gap-3">
          {/* Positive Template */}
          <div className="p-5 print:p-3.5 rounded-2xl bg-surface-2 border border-emerald-500/20 space-y-3 print:space-y-1.5 flex flex-col justify-between print-break-inside-avoid">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-500 border border-emerald-500/30">
                  5-Star Review Response (Keyword-Optimized)
                </span>
              </div>
              <p className="text-xs text-on-surface/80 leading-relaxed print:leading-snug select-all">
                {result.aiReviewTemplates?.positive || defaultPositiveTemplate}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onCopy(
                  result.aiReviewTemplates?.positive || defaultPositiveTemplate,
                  '5-Star Template',
                )
              }
              className="no-print inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-heading font-bold text-on-surface transition-all cursor-pointer"
            >
              <span>Copy 5-Star Template</span>
            </button>
          </div>

          {/* Constructive Template */}
          <div className="p-5 print:p-3.5 rounded-2xl bg-surface-2 border border-amber-500/20 space-y-3 print:space-y-1.5 flex flex-col justify-between print-break-inside-avoid">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-amber-500/15 text-amber-700 dark:text-amber-500 border border-amber-500/30">
                  Constructive Review Response (Trust Recovery)
                </span>
              </div>
              <p className="text-xs text-on-surface/80 leading-relaxed print:leading-snug select-all">
                {result.aiReviewTemplates?.constructive || defaultConstructiveTemplate}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onCopy(
                  result.aiReviewTemplates?.constructive || defaultConstructiveTemplate,
                  'Constructive Template',
                )
              }
              className="no-print inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-heading font-bold text-on-surface transition-all cursor-pointer"
            >
              <span>Copy Constructive Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 4: High-Intent Local Keywords */}
      <div
        className={`space-y-3 print:space-y-1.5 print-deliverable-card ${activeTab === 'keywords' ? 'block' : 'hidden'} print-break-inside-avoid print:mt-4`}
      >
        <div className="flex items-center justify-between pb-1 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="hidden print:inline-block text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">
              Deliverable 04 •
            </span>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-on-surface">
              High-Intent Local Keywords Arsenal
            </h4>
          </div>
          <span className="text-[11px] font-sans text-on-surface/70">
            {(result.aiKeywords && result.aiKeywords.length > 0 ? result.aiKeywords : defaultKeywords)
              .length}{' '}
            Recommended Search Queries
          </span>
        </div>

        <span className="text-xs text-on-surface/70 block">
          Target local search queries to incorporate into Google Posts, service descriptions, FAQ
          answers, photo metadata, and website meta tags:
        </span>
        <div className="flex flex-wrap gap-2.5 print:gap-1.5">
          {(result.aiKeywords && result.aiKeywords.length > 0
            ? result.aiKeywords
            : defaultKeywords
          ).map((kw, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onCopy(kw, `Keyword: "${kw}"`)}
              className="inline-flex items-center gap-2 px-3.5 py-2 print:px-2.5 print:py-1 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary-container/20 border border-black/10 dark:border-white/10 hover:border-primary-container/40 text-xs font-heading font-medium text-on-surface hover:text-primary-container transition-all cursor-pointer group print-break-inside-avoid"
            >
              <span>{kw}</span>
              <ArrowUpRight className="no-print w-3 h-3 opacity-40 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {result.additionalCategories && result.additionalCategories.length > 0 && (
          <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1.5 print:space-y-1">
            <span className="text-[11px] font-sans text-on-surface/50 block">
              Recommended Secondary Categories for Google Business Profile:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {result.additionalCategories.map((subCat, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-heading font-medium"
                >
                  + {subCat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
