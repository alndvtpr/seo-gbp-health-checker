'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Me', href: '#about' },
    { name: 'Industries', href: '#industries' },
    { name: 'Contact', href: '#contact' },
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-[#121414]/80 backdrop-blur-xl shadow-2xl py-2.5 px-6 rounded-full max-w-5xl border border-white/10'
              : 'px-6 md:px-12 max-w-7xl'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group relative z-[60]"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-primary/20 group-hover:border-primary transition-colors">
              <Image
                src="/logo.png"
                alt="Alain Dave Tapiru"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="font-heading font-bold text-lg md:text-xl text-on-surface tracking-tight group-hover:text-primary transition-colors">
              Alain Dave <span className="text-primary-container">Tapiru</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-surface-container-low/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-heading text-sm uppercase tracking-wider text-on-surface/80 hover:text-primary-container hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Hire Me CTA Button */}
          <div className="hidden md:flex items-center gap-4 relative z-[60]">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-primary-container text-on-primary-container font-heading text-xs uppercase tracking-widest font-bold px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(230,126,34,0.4)] hover:bg-primary hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Hire Me
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          {/* Hamburger (Mobile & Tablet) */}
          <button
            className="lg:hidden text-on-surface z-[60] relative p-2 rounded-full hover:bg-white/10 transition-colors"
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
        className={`fixed inset-0 bg-[#0c0f0f]/95 backdrop-blur-2xl z-[40] flex flex-col justify-center items-center lg:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary-container/10 rounded-full blur-[100px] pointer-events-none" />
        <nav className="flex flex-col items-center gap-8 relative z-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-heading text-2xl font-bold uppercase tracking-widest text-on-surface hover:text-primary-container transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="mt-4 bg-primary-container text-on-primary-container font-heading text-sm uppercase tracking-widest font-bold px-8 py-3.5 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.5)] hover:bg-primary transition-colors"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </>
  )
}
