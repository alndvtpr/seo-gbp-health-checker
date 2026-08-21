'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.motion-reveal, .motion-reveal-fast').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.motion-reveal:not(.is-visible), .motion-reveal-fast:not(.is-visible)'
      )
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // If already in viewport on mount, reveal immediately to prevent blank flashes
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible')
        } else {
          observer.observe(el)
        }
      })
    }

    observeElements()

    // Follow-up pass to catch client-hydrated asynchronous nodes
    const timer = setTimeout(observeElements, 120)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
