'use client'

import React from 'react'
import type { GBPAuditResponse } from '@/types/gbp'
import { CircularProgressRing } from '@/components/gbp/CircularProgressRing'
import { PillarCard } from '@/components/gbp/PillarCard'

export interface GbpScoreOverviewProps {
  result: GBPAuditResponse
  passedCount: number
  totalChecks: number
}

export function GbpScoreOverview({
  result,
  passedCount,
  totalChecks,
}: GbpScoreOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 print-grid-row-1 gap-4 sm:gap-6 print:gap-3 print-break-inside-avoid">
      {/* Score Radar (4 Cols) */}
      <div className="lg:col-span-4 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 flex flex-col items-center justify-between text-center gap-4 print:gap-2 relative overflow-hidden shadow-xl print-break-inside-avoid">
        <div className="space-y-1">
          <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] font-semibold">
            Profile Health Score
          </span>
          <h3 className="font-heading font-bold text-base text-on-surface">
            Audit Performance
          </h3>
        </div>

        <CircularProgressRing score={result.totalScore} grade={result.grade} />

        <div className="space-y-2 w-full pt-1">
          <div className="flex items-center justify-between text-[11px] px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="text-on-surface/70">Checks Passed:</span>
            <span className="font-heading font-bold text-emerald-700 dark:text-emerald-400">
              {passedCount} / {totalChecks}
            </span>
          </div>

          {result.foundInMapPack ? (
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-heading font-bold tracking-[0.06em]">
              <span>✓</span> Ranked #{result.mapPackPosition} in Local Map Pack
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-heading font-bold tracking-[0.06em]">
              <span>✗</span> Not Ranking in Top 10 Map Pack
            </div>
          )}
        </div>
      </div>

      {/* 3 Pillars Breakdown (8 Cols) */}
      <div className="lg:col-span-8 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 flex flex-col justify-between gap-4 print:gap-2 shadow-xl print-break-inside-avoid">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] font-semibold">
              Core Signal Breakdown
            </span>
            <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface">
              Local Trust &amp; Ranking Pillars
            </h3>
          </div>
          <span className="text-xs font-sans text-on-surface/70">
            Weights out of 100 pts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 print-grid-pillars gap-3.5 print:gap-2">
          {result.pillars.map((pillar) => (
            <PillarCard key={pillar.name} pillar={pillar} />
          ))}
        </div>

        <p className="text-[11px] font-sans text-on-surface/70 leading-relaxed bg-black/[0.02] dark:bg-white/[0.02] p-3 print:p-2 rounded-xl border border-black/5 dark:border-white/5">
          💡 <strong className="text-on-surface/90">What this means:</strong> Google describes local results in terms of <span className="text-primary-container font-semibold">Relevance</span>, <span className="text-primary-container font-semibold">Prominence</span>, and <span className="text-primary-container font-semibold">Distance</span>. This diagnostic reviews public signals related to those areas; it does not reproduce Google&apos;s ranking system.
        </p>
      </div>
    </div>
  )
}
