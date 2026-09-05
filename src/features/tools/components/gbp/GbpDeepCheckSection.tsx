'use client'

import React from 'react'

export interface GbpDeepCheckSectionProps {
  deepCheckAnswers: (boolean | null)[]
  setDeepCheckAnswers: React.Dispatch<React.SetStateAction<(boolean | null)[]>>
  isDeepChecking: boolean
  onSubmitDeepCheck: () => void
}

const DEEP_CHECK_QUESTIONS = [
  'Do you actively respond to ALL Google reviews (good and bad)?',
  'Are all your core services/products listed with descriptions?',
  'Have you published a Google Update (Post) in the last 14 days?',
  'Is your business description filled out completely (near 750 chars)?',
]

export function GbpDeepCheckSection({
  deepCheckAnswers,
  setDeepCheckAnswers,
  isDeepChecking,
  onSubmitDeepCheck,
}: GbpDeepCheckSectionProps) {
  return (
    <div className="p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid print:mt-3">
      <div className="space-y-1">
        <span className="font-heading text-[10px] text-primary-container uppercase tracking-[0.08em] font-semibold">
          Internal Verification Signals
        </span>
        <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface">
          Signal Calibration &amp; Checklist
        </h3>
        <p className="text-xs text-on-surface/60 leading-relaxed">
          Internal Google ranking factors that require active profile management.
        </p>
      </div>

      <div className="space-y-3 print:space-y-1.5 pt-2 print:pt-1">
        {DEEP_CHECK_QUESTIONS.map((q, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:gap-2 p-3.5 print:p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 print-break-inside-avoid"
          >
            <span className="text-xs font-medium text-on-surface/90 flex-1">{q}</span>

            {/* Screen View: Interactive Yes/No buttons */}
            <div
              role="group"
              aria-label={`Answer for: ${q}`}
              className="no-print flex items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={() => {
                  const newAns = [...deepCheckAnswers]
                  newAns[idx] = true
                  setDeepCheckAnswers(newAns)
                }}
                aria-pressed={deepCheckAnswers[idx] === true}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  deepCheckAnswers[idx] === true
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-400'
                    : 'bg-black/5 border-black/20 text-on-surface/70 hover:bg-black/10 dark:bg-white/5 dark:border-white/20 dark:hover:bg-white/10'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => {
                  const newAns = [...deepCheckAnswers]
                  newAns[idx] = false
                  setDeepCheckAnswers(newAns)
                }}
                aria-pressed={deepCheckAnswers[idx] === false}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  deepCheckAnswers[idx] === false
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-700 dark:text-rose-400'
                    : 'bg-black/5 border-black/20 text-on-surface/70 hover:bg-black/10 dark:bg-white/5 dark:border-white/20 dark:hover:bg-white/10'
                }`}
              >
                No
              </button>
            </div>

            {/* Print View: Clean status indicator */}
            <div className="hidden print:flex items-center gap-2 shrink-0">
              {deepCheckAnswers[idx] === true ? (
                <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  ✓ Verified
                </span>
              ) : deepCheckAnswers[idx] === false ? (
                <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30">
                  ✗ Needs Action
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  ⚡ Recommended Signal
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="no-print pt-2 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onSubmitDeepCheck}
          disabled={isDeepChecking || deepCheckAnswers.includes(null)}
          className="bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-[0.06em] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {isDeepChecking ? (
            <>
              <svg
                className="animate-spin h-3.5 w-3.5 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Recalculating score and action plan…</span>
            </>
          ) : (
            'Update My Score & AI Plan'
          )}
        </button>
        {deepCheckAnswers.includes(null) && (
          <p className="text-[10px] text-on-surface/70 uppercase tracking-[0.08em] font-semibold">
            Answer all 4 questions to calculate the final score
          </p>
        )}
      </div>
    </div>
  )
}
