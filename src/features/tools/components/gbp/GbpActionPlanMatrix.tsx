'use client'

import React from 'react'
import type { ActionItem } from '@/types/gbp'

export interface GbpActionPlanMatrixProps {
  actionItems?: ActionItem[]
}

export function GbpActionPlanMatrix({ actionItems }: GbpActionPlanMatrixProps) {
  return (
    <div className="p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 space-y-4 print:space-y-2.5 shadow-xl print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] font-semibold">
            Action Plan
          </span>
          <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface">
            Prioritized Optimization Roadmap
          </h3>
        </div>
        <span className="text-xs font-sans text-on-surface/70">
          {actionItems?.length || 0} Key Observations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 print-grid-actions gap-3 print:gap-2">
        {actionItems?.map((item, idx) => {
          const colors = {
            high: 'bg-rose-500/10 border-rose-500/25 text-rose-700 dark:text-rose-300',
            medium: 'bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-300',
            low: 'bg-sky-500/10 border-sky-500/25 text-sky-700 dark:text-sky-300',
            passed: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-300 opacity-70',
          }[item.priority]

          const icons = {
            high: '🔴',
            medium: '🟡',
            low: '🔵',
            passed: '🟢',
          }[item.priority]

          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 p-3.5 print:p-2.5 rounded-xl border ${colors} transition-all print-break-inside-avoid`}
            >
              <span className="text-xs mt-0.5 shrink-0">{icons}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium leading-relaxed print:leading-snug">
                  {item.message}
                </p>
                <p className="text-[10px] uppercase font-semibold tracking-[0.08em] mt-1 opacity-80">
                  {item.priority} Priority
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
