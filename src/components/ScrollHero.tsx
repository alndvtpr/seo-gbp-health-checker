'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

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

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // Preload and decode hero frames into useRef
  useEffect(() => {
    if (reducedMotion) return

    const imageCache: HTMLImageElement[] = imagesRef.current

    // Preload frame 0 immediately for LCP
    if (!imageCache[0]) {
      const firstImage = new Image()
      firstImage.src = getFrameUrl(0)
      imageCache[0] = firstImage
      firstImage.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvasRef.current.width = window.innerWidth * dpr
            canvasRef.current.height = window.innerHeight * dpr
            drawCover(ctx, firstImage, canvasRef.current.width, canvasRef.current.height)
          }
        }
      }
    }

    // Preload remaining frames progressively
    let index = 1
    const loadNextBatch = () => {
      const batchSize = 10
      let loadedInBatch = 0
      while (index < FRAME_COUNT && loadedInBatch < batchSize) {
        if (!imageCache[index]) {
          const img = new Image()
          img.src = getFrameUrl(index)
          imageCache[index] = img
        }
        index++
        loadedInBatch++
      }
      if (index < FRAME_COUNT) {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => loadNextBatch())
        } else {
          setTimeout(loadNextBatch, 30)
        }
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadNextBatch())
    } else {
      setTimeout(loadNextBatch, 30)
    }
  }, [reducedMotion])

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
    if (!mounted || reducedMotion) return

    let requestId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const render = () => {
      if (!containerRef.current) {
        requestId = requestAnimationFrame(render)
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollableDistance = rect.height - windowHeight

      let fraction = 0
      if (scrollableDistance > 0) {
        fraction = Math.max(0, Math.min(1, -rect.top / scrollableDistance))
      }

      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(fraction * (FRAME_COUNT - 1)))
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

      if (targetImg && targetImg.naturalWidth > 0) {
        drawCover(ctx, targetImg, canvas.width, canvas.height)
      }

      requestId = requestAnimationFrame(render)
    }

    requestId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(requestId)
      window.removeEventListener('resize', handleResize)
    }
  }, [mounted, reducedMotion])

  const targetContainer = mounted ? document.getElementById('webgl-background-container') : null

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-transparent">
      <link rel="preload" href={getFrameUrl(0)} as="image" />

      {/* Sticky viewport container holding the scrubbing canvas */}
      {targetContainer &&
        createPortal(
          <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full object-cover z-[-3] pointer-events-none"
          />,
          targetContainer
        )}

      {/* Hero Content Section - Sticky so text stays in viewport while scrolling through hero frames */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-start text-left px-4 sm:px-6 md:px-16 lg:px-24 pt-16 sm:pt-20 pb-12 relative z-20 max-w-7xl mx-auto pointer-events-none">
        <div className="max-w-2xl space-y-4 sm:space-y-6 pointer-events-auto">
          <span className="font-heading text-[11px] sm:text-xs uppercase tracking-widest text-primary-container font-bold px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 inline-block mb-1 sm:mb-2">
            SEO Specialist &amp; Technical Web Designer
          </span>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.15] sm:leading-[1.1] drop-shadow-2xl">
            Hey, I&apos;m <span className="text-primary-container">Alain Dave Tapiru</span>.
          </h1>

          <p className="font-sans text-base sm:text-xl md:text-2xl text-on-surface-variant drop-shadow-lg font-medium leading-relaxed">
            Data-Driven Search Engine Optimization &amp; High-Performance Web Engineering.
          </p>

          <p className="font-sans text-xs sm:text-base text-on-surface/70 max-w-xl drop-shadow-md leading-relaxed">
            Delivering high-converting digital solutions with cinematic film-noir precision and relentless technical efficiency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 pt-4 sm:pt-6 w-full">
            <Link
              href="/contact"
              className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:bg-primary hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Hire Me <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto min-h-[48px] border border-white/20 text-on-surface font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              About Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
