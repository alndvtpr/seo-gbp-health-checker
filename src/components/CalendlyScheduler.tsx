'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Calendar, Clock, ExternalLink, Loader2, RefreshCcw, ShieldCheck, Sparkles } from 'lucide-react'

interface CalendlySchedulerProps {
  url?: string
  className?: string
}

const DEFAULT_CALENDLY_URL =
  'https://calendly.com/alaintapiru?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=f8fafc&text_color=111827&primary_color=38bdf8'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

export const CalendlyScheduler: React.FC<CalendlySchedulerProps> = ({
  url = DEFAULT_CALENDLY_URL,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetParentRef = useRef<HTMLDivElement>(null)
  const hasInitializedRef = useRef(false)
  const isLoadedRef = useRef(false)
  const [isInView, setIsInView] = useState(() => {
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      return true
    }
    return false
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // 1. IntersectionObserver: Lazy-load widget script only when approaching viewport (200px margin)
  useEffect(() => {
    const target = containerRef.current
    if (!target || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [])

  // 2. Dynamic Script Loader with ad-blocker protection and iframe detection
  useEffect(() => {
    if (!isInView) return

    let isMounted = true
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const markLoaded = () => {
      if (isMounted) {
        isLoadedRef.current = true
        setIsLoaded(true)
      }
    }

    const initWidget = () => {
      if (!isMounted || !widgetParentRef.current) return
      if (hasInitializedRef.current) return // Prevent duplicate widget mounting

      try {
        // If Calendly global is ready, initialize
        if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
          // Clear any stale children before init
          widgetParentRef.current.innerHTML = ''
          window.Calendly.initInlineWidget({
            url,
            parentElement: widgetParentRef.current,
          })
          hasInitializedRef.current = true
        }
      } catch (err) {
        console.warn('Calendly inline widget initialization note:', err)
      }
    }

    // Check if script already exists in document
    const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'
    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true

      script.onload = () => {
        if (!isMounted) return
        initWidget()
      }

      script.onerror = () => {
        if (!isMounted) return
        setHasError(true)
      }

      document.body.appendChild(script)
    } else {
      // Script already loaded or loading
      if (window.Calendly) {
        initWidget()
      } else {
        script.addEventListener('load', initWidget, { once: true })
      }
    }

    // Listen for Calendly iframe messages to detect render completion
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data !== null) {
        if (e.data.event && String(e.data.event).startsWith('calendly.')) {
          markLoaded()
        }
      }
    }

    window.addEventListener('message', handleMessage)

    // MutationObserver to detect iframe insertion into widget parent
    const mutationObserver = new MutationObserver(() => {
      if (widgetParentRef.current) {
        const iframe = widgetParentRef.current.querySelector('iframe')
        if (iframe) {
          iframe.addEventListener(
            'load',
            () => {
              markLoaded()
            },
            { once: true }
          )

          // Fallback timeout to ensure skeleton fades out even if onload fires silently
          timeoutId = setTimeout(() => {
            markLoaded()
          }, 2000)
        }
      }
    })

    if (widgetParentRef.current) {
      mutationObserver.observe(widgetParentRef.current, { childList: true, subtree: true })
    }

    // Safety timeout: If Calendly script doesn't resolve after 9 seconds, show direct link fallback
    const safetyTimeout = setTimeout(() => {
      if (isMounted && !isLoadedRef.current) {
        // If iframe is present, consider loaded, otherwise flag error fallback
        const iframe = widgetParentRef.current?.querySelector('iframe')
        if (iframe) {
          markLoaded()
        } else {
          setHasError(true)
        }
      }
    }, 9000)

    return () => {
      isMounted = false
      window.removeEventListener('message', handleMessage)
      mutationObserver.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
      clearTimeout(safetyTimeout)
    }
  }, [isInView, url])

  const handleRetry = () => {
    hasInitializedRef.current = false
    isLoadedRef.current = false
    setHasError(false)
    setIsLoaded(false)
    setIsInView(false)
    setTimeout(() => setIsInView(true), 50)
  }

  return (
    <section
      ref={containerRef}
      className={`w-full max-w-4xl mx-auto ${className}`}
      aria-label="Direct Calendar Booking"
    >
      {/* Scheduler Header & Trust Badges */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3 motion-reveal">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container text-xs font-heading font-semibold uppercase tracking-[0.08em]">
          <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Choose a Time</span>
        </div>
        <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
          Pick a Time That Works for You
        </h3>
        <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface/75 leading-relaxed max-w-xl mx-auto">
          No long sales pitch. Just a straightforward conversation about what you&apos;re trying to improve and whether I&apos;m the right person to help.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-[11px] font-sans text-on-surface/80">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1/90 border border-white/10 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-primary-container shrink-0" aria-hidden="true" /> 20 Minutes
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1/90 border border-white/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" /> Practical Next Steps
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1/90 border border-white/10 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-hidden="true" /> No Sales Pressure
          </span>
        </div>
      </div>

      {/* Main Glass Card Wrapper */}
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-surface-1/90 p-2.5 sm:p-5 md:p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden motion-reveal">
        {/* Ambient Radial Glows (Amber + Sky) */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Fixed Height Scheduler Container (Guarantees 0 CLS & Matches Native Theme) */}
        <div className="relative w-full min-w-0 h-[680px] sm:h-[700px] min-h-[680px] sm:min-h-[700px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
          {/* Skeleton Loader State */}
          {(!isLoaded && !hasError) && (
            <div
              className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-8 bg-[#F8FAFC] text-[#111827] transition-opacity duration-500"
              aria-busy="true"
              aria-label="Loading calendar scheduler"
            >
              {/* Skeleton Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-200/80 animate-pulse" />
                  <div className="space-y-2">
                    <div className="w-28 sm:w-36 h-4 rounded bg-slate-200/80 animate-pulse" />
                    <div className="w-40 sm:w-48 h-3 rounded bg-slate-200/60 animate-pulse" />
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-24 h-7 rounded-full bg-slate-200/80 animate-pulse" />
                </div>
              </div>

              {/* Skeleton Center Calendar Grid */}
              <div className="flex-1 my-5 sm:my-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                {/* Left Side: Mock details */}
                <div className="w-full sm:w-1/3 space-y-3 sm:space-y-4">
                  <div className="w-3/4 h-5 rounded bg-slate-200/80 animate-pulse" />
                  <div className="w-full h-3 rounded bg-slate-200/60 animate-pulse" />
                  <div className="w-5/6 h-3 rounded bg-slate-200/60 animate-pulse" />
                  <div className="pt-3 space-y-2">
                    <div className="w-1/2 h-3 rounded bg-slate-200/60 animate-pulse" />
                    <div className="w-2/3 h-3 rounded bg-slate-200/60 animate-pulse" />
                  </div>
                </div>

                {/* Right Side: Mock Calendar Grid */}
                <div className="w-full sm:w-2/3 max-w-sm space-y-3 bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-24 h-4 rounded bg-slate-200/80 animate-pulse" />
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded bg-slate-200/80 animate-pulse" />
                      <div className="w-6 h-6 rounded bg-slate-200/80 animate-pulse" />
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-7 sm:h-8 rounded-lg ${
                          i % 4 === 0 ? 'bg-sky-100/90' : 'bg-slate-100'
                        } animate-pulse`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Skeleton Bottom Loader Status */}
              <div className="flex items-center justify-center gap-2.5 py-3 border-t border-slate-200/80 text-slate-600 text-xs font-medium">
                <Loader2 className="w-4 h-4 animate-spin text-[#38BDF8]" aria-hidden="true" />
                <span>Connecting to live Calendly schedule...</span>
              </div>
            </div>
          )}

          {/* Ad Blocker / Network Error Fallback Card */}
          {hasError && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-surface-1/95 text-on-surface"
              role="alert"
            >
              <div className="w-16 h-16 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(230,126,34,0.25)]">
                <Calendar className="w-8 h-8 text-primary-container" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-xl font-bold text-on-surface mb-2">
                Calendar Embed Blocked or Unavailable
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/75 max-w-md mb-6 leading-relaxed">
                An ad blocker or privacy extension may be preventing the Calendly widget from loading. You can book directly on Calendly or retry loading.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://calendly.com/alaintapiru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] hover:bg-primary transition-all shadow-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
                  aria-label="Open Calendly Direct (opens in new tab)"
                >
                  <span>Open Calendly Direct</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-heading text-xs font-bold uppercase tracking-[0.06em] hover:bg-white/20 transition-all border border-white/10 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <RefreshCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Retry</span>
                </button>
              </div>
            </div>
          )}

          {/* The Actual Calendly Inline Widget Container */}
          <div
            ref={widgetParentRef}
            className="calendly-inline-widget w-full min-w-0 h-[680px] sm:h-[700px] min-h-[680px] sm:min-h-[700px]"
            data-url={url}
            style={{ width: '100%', height: '100%' }}
            aria-label="Calendly Appointment Booking Widget"
          />
        </div>

        {/* Fallback Secondary CTA & Timezone Guidance */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-center sm:text-left">
          <p className="font-sans text-xs sm:text-sm text-on-surface/75">
            Having trouble loading the calendar?{' '}
            <a
              href="https://calendly.com/alaintapiru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-container font-semibold underline underline-offset-4 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container rounded"
              aria-label="Book directly on Calendly (opens in a new tab)"
            >
              <span>Book directly on Calendly</span>
              <ExternalLink className="w-3.5 h-3.5 inline shrink-0" aria-hidden="true" />
            </a>
          </p>
          <span className="font-sans text-[11px] text-on-surface/50 font-medium">
            Philippines (GMT+8) • Real-Time Timezone Detection
          </span>
        </div>
      </div>
    </section>
  )
}
