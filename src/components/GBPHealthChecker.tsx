'use client'

import React, { useState, useRef, useEffect } from 'react'

// ─── Type Definitions ───────────────────────────────────────────────────────

/** Breakdown of the three audit pillars returned by the API. */
export interface AuditPillar {
  name: string
  score: number
  maxScore: number
  details: string[]
}

/** Full API response payload from /api/gbp-audit */
export interface GBPAuditResponse {
  success: boolean
  businessName: string
  location: string
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  placeId: string | null
  foundInMapPack: boolean
  mapPackPosition: number | null
  error?: string
}

// ─── Sub-Components ─────────────────────────────────────────────────────────

/**
 * Animated SVG circular progress ring.
 * Uses stroke-dashoffset animation to draw the arc on mount / score change.
 */
function CircularProgressRing({
  score,
  grade,
}: {
  score: number
  grade: string
}) {
  const radius = 70
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference)
    }, 100)
    return () => clearTimeout(timer)
  }, [score, circumference])

  const ringColor =
    score >= 70
      ? '#4ade80'
      : score >= 40
        ? '#ffb783'
        : '#f87171'

  const gradeColor =
    score >= 70 ? 'text-green-400' : score >= 40 ? 'text-primary' : 'text-red-400'

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="drop-shadow-lg"
        aria-label={`GBP score: ${score} out of 100`}
      >
        <circle
          stroke="rgba(255,255,255,0.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={ringColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
        />
        <text
          x={radius}
          y={radius - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="22"
          fontWeight="800"
          fontFamily="var(--font-montserrat), sans-serif"
        >
          {score}
        </text>
        <text
          x={radius}
          y={radius + 16}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="10"
          fontFamily="var(--font-inter), sans-serif"
        >
          / 100
        </text>
      </svg>
      <span className={`font-heading font-extrabold text-lg tracking-wide ${gradeColor}`}>
        Grade: {grade}
      </span>
    </div>
  )
}

/**
 * Single audit pillar card showing name, score bar, and detail bullets.
 */
function PillarCard({ pillar }: { pillar: AuditPillar }) {
  const pct = Math.round((pillar.score / pillar.maxScore) * 100)
  const barColor =
    pct >= 70 ? 'bg-green-400' : pct >= 40 ? 'bg-primary' : 'bg-red-400'

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-heading text-xs font-bold uppercase tracking-wider text-on-surface/80">
          {pillar.name}
        </span>
        <span className="font-heading text-sm font-bold text-on-surface">
          {pillar.score}
          <span className="text-on-surface/40 font-normal">/{pillar.maxScore}</span>
        </span>
      </div>

      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-1.5">
        {pillar.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-on-surface/60">
            <span className="mt-0.5 shrink-0 text-primary-container">›</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Auto-dismissing toast notification for API errors.
 */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-50 max-w-sm flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/90 border border-red-400/40 text-white text-sm shadow-xl"
    >
      <span className="text-lg leading-none mt-0.5">⚠</span>
      <span className="leading-snug">{message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="ml-auto shrink-0 opacity-70 hover:opacity-100 transition-opacity text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * GBPHealthChecker
 *
 * Interactive Local SEO & Google Business Profile auditor.
 * Posts to /api/gbp-audit and renders a circular score ring
 * plus three audit pillar cards (Completeness, Reputation, Visibility).
 */
export function GBPHealthChecker() {
  const [businessName, setBusinessName] = useState('')
  const [targetLocation, setTargetLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GBPAuditResponse | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!businessName.trim() || !targetLocation.trim()) return

    setIsLoading(true)
    setResult(null)
    setErrorMsg(null)

    try {
      const res = await fetch('/api/gbp-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName.trim(),
          targetLocation: targetLocation.trim(),
        }),
      })

      const data: GBPAuditResponse = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? `Server error ${res.status}`)
      }

      setResult(data)

      // Smooth-scroll to results after render
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {errorMsg && <Toast message={errorMsg} onClose={() => setErrorMsg(null)} />}

      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* Business Name */}
        <input
          id="gbp-business-name"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name (as on Google Maps)"
          required
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-colors min-h-[44px] disabled:opacity-50"
        />

        {/* Target Location */}
        <input
          id="gbp-target-location"
          type="text"
          value={targetLocation}
          onChange={(e) => setTargetLocation(e.target.value)}
          placeholder="Target Location / City (e.g. Manila, Cebu)"
          required
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-colors min-h-[44px] disabled:opacity-50"
        />

        {/* Submit */}
        <button
          type="submit"
          id="gbp-submit-btn"
          disabled={isLoading || !businessName.trim() || !targetLocation.trim()}
          aria-label="Check GBP Score"
          className="w-full bg-white/10 text-on-surface border border-white/10 font-heading text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/20 active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
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
              Auditing…
            </>
          ) : (
            'Check GBP Score'
          )}
        </button>
      </form>

      {/* ── Results Panel ────────────────────────────────────────────────── */}
      {result && (
        <div
          ref={resultsRef}
          className="mt-6 space-y-5"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Score header card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
            <CircularProgressRing score={result.totalScore} grade={result.grade} />

            <div className="flex-1 space-y-1 text-center sm:text-left">
              <p className="font-heading text-[10px] uppercase tracking-widest text-on-surface/50">
                GBP Audit Result
              </p>
              <p className="font-heading text-base font-bold text-on-surface leading-snug">
                {result.businessName}
              </p>
              <p className="font-sans text-xs text-on-surface/50">{result.location}</p>

              {/* Map Pack status badge */}
              <div className="pt-2">
                {result.foundInMapPack ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                    <span>✓</span>
                    {result.mapPackPosition && result.mapPackPosition <= 3
                      ? `Map Pack #${result.mapPackPosition}`
                      : `Map Pack Position #${result.mapPackPosition ?? '?'}`}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                    <span>✗</span>
                    Not in Local Map Pack
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Audit pillar breakdown */}
          <div className="grid grid-cols-1 gap-3">
            {result.pillars.map((pillar) => (
              <PillarCard key={pillar.name} pillar={pillar} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center font-sans text-[10px] text-on-surface/30 leading-relaxed">
            Scores are estimates based on Google Places &amp; Serper API data.
            For a full audit,{' '}
            <a
              href="/contact"
              className="text-primary-container underline hover:text-primary transition-colors"
            >
              contact me
            </a>
            .
          </p>
        </div>
      )}
    </>
  )
}
