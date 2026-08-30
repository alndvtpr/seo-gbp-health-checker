'use client'

import React, { useRef } from 'react'
import { Mail, X, Check, Loader2, Send } from 'lucide-react'
import { useModalFocus } from '@/hooks/useModalFocus'

export interface EmailReportDialogProps {
  isOpen: boolean
  businessName: string
  totalScore: number
  emailInput: string
  emailModalError: string | null
  isSendingEmail: boolean
  emailSentSuccess: boolean
  onClose: () => void
  onEmailChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

/**
 * Modal dialog for sending the GBP audit executive report via email.
 */
export function EmailReportDialog({
  isOpen,
  businessName,
  totalScore,
  emailInput,
  emailModalError,
  isSendingEmail,
  emailSentSuccess,
  onClose,
  onEmailChange,
  onSubmit,
}: EmailReportDialogProps) {
  const emailDialogRef = useRef<HTMLDivElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  useModalFocus({
    active: isOpen,
    containerRef: emailDialogRef,
    initialFocusRef: emailInputRef,
    onEscape: onClose,
  })

  if (!isOpen) return null

  return (
    <div
      ref={emailDialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gbp-email-dialog-title"
      aria-describedby="gbp-email-dialog-description"
      className="fixed inset-0 z-[1000001] flex items-center justify-center overflow-y-auto bg-black/85 p-2 backdrop-blur-md animate-in fade-in duration-200 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative z-10 my-auto w-full max-w-md space-y-5 rounded-2xl border border-primary-container/40 bg-surface-1 p-4 text-left shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-container font-heading text-xs font-bold uppercase tracking-[0.08em]">
            <Mail className="w-4 h-4" />
            <span>Executive Audit Dispatch</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close email report dialog"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-on-surface/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 id="gbp-email-dialog-title" className="font-heading text-xl font-bold text-on-surface">
            Receive {businessName}&apos;s Audit Summary
          </h3>
          <p id="gbp-email-dialog-description" className="font-sans text-xs text-on-surface/70 leading-relaxed">
            Enter your email to receive an executive recap including the {totalScore}/100 Health Score, category benchmark, and top action items.
          </p>
        </div>

        {emailModalError && (
          <div role="alert" className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-sans flex items-center gap-2">
            <span className="shrink-0 font-bold text-sm">⚠</span>
            <span>{emailModalError}</span>
          </div>
        )}

        {emailSentSuccess ? (
          <div role="status" aria-live="polite" className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
            <span>Report successfully dispatched! Check your inbox shortly.</span>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="gbp-report-email" className="font-heading text-[11px] uppercase tracking-wider text-on-surface/75 block mb-1.5 font-semibold">
                Your Email Address <span className="text-primary-container">*</span>
              </label>
              <input
                ref={emailInputRef}
                id="gbp-report-email"
                type="email"
                value={emailInput}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="e.g. founder@company.com"
                required
                autoComplete="email"
                inputMode="email"
                disabled={isSendingEmail}
          className="w-full rounded-xl border border-black/15 bg-black/5 px-4 py-3 text-base text-on-surface transition-all focus:border-primary-container focus:outline-none sm:text-sm dark:border-white/15 dark:bg-white/5"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingEmail || !emailInput.trim()}
              className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-container py-3.5 font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-primary-container shadow-[0_0_20px_rgba(224,123,32,0.3)] transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
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
  )
}
