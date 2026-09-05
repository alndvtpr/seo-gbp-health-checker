import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { SITE_NAV_ITEMS } from '@/config/site'

interface DesktopNavProps {
  pathname: string | null
  openDropdown: string | null
  onMouseEnter: (name: string) => void
  onMouseLeave: () => void
  onOpenDropdown: (name: string) => void
  onCloseDropdown: () => void
}

export const DesktopNav = ({
  pathname,
  openDropdown,
  onMouseEnter,
  onMouseLeave,
  onOpenDropdown,
  onCloseDropdown,
}: DesktopNavProps) => {
  return (
    <>
            {/* Desktop Nav */}
            <nav
        aria-label="Primary navigation"
      className="hidden xl:flex items-center gap-0.5 bg-surface-2/90 dark:bg-surface-container-low/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-xs"
    >
      {SITE_NAV_ITEMS.map((item) => {
        const currentPath = (pathname || '/').replace(/\/$/, '') || '/'
        const targetPath = (item.href || '/').replace(/\/$/, '') || '/'
        const isExactActive = currentPath === targetPath
        const isChildActive = Boolean(
          item.href !== '/' && currentPath.startsWith(targetPath)
        )
        const isActive = isExactActive || isChildActive
        const hasChildren = Boolean('children' in item && item.children.length > 0)
        const isDropdownOpen = openDropdown === item.name

        return (
          <div
            key={item.name}
            className="relative group/navitem"
            onMouseEnter={() => hasChildren && onMouseEnter(item.name)}
            onMouseLeave={() => hasChildren && onMouseLeave()}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                onCloseDropdown()
              }
            }}
          >
            <Link
              href={item.href}
              onClick={onCloseDropdown}
              onFocus={() => hasChildren && onOpenDropdown(item.name)}
              aria-current={isExactActive ? 'page' : undefined}
              aria-expanded={hasChildren ? isDropdownOpen : undefined}
              aria-controls={hasChildren ? `desktop-submenu-${item.name}` : undefined}
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
            {'children' in item && item.children && (
              <div
                id={`desktop-submenu-${item.name}`}
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
                      onClick={onCloseDropdown}
                      className="flex flex-col px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors group/child text-left"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-heading text-[13px] font-bold text-neutral-900 dark:text-neutral-100 group-hover/child:text-primary-container transition-colors truncate">
                          {child.name}
                        </span>
                        {'badge' in child && child.badge && (
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
      </nav>
    </>
  )
}
