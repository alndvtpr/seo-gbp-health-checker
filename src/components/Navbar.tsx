'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

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
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? 'bg-surface/80 backdrop-blur-xl shadow-lg py-3 px-6 rounded-full max-w-4xl border border-on-surface/10'
              : 'px-8 max-w-7xl'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="text-on-background font-bold text-headline-md tracking-tight z-[60] relative">
            Dave<span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav - Only show if menu is NOT open to avoid z-index overlap confusion */}
          <div className={`hidden md:flex items-center gap-8 transition-opacity duration-300 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-on-surface hover:text-primary transition-colors text-body-md font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger (Mobile & Tablet) */}
          <button
            className="md:hidden text-on-surface z-[60] relative p-2 -mr-2 hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl block">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-[40] flex flex-col justify-center items-center md:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-display-lg font-bold text-on-background hover:text-primary transition-all duration-500 opacity-0 translate-y-8 ${
                menuOpen ? 'opacity-100 translate-y-0' : ''
              }`}
              style={{ transitionDelay: menuOpen ? `${150 + index * 100}ms` : '0ms' }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
