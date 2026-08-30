'use client'

import React, { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, X } from 'lucide-react'

const STORAGE_KEY = 'gbp_announcement_banner_2026_v2_dismissed'
const DISMISS_EVENT = 'announcement-banner-dismissed'

const subscribeToDismissal = (onStoreChange: () => void) => {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener(DISMISS_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(DISMISS_EVENT, onStoreChange)
  }
}

const getDismissalSnapshot = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export const AnnouncementBanner = () => {
  const storedDismissal = useSyncExternalStore(subscribeToDismissal, getDismissalSnapshot, () => true)
  const [dismissedThisSession, setDismissedThisSession] = useState(false)

  const handleDismiss = () => {
    setDismissedThisSession(true)
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
      window.dispatchEvent(new Event(DISMISS_EVENT))
    } catch {
      // ignore storage error
    }
  }

  if (storedDismissal || dismissedThisSession) return null

  return (
    <aside
      aria-label="New Feature Announcement"
      className="relative z-50 w-full bg-background bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1 border-b border-primary-container/30 shadow-[0_4px_25px_rgba(230,126,34,0.15)] text-on-surface py-2 sm:py-2.5 px-3 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-start">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-heading font-extrabold uppercase tracking-wider bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(230,126,34,0.6)] shrink-0">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin duration-1000" aria-hidden="true" />
            <span>New Feature</span>
          </span>

          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-on-surface/90 truncate">
            <strong className="text-on-surface font-semibold hidden xs:inline">Free GBP Audit Tool:</strong>{' '}
            <span className="hidden md:inline text-on-surface/80">
              Check category accuracy, 10 core local signals, and practical optimization steps.
            </span>
            <span className="md:hidden text-on-surface/80">
              Check Google Business Profile &amp; local signals.
            </span>
          </p>

          <Link
            href="/tools/"
            className="inline-flex min-h-[44px] items-center gap-1 px-1.5 py-1 font-heading text-[11px] font-bold text-primary-container transition-colors hover:text-primary hover:underline sm:ml-1 sm:text-xs ml-auto shrink-0 group whitespace-nowrap"
          >
            <span>Try Free</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-lg p-1.5 text-on-surface/60 transition-colors hover:bg-black/5 hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:hover:bg-white/10"
          aria-label="Dismiss announcement banner"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}
