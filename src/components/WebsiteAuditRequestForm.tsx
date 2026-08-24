'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, RefreshCcw, Globe, Mail, User, Sparkles } from 'lucide-react'
import {
  websiteAuditRequestSchema,
  type WebsiteAuditRequestData,
} from '@/lib/schemas/audit-request'
import { sendWebsiteAuditRequestAction } from '@/app/actions/send-website-audit-request'

const FOCUS_AREAS = [
  'General Technical SEO & Health Check',
  'Core Web Vitals & Mobile Speed Profile',
  'Rankings Drop / Traffic Recovery',
  'New Website Launch / Migration Check',
  'AI Search & Schema Entity Structuring',
] as const

export const WebsiteAuditRequestForm: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedWebsite, setSubmittedWebsite] = useState<string>('')
  const [submittedEmail, setSubmittedEmail] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WebsiteAuditRequestData>({
    resolver: zodResolver(websiteAuditRequestSchema),
    defaultValues: {
      website: '',
      email: '',
      name: '',
      focus: '',
      notes: '',
      hp_website: '',
    },
  })

  const onSubmit = async (data: WebsiteAuditRequestData) => {
    setServerError(null)

    try {
      const response = await sendWebsiteAuditRequestAction(data)

      if (response.success) {
        setSubmittedWebsite(data.website)
        setSubmittedEmail(data.email)
        setIsSuccess(true)
        reset()
      } else {
        setServerError(response.error || 'Unable to submit audit request. Please try again.')
      }
    } catch (err) {
      console.error('Audit request submission failed:', err)
      setServerError('An unexpected network error occurred. Please try again later.')
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setServerError(null)
    setSubmittedWebsite('')
    setSubmittedEmail('')
    reset()
  }

  if (isSuccess) {
    return (
      <div className="py-6 sm:py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-container/15 border border-primary-container/35 text-primary-container flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(224,123,32,0.25)]">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-primary-container" />
        </div>

        <div className="space-y-2">
          <span className="font-heading text-[10px] sm:text-xs text-primary-container uppercase tracking-[0.08em] font-bold block">
            Request Received &amp; Queued
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-on-surface">
            Audit Request Submitted!
          </h3>
          <p className="font-sans text-xs sm:text-sm text-on-surface/80 max-w-md mx-auto leading-relaxed">
            A confirmation receipt and scope overview have been dispatched to your email inbox.
          </p>
        </div>

        {/* Submitted Summary Details Card */}
        <div className="p-4 rounded-xl bg-surface-2 border border-black/10 dark:border-white/10 text-left space-y-2 text-xs sm:text-sm font-sans max-w-md mx-auto shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-black/10 dark:border-white/5 pb-2">
            <span className="text-on-surface/60 font-heading text-[11px] uppercase tracking-wider">Target Domain</span>
            <span className="text-on-surface font-semibold font-mono truncate max-w-[220px]">{submittedWebsite}</span>
          </div>
          <div className="flex items-start justify-between gap-2 border-b border-black/10 dark:border-white/5 pb-2">
            <span className="text-on-surface/60 font-heading text-[11px] uppercase tracking-wider">Confirmation To</span>
            <span className="text-primary-container font-semibold truncate max-w-[220px]">{submittedEmail}</span>
          </div>
          <div className="flex items-start justify-between gap-2 pt-0.5">
            <span className="text-on-surface/60 font-heading text-[11px] uppercase tracking-wider">Turnaround</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Within 24–48 Hours</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-2 border border-black/10 dark:border-white/10 text-on-surface hover:text-primary-container hover:border-primary-container/40 hover:bg-surface-3 font-heading text-xs uppercase tracking-[0.06em] font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <RefreshCcw className="w-3.5 h-3.5" /> Request Another Website Audit
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Hidden honeypot anti-spam field */}
      <input
        type="text"
        {...register('hp_website')}
        tabIndex={-1}
        autoComplete="off"
        className="hidden opacity-0 pointer-events-none absolute -left-[9999px] -top-[9999px]"
        aria-hidden="true"
      />

      {/* Server Error Alert Banner */}
      {serverError && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-2.5 text-xs animate-in fade-in duration-200"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-heading font-semibold text-red-200">Submission Error</p>
            <p className="text-red-300/90 leading-relaxed">{serverError}</p>
          </div>
        </div>
      )}

      {/* Website Domain Field */}
      <div>
        <label
          htmlFor="audit-website"
          className="font-heading text-xs text-on-surface/80 uppercase tracking-wider flex items-center justify-between mb-1.5 font-bold"
        >
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary-container" />
            Website URL <span className="text-primary-container">*</span>
          </span>
          <span className="text-[10px] text-on-surface/50 font-normal lowercase">e.g. yourdomain.com</span>
        </label>
        <input
          id="audit-website"
          type="text"
          placeholder="https://yourwebsite.com"
          disabled={isSubmitting}
          {...register('website')}
          className={`w-full bg-surface-2/70 dark:bg-white/5 border rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:ring-1 transition-all min-h-[46px] disabled:opacity-50 ${
            errors.website
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
              : 'border-black/10 dark:border-white/10 focus:border-primary-container focus:ring-primary-container/30'
          }`}
        />
        {errors.website && (
          <p className="font-sans text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <span>&bull;</span> {errors.website.message}
          </p>
        )}
      </div>

      {/* Email Address Field */}
      <div>
        <label
          htmlFor="audit-email"
          className="font-heading text-xs text-on-surface/80 uppercase tracking-wider flex items-center justify-between mb-1.5 font-bold"
        >
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary-container" />
            Email Address <span className="text-primary-container">*</span>
          </span>
          <span className="text-[10px] text-on-surface/50 font-normal lowercase">for audit delivery</span>
        </label>
        <input
          id="audit-email"
          type="email"
          placeholder="john@example.com"
          disabled={isSubmitting}
          {...register('email')}
          className={`w-full bg-surface-2/70 dark:bg-white/5 border rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:ring-1 transition-all min-h-[46px] disabled:opacity-50 ${
            errors.email
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
              : 'border-black/10 dark:border-white/10 focus:border-primary-container focus:ring-primary-container/30'
          }`}
        />
        {errors.email && (
          <p className="font-sans text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <span>&bull;</span> {errors.email.message}
          </p>
        )}
      </div>

      {/* Optional Name / Business & Focus Area Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label
            htmlFor="audit-name"
            className="font-heading text-xs text-on-surface/80 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 font-semibold"
          >
            <User className="w-3.5 h-3.5 text-primary-container/80" />
            Your Name / Business <span className="text-on-surface/50 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="audit-name"
            type="text"
            placeholder="e.g. John / Acme Studio"
            disabled={isSubmitting}
            {...register('name')}
            className="w-full bg-surface-2/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-all min-h-[44px] disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="audit-focus"
            className="font-heading text-xs text-on-surface/80 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-container/80" />
            Primary SEO Focus <span className="text-on-surface/50 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="audit-focus"
              disabled={isSubmitting}
              {...register('focus')}
              className="w-full bg-surface-2/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-all min-h-[44px] disabled:opacity-50 appearance-none cursor-pointer"
            >
              <option value="" className="bg-surface-1 text-on-surface/50">
                Select primary focus area...
              </option>
              {FOCUS_AREAS.map((f) => (
                <option key={f} value={f} className="bg-surface-1 text-on-surface py-1">
                  {f}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-on-surface/50">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] py-3.5 rounded-xl hover:bg-primary btn-motion min-h-[48px] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(224,123,32,0.25)] hover:shadow-[0_0_30px_rgba(224,123,32,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Queuing Audit Request...</span>
          </>
        ) : (
          <>
            <span>Submit Audit Request</span>
            <ArrowRight className="w-4 h-4 btn-icon" />
          </>
        )}
      </button>

      <p className="font-sans text-[11px] text-on-surface/60 text-center leading-normal pt-1">
        🔒 100% Free manual preliminary audit. A copy will be emailed to your inbox.
      </p>
    </form>
  )
}
