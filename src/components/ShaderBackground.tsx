'use client'

import React, { useEffect, useRef } from 'react'

export const ShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMovingRef = useRef(false)
  const targetPosRef = useRef({ x: 50, y: 30 })
  const currentPosRef = useRef({ x: 50, y: 30 })

  useEffect(() => {
    let animId: number | null = null

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
      className="fixed inset-0 w-full h-full z-[-2] pointer-events-none overflow-hidden select-none bg-transparent"
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '30%',
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* 1. Transparent Top Amber Atmospheric Ambient Glow */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 25%, rgba(230, 126, 34, 0.14) 0%, rgba(230, 126, 34, 0.03) 45%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />

      {/* 2. Interactive Mouse Ambient Light (Sleeps when idle) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 hidden sm:block"
        style={{
          background: 'radial-gradient(circle 450px at var(--mouse-x) var(--mouse-y), rgba(230, 126, 34, 0.12) 0%, rgba(230, 126, 34, 0.02) 40%, transparent 70%)',
          transform: 'translateZ(0)',
          willChange: 'background',
        }}
      />

      {/* 3. Subtle Edge Vignette */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse 95% 85% at 50% 50%, transparent 50%, rgba(18, 20, 20, 0.4) 100%)',
        }}
      />
    </div>
  )
}



