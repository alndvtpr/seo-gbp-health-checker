'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

const GA_MEASUREMENT_ID = 'G-2VK6KQNJGH'

export const GoogleAnalytics = () => {
  useEffect(() => {
    let initialized = false
    let idleTimeoutId: ReturnType<typeof setTimeout> | null = null
    let idleCallbackId: number | null = null

    const loadGA = () => {
      if (initialized) return
      initialized = true

      cleanupListeners()

      // Define dataLayer and gtag if not yet defined
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        ;(window.dataLayer as any[]).push(args)
      }
      ;(window as any).gtag = gtag
      gtag('js', new Date())
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
        send_page_view: true,
      })

      // Dynamically insert gtag.js
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script.async = true
      document.head.appendChild(script)
    }

    const events = ['mousemove', 'scroll', 'pointerdown', 'touchstart', 'keydown']
    const handleInteraction = () => loadGA()

    const addListeners = () => {
      events.forEach((ev) => {
        window.addEventListener(ev, handleInteraction, { passive: true, once: true })
      })
    }

    const cleanupListeners = () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, handleInteraction)
      })
      if (idleTimeoutId) clearTimeout(idleTimeoutId)
      if (idleCallbackId && 'cancelIdleCallback' in window) {
        ;(window as any).cancelIdleCallback(idleCallbackId)
      }
    }

    addListeners()

    // 4000ms idle fallback for non-interacting human sessions
    if ('requestIdleCallback' in window) {
      idleCallbackId = (window as any).requestIdleCallback(() => loadGA(), { timeout: 4000 })
    } else {
      idleTimeoutId = setTimeout(loadGA, 4000)
    }

    return () => {
      cleanupListeners()
    }
  }, [])

  return null
}
