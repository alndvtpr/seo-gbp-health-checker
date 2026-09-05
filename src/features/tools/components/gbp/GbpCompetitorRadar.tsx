'use client'

import React from 'react'
import { Compass, Globe } from 'lucide-react'
import type { GBPAuditResponse } from '@/types/gbp'

export interface GbpCompetitorRadarProps {
  result: GBPAuditResponse
}

export function GbpCompetitorRadar({ result }: GbpCompetitorRadarProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 print-grid-row-2 gap-4 sm:gap-6 print:gap-3 print-break-inside-avoid">
      {/* Competitor Gap Radar (7 Cols) */}
      <div className="lg:col-span-7 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] font-semibold">
              Competitive Intelligence
            </span>
            <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface">
              Top Local Competitors in {result.location}
            </h3>
          </div>
          <Compass className="w-5 h-5 text-primary-container/80" />
        </div>

        {result.competitors && result.competitors.length > 0 ? (
          <div className="space-y-2.5 print:space-y-1.5">
            {result.competitors.map((comp, idx) => (
              <div
                key={idx}
                className="p-3.5 print:p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between gap-3 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors print-break-inside-avoid"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center font-heading text-xs font-bold text-primary-container shrink-0">
                    #{comp.position}
                  </span>
                  <div className="min-w-0">
                    <span className="font-heading text-xs sm:text-sm font-bold text-on-surface truncate block">
                      {comp.name}
                    </span>
                    {comp.category && (
                      <span className="text-[10px] font-sans text-on-surface/70 truncate block">
                        🏷️ {comp.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-heading font-bold tracking-[0.06em]">
                    {comp.rating ? `${comp.rating} ⭐` : 'Unrated'}
                  </span>
                  <span className="text-[11px] font-sans text-on-surface/70">
                    {comp.reviews || 0} reviews
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-on-surface/70 py-4 text-center">
            No immediate local map pack competitors detected for this specific search term.
          </p>
        )}

        {result.categoryBenchmark && (
          <div
            className={`p-3.5 sm:p-4 print:p-2.5 rounded-xl border text-xs print-break-inside-avoid shadow-inner ${
              result.categoryBenchmark.isCategoryMismatchDetected
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-100'
                : 'bg-primary-container/10 border-primary-container/20 text-on-surface/90'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-heading font-bold uppercase tracking-[0.08em] text-[10px] text-primary-container">
                {result.categoryBenchmark.isCategoryMismatchDetected
                  ? '🚨 Critical Category Anomaly Detected'
                  : '🏷️ Category and Profile Review'}
              </span>
              {result.categoryBenchmark.rawGoogleCategory &&
                result.categoryBenchmark.isCategoryMismatchDetected && (
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                    Current Google Tag: &quot;{result.categoryBenchmark.rawGoogleCategory}&quot;
                  </span>
                )}
            </div>
            <p className="leading-relaxed text-on-surface/80">
              {result.categoryBenchmark.categoryOptimizationTip}
            </p>
          </div>
        )}
      </div>

      {/* Website & Semantic SEO Snapshot (5 Cols) */}
      <div className="lg:col-span-5 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] font-semibold">
              On-Page Synergy
            </span>
            <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface">
              Website SEO Signal
            </h3>
          </div>
          <Globe className="w-5 h-5 text-primary-container/80" />
        </div>

        {result.websiteSeo && result.websiteSeo.status !== 'no_website' ? (
          <div className="space-y-3 print:space-y-2 text-xs">
            <div className="p-2.5 print:p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
              <span className="text-on-surface/50 text-[11px]">Linked URL:</span>
              <a
                href={result.websiteSeo.url}
                target="_blank"
                rel="noopener noreferrer nofollow ugc"
                aria-label={`Open audited business website ${result.websiteSeo.url} (opens in new tab)`}
                className="text-primary-container hover:underline truncate max-w-[200px]"
              >
                {result.websiteSeo.url}
              </a>
            </div>

            {result.websiteSeo.status === 'error' ? (
              <p className="text-xs text-rose-700 dark:text-rose-400 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                ⚠ Website responded with an error or blocked the audit bot.
              </p>
            ) : (
              <div className="space-y-2.5 print:space-y-1.5">
                <div className="space-y-1">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-on-surface/50">
                    Title Tag
                  </span>
                  <p className="text-xs text-on-surface font-medium leading-relaxed bg-black/[0.02] dark:bg-white/[0.02] p-2.5 print:p-2 rounded-lg border border-black/5 dark:border-white/5">
                    {result.websiteSeo.title ? (
                      result.websiteSeo.title
                    ) : (
                      <span className="text-rose-700 dark:text-rose-400">Missing Title Tag</span>
                    )}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-on-surface/50">
                    Meta Description
                  </span>
                  <p className="text-xs text-on-surface/70 leading-relaxed line-clamp-2 bg-black/[0.02] dark:bg-white/[0.02] p-2.5 print:p-2 rounded-lg border border-black/5 dark:border-white/5">
                    {result.websiteSeo.metaDescription ? (
                      result.websiteSeo.metaDescription
                    ) : (
                      <span className="text-rose-700 dark:text-rose-400">Missing Meta Description</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 print:p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-700 dark:text-rose-300 space-y-1">
            <p className="font-bold">No Website Linked on GBP</p>
            <p className="opacity-80">
              Linking an accurate website or relevant landing page can help customers and search systems confirm the business details.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
