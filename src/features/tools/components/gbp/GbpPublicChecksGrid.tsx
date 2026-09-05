'use client'

import React from 'react'
import type { PublicAuditCheck } from '@/types/gbp'

export interface GbpPublicChecksGridProps {
  checks?: PublicAuditCheck[]
}

export function GbpPublicChecksGrid({ checks }: GbpPublicChecksGridProps) {
  if (!checks || checks.length === 0) return null

  const passedCount = checks.filter((c) => c.status === 'passed').length

  return (
    <div className="p-6 sm:p-7 print:p-3.5 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] font-semibold">
            Public Signal Transparency
          </span>
          <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface">
            10-Point Public Diagnostic Breakdown
          </h3>
        </div>
        <span className="text-xs font-sans text-on-surface/70">
          {passedCount} / {checks.length} Verified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 print:grid-cols-2 gap-2.5 print:gap-1.5">
        {checks.map((chk) => (
          <div
            key={chk.id}
            className="p-3 print:p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-start gap-2.5 print-break-inside-avoid"
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                chk.status === 'passed'
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                  : chk.status === 'warning'
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30'
              }`}
            >
              {chk.status === 'passed' ? '✓' : chk.status === 'warning' ? '⚠️' : '✗'}
            </span>
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading font-bold text-xs text-on-surface truncate">
                  {chk.label}
                </span>
                <span
                  className={`text-[10px] font-heading font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    chk.status === 'passed'
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10'
                      : chk.status === 'warning'
                        ? 'text-amber-700 dark:text-amber-400 bg-amber-500/10'
                        : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                  }`}
                >
                  {chk.scoreEarned}/{chk.maxScore} pts
                </span>
              </div>
              {chk.value && (
                <p className="text-[11px] font-mono text-on-surface/70 truncate">
                  {chk.value}
                </p>
              )}
              <p className="text-[10px] font-sans text-on-surface/70 leading-tight">
                {chk.impactMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
