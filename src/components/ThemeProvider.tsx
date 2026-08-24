'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme)
        applyTheme(savedTheme)
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const initialTheme: Theme = prefersDark ? 'dark' : 'dark' // Default dark
        setThemeState(initialTheme)
        applyTheme(initialTheme)
      }
    } catch {
      // Fallback to dark
      applyTheme('dark')
    }
    setMounted(true)
  }, [])

  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    if (t === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
      root.setAttribute('data-theme', 'light')
      root.style.backgroundColor = '#fafaf8'
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      root.style.backgroundColor = '#0f1111'
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch {
      // Ignore storage errors
    }
  }

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}
