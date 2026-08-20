'use client'

import React from 'react'

export const ShaderBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-2] pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Zero-CPU GPU-accelerated ambient orange radial glow */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(230, 126, 34, 0.14) 0%, rgba(18, 20, 20, 0.05) 50%, rgba(18, 20, 20, 0) 80%)',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
      {/* Secondary subtle bottom ambient accent */}
      <div 
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 80%, rgba(230, 126, 34, 0.08) 0%, rgba(18, 20, 20, 0) 50%)',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  )
}

