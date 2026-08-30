'use client'

import React, { createContext, useContext, useLayoutEffect, useSyncExternalStore } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
})

const PRIMARY_THEME_KEY = 'alaintapiru_theme'
const LEGACY_THEME_KEY = 'theme'
const THEME_CHANGE_EVENT = 'alaintapiru-theme-change'

const getThemeSnapshot = (): Theme => {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

const getServerThemeSnapshot = (): Theme => 'light'

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  const isDark = theme === 'dark'
  const oppositeTheme = isDark ? 'light' : 'dark'
  const themeColor = isDark ? '#0f1111' : '#fafaf8'

  root.classList.remove(oppositeTheme)
  root.classList.add(theme)
  root.setAttribute('data-theme', theme)
  root.style.backgroundColor = themeColor
  root.style.colorScheme = theme

  const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  themeColorMeta?.setAttribute('content', themeColor)
}

const subscribeToTheme = (onStoreChange: () => void) => {
  const handleThemeChange = () => onStoreChange()
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== PRIMARY_THEME_KEY && event.key !== LEGACY_THEME_KEY) return

    const nextTheme = event.newValue === 'dark' ? 'dark' : 'light'
    applyTheme(nextTheme)
    onStoreChange()
  }

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
    window.removeEventListener('storage', handleStorage)
  }
}

const subscribeToMount = () => () => {}

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot)
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false)

  useLayoutEffect(() => {
    let savedTheme: string | null = null
    try {
      savedTheme = localStorage.getItem(PRIMARY_THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY)
    } catch {
      // Keep the light-first fallback when storage is unavailable.
    }

    applyTheme(savedTheme === 'dark' ? 'dark' : 'light')
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }, [])

  const setTheme = (newTheme: Theme) => {
    applyTheme(newTheme)
    try {
      localStorage.setItem(PRIMARY_THEME_KEY, newTheme)
      localStorage.setItem(LEGACY_THEME_KEY, newTheme)
    } catch {
      // Ignore storage errors
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
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
