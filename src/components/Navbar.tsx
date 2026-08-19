'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { RssButton } from '@/components/RssButton'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled((window.pageYOffset || document.documentElement.scrollTop || 0) > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/' },
    { name: 'Projects', href: '/projects/' },
    { name: 'Tools', href: '/tools/' },
    { name: 'Services', href: '/services/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Contact', href: '/contact/' },
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
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex flex-col">
        
        {/* Row 1: Top Announcement Banner (Permanently pinned at top across all scroll depths) */}
        <div className="w-full pointer-events-auto">
          <AnnouncementBanner />
        </div>

        {/* Row 2: Navigation Bar (transforms into floating glass pill when scrolled) */}
        <div className={`w-full transition-[padding] duration-300 ${scrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3.5'}`}>
          <div
            className={`mx-auto flex items-center justify-between pointer-events-auto transition-[background-color,box-shadow,padding,border-color,border-radius,max-width,margin] duration-300 ${
              scrolled
                ? 'bg-[#121414]/95 shadow-2xl py-2 px-5 md:py-2.5 md:px-8 lg:px-10 rounded-2xl md:rounded-full max-w-6xl border border-white/10 mx-3 md:mx-auto'
                : 'px-4 md:px-12 max-w-7xl bg-transparent border-transparent'
            }`}
          >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 group relative z-[60]"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 overflow-hidden rounded-full border border-white/20 group-hover:border-primary-container transition-colors flex items-center justify-center bg-white/5 shrink-0">
              <img
                src="/logo-44.webp"
                alt="Alain Dave Tapiru SEO Specialist Philippines Logo"
                width="44"
                height="44"
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
              const currentPath = (pathname || '/').replace(/\/$/, '') || '/'
              const targetPath = (link.href || '/').replace(/\/$/, '') || '/'
              const isActive = currentPath === targetPath
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-heading text-xs uppercase tracking-wider px-3.5 py-2 rounded-full transition-colors duration-200 ${
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

          {/* CTA Button & Socials */}
          <div className="hidden md:flex items-center gap-4 relative z-[60]">
            <div className="flex items-center gap-3 mr-1 pr-5 border-r border-white/10">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" title="Gmail">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </a>
              <a href="https://www.facebook.com/dcrazedave" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
              </a>
              <a href="https://github.com/alndvtpr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" title="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <RssButton variant="icon" className="w-8 h-8 animate-brand-ripple" iconSize={15} />
            </div>
            <Link
              href="/contact/"
              className="bg-primary-container text-on-primary-container font-heading text-xs uppercase tracking-widest font-bold px-6 py-2.5 rounded-full animate-brand-ripple hover:bg-primary hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              Outrank Rivals
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>

          {/* Hamburger (Mobile & Tablet) */}
          <button
            className="lg:hidden text-on-surface z-[60] relative p-2.5 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} className="block" />
          </button>
        </div>
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
            const currentPath = (pathname || '/').replace(/\/$/, '') || '/'
            const targetPath = (link.href || '/').replace(/\/$/, '') || '/'
            const isActive = currentPath === targetPath
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
            href="/contact/"
            onClick={() => setMenuOpen(false)}
            className="mt-4 w-full text-center bg-primary-container text-on-primary-container font-heading text-sm uppercase tracking-widest font-bold px-8 py-3.5 rounded-full animate-brand-ripple hover:bg-primary transition-colors flex items-center justify-center gap-2"
          >
            <span>Outrank Rivals</span>
            <Icon name="arrow_forward" size={16} />
          </Link>
          
          {/* Mobile Menu Socials */}
          <div className="flex gap-4 mt-6">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" aria-label="Gmail">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
            <a href="https://www.facebook.com/dcrazedave" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
            <a href="https://github.com/alndvtpr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all animate-brand-ripple" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <RssButton variant="icon" className="w-12 h-12 animate-brand-ripple" iconSize={22} />
          </div>
        </nav>
      </div>
    </>
  )
}
