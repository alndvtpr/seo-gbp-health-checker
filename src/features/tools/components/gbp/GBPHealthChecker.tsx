'use client'

import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Download, X, Mail } from 'lucide-react'
import { sendAuditReportAction } from '@/app/actions/send-audit-report'
import { useModalFocus } from '@/hooks/useModalFocus'
import { Toast } from '@/components/gbp/Toast'
import { EmailReportDialog } from '@/components/gbp/EmailReportDialog'
import type { GBPAuditResponse } from '@/types/gbp'

import { GbpAuditForm } from './GbpAuditForm'
import { GbpScoreOverview } from './GbpScoreOverview'
import { GbpPublicChecksGrid } from './GbpPublicChecksGrid'
import { GbpCompetitorRadar } from './GbpCompetitorRadar'
import { GbpActionPlanMatrix } from './GbpActionPlanMatrix'
import { GbpAiArsenalTabs } from './GbpAiArsenalTabs'
import { GbpDeepCheckSection } from './GbpDeepCheckSection'
import { GbpConsultationBanner } from './GbpConsultationBanner'

export type {
  AuditPillar,
  ActionItem,
  Competitor,
  CategoryBenchmark,
  PublicAuditCheck,
  WebsiteSeo,
  ReviewTemplates,
  GBPAuditResponse,
} from '@/types/gbp'

const emptySubscribe = () => () => {}

export function GBPHealthChecker() {
  const [businessName, setBusinessName] = useState('')
  const [targetLocation, setTargetLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeepChecking, setIsDeepChecking] = useState(false)
  const [result, setResult] = useState<GBPAuditResponse | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null,
  )
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
  const [activeTab, setActiveTab] = useState<'roadmap' | 'description' | 'templates' | 'keywords'>(
    'roadmap',
  )
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailModalError, setEmailModalError] = useState<string | null>(null)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSentSuccess, setEmailSentSuccess] = useState(false)
  const resultDialogRef = useRef<HTMLDivElement>(null)
  const resultDialogTitleRef = useRef<HTMLHeadingElement>(null)

  const closeModal = useCallback(() => {
    setResult(null)
    setIsEmailModalOpen(false)
    setEmailSentSuccess(false)
    setEmailModalError(null)
  }, [])

  useModalFocus({
    active: Boolean(result),
    containerRef: resultDialogRef,
    initialFocusRef: resultDialogTitleRef,
    onEscape: closeModal,
  })

  const handleSendEmailReport = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailModalError(null)
    const cleanEmail = emailInput.trim().toLowerCase()
    if (!cleanEmail) {
      setEmailModalError('Please enter a valid email address.')
      return
    }
    if (!result) return

    setIsSendingEmail(true)
    try {
      const res = await sendAuditReportAction({
        email: cleanEmail,
        businessName: (result.businessName || 'Business').trim(),
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
          setEmailInput('')
          setEmailModalError(null)
        }, 2200)
      } else {
        setEmailModalError(res.error || 'Failed to dispatch email. Please try again.')
        setToastMsg({
          message: res.error || 'Failed to dispatch email. Please try again.',
          type: 'error',
        })
      }
    } catch (err) {
      console.error('Email dispatch error:', err)
      setEmailModalError('Error connecting to email service. Please try again.')
      setToastMsg({ message: 'Error sending email report. Please try again.', type: 'error' })
    } finally {
      setIsSendingEmail(false)
    }
  }

  // Body scroll lock while the results dialog is active.
  useEffect(() => {
    if (result) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [result])

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
      .replace(/\s+/g, '_') // replace whitespace with underscore
      .replace(/_+/g, '_') // collapse multiple underscores
      .replace(/^_+|_+$/g, '') // trim leading/trailing underscores
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

    return createPortal(
      <>
        {toastMsg && (
          <Toast
            message={toastMsg.message}
            type={toastMsg.type}
            onClose={() => setToastMsg(null)}
          />
        )}
        <div
          ref={resultDialogRef}
          id="gbp-audit-modal-portal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gbp-modal-title"
          className="fixed inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          style={{ zIndex: 999999 }}
          onClick={closeModal}
        >
          <div
            id="gbp-audit-modal-container"
            className="relative my-auto flex max-h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-black/10 bg-surface-1 shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:max-h-[94dvh] sm:rounded-3xl dark:border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Top Header / Branding Bar ── */}
            <div className="p-4 sm:p-5 md:p-6 print:p-3 print:pb-2 border-b border-black/10 dark:border-white/10 bg-surface-2 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:gap-1 shrink-0 print-break-inside-avoid">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.08em] bg-primary-container/15 text-primary-container border border-primary-container/30">
                    <span>⚡</span> Alain Dave Tapiru • Local SEO Engine
                  </span>
                  {result.primaryCategory && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.08em] bg-emerald-500/15 text-emerald-700 dark:text-emerald-500 border border-emerald-500/30">
                      🏷️ {result.primaryCategory}
                    </span>
                  )}
                  {result.categoryBenchmark?.isCategoryMismatchDetected &&
                    result.categoryBenchmark.rawGoogleCategory && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.08em] bg-amber-500/15 text-amber-700 dark:text-amber-500 border border-amber-500/30">
                        ⚠️ Tagged as &quot;{result.categoryBenchmark.rawGoogleCategory}&quot; on Maps
                      </span>
                    )}
                  <span className="text-[11px] font-sans text-on-surface/60">•</span>
                  <span className="text-[11px] font-sans text-on-surface/70 font-medium truncate">
                    {result.location}
                  </span>
                  <span className="hidden print:inline-block text-[11px] font-sans text-on-surface/60">
                    •
                  </span>
                  <span className="hidden print:inline-block text-[11px] font-sans text-primary-container font-semibold">
                    Audited on {auditDateStr}
                  </span>
                </div>
                <h2
                  ref={resultDialogTitleRef}
                  id="gbp-modal-title"
                  tabIndex={-1}
                  className="font-heading font-extrabold text-lg sm:text-2xl md:text-3xl text-on-surface truncate"
                >
                  {result.businessName}
                </h2>
              </div>

              <div className="no-print flex items-center flex-wrap gap-2.5 shrink-0">
                {/* Email Report Button */}
                <button
                  type="button"
                  onClick={() => {
                    setEmailModalError(null)
                    setIsEmailModalOpen(true)
                  }}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border border-primary-container/30 bg-primary-container/15 px-3.5 py-2 font-heading text-xs font-bold text-primary-container shadow-sm transition-all hover:bg-primary-container/25"
                  title="Send audit summary to your email"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Report</span>
                </button>

                {/* Print / Save PDF Button */}
                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border border-black/10 bg-black/5 px-3.5 py-2 font-heading text-xs font-bold text-on-surface shadow-sm transition-all hover:bg-black/10 hover:text-primary-container dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  title={`Export as ${
                    (result.businessName || 'Business')
                      .trim()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/\s+/g, '_')
                      .replace(/_+/g, '_')
                      .replace(/^_+|_+$/g, '') || 'Business'
                  }_Audit.pdf`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>

                {/* Exit / Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="group inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/15 px-4 py-2 font-heading text-xs font-bold uppercase tracking-wider text-rose-700 shadow-xs transition-all hover:bg-rose-500/25 hover:text-rose-800 dark:text-rose-500 dark:hover:text-rose-400"
                  aria-label="Close dashboard"
                >
                  <span>Exit</span>
                  <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Email Report Dialog Overlay */}
            <EmailReportDialog
              isOpen={isEmailModalOpen}
              businessName={result.businessName}
              totalScore={result.totalScore}
              emailInput={emailInput}
              emailModalError={emailModalError}
              isSendingEmail={isSendingEmail}
              emailSentSuccess={emailSentSuccess}
              onClose={() => {
                setIsEmailModalOpen(false)
                setEmailModalError(null)
              }}
              onEmailChange={(val) => {
                setEmailInput(val)
                if (emailModalError) setEmailModalError(null)
              }}
              onSubmit={handleSendEmailReport}
            />

            {/* ── Scrollable Dashboard Body ── */}
            <div
              id="gbp-modal-scrollable-body"
              className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 print:p-0 space-y-6 sm:space-y-8 print:space-y-3 bg-background overscroll-contain"
              style={{
                paddingBottom: 'max(1.5rem, calc(1rem + env(safe-area-inset-bottom, 0px)))',
              }}
            >
              {/* Bento Row 1: Score Dial & Health Pillars */}
              <GbpScoreOverview
                result={result}
                passedCount={passedCount}
                totalChecks={totalChecks}
              />

              {/* 10-Point Public Audit Diagnostic Grid */}
              <GbpPublicChecksGrid checks={result.publicChecks} />

              {/* Bento Row 2: Competitor Radar & Website Snapshot */}
              <GbpCompetitorRadar result={result} />

              {/* Bento Row 3: Action Plan Priority Matrix */}
              <GbpActionPlanMatrix actionItems={result.actionItems} />

              {/* Bento Row 4: ✨ Alain Dave Tapiru's AI Growth Arsenal */}
              <GbpAiArsenalTabs
                result={result}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onCopy={copyToClipboard}
              />

              {/* Bento Row 5: Deep Check Validator */}
              <GbpDeepCheckSection
                deepCheckAnswers={deepCheckAnswers}
                setDeepCheckAnswers={setDeepCheckAnswers}
                isDeepChecking={isDeepChecking}
                onSubmitDeepCheck={handleDeepCheckSubmit}
              />

              {/* Bento Row 6: Conversion & Consultation Banner */}
              <GbpConsultationBanner
                onOpenEmailModal={() => {
                  setEmailModalError(null)
                  setIsEmailModalOpen(true)
                }}
              />
            </div>
          </div>
        </div>
      </>,
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

      <GbpAuditForm
        businessName={businessName}
        setBusinessName={setBusinessName}
        targetLocation={targetLocation}
        setTargetLocation={setTargetLocation}
        isLoading={isLoading}
        onSubmit={(e) => handleSubmit(e, false)}
      />

      {/* Render React Portal Modal */}
      {renderModal()}
    </>
  )
}
