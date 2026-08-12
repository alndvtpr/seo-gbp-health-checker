'use client'

import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

// ─── Type Definitions ───────────────────────────────────────────────────────

/** Breakdown of the three audit pillars returned by the API. */
export interface AuditPillar {
  name: string
  score: number
  maxScore: number
  details: string[]
}

export interface ActionItem {
  priority: 'high' | 'medium' | 'low' | 'passed'
  message: string
}

export interface Competitor {
  name: string
  rating?: number
  reviews?: number
  position: number
}

export interface WebsiteSeo {
  url: string
  title: string | null
  metaDescription: string | null
  status: 'success' | 'error' | 'no_website'
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
  actionItems?: ActionItem[]
  competitors?: Competitor[]
  websiteSeo?: WebsiteSeo
  error?: string
  aiRecommendations?: string
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
  const [isDeepChecking, setIsDeepChecking] = useState(false)
  const [result, setResult] = useState<GBPAuditResponse | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (result) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [result])

  // Deep Check State
  const [deepCheckAnswers, setDeepCheckAnswers] = useState<(boolean | null)[]>([null, null, null, null])
  const deepCheckQuestions = [
    "Do you actively respond to ALL Google reviews (good and bad)?",
    "Are all your core services/products listed with descriptions?",
    "Have you published a Google Update (Post) in the last 14 days?",
    "Is your business description filled out completely (near 750 chars)?"
  ]

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>, isDeepCheckUpdate = false) => {
    if (e) e.preventDefault()
    if (!businessName.trim() || !targetLocation.trim()) return

    if (isDeepCheckUpdate) {
      setIsDeepChecking(true)
    } else {
      setIsLoading(true)
      setResult(null)
      // Reset deep check answers for a new search
      setDeepCheckAnswers([null, null, null, null])
    }
    setErrorMsg(null)

    try {
      const payload: any = {
        businessName: businessName.trim(),
        targetLocation: targetLocation.trim(),
      }

      if (isDeepCheckUpdate && !deepCheckAnswers.includes(null)) {
        payload.deepCheckAnswers = deepCheckAnswers
      }

      const res = await fetch('/api/gbp-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data: GBPAuditResponse = await res.json()

      if (!res.ok || !data.success) {
        if (res.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in an hour.')
        }
        throw new Error(data.error ?? `Server error ${res.status}`)
      }

      setResult(data)

      if (!isDeepCheckUpdate) {
        // Smooth-scroll to results after initial render
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      } else {
        // Scroll to AI recommendations after deep check updates
        setTimeout(() => {
          const aiRecs = document.getElementById('ai-recommendations')
          aiRecs?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
      setIsDeepChecking(false)
    }
  }

  const handleDeepCheckSubmit = () => {
    if (deepCheckAnswers.includes(null)) return
    handleSubmit(undefined, true)
  }

  return (
    <>
      {errorMsg && <Toast message={errorMsg} onClose={() => setErrorMsg(null)} />}

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-3.5" noValidate>
        {/* Business Name */}
        <input
          id="gbp-business-name"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name (as on Google Maps)"
          maxLength={100}
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
          maxLength={100}
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

      {/* ── Full Screen Dashboard Modal ────────────────────────────────────── */}
      {result && (
        <div className="fixed inset-0 z-40 pt-20 md:pt-28 flex justify-center bg-black/60 backdrop-blur-2xl overflow-y-auto">
          <div className="w-full max-w-5xl px-4 pb-12 space-y-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between sticky top-4 md:top-8 bg-[#121414]/90 backdrop-blur-2xl px-5 py-4 md:px-8 md:py-5 rounded-2xl md:rounded-3xl z-10 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              <div>
                <h2 className="font-heading font-extrabold text-xl md:text-2xl text-on-surface">
                  {result.businessName}
                </h2>
                <p className="text-on-surface/50 text-[10px] md:text-xs tracking-widest uppercase font-bold mt-0.5">{result.location}</p>
              </div>
              <button
                onClick={() => setResult(null)}
                className="flex items-center gap-2 bg-red-500/15 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-full pl-5 pr-4 py-2.5 transition-all shadow-[0_0_20px_rgba(239,68,68,0.15)] border border-red-500/30 font-heading font-bold text-xs uppercase tracking-widest group"
                aria-label="Close dashboard"
              >
                Exit
                <svg className="group-hover:rotate-90 transition-transform duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Score & Badges */}
            <div className="flex flex-col md:flex-row gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-8">
              <CircularProgressRing score={result.totalScore} grade={result.grade} />
              
              <div className="space-y-4 text-center md:text-left flex-1">
                <h3 className="font-heading font-bold text-xl text-on-surface">Overall Health Score</h3>
                <p className="text-sm text-on-surface/70 leading-relaxed max-w-lg">
                  {result.grade === 'A+' || result.grade === 'A' ? "Excellent profile! You're following local SEO best practices." : 
                   result.grade.includes('B') ? "Good profile, but missing a few key local trust signals." : 
                   "Your profile needs urgent attention to compete in local search."}
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {result.foundInMapPack ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider">
                      <span>✓</span> Ranked #{result.mapPackPosition} in Map Pack
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                      <span>✗</span> Not Ranking in Top 10
                    </span>
                  )}
                  {result.websiteSeo?.status === 'success' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container/20 border border-primary-container/30 text-primary-container text-xs font-bold uppercase tracking-wider">
                      <span>✓</span> Website Linked
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Column 1: Action Plan */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-heading text-lg font-bold text-on-surface">Action Plan</h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  {result.actionItems?.map((item, idx) => {
                    const colors = {
                      high: 'bg-red-500/10 border-red-500/20 text-red-400',
                      medium: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
                      low: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                      passed: 'bg-green-500/10 border-green-500/20 text-green-400 opacity-60'
                    }[item.priority]

                    const icons = {
                      high: '🔴',
                      medium: '🟡',
                      low: '🔵',
                      passed: '🟢'
                    }[item.priority]

                    return (
                      <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border ${colors}`}>
                        <span className="text-sm mt-0.5">{icons}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.message}</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-70">{item.priority} Priority</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <h3 className="font-heading text-lg font-bold text-on-surface pt-4">Technical Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.pillars.map((pillar) => (
                    <PillarCard key={pillar.name} pillar={pillar} />
                  ))}
                </div>

                {/* ── Deep Check Section ── */}
                <div className="mt-8">
                  <h3 className="font-heading text-lg font-bold text-white mb-4">Deep Check — Unlock Full Score</h3>
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-5 shadow-lg">
                    <p className="text-sm text-white/90 leading-relaxed mb-4 font-medium">
                      Google doesn't share everything publicly. Answer these 4 questions truthfully to get your final adjusted score and generate a custom AI Action Plan.
                    </p>
                    
                    {deepCheckQuestions.map((q, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/20 last:border-0 last:pb-0">
                        <span className="text-sm text-white font-bold flex-1">{q}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              const newAns = [...deepCheckAnswers]
                              newAns[idx] = true
                              setDeepCheckAnswers(newAns)
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                              deepCheckAnswers[idx] === true 
                                ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                                : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => {
                              const newAns = [...deepCheckAnswers]
                              newAns[idx] = false
                              setDeepCheckAnswers(newAns)
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                              deepCheckAnswers[idx] === false 
                                ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                                : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 flex flex-col items-center gap-3">
                      <button
                        onClick={handleDeepCheckSubmit}
                        disabled={isDeepChecking || deepCheckAnswers.includes(null)}
                        className="bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isDeepChecking ? 'Generating AI Plan...' : 'Update My Score & AI Plan'}
                      </button>
                      {deepCheckAnswers.includes(null) && (
                        <p className="text-[10px] text-on-surface/50 uppercase tracking-widest font-bold">
                          Answer all questions to unlock
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── AI Recommendations Section ── */}
                {result.aiRecommendations && (
                  <div id="ai-recommendations" className="mt-8">
                    <h3 className="font-heading text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                      <span className="text-xl">✨</span> AI Recommendations
                    </h3>
                    <div className="bg-primary-container/10 border border-primary-container/20 rounded-2xl p-6 prose prose-invert prose-sm max-w-none prose-headings:font-heading prose-headings:text-primary-container prose-a:text-primary-container">
                      <ReactMarkdown>
                        {result.aiRecommendations}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {/* Column 2: Side Panel (Competitors & SEO) */}
              <div className="space-y-6">
                {/* Competitors */}
                {result.competitors && result.competitors.length > 0 && (
                  <>
                    <h3 className="font-heading text-lg font-bold text-on-surface">Top Competitors</h3>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                      {result.competitors.map((comp, idx) => (
                        <div key={idx} className="flex flex-col gap-1 pb-3 border-b border-white/10 last:border-0 last:pb-0">
                          <span className="text-sm font-bold text-on-surface">#{comp.position} {comp.name}</span>
                          <span className="text-xs text-on-surface/60">
                            {comp.rating ? `${comp.rating} ⭐` : 'No rating'} • {comp.reviews || 0} reviews
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Website On-Page SEO Snapshot */}
                {result.websiteSeo && result.websiteSeo.status !== 'no_website' && (
                  <>
                    <h3 className="font-heading text-lg font-bold text-on-surface">Website SEO Snapshot</h3>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                      <p className="text-xs text-primary-container truncate">{result.websiteSeo.url}</p>
                      
                      {result.websiteSeo.status === 'error' ? (
                        <p className="text-xs text-red-400">Failed to fetch website data (might be blocking bots).</p>
                      ) : (
                        <>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-on-surface/50 tracking-wider">Title Tag</span>
                            <p className="text-xs text-on-surface mt-1 font-medium leading-relaxed">
                              {result.websiteSeo.title ? result.websiteSeo.title : <span className="text-red-400">Missing</span>}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-on-surface/50 tracking-wider">Meta Description</span>
                            <p className="text-xs text-on-surface mt-1 leading-relaxed line-clamp-3">
                              {result.websiteSeo.metaDescription ? result.websiteSeo.metaDescription : <span className="text-red-400">Missing</span>}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                <div className="mt-8 p-5 rounded-2xl bg-primary-container/10 border border-primary-container/20 text-center space-y-3">
                  <h4 className="font-heading font-bold text-primary-container">Need help fixing these?</h4>
                  <p className="text-xs text-on-surface/70 leading-relaxed">
                    I specialize in Local SEO and converting profiles into lead generators.
                  </p>
                  <a href="/contact" className="inline-block px-4 py-2 mt-2 bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 transition-all">
                    Contact Me
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
