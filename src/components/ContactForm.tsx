'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle2, AlertCircle, Send, RefreshCcw } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'
import { sendContactAction } from '@/app/actions/send-contact'

const SERVICE_OPTIONS = [
  'Technical SEO Audit & Architecture',
  'Search & AI Engine Optimization (AEO/GEO)',
  'React & WordPress Web Development',
  'Ongoing Monthly SEO Support',
  'Consultation / General Inquiry',
] as const

export const ContactForm = () => {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      website: '',
      service: '',
      message: '',
      hp_website: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null)

    try {
      const response = await sendContactAction(data)

      if (response.success) {
        setIsSuccess(true)
        reset()
      } else {
        setServerError(response.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Submission failed:', err)
      setServerError('An unexpected error occurred. Please try again later.')
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setServerError(null)
    reset()
  }

  if (isSuccess) {
    return (
      <div className="py-10 sm:py-14 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(230,126,34,0.25)]">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary-container" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-on-surface">
            Request Sent Successfully!
          </h3>
          <p className="font-sans text-xs sm:text-sm text-on-surface/70 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. Your request has been received and I will personally get back to you within 24 hours.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-on-surface hover:text-primary-container hover:border-primary-container/40 hover:bg-white/10 font-heading text-xs uppercase tracking-[0.06em] font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <RefreshCcw className="w-4 h-4" aria-hidden="true" /> Send Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" noValidate>
      {/* Hidden honeypot anti-spam field */}
      <input
        type="text"
        {...register('hp_website')}
        tabIndex={-1}
        autoComplete="off"
        className="hidden opacity-0 pointer-events-none absolute -left-[9999px] -top-[9999px]"
        aria-hidden="true"
      />

      <div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-1.5 tracking-tight">
          Tell Me What You’re Working On
        </h3>
        <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed">
          Share your website, project, or SEO challenge. Give me as much or as little detail as you have.
        </p>
      </div>

      {/* Server Error Alert Banner */}
      {serverError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3 text-xs sm:text-sm animate-in fade-in duration-200"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-heading font-semibold text-red-200">Submission Error</p>
            <p className="text-red-300/90 leading-relaxed">{serverError}</p>
          </div>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label
          htmlFor="contact-name"
          className="font-heading text-xs text-on-surface/80 uppercase tracking-[0.08em] block mb-2 font-semibold"
        >
          Your Name <span className="text-primary-container" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="e.g. John Doe"
          autoComplete="name"
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          disabled={isSubmitting}
          {...register('name')}
          className={`w-full bg-surface-1/90 border rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all min-h-[46px] disabled:opacity-50 ${
            errors.name
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
              : 'border-white/10'
          }`}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="font-sans text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <span aria-hidden="true">&bull;</span> {errors.name.message}
          </p>
        )}
      </div>

      {/* Email & Website 2-Column Row on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label
            htmlFor="contact-email"
            className="font-heading text-xs text-on-surface/80 uppercase tracking-[0.08em] block mb-2 font-semibold"
          >
            Email Address <span className="text-primary-container" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            disabled={isSubmitting}
            {...register('email')}
            className={`w-full bg-surface-1/90 border rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all min-h-[46px] disabled:opacity-50 ${
              errors.email
                ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                : 'border-white/10'
            }`}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="font-sans text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span aria-hidden="true">&bull;</span> {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-website"
            className="font-heading text-xs text-on-surface/80 uppercase tracking-[0.08em] block mb-2 font-semibold"
          >
            Website URL <span className="text-on-surface/60 lowercase font-normal">(optional)</span>
          </label>
          <input
            id="contact-website"
            type="text"
            placeholder="https://yourwebsite.com or example.com"
            autoComplete="url"
            aria-required="false"
            aria-invalid={errors.website ? 'true' : 'false'}
            aria-describedby={errors.website ? 'contact-website-error' : undefined}
            disabled={isSubmitting}
            {...register('website')}
            className={`w-full bg-surface-1/90 border rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all min-h-[46px] disabled:opacity-50 ${
              errors.website
                ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                : 'border-white/10'
            }`}
          />
          {errors.website && (
            <p id="contact-website-error" role="alert" className="font-sans text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span aria-hidden="true">&bull;</span> {errors.website.message}
            </p>
          )}
        </div>
      </div>

      {/* Service Selection Dropdown */}
      <div>
        <label
          htmlFor="contact-service"
          className="font-heading text-xs text-on-surface/80 uppercase tracking-[0.08em] block mb-2 font-semibold"
        >
          Service Needed <span className="text-primary-container" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="contact-service"
            aria-required="true"
            aria-invalid={errors.service ? 'true' : 'false'}
            aria-describedby={errors.service ? 'contact-service-error' : undefined}
            disabled={isSubmitting}
            {...register('service')}
            className={`w-full bg-surface-1 border rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all min-h-[46px] disabled:opacity-50 appearance-none cursor-pointer ${
              errors.service
                ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                : 'border-white/10'
            }`}
          >
            <option value="" disabled className="bg-surface-1 text-on-surface/50">
              Select a service or focus area...
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-surface-1 text-on-surface py-1">
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface/50" aria-hidden="true">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {errors.service && (
          <p id="contact-service-error" className="font-sans text-xs text-red-400 mt-1.5 flex items-center gap-1" role="alert">
            <span aria-hidden="true">&bull;</span> {errors.service.message}
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="contact-message"
          className="font-heading text-xs text-on-surface/80 uppercase tracking-[0.08em] block mb-2 font-semibold"
        >
          Project Details / Message <span className="text-primary-container" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Describe your SEO goals, project details, timeline, or any questions you have..."
          aria-required="true"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          disabled={isSubmitting}
          {...register('message')}
          className={`w-full bg-surface-1/90 border rounded-xl px-4 py-3 text-base sm:text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all resize-none disabled:opacity-50 ${
            errors.message
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
              : 'border-white/10'
          }`}
        />
        {errors.message && (
          <p id="contact-message-error" className="font-sans text-xs text-red-400 mt-1.5 flex items-center gap-1" role="alert">
            <span aria-hidden="true">&bull;</span> {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit CTA Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] py-3.5 sm:py-4 rounded-xl shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:bg-primary hover:shadow-[0_0_35px_rgba(224,123,32,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Sending Request...</span>
          </>
        ) : (
          <>
            <span>Send My Request</span>
            <Send className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
