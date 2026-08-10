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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
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

  // Progressive frame decoding & caching
  useEffect(() => {
    if (reducedMotion) return

    const imageCache: HTMLImageElement[] = []

    // Critical LCP frame
    const firstImage = new Image()
    firstImage.src = getFrameUrl(0)
    imageCache[0] = firstImage

    firstImage.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          drawCover(ctx, firstImage, canvasRef.current.width, canvasRef.current.height)
        }
      }
    }

    let frameIndex = 1
    const loadNextFrame = (idleDeadline: IdleDeadline) => {
      while (idleDeadline.timeRemaining() > 0 && frameIndex < FRAME_COUNT) {
        const img = new Image()
        img.src = getFrameUrl(frameIndex)
        imageCache[frameIndex] = img
        frameIndex++
      }

      if (frameIndex < FRAME_COUNT) {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadNextFrame)
        } else {
          setTimeout(() => loadNextFrame({ timeRemaining: () => 10, didTimeout: false }), 50)
        }
      } else {
        setImages([...imageCache])
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadNextFrame)
    } else {
      setTimeout(() => loadNextFrame({ timeRemaining: () => 10, didTimeout: false }), 50)
    }

    setImages(imageCache)
  }, [reducedMotion])

  // Helper to draw image using object-fit: cover logic
  const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
    if (!img || !img.complete || img.naturalWidth === 0) return
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

    // Apply dark film-noir overlay gradient directly to canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, 'rgba(18, 20, 20, 0.4)')
    gradient.addColorStop(0.5, 'rgba(18, 20, 20, 0.25)')
    gradient.addColorStop(1, 'rgba(18, 20, 20, 0.65)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  // Scroll scrubbing synced to document scroll height down to footer
  useEffect(() => {
    if (reducedMotion || images.length === 0) return

    let requestId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const render = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll))

      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT))

      if (images[frameIndex] && images[frameIndex].complete) {
        drawCover(ctx, images[frameIndex], canvas.width, canvas.height)
      } else if (images[0] && images[0].complete) {
        drawCover(ctx, images[0], canvas.width, canvas.height)
      }

      requestId = requestAnimationFrame(render)
    }

    requestId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(requestId)
      window.removeEventListener('resize', handleResize)
    }
  }, [images, reducedMotion])

  const targetContainer = mounted ? document.getElementById('webgl-background-container') : null

  return (
    <>
      <link rel="preload" href={getFrameUrl(0)} as="image" />

      {/* Render the scrubbing canvas into the fixed background layer */}
      {targetContainer &&
        createPortal(
          <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full object-cover z-[-3] pointer-events-none"
          />,
          targetContainer
        )}

      {/* Hero Content Section */}
      <div className="min-h-screen flex flex-col justify-center items-start text-left px-6 md:px-16 pt-32 pb-20 relative z-20 max-w-7xl mx-auto">
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#e67e22]/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-4xl flex flex-col justify-center gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e67e22]/40 bg-[#e67e22]/10 backdrop-blur-md">
              <span className="text-[#e67e22] text-xs sm:text-sm font-semibold uppercase tracking-widest">
                SEO SPECIALIST &amp; TECHNICAL WEB DESIGNER
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            Hey, I&apos;m{' '}
            <span className="text-[#e67e22] drop-shadow-[0_0_30px_rgba(230,126,34,0.6)]">
              Alain Dave Tapiru.
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-100 max-w-3xl leading-snug">
            Data-Driven Search Engine Optimization &amp; High-Performance Web Engineering.
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Delivering high-converting digital solutions with cinematic film-noir precision and relentless technical efficiency.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 w-full">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e67e22] hover:bg-[#ff9436] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.5)] hover:shadow-[0_0_35px_rgba(230,126,34,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-decoration-none"
            >
              HIRE AN SEO <span className="text-base">→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white border border-white/20 hover:border-white/40 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-decoration-none"
            >
              ABOUT ME
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
