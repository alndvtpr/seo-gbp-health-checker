'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/icons'

const FRAME_COUNT = 121
const FRAME_PREFIX = '/hero-frames/frame-'
const FRAME_SUFFIX = '.webp'

function getFrameUrl(index: number) {
  return `${FRAME_PREFIX}${index.toString().padStart(4, '0')}${FRAME_SUFFIX}`
}

export const ScrollHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Pure in-memory cache to guarantee 0 forced reflows
  const scrollYRef = useRef(0)
  const metricsRef = useRef({
    top: 0,
    height: 1,
    canvasWidth: 0,
    canvasHeight: 0,
    lastDrawnIndex: -1,
    targetFrameIndex: 0,
  })
  const isTicking = useRef(false)
  const isTabVisibleRef = useRef(true)

  // 1. Accessibility: Motion & Viewport Checks
  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    setIsMobile(mobileQuery.matches)

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const mobileListener = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    mediaQuery.addEventListener('change', listener)
    mobileQuery.addEventListener('change', mobileListener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
      mobileQuery.removeEventListener('change', mobileListener)
    }
  }, [])

  // 2. Load a frame asynchronously into image cache
  const loadFrame = useCallback((index: number, onLoaded?: (idx: number) => void) => {
    if (index < 0 || index >= FRAME_COUNT) return
    const imageCache = imagesRef.current
    if (!imageCache[index]) {
      const img = new window.Image()
      img.decoding = 'async'
      img.src = getFrameUrl(index)
      if (onLoaded) {
        img.onload = () => onLoaded(index)
      }
      imageCache[index] = img
    }
  }, [])

  // 3. Helper to draw image using object-fit: cover with dark film-noir overlay
  const drawCover = useCallback(
    (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
      if (!img || img.naturalWidth === 0 || width === 0 || height === 0) return

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      const imgRatio = img.naturalWidth / img.naturalHeight
      const canvasRatio = width / height
      let drawWidth = width
      let drawHeight = height
      let offsetX = 0
      let offsetY = 0

      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio
        offsetY = (height - drawHeight) / 2
      } else {
        drawWidth = height * imgRatio
        offsetX = (width - drawWidth) / 2
      }

      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

      // Dark film-noir gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(18, 20, 20, 0.4)')
      gradient.addColorStop(0.5, 'rgba(18, 20, 20, 0.25)')
      gradient.addColorStop(1, 'rgba(18, 20, 20, 0.65)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    },
    []
  )

  // 4. Initial Frame 0 Preload for Instant LCP
  useEffect(() => {
    if (reducedMotion || isMobile) return

    const imageCache = imagesRef.current
    if (!imageCache[0]) {
      const firstImage = new window.Image()
      firstImage.decoding = 'async'
      firstImage.src = getFrameUrl(0)
      imageCache[0] = firstImage
      firstImage.onload = () => {
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const w = Math.floor(window.innerWidth * dpr)
            const h = Math.floor(window.innerHeight * dpr)
            canvas.width = w
            canvas.height = h
            metricsRef.current.canvasWidth = w
            metricsRef.current.canvasHeight = h
            drawCover(ctx, firstImage, w, h)
            metricsRef.current.lastDrawnIndex = 0
          }
        }
      }
    }
  }, [reducedMotion, isMobile, drawCover])

  // 5. Zero-Reflow Scrubbing Engine with Pre-Capture Scroll Sampling
  useEffect(() => {
    if (!mounted || reducedMotion || isMobile) return

    let resizeTimer: ReturnType<typeof setTimeout> | null = null

    const handleVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden
      if (!document.hidden) {
        metricsRef.current.lastDrawnIndex = -1
        requestTick()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Isolated measurement: runs ONLY on mount, debounced resize, or orientation change
    const updateMetrics = () => {
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 0
      const winWidth = window.innerWidth || document.documentElement.clientWidth || 0
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const currentScrollY = window.pageYOffset || 0
      scrollYRef.current = currentScrollY

      let top = 0
      let height = 1

      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        top = containerRect.top + currentScrollY
      }

      const footerElement = document.querySelector('footer')
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect()
        const footerTopInDoc = footerRect.top + currentScrollY
        height = Math.max(1, footerTopInDoc - top - winHeight)
      } else {
        height = Math.max(1, document.documentElement.scrollHeight - top - winHeight)
      }

      const targetWidth = Math.floor(winWidth * dpr)
      const targetHeight = Math.floor(winHeight * dpr)

      metricsRef.current.top = top
      metricsRef.current.height = height
      metricsRef.current.canvasWidth = targetWidth
      metricsRef.current.canvasHeight = targetHeight

      const canvas = canvasRef.current
      if (canvas) {
        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth
          canvas.height = targetHeight
          metricsRef.current.lastDrawnIndex = -1
        }
      }
    }

    // Pure memory-driven frame renderer: ZERO DOM/layout queries inside rAF
    const renderFrame = () => {
      if (!isTabVisibleRef.current) {
        isTicking.current = false
        return
      }

      const canvas = canvasRef.current
      if (!canvas) {
        isTicking.current = false
        return
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        isTicking.current = false
        return
      }

      // Read pure in-memory values sampled during capture phase
      const currentScrollY = scrollYRef.current
      const { top, height, canvasWidth, canvasHeight } = metricsRef.current
      const progress = Math.min(Math.max((currentScrollY - top) / height, 0), 1)
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * (FRAME_COUNT - 1)))
      metricsRef.current.targetFrameIndex = frameIndex

      // Preload sliding window only after user initiates scrolling (scrollY > 0), preventing 15 concurrent frame decodes on initial load
      if (currentScrollY > 0 || frameIndex > 0) {
        const WINDOW_PREV = 4
        const WINDOW_NEXT = 12
        const windowStart = Math.max(0, frameIndex - WINDOW_PREV)
        const windowEnd = Math.min(FRAME_COUNT - 1, frameIndex + WINDOW_NEXT)
        for (let i = windowStart; i <= windowEnd; i++) {
          loadFrame(i, handleAsyncFrameLoaded)
        }
      }

      const imgs = imagesRef.current
      let targetImg = imgs[frameIndex]
      if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
        for (let i = frameIndex - 1; i >= 0; i--) {
          if (imgs[i] && imgs[i].complete && imgs[i].naturalWidth > 0) {
            targetImg = imgs[i]
            break
          }
        }
      }
      if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
        targetImg = imgs[0]
      }

      if (targetImg && targetImg.naturalWidth > 0 && frameIndex !== metricsRef.current.lastDrawnIndex) {
        drawCover(ctx, targetImg, canvasWidth, canvasHeight)
        metricsRef.current.lastDrawnIndex = frameIndex
      }

      isTicking.current = false
    }

    const handleAsyncFrameLoaded = (loadedIndex: number) => {
      if (loadedIndex === metricsRef.current.targetFrameIndex && loadedIndex !== metricsRef.current.lastDrawnIndex) {
        requestTick()
      }
    }

    const requestTick = () => {
      if (!isTicking.current) {
        isTicking.current = true
        requestAnimationFrame(renderFrame)
      }
    }

    // CAPTURE-PHASE SCROLL LISTENER:
    // Captures window.pageYOffset before any 3rd party scripts (like Google Analytics)
    // can invalidate styles or dirty DOM state, eliminating forced reflows completely.
    const onScrollCapture = () => {
      scrollYRef.current = window.pageYOffset || 0
      requestTick()
    }

    const debouncedResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updateMetrics()
        requestTick()
      }, 150)
    }

    updateMetrics()
    requestTick()

    window.addEventListener('scroll', onScrollCapture, { passive: true, capture: true })
    window.addEventListener('resize', debouncedResize, { passive: true })
    window.addEventListener('orientationchange', debouncedResize, { passive: true })
    window.addEventListener('load', updateMetrics)

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('scroll', onScrollCapture, { capture: true })
      window.removeEventListener('resize', debouncedResize)
      window.removeEventListener('orientationchange', debouncedResize)
      window.removeEventListener('load', updateMetrics)
    }
  }, [mounted, reducedMotion, isMobile, loadFrame, drawCover])

  const targetContainer = mounted ? document.getElementById('webgl-background-container') : null

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[90vh] min-h-[90dvh] sm:min-h-screen bg-transparent flex flex-col justify-center"
    >
      <link rel="preload" href={getFrameUrl(0)} as="image" fetchPriority="high" />

      {/* Static Fallback / SSR Image (Always rendered on server, active on mobile or reduced motion) */}
      <div
        className={`fixed inset-0 w-full h-full z-[-4] pointer-events-none asset-shield ${
          mounted && !isMobile && !reducedMotion ? 'hidden' : 'block'
        }`}
      >
        <Image
          src={getFrameUrl(0)}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,20,20,0.65)] via-[rgba(18,20,20,0.25)] to-[rgba(18,20,20,0.4)]" />
      </div>

      {/* Background Canvas (Portaled to background container on desktop) */}
      {targetContainer && !isMobile && !reducedMotion &&
        createPortal(
          <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full object-cover z-[-3] pointer-events-none asset-shield"
            style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
          />,
          targetContainer
        )}

      {/* Hero Content Section */}
      <div className="flex flex-col justify-center items-start text-left px-4 sm:px-6 md:px-16 lg:px-24 pt-20 sm:pt-28 pb-12 sm:pb-20 relative z-20 max-w-7xl mx-auto w-full">
        <div className="max-w-md space-y-4 sm:space-y-6">
          <span className="font-heading text-[11px] sm:text-xs uppercase tracking-widest text-primary-container font-bold px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 inline-block mb-1 sm:mb-2">
            SEO Specialist &amp; Technical Web Designer
          </span>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.15] sm:leading-[1.1] drop-shadow-2xl">
            SEO Specialist in the Philippines{' '}
            <span className="text-primary-container">Building Search-Ready Websites</span>
          </h1>

          <p className="font-sans text-base sm:text-xl md:text-2xl text-on-surface-variant drop-shadow-lg font-medium leading-relaxed">
            Helping businesses worldwide grow through smarter SEO, search-ready websites, and effective digital marketing strategies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 pt-4 sm:pt-6 w-full">
            <Link
              href="/projects"
              data-agent-action="view-portfolio-projects"
              className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:bg-primary hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              View My Work <Icon name="arrow_forward" size={16} />
            </Link>
            <Link
              href="/contact"
              data-agent-action="start-seo-inquiry"
              className="w-full sm:w-auto min-h-[48px] border border-white/20 text-on-surface font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Let&apos;s Work Together
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-3 sm:gap-4 pt-6 mt-2 border-t border-white/5 w-full sm:w-auto">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="Gmail"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/dcrazedave"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              href="https://github.com/alndvtpr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
