'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from '@/components/icons'

export interface TocItem {
  id: string
  title: string
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '')
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Scroll spy via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    // Scroll progress calculation
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items])

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveId(id)
      setIsOpen(false)
    }
  }

  if (!items || items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className={`space-y-4 ${className}`}
    >
      {/* Mobile Collapsible TOC Toggle */}
      <div className="lg:hidden rounded-2xl bg-surface-1/90 border border-black/10 dark:border-white/10 p-4 shadow-lg">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-table-of-contents"
          className="w-full flex items-center justify-between font-heading text-xs font-bold uppercase tracking-[0.08em] text-on-surface hover:text-primary-container transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span>Table of Contents ({items.length} Sections)</span>
          </div>
          <Icon
            name="chevron_right"
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-90 text-primary-container' : 'text-on-surface/50'}`}
          />
        </button>

        {isOpen && (
          <ul id="mobile-table-of-contents" className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 space-y-2.5 font-sans text-xs">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToHeading(e, item.id)}
                  className={`block py-1 transition-colors leading-relaxed ${
                    activeId === item.id
                      ? 'text-primary-container font-semibold pl-2 border-l-2 border-primary-container'
                      : 'text-on-surface/75 hover:text-white pl-2'
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Sticky Table of Contents Card */}
      <div className="hidden lg:block sticky top-32 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-black/10 dark:border-white/10 p-6 shadow-xl space-y-4">
        {/* Reading Progress Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-on-surface/70">
            <span className="flex items-center gap-1.5 text-primary-container">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              Table of Contents
            </span>
            <span className="font-mono text-[10px] text-on-surface/50">
              {Math.round(scrollProgress)}%
            </span>
          </div>
          <div className="w-full h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-container to-primary transition-all duration-150 ease-out rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Links List */}
        <ul className="space-y-3 font-sans text-xs pt-2 border-l border-black/10 dark:border-white/10">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToHeading(e, item.id)}
                  className={`block py-1 pl-4 transition-all duration-200 leading-snug ${
                    isActive
                      ? 'text-primary-container font-semibold -ml-[1px] border-l-2 border-primary-container translate-x-1'
                      : 'text-on-surface/75 hover:text-white hover:translate-x-0.5'
                  }`}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Quick Share / Back to Top CTA */}
        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-sans text-on-surface/60">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-primary-container transition-colors flex items-center gap-1 cursor-pointer font-heading uppercase tracking-wider font-semibold text-[10px]"
          >
            <span>↑ Back to Top</span>
          </button>
          <span className="text-[10px] text-on-surface/40">Verified Guide</span>
        </div>
      </div>
    </nav>
  )
}

export default TableOfContents
