'use client'

import React from 'react'
import { useTheme } from '@/components/ThemeProvider'

export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle Day and Dark Mode"
        className={`w-8 h-8 rounded-full bg-white/5 border border-primary-container/30 text-primary-container flex items-center justify-center transition-all ${className}`}
      >
        <span className="w-3.5 h-3.5 block rounded-full bg-primary-container/40" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Day Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Day Mode' : 'Switch to Dark Mode'}
      className={`icon-control w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_15px_rgba(230,126,34,0.3)] btn-motion cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container shrink-0 ${className}`}
    >
      {isDark ? (
        // Sun icon for switching to Day Mode
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="15"
          height="15"
          aria-hidden="true"
          focusable="false"
          className="shrink-0 transition-transform duration-300 hover:rotate-45"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="1" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon for switching to Dark Mode
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="15"
          height="15"
          aria-hidden="true"
          focusable="false"
          className="shrink-0 transition-transform duration-300 hover:-rotate-12"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
