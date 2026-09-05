'use client'

import React from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export interface GbpConsultationBannerProps {
  onOpenEmailModal: () => void
}

export function GbpConsultationBanner({ onOpenEmailModal }: GbpConsultationBannerProps) {
  return (
    <div className="p-6 sm:p-8 print:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/20 via-primary/15 to-transparent border border-primary-container/30 flex flex-col md:flex-row items-center justify-between gap-6 print:gap-3 shadow-xl print-break-inside-avoid print:mt-3">
      <div className="space-y-1.5 text-center md:text-left">
        <h4 className="font-heading font-extrabold text-lg sm:text-xl text-on-surface">
          Want Alain to execute this Local SEO sprint for you?
        </h4>
        <p className="text-xs sm:text-sm text-on-surface/80 max-w-xl leading-relaxed">
          I offer scoped Google Business Profile support covering category review, citation consistency,
          review-response workflows, and practical local search improvements.
        </p>
        <p className="hidden print:block text-xs text-primary-container font-semibold pt-1">
          Contact: alaintapiru@gmail.com • Web: alaintapiru.com • Book: alaintapiru.com/contact/
        </p>
      </div>

      <div className="no-print flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
        <Link
          href="/contact/?service=local-seo"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(230,126,34,0.4)] text-center flex items-center justify-center min-h-[44px]"
        >
          Book a Free Discovery Call
        </Link>
        <button
          type="button"
          onClick={onOpenEmailModal}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] transition-all text-center flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 text-primary-container" />
          <span>Email Audit Summary</span>
        </button>
      </div>
    </div>
  )
}
