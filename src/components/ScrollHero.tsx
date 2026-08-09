'use client'

import React, { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 121
const FRAME_PREFIX = '/hero-frames/frame-'
const FRAME_SUFFIX = '.webp'

function getFrameUrl(index: number) {
  return `${FRAME_PREFIX}${index.toString().padStart(4, '0')}${FRAME_SUFFIX}`
}

export const ScrollHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  // 1. Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // 2. Progressive Decoding & Caching strategy
  useEffect(() => {
    if (reducedMotion) return

    const imageCache: HTMLImageElement[] = []

    // LCP Critical: Load and draw frame 0 immediately
    const firstImage = new Image()
    firstImage.src = getFrameUrl(0)
    imageCache[0] = firstImage

    firstImage.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.drawImage(firstImage, 0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      }
    }

    let frameIndex = 1
    const loadNextFrame = (idleDeadline: IdleDeadline) => {
      // Use idle time to load images progressively without freezing the main thread
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
        setImages([...imageCache]) // Trigger final re-render with all images loaded
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadNextFrame)
    } else {
      setTimeout(() => loadNextFrame({ timeRemaining: () => 10, didTimeout: false }), 50)
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImages(imageCache)
  }, [reducedMotion])

  // 3. RequestAnimationFrame scroll scrubbing
  useEffect(() => {
    if (reducedMotion || images.length === 0) return

    let requestId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false }) // Optimize for opaque background
    if (!ctx) return

    // Pre-calculate image dimensions to avoid layout thrashing
    const render = () => {
      if (!containerRef.current) return

      const { top, height } = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollableDistance = height - windowHeight

      const scrolled = -top
      let fraction = 0
      if (scrollableDistance > 0) {
        fraction = Math.max(0, Math.min(1, scrolled / scrollableDistance))
      }

      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(fraction * FRAME_COUNT))

      if (images[frameIndex] && images[frameIndex].complete) {
        ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height)
      }

      requestId = requestAnimationFrame(render)
    }

    requestId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(requestId)
  }, [images, reducedMotion])

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-background">
      {/* Inject preload link for frame 0 so it loads super fast for LCP */}
      <link rel="preload" href={getFrameUrl(0)} as="image" />

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Overlay a subtle gradient mask for the M3 dark theme aesthetic to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10 pointer-events-none" />

        {reducedMotion ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={getFrameUrl(0)}
            alt="Hero Animation Frame"
            className="w-full h-full object-cover"
          />
        ) : (
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Hero Content positioned over the canvas */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-display-lg text-on-background font-bold tracking-tight mb-4 drop-shadow-2xl">
            Hey, I&apos;m <span className="text-primary-container">Alain Dave Tapiru</span>.
          </h1>
          <p className="text-headline-md text-on-surface-variant max-w-2xl drop-shadow-lg font-medium">
            SEO Specialist, Virtual Assistant &amp; Tech Enthusiast.
          </p>
          <p className="text-body-lg text-secondary-fixed-dim max-w-xl mt-3 drop-shadow-md">
            Adaptable, Secure, and Client-Focused. Delivering high-end digital solutions with cinematic precision and relentless efficiency.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <a
              href="#contact"
              className="bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.5)] hover:bg-primary transition-all flex items-center gap-2"
            >
              Hire Me <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a
              href="#about"
              className="border border-white/20 text-on-surface font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
