'use client'

import React from 'react'

export interface GbpAuditFormProps {
  businessName: string
  setBusinessName: (value: string) => void
  targetLocation: string
  setTargetLocation: (value: string) => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function GbpAuditForm({
  businessName,
  setBusinessName,
  targetLocation,
  setTargetLocation,
  isLoading,
  onSubmit,
}: GbpAuditFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3.5" noValidate aria-busy={isLoading}>
      {/* Business Name */}
      <label htmlFor="gbp-business-name" className="sr-only">
        Business name as listed on Google Maps
      </label>
      <input
        id="gbp-business-name"
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Business Name (as on Google Maps)"
        maxLength={100}
        required
        disabled={isLoading}
        className="w-full bg-surface-2/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-colors min-h-[46px] disabled:opacity-50"
      />

      {/* Target Location */}
      <label htmlFor="gbp-target-location" className="sr-only">
        Target location or city
      </label>
      <input
        id="gbp-target-location"
        type="text"
        value={targetLocation}
        onChange={(e) => setTargetLocation(e.target.value)}
        placeholder="Target Location / City (e.g. Manila, Cebu, Bayombong)"
        maxLength={100}
        required
        disabled={isLoading}
        className="w-full bg-surface-2/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-colors min-h-[46px] disabled:opacity-50"
      />

      {/* Submit */}
      <button
        type="submit"
        id="gbp-submit-btn"
        disabled={isLoading || !businessName.trim() || !targetLocation.trim()}
        aria-label="Check GBP Score"
        className="w-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_20px_rgba(230,126,34,0.3)]"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            Auditing Local Signals…
          </>
        ) : (
          'Audit Google Business Profile'
        )}
      </button>
    </form>
  )
}
