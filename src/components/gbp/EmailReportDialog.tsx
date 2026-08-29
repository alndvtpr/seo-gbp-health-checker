'use client'

import React from 'react'
import { Mail, X, Check, Loader2, Send } from 'lucide-react'

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
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-[1000001] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-1 border border-primary-container/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-left relative z-10"
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
            className="text-on-surface/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-heading text-xl font-bold text-on-surface">
            Receive {businessName}&apos;s Audit Summary
          </h3>
          <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
            Enter your email to receive an executive recap including the {totalScore}/100 Health Score, category benchmark, and top action items.
          </p>
        </div>

        {emailModalError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-sans flex items-center gap-2">
            <span className="shrink-0 font-bold text-sm">⚠</span>
            <span>{emailModalError}</span>
          </div>
        )}

        {emailSentSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Report successfully dispatched! Check your inbox shortly.</span>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3.5">
            <div>
              <label className="font-heading text-[11px] uppercase tracking-wider text-on-surface/75 block mb-1.5 font-semibold">
                Your Email Address <span className="text-primary-container">*</span>
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="e.g. founder@company.com"
                required
                autoComplete="email"
                inputMode="email"
                autoFocus
                disabled={isSendingEmail}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingEmail || !emailInput.trim()}
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
  )
}
