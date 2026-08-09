'use client'

import React from 'react'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 px-6 md:px-16 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
            <Image src="/logo.png" alt="Alain Dave Tapiru" fill className="object-contain p-0.5" />
          </div>
          <span className="font-heading font-bold text-on-surface text-lg">Alain Dave Tapiru</span>
        </div>

        <div className="font-sans text-xs text-on-surface/50 text-center">
          © {new Date().getFullYear()} Alain Dave Tapiru. All rights reserved. Built with Next.js &amp; Payload CMS.
        </div>

        <div className="flex gap-6">
          <a href="#home" className="font-sans text-xs text-on-surface/60 hover:text-primary-container transition-colors">
            Home
          </a>
          <a href="#about" className="font-sans text-xs text-on-surface/60 hover:text-primary-container transition-colors">
            About
          </a>
          <a href="#services" className="font-sans text-xs text-on-surface/60 hover:text-primary-container transition-colors">
            Services
          </a>
          <a href="#contact" className="font-sans text-xs text-on-surface/60 hover:text-primary-container transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
