'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tools', href: '/tools' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-5'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-[#121414]/95 shadow-2xl py-2 px-4 md:py-2.5 md:px-6 rounded-2xl md:rounded-full max-w-6xl border border-white/10 mx-3 md:mx-auto scale-100 md:scale-[0.98] translate-y-1 md:translate-y-4'
              : 'px-4 md:px-12 max-w-7xl scale-100 translate-y-0'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 group relative z-[60]"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-white/20 group-hover:border-primary-container transition-colors flex items-center justify-center bg-white/5 shrink-0">
              <img
                src="/Alain-Dave-Tapiru-SEO-Specialist-Philippines-Logo.webp"
                alt="Alain Dave Tapiru SEO Specialist Philippines Logo"
                width="48"
                height={48}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-heading font-bold text-base sm:text-lg md:text-xl text-on-surface tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
              Alain Dave <span className="text-primary-container">Tapiru</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-surface-container-low/60 px-4 py-1.5 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-heading text-xs uppercase tracking-wider px-3.5 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-primary-container bg-white/10 font-bold'
                      : 'text-on-surface/80 hover:text-primary-container hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Hire Me CTA Button */}
          <div className="hidden md:flex items-center gap-4 relative z-[60]">
            <Link
              href="/contact"
              className="bg-primary-container text-on-primary-container font-heading text-xs uppercase tracking-widest font-bold px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(230,126,34,0.4)] hover:bg-primary hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Hire Me
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Hamburger (Mobile & Tablet) */}
          <button
            className="lg:hidden text-on-surface z-[60] relative p-2.5 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl block">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#0c0f0f]/98 z-[55] flex flex-col justify-center items-center lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary-container/10 rounded-full pointer-events-none blur-2xl" />
        <nav className="flex flex-col items-center gap-5 sm:gap-6 relative z-10 w-full px-6 max-w-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-heading text-lg sm:text-xl font-bold uppercase tracking-widest transition-colors py-1 ${
                  isActive ? 'text-primary-container border-b-2 border-primary-container' : 'text-on-surface hover:text-primary-container'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 w-full text-center bg-primary-container text-on-primary-container font-heading text-sm uppercase tracking-widest font-bold px-8 py-3.5 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.5)] hover:bg-primary transition-colors"
          >
            Hire Me
          </Link>
        </nav>
      </div>
    </>
  )
}
