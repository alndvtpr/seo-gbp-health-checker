'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'

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
  const maxScrollRef = useRef<number>(1)
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null)
  const isTabVisibleRef = useRef<boolean>(true)

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

  // Load a frame asynchronously into image cache
  const loadFrame = (index: number) => {
    if (index < 0 || index >= FRAME_COUNT) return
    const imageCache = imagesRef.current
    if (!imageCache[index]) {
      const img = new window.Image()
      img.decoding = 'async'
      img.src = getFrameUrl(index)
      imageCache[index] = img
    }
  }

  // Preload frame 0 immediately for LCP
  useEffect(() => {
    if (reducedMotion || isMobile) return

    const imageCache: HTMLImageElement[] = imagesRef.current

    if (!imageCache[0]) {
      const firstImage = new window.Image()
      firstImage.decoding = 'async'
      firstImage.src = getFrameUrl(0)
      imageCache[0] = firstImage
      firstImage.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvasRef.current.width = Math.floor(window.innerWidth * dpr)
            canvasRef.current.height = Math.floor(window.innerHeight * dpr)
            drawCover(ctx, firstImage, canvasRef.current.width, canvasRef.current.height)
            lastDrawnImgRef.current = firstImage
          }
        }
      }
    }
  }, [reducedMotion, isMobile])

  // Helper to draw image using object-fit: cover logic
  const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
    if (!img || img.naturalWidth === 0) return

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
  }

  // Scroll scrubbing synced to container scroll position
  useEffect(() => {
    if (!mounted || reducedMotion || isMobile) return

    let requestId: number

    const handleVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden
      if (!document.hidden) {
        lastDrawnImgRef.current = null
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const calculateMaxScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const footerElement = document.querySelector('footer')

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect()
        const footerTopInDoc = footerRect.top + currentScrollY
        maxScrollRef.current = Math.max(1, footerTopInDoc - windowHeight)
      } else {
        maxScrollRef.current = Math.max(1, document.documentElement.scrollHeight - windowHeight)
      }
    }

    calculateMaxScroll()

    const handleResizeOrScroll = () => {
      calculateMaxScroll()
      const canvas = canvasRef.current
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const targetWidth = Math.floor(window.innerWidth * dpr)
        const targetHeight = Math.floor(window.innerHeight * dpr)
        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth
          canvas.height = targetHeight
          lastDrawnImgRef.current = null
        }
      }
    }
    
    // Initial size setup
    handleResizeOrScroll()

    window.addEventListener('resize', handleResizeOrScroll, { passive: true })
    window.addEventListener('orientationchange', handleResizeOrScroll, { passive: true })

    const render = () => {
      if (!isTabVisibleRef.current) {
        requestId = requestAnimationFrame(render)
        return
      }

      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
          const maxScroll = maxScrollRef.current || 1

          const fraction = Math.max(0, Math.min(1, currentScrollY / maxScroll))
          const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(fraction * (FRAME_COUNT - 1)))

          // Load sliding window of frames around active index (5 behind, 15 ahead)
          const WINDOW_PREV = 5
          const WINDOW_NEXT = 15
          const windowStart = Math.max(0, frameIndex - WINDOW_PREV)
          const windowEnd = Math.min(FRAME_COUNT - 1, frameIndex + WINDOW_NEXT)
          for (let i = windowStart; i <= windowEnd; i++) {
            loadFrame(i)
          }

          const imgs = imagesRef.current

          // Find best target image: exact frame or closest previously loaded frame
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

          if (targetImg && targetImg.naturalWidth > 0 && targetImg !== lastDrawnImgRef.current) {
            drawCover(ctx, targetImg, canvas.width, canvas.height)
            lastDrawnImgRef.current = targetImg
          }
        }
      }

      requestId = requestAnimationFrame(render)
    }

    requestId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(requestId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResizeOrScroll)
      window.removeEventListener('orientationchange', handleResizeOrScroll)
    }
  }, [mounted, reducedMotion, isMobile])

  const targetContainer = mounted ? document.getElementById('webgl-background-container') : null

  return (
    <div ref={containerRef} className="relative w-full min-h-[90vh] sm:min-h-screen bg-transparent flex flex-col justify-center">
      <link rel="preload" href={getFrameUrl(0)} as="image" fetchPriority="high" />

      {/* Static Fallback Image - Always rendered on server, hidden on Desktop client UNLESS reduced motion */}
      <div 
        className={`fixed inset-0 w-full h-full z-[-4] pointer-events-none ${mounted && !isMobile && !reducedMotion ? 'hidden' : 'block'}`}
      >
        <Image 
          src={getFrameUrl(0)}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark film-noir gradient overlay to match canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,20,20,0.65)] via-[rgba(18,20,20,0.25)] to-[rgba(18,20,20,0.4)]" />
      </div>

      {/* Viewport container holding the background canvas (Desktop only) */}
      {targetContainer && !isMobile && !reducedMotion &&
        createPortal(
          <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full object-cover z-[-3] pointer-events-none"
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
            SEO Specialist in the Philippines <span className="text-primary-container">Building Search-Ready Websites</span>
          </h1>

          <p className="font-sans text-base sm:text-xl md:text-2xl text-on-surface-variant drop-shadow-lg font-medium leading-relaxed">
            Helping businesses worldwide grow through smarter SEO, search-ready websites, and effective digital marketing strategies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 pt-4 sm:pt-6 w-full">
            <Link
              href="/projects"
              className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:bg-primary hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              View My Work <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto min-h-[48px] border border-white/20 text-on-surface font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Let&apos;s Work Together
            </Link>
          </div>
          
          {/* Socials */}
          <div className="flex gap-3 sm:gap-4 pt-6 mt-2 border-t border-white/5 w-full sm:w-auto">
            {/* Gmail */}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="Gmail">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com/dcrazedave" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com/alndvtpr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
