'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { RssButton } from '@/components/RssButton'
import { ThemeToggle } from '@/components/ThemeToggle'

interface NavChildItem {
  name: string
  href: string
  description?: string
  badge?: string
}

interface NavItem {
  name: string
  href: string
  children?: NavChildItem[]
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  {
    name: 'Projects',
    href: '/projects/',
    children: [
      {
        name: 'All Projects & Case Studies',
        href: '/projects/',
        description: 'Complete directory of practical builds & breakdowns',
      },
      {
        name: 'AngatSikat Studio',
        href: '/projects/angat-sikat-studio/',
        description: 'Custom WordPress theme & SEO architecture',
        badge: 'WordPress',
      },
      {
        name: 'Local SEO & GBP Checker',
        href: '/projects/local-seo-gbp-checker/',
        description: 'Interactive signal diagnostic tool & analyzer',
        badge: 'Local SEO',
      },
      {
        name: 'AlainTapiru.com Architecture',
        href: '/projects/alaintapiru-portfolio/',
        description: 'Next.js 15 portfolio & technical SEO build',
        badge: 'Technical SEO',
      },
    ],
  },
  {
    name: 'Services',
    href: '/services/',
    children: [
      {
        name: 'All Services & Packages',
        href: '/services/',
        description: 'Full service roadmap, process & deliverables',
      },
      {
        name: 'Technical SEO',
        href: '/services/technical-seo/',
        description: 'Crawlability, Core Web Vitals & schema architecture',
        badge: 'Technical',
      },
      {
        name: 'On-Page SEO',
        href: '/services/on-page-seo/',
        description: 'Search intent mapping, headings & metadata CTR',
      },
      {
        name: 'Local SEO & GBP',
        href: '/services/local-seo/',
        description: 'Google Maps presence & 10-point signal diagnostics',
        badge: 'Local',
      },
      {
        name: 'AI Search (AEO & GEO)',
        href: '/services/ai-search-optimization/',
        description: 'Machine discoverability, entities & direct answers',
        badge: 'AI Search',
      },
      {
        name: 'Web Development',
        href: '/services/web-development/',
        description: 'Next.js 15 & custom WordPress theme builds',
        badge: 'Next.js / WP',
      },
    ],
  },
  {
    name: 'Tools',
    href: '/tools/',
    children: [
      {
        name: 'All Tools & Resources',
        href: '/tools/',
        description: 'Free interactive diagnostics & calculator suite',
      },
      {
        name: 'GBP Health Checker',
        href: '/tools/#gbp-checker',
        description: '10-point Google Business Profile signal audit',
        badge: 'Interactive',
      },
      {
        name: 'SEO Website Audit Request',
        href: '/tools/#website-audit',
        description: 'Speed, security & crawlability health check',
      },
      {
        name: 'SEO Salary Calculator',
        href: '/tools/#salary-calculator',
        description: 'Philippine & offshore compensation estimator',
      },
    ],
  },
  { name: 'Blog', href: '/blog/' },
  { name: 'Contact', href: '/contact/' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navContainerRef = useRef<HTMLDivElement | null>(null)

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

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
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
  }, [])

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
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex flex-col">
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
                ? 'bg-surface-1/95 backdrop-blur-xl shadow-xl dark:shadow-2xl py-2 px-5 md:py-2.5 md:px-8 lg:px-10 rounded-2xl md:rounded-full max-w-6xl border border-black/10 dark:border-white/10 mx-3 md:mx-auto'
                : 'px-4 md:px-12 max-w-7xl bg-transparent border-transparent'
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              onClick={() => {
                setMenuOpen(false)
                setOpenDropdown(null)
              }}
              aria-label="Alain Dave Tapiru - Home"
              className="flex items-center gap-2.5 sm:gap-3 group relative z-[60]"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 overflow-hidden rounded-full border border-black/15 dark:border-white/20 group-hover:border-primary-container transition-colors flex items-center justify-center bg-black/5 dark:bg-white/5 shrink-0">
                <img
                  src="/logo-44.webp"
                  alt="Alain Dave Tapiru"
                  width="44"
                  height="44"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <span className="font-heading font-extrabold text-base sm:text-lg md:text-xl text-on-surface tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
                Alain Dave <span className="text-primary-container">Tapiru</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 bg-surface-2/90 dark:bg-surface-container-low/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-xs">
              {NAV_ITEMS.map((item) => {
                const currentPath = (pathname || '/').replace(/\/$/, '') || '/'
                const targetPath = (item.href || '/').replace(/\/$/, '') || '/'
                const isExactActive = currentPath === targetPath
                const isChildActive = Boolean(
                  item.href !== '/' && currentPath.startsWith(targetPath)
                )
                const isActive = isExactActive || isChildActive
                const hasChildren = Boolean(item.children && item.children.length > 0)
                const isDropdownOpen = openDropdown === item.name

                return (
                  <div
                    key={item.name}
                    className="relative group/navitem"
                    onMouseEnter={() => hasChildren && handleMouseEnter(item.name)}
                    onMouseLeave={() => hasChildren && handleMouseLeave()}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      onFocus={() => hasChildren && setOpenDropdown(item.name)}
                      aria-haspopup={hasChildren ? 'menu' : undefined}
                      aria-expanded={hasChildren ? isDropdownOpen : undefined}
                      className={`font-heading text-[13px] uppercase tracking-[0.04em] px-3 py-1.5 rounded-full transition-colors duration-200 nav-link-animated inline-flex items-center gap-1 ${
                        isActive
                          ? 'text-primary-container bg-primary-container/15 font-bold is-active shadow-xs'
                          : 'text-on-surface/85 hover:text-primary-container hover:bg-black/5 dark:hover:bg-white/5 font-semibold'
                      }`}
                    >
                      <span>{item.name}</span>
                      {hasChildren && (
                        <Icon
                          name="expand_more"
                          size={15}
                          className={`transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180 text-primary-container' : 'opacity-70'
                          }`}
                        />
                      )}
                    </Link>

                    {/* Desktop Dropdown Popover */}
                    {hasChildren && item.children && (
                      <div
                        role="menu"
                        aria-label={`${item.name} submenu`}
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[80] transition-all duration-200 ease-[var(--ease-organic)] ${
                          isDropdownOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                            : 'opacity-0 translate-y-2 pointer-events-none invisible'
                        }`}
                      >
                        {/* Clean Text-First Container with high-contrast dark mode surface */}
                        <div className="w-[260px] sm:w-[280px] p-1.5 rounded-2xl bg-white dark:bg-[#1a1c1d] border border-black/10 dark:border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] space-y-0.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className="flex flex-col px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors group/child text-left"
                            >
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-heading text-[13px] font-bold text-neutral-900 dark:text-neutral-100 group-hover/child:text-primary-container transition-colors truncate">
                                  {child.name}
                                </span>
                                {child.badge && (
                                  <span className="font-heading text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-primary-container/15 text-primary-container border border-primary-container/30 font-bold shrink-0">
                                    {child.badge}
                                  </span>
                                )}
                              </div>
                              {child.description && (
                                <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-tight mt-0.5 line-clamp-1">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* CTA Button & Socials */}
            <div className="hidden lg:flex items-center gap-4 relative z-[60]">
              <div className="flex items-center gap-2.5 mr-1 pr-4 border-r border-black/10 dark:border-white/10">
                <ThemeToggle />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_15px_rgba(230,126,34,0.3)]"
                  title="Gmail"
                  aria-label="Gmail"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true" focusable="false" className="shrink-0"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </a>
                <a
                  href="https://www.facebook.com/dcrazedave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_15px_rgba(230,126,34,0.3)]"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true" focusable="false" className="shrink-0"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_15px_rgba(230,126,34,0.3)]"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" focusable="false" className="shrink-0"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
                </a>
                <a
                  href="https://github.com/alndvtpr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_15px_rgba(230,126,34,0.3)]"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true" focusable="false" className="shrink-0"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <RssButton variant="icon" className="w-8 h-8 bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary hover:text-white transition-all shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_15px_rgba(230,126,34,0.3)]" iconSize={14} />
              </div>
              <Link
                href="/contact/"
                className="bg-primary-container text-on-primary-container font-heading text-xs uppercase tracking-[0.06em] font-bold px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:bg-primary btn-motion flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              >
                Get in Touch
                <Icon name="arrow_forward" size={16} className="btn-icon" />
              </Link>
            </div>

            {/* Hamburger (Mobile & Tablet) */}
            <button
              className="lg:hidden text-on-surface z-[60] relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
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
        className={`fixed inset-0 bg-background/98 dark:bg-[#0c0f0f]/98 z-[55] flex flex-col justify-center items-center lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0 mobile-menu-active' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        style={{
          paddingTop: 'max(2rem, env(safe-area-inset-top, 2rem))',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))',
        }}
      >
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

        <nav className="flex flex-col items-center gap-2 text-center z-10 w-full px-5 max-w-sm max-h-[calc(100dvh-120px)] overflow-y-auto">
          {NAV_ITEMS.map((item, idx) => {
            const currentPath = (pathname || '/').replace(/\/$/, '') || '/'
            const targetPath = (item.href || '/').replace(/\/$/, '') || '/'
            const isExactActive = currentPath === targetPath
            const isChildActive = Boolean(
              item.href !== '/' && currentPath.startsWith(targetPath)
            )
            const isActive = isExactActive || isChildActive
            const hasChildren = Boolean(item.children && item.children.length > 0)
            const isExpanded = Boolean(mobileExpanded[item.name])

            if (!hasChildren) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: `${idx * 25}ms` }}
                  className={`mobile-nav-item font-heading text-lg sm:text-xl font-bold uppercase tracking-[0.06em] transition-colors py-2 px-4 rounded-full min-h-[44px] flex items-center justify-center w-full ${
                    isActive
                      ? 'text-primary-container bg-primary-container/10 border border-primary-container/30'
                      : 'text-on-surface hover:text-primary-container hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              )
            }

            return (
              <div
                key={item.name}
                style={{ transitionDelay: `${idx * 25}ms` }}
                className="mobile-nav-item w-full flex flex-col items-center"
              >
                <div
                  className={`w-full flex items-center justify-between gap-2 py-1 px-3.5 rounded-2xl min-h-[44px] transition-colors ${
                    isActive
                      ? 'bg-primary-container/10 border border-primary-container/30'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-heading text-lg sm:text-xl font-bold uppercase tracking-[0.06em] transition-colors flex-1 text-left ${
                      isActive ? 'text-primary-container' : 'text-on-surface hover:text-primary-container'
                    }`}
                  >
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileExpanded(item.name)}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle ${item.name} submenu`}
                    aria-controls={`mobile-submenu-${item.name}`}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-on-surface hover:text-primary-container transition-colors shrink-0"
                  >
                    <Icon
                      name="expand_more"
                      size={20}
                      className={`transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-primary-container' : 'opacity-75'
                      }`}
                    />
                  </button>
                </div>

                {/* Mobile Accordion Children (Clean Text-First) */}
                {isExpanded && item.children && (
                  <div
                    id={`mobile-submenu-${item.name}`}
                    className="w-full bg-neutral-100/90 dark:bg-[#1a1c1d] border border-black/10 dark:border-white/15 rounded-2xl p-1.5 mt-1 mb-1 space-y-0.5 text-left shadow-md"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors min-h-[44px] justify-center"
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="font-heading text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                            {child.name}
                          </span>
                          {child.badge && (
                            <span className="font-heading text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary-container/15 text-primary-container border border-primary-container/30 font-bold shrink-0">
                              {child.badge}
                            </span>
                          )}
                        </div>
                        {child.description && (
                          <span className="font-sans text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 block truncate leading-tight mt-0.5">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <Link
            href="/contact/"
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: `${NAV_ITEMS.length * 25}ms` }}
            className="mobile-nav-item mt-2 w-full text-center bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm uppercase tracking-[0.06em] font-bold px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:bg-primary btn-motion flex items-center justify-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Get in Touch</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          {/* Mobile Menu Socials & Theme Toggle */}
          <div
            style={{ transitionDelay: `${(NAV_ITEMS.length + 1) * 25}ms` }}
            className="mobile-nav-item flex gap-3 sm:gap-4 mt-4 items-center justify-center flex-wrap"
          >
            <ThemeToggle className="w-11 h-11 min-w-[44px] min-h-[44px]" />
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_12px_rgba(230,126,34,0.15)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="Gmail"
              title="Gmail"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false" className="shrink-0"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
            <a
              href="https://www.facebook.com/dcrazedave"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_12px_rgba(230,126,34,0.15)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false" className="shrink-0"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_12px_rgba(230,126,34,0.15)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false" className="shrink-0"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
            <a
              href="https://github.com/alndvtpr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[0_0_12px_rgba(230,126,34,0.15)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false" className="shrink-0"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <RssButton
              variant="icon"
              className="w-11 h-11 min-w-[44px] min-h-[44px] bg-white/5 dark:bg-white/5 bg-black/5 border border-primary-container/30 text-primary-container hover:bg-primary hover:text-white transition-all shadow-[0_0_12px_rgba(230,126,34,0.15)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              iconSize={20}
            />
          </div>
        </nav>
      </div>
    </>
  )
}
