'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DesktopNav } from './DesktopNav'
import { MobileMenu } from './MobileMenu'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navContainerRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)

  const closeMobileMenu = () => {
    setMenuOpen(false)
    setMobileExpanded({})
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled((window.pageYOffset || document.documentElement.scrollTop || 0) > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is active
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

  // Clear mobile-only state when the layout crosses into the desktop navigation.
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1280px)')
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false)
        setMobileExpanded({})
      }
    }

    desktopQuery.addEventListener('change', handleDesktopChange)
    return () => desktopQuery.removeEventListener('change', handleDesktopChange)
  }, [])

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        if (menuOpen) {
          closeMobileMenu()
          window.requestAnimationFrame(() => menuButtonRef.current?.focus())
        }
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpenDropdown(name)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  const toggleMobileExpanded = (name: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 pointer-events-none flex flex-col"
        inert={menuOpen ? true : undefined}
        aria-hidden={menuOpen ? true : undefined}
      >
        {/* Row 1: Top Announcement Banner (Permanently pinned at top across all scroll depths) */}
        <div className="w-full pointer-events-auto">
          <AnnouncementBanner />
        </div>

        {/* Row 2: Navigation Bar (transforms into floating glass pill when scrolled) */}
        <div className={`w-full transition-[padding] duration-300 ${scrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3.5'}`}>
          <div
            ref={navContainerRef}
            className={`mx-auto flex items-center justify-between pointer-events-auto transition-[background-color,box-shadow,padding,border-color,border-radius,max-width,margin] duration-300 ${
              scrolled
                ? 'bg-surface-1/95 backdrop-blur-xl shadow-xl dark:shadow-2xl py-2 px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 rounded-2xl md:rounded-full max-w-7xl border border-black/10 dark:border-white/10 mx-3 md:mx-auto'
                : 'px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 max-w-7xl bg-transparent border-transparent'
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              onClick={() => {
                closeMobileMenu()
                setOpenDropdown(null)
              }}
              aria-label="Alain Dave Tapiru - Home"
              className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 group relative z-[60] shrink-0"
            >
              <div className="relative w-[34px] h-[32px] sm:w-[38px] sm:h-[36px] xl:w-[40px] xl:h-[38px] shrink-0 flex items-center justify-center overflow-hidden">
                <Image
                  src="/branding/alain-dave-tapiru-adt-logo.avif"
                  alt=""
                  width={40}
                  height={38}
                  className="w-full h-full object-contain transition-transform duration-200 ease-[var(--ease-organic)] motion-reduce:transform-none group-hover:scale-[1.02]"
                />
              </div>
              <span className="font-heading font-extrabold text-sm sm:text-base xl:text-lg text-on-surface tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
                Alain Dave <span className="text-primary-container">Tapiru</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <DesktopNav
              pathname={pathname}
              openDropdown={openDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onOpenDropdown={setOpenDropdown}
              onCloseDropdown={() => setOpenDropdown(null)}
            />

            {/* Social links, theme control and contact action */}
            <div className="hidden xl:flex items-center gap-2 relative z-[60] shrink-0">
              <div role="group" aria-label="Social links" className="flex items-center gap-1.5 pr-2 border-r border-black/10 dark:border-white/10">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex w-8 h-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  aria-label="Gmail"
                  title="Gmail"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" focusable="false" className="shrink-0"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </a>
                <a
                  href="https://www.facebook.com/dcrazedave"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex w-8 h-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" focusable="false" className="shrink-0"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex w-8 h-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true" focusable="false" className="shrink-0"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
                </a>
                <a
                  href="https://github.com/alndvtpr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex w-8 h-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" focusable="false" className="shrink-0"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
              </div>
              <ThemeToggle />
              <Link
                href="/contact/"
                aria-current={pathname?.startsWith('/contact') ? 'page' : undefined}
                className="bg-primary-container text-on-primary-container font-heading text-xs uppercase tracking-[0.06em] font-bold px-4 xl:px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:bg-primary btn-motion flex items-center gap-1.5 xl:gap-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              >
                <span>Get in Touch</span>
                <Icon name="arrow_forward" size={15} className="btn-icon" />
              </Link>
            </div>

            {/* Hamburger (Mobile & Tablet) */}
            <button
              ref={menuButtonRef}
              type="button"
              className="xl:hidden text-on-surface z-[60] relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              onClick={() => (menuOpen ? closeMobileMenu() : setMenuOpen(true))}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={24} className="block" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu: absent from the initial render and focus order */}
      <MobileMenu
        isOpen={menuOpen}
        pathname={pathname}
        mobileExpanded={mobileExpanded}
        onToggleExpanded={toggleMobileExpanded}
        onClose={closeMobileMenu}
        menuButtonRef={menuButtonRef}
      />
    </>
  )
}
