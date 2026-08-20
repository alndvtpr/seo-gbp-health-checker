'use client'

import React, { useEffect, useRef } from 'react'

export const ShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMovingRef = useRef(false)
  const targetPosRef = useRef({ x: 50, y: 30 })
  const currentPosRef = useRef({ x: 50, y: 30 })

  useEffect(() => {
    let animId: number | null = null

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const updatePosition = () => {
      const dx = targetPosRef.current.x - currentPosRef.current.x
      const dy = targetPosRef.current.y - currentPosRef.current.y

      currentPosRef.current.x += dx * 0.08
      currentPosRef.current.y += dy * 0.08

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentPosRef.current.x.toFixed(2)}%`)
        containerRef.current.style.setProperty('--mouse-y', `${currentPosRef.current.y.toFixed(2)}%`)
      }

      // Continue animating until settled, then sleep immediately to save 100% CPU
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        animId = requestAnimationFrame(updatePosition)
      } else {
        isMovingRef.current = false
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      targetPosRef.current = { x, y }

      if (!isMovingRef.current) {
        isMovingRef.current = true
        animId = requestAnimationFrame(updatePosition)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[-2] pointer-events-none overflow-hidden select-none"
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '30%',
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* 1. Deep Film-Noir Base Gradient */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(18, 20, 20, 0.95) 0%, rgba(14, 16, 16, 1) 50%, rgba(10, 12, 12, 1) 100%)',
        }}
      />

      {/* 2. Primary Atmospheric Amber Ambient Spotlight */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 20%, rgba(230, 126, 34, 0.20) 0%, rgba(230, 126, 34, 0.06) 45%, transparent 75%)',
          transform: 'translateZ(0)',
        }}
      />

      {/* 3. Interactive Mouse Spotlight (Tracks cursor smoothly, sleeps when idle) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70 transition-opacity duration-700 hidden sm:block"
        style={{
          background: 'radial-gradient(circle 550px at var(--mouse-x) var(--mouse-y), rgba(230, 126, 34, 0.18) 0%, rgba(230, 126, 34, 0.05) 40%, transparent 70%)',
          transform: 'translateZ(0)',
          willChange: 'background',
        }}
      />

      {/* 4. Cinematic Secondary Accent Lighting (Warm Orange & Cool Cyan Rim) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle 600px at 85% 75%, rgba(230, 126, 34, 0.10) 0%, transparent 60%), radial-gradient(circle 400px at 15% 85%, rgba(69, 140, 245, 0.04) 0%, transparent 50%)',
          transform: 'translateZ(0)',
        }}
      />

      {/* 5. Authentic Film Grain Texture Overlay */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 6. Heavy Film-Noir Edge Vignette */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
        style={{
          background: 'radial-gradient(ellipse 95% 85% at 50% 50%, transparent 40%, rgba(10, 12, 12, 0.5) 75%, rgba(10, 12, 12, 0.95) 100%)',
        }}
      />
    </div>
  )
}


