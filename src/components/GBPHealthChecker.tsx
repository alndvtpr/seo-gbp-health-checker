'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import ReactMarkdown from 'react-markdown'
import { Download, X, Compass, Globe, CheckCircle, ArrowUpRight, Mail, Send, Check, Loader2 } from 'lucide-react'
import { sendAuditReportAction } from '@/app/actions/send-audit-report'

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
  category?: string
}

export interface CategoryBenchmark {
  isCategoryAlignedWithTopCompetitors: boolean
  topCompetitorCategories: string[]
  categoryOptimizationTip: string
  rawGoogleCategory?: string
  isCategoryMismatchDetected?: boolean
  recommendedPrimaryCategory?: string
  recommendedSecondaryCategories?: string[]
}

export interface PublicAuditCheck {
  id: string
  label: string
  status: 'passed' | 'failed' | 'warning'
  value?: string
  scoreEarned: number
  maxScore: number
  impactMessage: string
}

export interface WebsiteSeo {
  url: string
  title: string | null
  metaDescription: string | null
  status: 'success' | 'error' | 'no_website'
}

export interface ReviewTemplates {
  positive: string
  constructive: string
}

/** Full API response payload from /api/gbp-audit */
export interface GBPAuditResponse {
  success: boolean
  businessName: string
  location: string
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  publicChecks?: PublicAuditCheck[]
  placeId: string | null
  foundInMapPack: boolean
  mapPackPosition: number | null
  actionItems?: ActionItem[]
  competitors?: Competitor[]
  websiteSeo?: WebsiteSeo
  error?: string
  aiRecommendations?: string
  aiDescription?: string
  aiReviewTemplates?: ReviewTemplates
  aiKeywords?: string[]

  // ─── ✨ 2026 Category Intelligence Module ──────────────────────
  primaryCategory?: string
  additionalCategories?: string[]
  categoryConfidenceScore?: number
  categoryBenchmark?: CategoryBenchmark
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
  const radius = 68
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
    score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-primary-container' : 'text-rose-400'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="drop-shadow-[0_0_20px_rgba(255,183,131,0.15)]"
          aria-label={`GBP score: ${score} out of 100`}
        >
          <circle
            stroke="rgba(255,255,255,0.06)"
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
            y={radius - 7}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="24"
            fontWeight="800"
            fontFamily="var(--font-jakarta), sans-serif"
          >
            {score}
          </text>
          <text
            x={radius}
            y={radius + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="10"
            fontFamily="var(--font-inter), sans-serif"
            fontWeight="600"
          >
            SCORE / 100
          </text>
        </svg>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
        <span className="text-[10px] uppercase font-heading font-bold text-on-surface/50 tracking-wider">
          Rating
        </span>
        <span className={`font-heading font-extrabold text-sm ${gradeColor}`}>
          {grade}
        </span>
      </div>
    </div>
  )
}

/**
 * Single audit pillar card showing name, score bar, and detail bullets.
 */
function PillarCard({ pillar }: { pillar: AuditPillar }) {
  const max = pillar.maxScore > 0 ? pillar.maxScore : 30
  const pct = Math.min(100, Math.max(0, Math.round((pillar.score / max) * 100)))
  const barColor =
    pct >= 70 ? 'bg-emerald-400' : pct >= 40 ? 'bg-primary-container' : 'bg-rose-400'

  return (
    <div className="p-4 sm:p-5 print:p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 print:space-y-1.5 hover:bg-white/[0.05] transition-colors print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <span className="font-heading text-xs print:text-[11px] font-bold uppercase tracking-wider text-on-surface/90">
          {pillar.name}
        </span>
        <span className="font-heading text-xs print:text-[11px] font-bold text-on-surface">
          {pillar.score}
          <span className="text-on-surface/40 font-normal">/{max}</span>
        </span>
      </div>

      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-1.5 print:space-y-1">
        {pillar.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] print:text-[10px] text-on-surface/70 leading-relaxed print:leading-tight">
            <span className="mt-0.5 shrink-0 text-primary-container font-bold">›</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Auto-dismissing toast notification.
 */
function Toast({
  message,
  type = 'error',
  onClose,
}: {
  message: string
  type?: 'error' | 'success'
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  const bgStyle =
    type === 'success'
      ? 'bg-emerald-500/95 border-emerald-400/40 text-white'
      : 'bg-rose-500/95 border-rose-400/40 text-white'

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-[1000000] max-w-sm flex items-center gap-3 px-4 py-3 rounded-xl border ${bgStyle} text-xs font-medium shadow-2xl animate-in fade-in slide-in-from-bottom-5`}
    >
      <span className="text-base">{type === 'success' ? '✓' : '⚠'}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="opacity-70 hover:opacity-100 transition-opacity text-base leading-none cursor-pointer"
      >
        ×
      </button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function GBPHealthChecker() {
  const [businessName, setBusinessName] = useState('')
  const [targetLocation, setTargetLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeepChecking, setIsDeepChecking] = useState(false)
  const [result, setResult] = useState<GBPAuditResponse | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'roadmap' | 'description' | 'templates' | 'keywords'>('roadmap')
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSentSuccess, setEmailSentSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeModal = useCallback(() => {
    setResult(null)
    setIsEmailModalOpen(false)
    setEmailSentSuccess(false)
  }, [])

  const handleSendEmailReport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput || !result) return

    setIsSendingEmail(true)
    try {
      const res = await sendAuditReportAction({
        email: emailInput,
        businessName: result.businessName || 'Business',
        location: result.location,
        totalScore: result.totalScore,
        grade: result.grade,
        primaryCategory: result.primaryCategory,
        additionalCategories: result.additionalCategories,
        foundInMapPack: result.foundInMapPack,
        mapPackPosition: result.mapPackPosition,
        pillars: result.pillars,
        publicChecks: result.publicChecks,
        actionItems: result.actionItems,
        competitors: result.competitors,
        websiteSeo: result.websiteSeo,
        aiRecommendations: result.aiRecommendations,
        aiDescription: result.aiDescription,
        aiReviewTemplates: result.aiReviewTemplates,
        aiKeywords: result.aiKeywords,
        categoryBenchmark: result.categoryBenchmark,
      })

      if (res.success) {
        setEmailSentSuccess(true)
        setToastMsg({ message: 'Audit summary dispatched to your inbox!', type: 'success' })
        setTimeout(() => {
          setIsEmailModalOpen(false)
          setEmailSentSuccess(false)
        }, 2200)
      } else {
        setToastMsg({ message: res.error || 'Failed to dispatch email. Please try again.', type: 'error' })
      }
    } catch (err) {
      console.error('Email dispatch error:', err)
      setToastMsg({ message: 'Error sending email report. Please try again.', type: 'error' })
    } finally {
      setIsSendingEmail(false)
    }
  }

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (result) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [result, closeModal])

  /**
   * 2026 Executive PDF Export Engine.
   * Dynamically formats and sanitizes document.title to: "[Business_Name]_Audit"
   * ensuring standard browser print-to-PDF dialogs automatically suggest the exact customer-friendly file name.
   */
  const handleExportPdf = useCallback(() => {
    if (!result) return

    const rawName = result.businessName || 'Business'
    const sanitizedName = rawName
      .trim()
      .replace(/[^\w\s-]/g, '') // strip emoji / illegal filesystem characters
      .replace(/\s+/g, '_')     // replace whitespace with underscore
      .replace(/_+/g, '_')      // collapse multiple underscores
      .replace(/^_+|_+$/g, '')  // trim leading/trailing underscores
      .substring(0, 50)

    const exportFileName = `${sanitizedName || 'Business'}_Audit`
    const originalTitle = document.title

    // Temporarily set document.title for browser print/PDF naming
    document.title = exportFileName

    const restoreTitle = () => {
      document.title = originalTitle
      window.removeEventListener('afterprint', restoreTitle)
    }

    window.addEventListener('afterprint', restoreTitle)

    // Trigger native browser print dialog
    window.print()

    // Fallback timer in case afterprint event is delayed or unsupported
    setTimeout(() => {
      document.title = originalTitle
    }, 2500)
  }, [result])

  // Deep Check State
  const [deepCheckAnswers, setDeepCheckAnswers] = useState<(boolean | null)[]>([
    null,
    null,
    null,
    null,
  ])
  const deepCheckQuestions = [
    'Do you actively respond to ALL Google reviews (good and bad)?',
    'Are all your core services/products listed with descriptions?',
    'Have you published a Google Update (Post) in the last 14 days?',
    'Is your business description filled out completely (near 750 chars)?',
  ]

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setToastMsg({ message: `Copied ${label} to clipboard!`, type: 'success' })
    } catch {
      setToastMsg({ message: 'Failed to copy to clipboard', type: 'error' })
    }
  }

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement>,
    isDeepCheckUpdate = false,
  ) => {
    if (e) e.preventDefault()
    if (!businessName.trim() || !targetLocation.trim()) return

    if (isDeepCheckUpdate) {
      setIsDeepChecking(true)
    } else {
      setIsLoading(true)
      setResult(null)
      setDeepCheckAnswers([null, null, null, null])
      setActiveTab('roadmap')
    }
    setErrorMsg(null)

    try {
      const payload: {
        businessName: string
        targetLocation: string
        deepCheckAnswers?: (boolean | null)[]
      } = {
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

      if (isDeepCheckUpdate) {
        setTimeout(() => {
          const aiRecs = document.getElementById('ai-arsenal-section')
          aiRecs?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 200)
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

  const renderModal = () => {
    if (!result || !mounted) return null

    const passedCount = result.actionItems?.filter((a) => a.priority === 'passed').length || 0
    const totalChecks = result.actionItems?.length || 0
    const auditDateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const defaultActionPlan = `### 🎯 30-Day Local SEO Action Plan for ${result.businessName}

**Location:** ${result.location} | **Audit Score:** ${result.totalScore}/100 (**Grade: ${result.grade}**)

#### 📊 Executive Diagnosis
${result.businessName} has an active local presence in ${result.location}. Executing this 4-week structured sprint will resolve high-priority ranking gaps, establish consistent review velocity, and improve local Map Pack visibility.

#### 🗓️ Week 1: Core Foundation & NAP Integrity (Days 1–7)
- **Primary & Secondary Categories**: Align primary category to high-intent search volume and add 2–3 relevant subcategories.
- **Geo-Tagged High-Resolution Media**: Upload 10–15 verified exterior, interior, and team photos.
- **750-Character Description**: Deploy the keyword-optimized description generated in Deliverable 02.

#### 🗓️ Week 2: Review Velocity & Social Proof (Days 8–14)
- **100% Review Response Coverage**: Reply to all customer reviews using the tailored response templates in Deliverable 03.
- **Automated Review Link Flow**: Send direct review shortlinks to recent satisfied customers.

#### 🗓️ Week 3: Service Menu & Google Updates (Days 15–21)
- **Detailed Service Catalog**: Populate every service with itemized descriptions and pricing indicators.
- **Weekly Google Posts**: Publish weekly updates and offers featuring the high-intent keywords in Deliverable 04.

#### 🗓️ Week 4: Website Authority & Local Sync (Days 22–30)
- **Geo-Targeted Meta Tags**: Ensure website title tags and headers mention ${result.location}.
- **Local Citations & Schema**: Validate NAP consistency across key business directories and verify LocalBusiness JSON-LD markup.`

    const defaultDescription =
      result.aiDescription ||
      `Welcome to ${result.businessName}, your premier ${result.primaryCategory || 'local business'} in ${result.location}. We deliver top-rated services, exceptional quality, and dedicated customer care crafted to exceed expectations. Conveniently situated in ${result.location}, our team is committed to unmatched quality. Browse our services, check customer reviews, or contact us today for rates, bookings, and inquiries!`

    const defaultPositiveTemplate = `Hi [Customer Name]! Thank you so much for the 5-star review and kind words about your experience with ${result.businessName} in ${result.location}. Our entire team takes immense pride in delivering top-tier service and memorable customer satisfaction. We truly appreciate your patronage and look forward to welcoming you back soon!`

    const defaultConstructiveTemplate = `Hello [Customer Name], thank you for taking the time to share your honest feedback regarding your visit to ${result.businessName} in ${result.location}. We strive to provide the best possible experience and sincerely regret that we fell short of your expectations. We would love the opportunity to make this right—please contact our management directly so we can address your concerns immediately.`

    const defaultKeywords =
      result.aiKeywords && result.aiKeywords.length > 0
        ? result.aiKeywords
        : [
            `${result.businessName} ${result.location}`,
            `best ${result.primaryCategory?.toLowerCase() || 'services'} in ${result.location}`,
            `${result.businessName} rates and reviews`,
            `top rated ${result.primaryCategory?.toLowerCase() || 'services'} near me`,
            `${result.location} contact and booking`,
          ]

    return createPortal(
      <div
        id="gbp-audit-modal-portal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gbp-modal-title"
        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        style={{ zIndex: 999999 }}
        onClick={closeModal}
      >
        <div
          id="gbp-audit-modal-container"
          className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-background border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Top Header / Branding Bar ── */}
          <div className="p-4 sm:p-5 md:p-6 print:p-3 print:pb-2 border-b border-white/10 bg-surface-1 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:gap-1 shrink-0 print-break-inside-avoid">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.08em] bg-primary-container/15 text-primary-container border border-primary-container/30">
                  <span>⚡</span> Alain Dave Tapiru • Local SEO Engine
                </span>
                {result.primaryCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.08em] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    🏷️ {result.primaryCategory}
                  </span>
                )}
                {result.categoryBenchmark?.isCategoryMismatchDetected && result.categoryBenchmark.rawGoogleCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.08em] bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    ⚠️ Tagged as &quot;{result.categoryBenchmark.rawGoogleCategory}&quot; on Maps
                  </span>
                )}
                <span className="text-[11px] font-sans text-on-surface/60">•</span>
                <span className="text-[11px] font-sans text-on-surface/70 font-medium truncate">
                  {result.location}
                </span>
                <span className="hidden print:inline-block text-[11px] font-sans text-on-surface/60">•</span>
                <span className="hidden print:inline-block text-[11px] font-sans text-primary-container font-semibold">
                  Audited on {auditDateStr}
                </span>
              </div>
              <h2
                id="gbp-modal-title"
                className="font-heading font-extrabold text-lg sm:text-2xl md:text-3xl text-on-surface truncate"
              >
                {result.businessName}
              </h2>
            </div>

            <div className="no-print flex items-center flex-wrap gap-2.5 shrink-0">
              {/* Email Report Button */}
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container/15 hover:bg-primary-container/25 text-primary-container border border-primary-container/30 text-xs font-heading font-bold transition-all cursor-pointer shadow-sm"
                title="Send audit summary to your email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Report</span>
              </button>

              {/* Print / Save PDF Button */}
              <button
                type="button"
                onClick={handleExportPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-heading font-bold text-on-surface/80 hover:text-white transition-all cursor-pointer shadow-sm"
                title={`Export as ${((result.businessName || 'Business').trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '') || 'Business')}_Audit.pdf`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>

              {/* Exit / Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 rounded-xl px-4 py-2 transition-all shadow-[0_0_20px_rgba(244,63,94,0.15)] border border-rose-500/30 font-heading font-bold text-xs uppercase tracking-wider group cursor-pointer"
                aria-label="Close dashboard"
              >
                <span>Exit</span>
                <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Email Report Dialog Overlay */}
          {isEmailModalOpen && (
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
              onClick={() => setIsEmailModalOpen(false)}
            >
              <div
                className="w-full max-w-md bg-surface-1 border border-primary-container/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-left relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary-container font-heading text-xs font-bold uppercase tracking-[0.08em]">
                    <Mail className="w-4 h-4" />
                    <span>Executive Audit Dispatch</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="text-on-surface/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading text-xl font-bold text-on-surface">
                    Receive {result.businessName}&apos;s Audit Summary
                  </h3>
                  <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                    Enter your email to receive an executive recap including the {result.totalScore}/100 Health Score, category benchmark, and top action items.
                  </p>
                </div>

                {emailSentSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-sans flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Report successfully dispatched! Check your inbox shortly.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSendEmailReport} className="space-y-3.5">
                    <div>
                      <label className="font-heading text-[11px] uppercase tracking-wider text-on-surface/75 block mb-1.5 font-semibold">
                        Your Email Address <span className="text-primary-container">*</span>
                      </label>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="e.g. founder@company.com"
                        required
                        disabled={isSendingEmail}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingEmail || !emailInput}
                      className="w-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] py-3.5 rounded-xl shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Report...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Free Audit Report</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ── Scrollable Dashboard Body ── */}
          <div
            id="gbp-modal-scrollable-body"
            className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 print:p-0 space-y-6 sm:space-y-8 print:space-y-3 bg-[#000] overscroll-contain"
            style={{ paddingBottom: 'max(1.5rem, calc(1rem + env(safe-area-inset-bottom, 0px)))' }}
          >
            
            {/* ── Bento Row 1: Score Dial & Health Pillars ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 print-grid-row-1 gap-4 sm:gap-6 print:gap-3 print-break-inside-avoid">
              
              {/* Score Radar (4 Cols) */}
              <div className="lg:col-span-4 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 flex flex-col items-center justify-between text-center gap-4 print:gap-2 relative overflow-hidden shadow-xl print-break-inside-avoid">
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
                  <div className="flex items-center justify-between text-[11px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-on-surface/70">Checks Passed:</span>
                    <span className="font-heading font-bold text-emerald-400">
                      {passedCount} / {totalChecks}
                    </span>
                  </div>

                  {result.foundInMapPack ? (
                    <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-heading font-bold tracking-[0.06em]">
                      <span>✓</span> Ranked #{result.mapPackPosition} in Local Map Pack
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-heading font-bold tracking-[0.06em]">
                      <span>✗</span> Not Ranking in Top 10 Map Pack
                    </div>
                  )}
                </div>
              </div>

              {/* 3 Pillars Breakdown (8 Cols) */}
              <div className="lg:col-span-8 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 flex flex-col justify-between gap-4 print:gap-2 shadow-xl print-break-inside-avoid">
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

                <p className="text-[11px] font-sans text-on-surface/70 leading-relaxed bg-white/[0.02] p-3 print:p-2 rounded-xl border border-white/5">
                  💡 <strong className="text-on-surface/90">Strategic Takeaway:</strong> Google ranks profiles based on <span className="text-primary-container font-semibold">Relevance</span> (NAP &amp; categories), <span className="text-primary-container font-semibold">Prominence</span> (reviews &amp; velocity), and <span className="text-primary-container font-semibold">Distance</span> (location signals).
                </p>
              </div>
            </div>

            {/* ── 10-Point Public Audit Diagnostic Grid ── */}
            {result.publicChecks && result.publicChecks.length > 0 && (
              <div className="p-6 sm:p-7 print:p-3.5 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid">
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
                    {result.publicChecks.filter((c) => c.status === 'passed').length} / {result.publicChecks.length} Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 print:grid-cols-2 gap-2.5 print:gap-1.5">
                  {result.publicChecks.map((chk) => (
                    <div
                      key={chk.id}
                      className="p-3 print:p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 print-break-inside-avoid"
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          chk.status === 'passed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : chk.status === 'warning'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
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
                                ? 'text-emerald-400 bg-emerald-500/10'
                                : chk.status === 'warning'
                                  ? 'text-amber-400 bg-amber-500/10'
                                  : 'text-rose-400 bg-rose-500/10'
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
            )}

            {/* ── Bento Row 2: Competitor Radar & Website Snapshot ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 print-grid-row-2 gap-4 sm:gap-6 print:gap-3 print-break-inside-avoid">
              
              {/* Competitor Gap Radar (7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid">
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
                        className="p-3.5 print:p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3 hover:bg-white/[0.06] transition-colors print-break-inside-avoid"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-heading text-xs font-bold text-primary-container shrink-0">
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
                          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-heading font-bold tracking-[0.06em]">
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
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
                        : 'bg-primary-container/10 border-primary-container/20 text-on-surface/90'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-heading font-bold uppercase tracking-[0.08em] text-[10px] text-primary-container">
                        {result.categoryBenchmark.isCategoryMismatchDetected
                          ? '🚨 Critical Category Anomaly Detected'
                          : '🏷️ Category Intelligence Strategy'}
                      </span>
                      {result.categoryBenchmark.rawGoogleCategory &&
                        result.categoryBenchmark.isCategoryMismatchDetected && (
                          <span className="text-[10px] text-amber-400 font-medium bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
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
              <div className="lg:col-span-5 p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid">
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
                    <div className="p-2.5 print:p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between gap-2">
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
                      <p className="text-xs text-rose-400 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                        ⚠ Website responded with an error or blocked the audit bot.
                      </p>
                    ) : (
                      <div className="space-y-2.5 print:space-y-1.5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-on-surface/50">
                            Title Tag
                          </span>
                          <p className="text-xs text-on-surface font-medium leading-relaxed bg-white/[0.02] p-2.5 print:p-2 rounded-lg border border-white/5">
                            {result.websiteSeo.title ? result.websiteSeo.title : <span className="text-rose-400">Missing Title Tag</span>}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-on-surface/50">
                            Meta Description
                          </span>
                          <p className="text-xs text-on-surface/70 leading-relaxed line-clamp-2 bg-white/[0.02] p-2.5 print:p-2 rounded-lg border border-white/5">
                            {result.websiteSeo.metaDescription ? result.websiteSeo.metaDescription : <span className="text-rose-400">Missing Meta Description</span>}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 print:p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 space-y-1">
                    <p className="font-bold">No Website Linked on GBP</p>
                    <p className="opacity-80">
                      Linking a verified website or high-converting landing page is critical for local authority.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Bento Row 3: Action Plan Priority Matrix ── */}
            <div className="p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 space-y-4 print:space-y-2.5 shadow-xl print-break-inside-avoid">
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
                  {result.actionItems?.length || 0} Key Observations
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 print-grid-actions gap-3 print:gap-2">
                {result.actionItems?.map((item, idx) => {
                  const colors = {
                    high: 'bg-rose-500/10 border-rose-500/25 text-rose-300',
                    medium: 'bg-amber-500/10 border-amber-500/25 text-amber-300',
                    low: 'bg-sky-500/10 border-sky-500/25 text-sky-300',
                    passed: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300 opacity-70',
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
                        <p className="text-xs font-medium leading-relaxed print:leading-snug">{item.message}</p>
                        <p className="text-[10px] uppercase font-semibold tracking-[0.08em] mt-1 opacity-80">
                          {item.priority} Priority
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Bento Row 4: ✨ Alain Dave Tapiru's AI Growth Arsenal ── */}
            <div id="ai-arsenal-section" className="p-6 sm:p-8 print:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1c1f20] via-[#161819] to-[#121414] border border-primary-container/30 space-y-6 print:space-y-4 shadow-2xl relative overflow-hidden print-page-break-before">
              
              {/* Header with Tab Navigation */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:gap-1 pb-2 border-b border-white/10 print-break-inside-avoid">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-on-surface">
                      Alain&apos;s AI Strategic Growth Arsenal
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface/60">
                    Personalized deliverables &amp; local ranking assets generated for {result.businessName}.
                  </p>
                </div>

                {/* Tab Switcher (Screen Only) */}
                <div className="no-print flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 overflow-x-auto max-w-full py-1.5 px-1.5 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setActiveTab('roadmap')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'roadmap'
                        ? 'bg-primary-container text-on-primary-container shadow-md'
                        : 'text-on-surface/70 hover:text-white'
                    }`}
                  >
                    30-Day Sprint
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('description')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'description'
                        ? 'bg-primary-container text-on-primary-container shadow-md'
                        : 'text-on-surface/70 hover:text-white'
                    }`}
                  >
                    750-Char Bio
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('templates')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'templates'
                        ? 'bg-primary-container text-on-primary-container shadow-md'
                        : 'text-on-surface/70 hover:text-white'
                    }`}
                  >
                    Review Playbook
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('keywords')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'keywords'
                        ? 'bg-primary-container text-on-primary-container shadow-md'
                        : 'text-on-surface/70 hover:text-white'
                    }`}
                  >
                    Local Keywords
                  </button>
                </div>
              </div>

              {/* Tab 1: 30-Day Sprint Roadmap */}
              <div className={`space-y-3 print:space-y-1.5 print-deliverable-card ${activeTab === 'roadmap' ? 'block' : 'hidden'} print:mt-3`}>
                <div className="hidden print:flex items-center gap-2 pb-1 border-b border-white/5">
                  <span className="text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">Deliverable 01</span>
                  <span className="text-on-surface/60 text-xs">•</span>
                  <h4 className="font-heading font-bold text-sm text-on-surface">30-Day Sprint Roadmap &amp; Strategic Milestones</h4>
                </div>
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-heading prose-headings:text-primary-container prose-headings:font-bold prose-h3:text-sm prose-h4:text-xs prose-p:text-on-surface/80 prose-li:text-on-surface/80 prose-strong:text-white prose-a:text-primary-container bg-white/[0.02] p-5 sm:p-7 print:p-4 rounded-2xl border border-white/5 shadow-inner">
                  <ReactMarkdown>
                    {result.aiRecommendations || defaultActionPlan}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Tab 2: 750-Char SEO Optimized Business Description */}
              <div className={`space-y-3 print:space-y-1.5 print-deliverable-card ${activeTab === 'description' ? 'block' : 'hidden'} print-break-inside-avoid print:mt-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="hidden print:inline-block text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">Deliverable 02 •</span>
                    <span className="font-heading text-xs font-bold text-on-surface">
                      Keyword-Optimized Google Business Description
                    </span>
                    <span className="text-[11px] font-sans text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {(result.aiDescription || defaultDescription).length} / 750 Characters
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(result.aiDescription || defaultDescription, 'Business Description')
                    }
                    className="no-print inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-heading font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Copy Description</span>
                  </button>
                </div>

                <div className="p-4 sm:p-5 print:p-3 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-on-surface/90 leading-relaxed font-sans select-all whitespace-pre-wrap">
                  {result.aiDescription || defaultDescription}
                </div>
                <p className="text-[11px] text-on-surface/70 italic">
                  Paste this directly into your Google Business Profile &gt; Edit Profile &gt; Description field.
                </p>
              </div>

              {/* Tab 3: Review Response Playbook */}
              <div className={`space-y-3 print:space-y-1.5 print-deliverable-card print-page-break-before ${activeTab === 'templates' ? 'block' : 'hidden'} print-break-inside-avoid print:mt-0`}>
                <div className="hidden print:flex items-center gap-2 pb-1 border-b border-white/5">
                  <span className="text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">Deliverable 03</span>
                  <span className="text-on-surface/60 text-xs">•</span>
                  <h4 className="font-heading font-bold text-sm text-on-surface">AI Review Response Playbook</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 print-grid-templates gap-4 print:gap-3">
                  {/* Positive Template */}
                  <div className="p-5 print:p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3 print:space-y-1.5 flex flex-col justify-between print-break-inside-avoid">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
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
                        copyToClipboard(
                          result.aiReviewTemplates?.positive || defaultPositiveTemplate,
                          '5-Star Template',
                        )
                      }
                      className="no-print inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-heading font-bold text-on-surface transition-all cursor-pointer"
                    >
                      <span>Copy 5-Star Template</span>
                    </button>
                  </div>

                  {/* Constructive Template */}
                  <div className="p-5 print:p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3 print:space-y-1.5 flex flex-col justify-between print-break-inside-avoid">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
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
                        copyToClipboard(
                          result.aiReviewTemplates?.constructive || defaultConstructiveTemplate,
                          'Constructive Template',
                        )
                      }
                      className="no-print inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-heading font-bold text-on-surface transition-all cursor-pointer"
                    >
                      <span>Copy Constructive Template</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab 4: High-Intent Local Keywords */}
              <div className={`space-y-3 print:space-y-1.5 print-deliverable-card ${activeTab === 'keywords' ? 'block' : 'hidden'} print-break-inside-avoid print:mt-4`}>
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="hidden print:inline-block text-primary-container font-heading font-bold text-xs uppercase tracking-[0.08em]">Deliverable 04 •</span>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-on-surface">
                      High-Intent Local Keywords Arsenal
                    </h4>
                  </div>
                  <span className="text-[11px] font-sans text-on-surface/70">
                    {(result.aiKeywords && result.aiKeywords.length > 0 ? result.aiKeywords : defaultKeywords).length} Recommended Search Queries
                  </span>
                </div>

                <span className="text-xs text-on-surface/70 block">
                  Target local search queries to incorporate into Google Posts, service descriptions, FAQ answers, photo metadata, and website meta tags:
                </span>
                <div className="flex flex-wrap gap-2.5 print:gap-1.5">
                  {(result.aiKeywords && result.aiKeywords.length > 0 ? result.aiKeywords : defaultKeywords).map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => copyToClipboard(kw, `Keyword: "${kw}"`)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 print:px-2.5 print:py-1 rounded-xl bg-white/5 hover:bg-primary-container/20 border border-white/10 hover:border-primary-container/40 text-xs font-heading font-medium text-on-surface hover:text-primary-container transition-all cursor-pointer group print-break-inside-avoid"
                    >
                      <span>{kw}</span>
                      <ArrowUpRight className="no-print w-3 h-3 opacity-40 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>

                {result.additionalCategories && result.additionalCategories.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1.5 print:space-y-1">
                    <span className="text-[11px] font-sans text-on-surface/50 block">
                      Recommended Secondary Categories for Google Business Profile:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.additionalCategories.map((subCat, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-heading font-medium"
                        >
                          + {subCat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Bento Row 5: Deep Check Validator ── */}
            <div className="p-6 sm:p-7 print:p-4 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 space-y-4 print:space-y-2 shadow-xl print-break-inside-avoid print:mt-3">
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
                {deepCheckQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:gap-2 p-3.5 print:p-2.5 rounded-xl bg-white/[0.02] border border-white/5 print-break-inside-avoid"
                  >
                    <span className="text-xs font-medium text-on-surface/90 flex-1">{q}</span>
                    
                    {/* Screen View: Interactive Yes/No buttons */}
                    <div className="no-print flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const newAns = [...deepCheckAnswers]
                          newAns[idx] = true
                          setDeepCheckAnswers(newAns)
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                          deepCheckAnswers[idx] === true
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
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
                        className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                          deepCheckAnswers[idx] === false
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        No
                      </button>
                    </div>

                    {/* Print View: Clean status indicator */}
                    <div className="hidden print:flex items-center gap-2 shrink-0">
                      {deepCheckAnswers[idx] === true ? (
                        <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ✓ Verified
                        </span>
                      ) : deepCheckAnswers[idx] === false ? (
                        <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          ✗ Needs Action
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
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
                  onClick={handleDeepCheckSubmit}
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
                      <span>Recalculating Score &amp; Strategy…</span>
                    </>
                  ) : (
                    'Update My Score & AI Plan'
                  )}
                </button>
                {deepCheckAnswers.includes(null) && (
                  <p className="text-[10px] text-on-surface/70 uppercase tracking-[0.08em] font-semibold">
                    Answer all 4 questions to unlock final score
                  </p>
                )}
              </div>
            </div>

            {/* ── Bento Row 6: Conversion & Consultation Banner ── */}
            <div className="p-6 sm:p-8 print:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/20 via-primary/15 to-transparent border border-primary-container/30 flex flex-col md:flex-row items-center justify-between gap-6 print:gap-3 shadow-xl print-break-inside-avoid print:mt-3">
              <div className="space-y-1.5 text-center md:text-left">
                <h4 className="font-heading font-extrabold text-lg sm:text-xl text-on-surface">
                  Want Alain to execute this Local SEO sprint for you?
                </h4>
                <p className="text-xs sm:text-sm text-on-surface/80 max-w-xl leading-relaxed">
                  I help local businesses optimize Google Business Profiles with accurate categorization, citation cleanup, review management systems, and improved Map Pack visibility.
                </p>
                <p className="hidden print:block text-xs text-primary-container font-semibold pt-1">
                  Contact: alaintapiru@gmail.com • Web: alaintapiru.com • Book: alaintapiru.com/contact/
                </p>
              </div>

              <div className="no-print flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <a
                  href="/contact/"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(230,126,34,0.4)] text-center flex items-center justify-center min-h-[44px]"
                >
                  Book Strategy Call
                </a>
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] transition-all text-center flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-primary-container" />
                  <span>Email Audit Summary</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>,
      document.body,
    )
  }

  return (
    <>
      {errorMsg && <Toast message={errorMsg} type="error" onClose={() => setErrorMsg(null)} />}
      {toastMsg && (
        <Toast
          message={toastMsg.message}
          type={toastMsg.type}
          onClose={() => setToastMsg(null)}
        />
      )}

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
          className="w-full bg-surface-1/90 border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/60 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-colors min-h-[46px] disabled:opacity-50"
        />

        {/* Target Location */}
        <input
          id="gbp-target-location"
          type="text"
          value={targetLocation}
          onChange={(e) => setTargetLocation(e.target.value)}
          placeholder="Target Location / City (e.g. Manila, Cebu, Bayombong)"
          maxLength={100}
          required
          disabled={isLoading}
          className="w-full bg-surface-1/90 border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/60 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-colors min-h-[46px] disabled:opacity-50"
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

      {/* Render React Portal Modal */}
      {renderModal()}
    </>
  )
}

