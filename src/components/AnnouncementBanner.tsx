'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, X } from 'lucide-react'

const STORAGE_KEY = 'gbp_announcement_banner_2026_v2_dismissed'

export const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const isDismissed = localStorage.getItem(STORAGE_KEY) === 'true'
      setDismissed(isDismissed)
    } catch {
      setDismissed(false)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore storage error
    }
  }

  if (!mounted || dismissed) return null

  return (
    <aside
      aria-label="New Feature Announcement"
      className="relative z-50 w-full bg-[#121414] bg-gradient-to-r from-[#141210] via-[#1f1812] to-[#141210] border-b border-primary-container/30 shadow-[0_4px_25px_rgba(230,126,34,0.15)] text-on-surface py-2 sm:py-2.5 px-3 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-start">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-heading font-extrabold uppercase tracking-wider bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(230,126,34,0.6)] shrink-0">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin duration-1000" />
            <span>New Feature</span>
          </span>

          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-on-surface/90 truncate">
            <strong className="text-white font-semibold hidden xs:inline">Free GBP AI Audit Tool:</strong>{' '}
            <span className="hidden md:inline text-on-surface/80">
              Audit category accuracy, check Map Pack rankings, and generate a 30-Day Local SEO Roadmap in seconds.
            </span>
            <span className="md:hidden text-on-surface/80">
              Audit Google Business Profile &amp; Map Pack ranking.
            </span>
          </p>

          <Link
            href="/tools/"
            className="inline-flex items-center gap-1 font-heading font-bold text-[11px] sm:text-xs text-primary-container hover:text-primary hover:underline transition-colors shrink-0 ml-auto sm:ml-1 group whitespace-nowrap"
          >
            <span>Try Free</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 rounded-lg text-on-surface/50 hover:text-on-surface hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss announcement banner"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </aside>
  )
}
