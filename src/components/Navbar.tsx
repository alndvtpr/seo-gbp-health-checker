'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
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
  {
    name: 'Services',
    href: '/services/',
    children: [
      {
        name: 'All Services & Packages',
        href: '/services/',
        description: 'Practical SEO, local visibility & web support',
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
        description: 'Structured data, entities & machine discoverability',
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
  { name: 'About', href: '/about/' },
  { name: 'Blog', href: '/blog/' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navContainerRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)

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
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false)
        setMobileExpanded({})
      }
    }

    desktopQuery.addEventListener('change', handleDesktopChange)
    return () => desktopQuery.removeEventListener('change', handleDesktopChange)
  }, [])

  // Move focus into the open mobile dialog and contain keyboard traversal.
  useEffect(() => {
    if (!menuOpen || !mobileMenuRef.current) return

    const menu = mobileMenuRef.current
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    firstMobileLinkRef.current?.focus()

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      const focusableItems = Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector))
      if (event.key !== 'Tab' || focusableItems.length === 0) return

      const firstItem = focusableItems[0]
      const lastItem = focusableItems[focusableItems.length - 1]

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    menu.addEventListener('keydown', handleMenuKeyDown)
    return () => menu.removeEventListener('keydown', handleMenuKeyDown)
  }, [menuOpen])

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        if (mobileMenuRef.current) {
          setMenuOpen(false)
          setMobileExpanded({})
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
                setMenuOpen(false)
                setOpenDropdown(null)
              }}
              aria-label="Alain Dave Tapiru - Home"
              className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 group relative z-[60] shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 overflow-hidden rounded-full border border-black/15 dark:border-white/20 group-hover:border-primary-container transition-colors flex items-center justify-center bg-black/5 dark:bg-white/5 shrink-0">
                <img
                  src="/logo-44.webp"
                  alt="Alain Dave Tapiru"
                  width="44"
                  height="44"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <span className="font-heading font-extrabold text-sm sm:text-base xl:text-lg text-on-surface tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
                Alain Dave <span className="text-primary-container">Tapiru</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-surface-2/90 dark:bg-surface-container-low/80 backdrop-blur-md px-2 xl:px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-xs">
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
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                        setOpenDropdown(null)
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      onFocus={() => hasChildren && setOpenDropdown(item.name)}
                      aria-current={isExactActive ? 'page' : undefined}
                      aria-haspopup={hasChildren ? 'menu' : undefined}
                      aria-expanded={hasChildren ? isDropdownOpen : undefined}
                      className={`font-heading text-[12px] xl:text-[13px] uppercase tracking-[0.03em] xl:tracking-[0.04em] px-2.5 xl:px-3 py-1.5 rounded-full transition-colors duration-200 nav-link-animated inline-flex items-center gap-0.5 xl:gap-1 ${
                        isActive
                          ? 'text-primary-container bg-primary-container/15 font-bold is-active shadow-xs'
                          : 'text-on-surface/85 hover:text-primary-container hover:bg-black/5 dark:hover:bg-white/5 font-semibold'
                      }`}
                    >
                      <span>{item.name}</span>
                      {hasChildren && (
                        <Icon
                          name="expand_more"
                          size={14}
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

            {/* Theme control and contact action */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3.5 relative z-[60] shrink-0">
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
              className="lg:hidden text-on-surface z-[60] relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
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
      {menuOpen && <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
        className="fixed inset-0 bg-background/98 dark:bg-[#0c0f0f]/98 z-[55] flex flex-col justify-center items-center lg:hidden opacity-100 pointer-events-auto translate-y-0 mobile-menu-active"
        style={{
          paddingTop: 'max(2rem, env(safe-area-inset-top, 2rem))',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))',
        }}
      >
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <button
          type="button"
          onClick={() => {
            closeMobileMenu()
            window.requestAnimationFrame(() => menuButtonRef.current?.focus())
          }}
          aria-label="Close navigation menu"
          className="absolute top-4 right-4 z-20 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl bg-surface-1 border border-black/10 dark:border-white/10 text-on-surface hover:text-primary-container"
        >
          <Icon name="close" size={24} />
        </button>

        <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-2 text-center z-10 w-full px-5 max-w-sm max-h-[calc(100dvh-120px)] overflow-y-auto">
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
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={isExactActive ? 'page' : undefined}
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
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={isExactActive ? 'page' : undefined}
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
                        onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
            aria-current={pathname?.startsWith('/contact') ? 'page' : undefined}
            style={{ transitionDelay: `${NAV_ITEMS.length * 25}ms` }}
            className="mobile-nav-item mt-2 w-full text-center bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm uppercase tracking-[0.06em] font-bold px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:bg-primary btn-motion flex items-center justify-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Get in Touch</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          {/* Secondary resources remain available without crowding primary navigation. */}
          <div
            role="group"
            aria-label="Secondary resources"
            style={{ transitionDelay: `${(NAV_ITEMS.length + 1) * 25}ms` }}
            className="mobile-nav-item flex gap-3 mt-4 items-center justify-center flex-wrap"
          >
            <Link href="/resume/" onClick={closeMobileMenu} className="min-h-[44px] inline-flex items-center px-3 text-sm font-heading font-semibold text-on-surface/80 hover:text-primary-container">
              Resume
            </Link>
            <Link href="/tools/" onClick={closeMobileMenu} className="min-h-[44px] inline-flex items-center px-3 text-sm font-heading font-semibold text-on-surface/80 hover:text-primary-container">
              Tools
            </Link>
            <ThemeToggle className="w-11 h-11 min-w-[44px] min-h-[44px]" />
          </div>
        </nav>
      </div>
      }
    </>
  )
}
