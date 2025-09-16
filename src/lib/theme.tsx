'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'car-wash-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    // Load theme from localStorage on mount
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored && (stored === 'light' || stored === 'dark')) {
        setTheme(stored)
      }
    } catch (error) {
      // localStorage not available or error reading
      console.warn('Failed to load theme from localStorage:', error)
    }
  }, [storageKey])

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    // Store theme in localStorage
    try {
      localStorage.setItem(storageKey, theme)
    } catch (error) {
      // localStorage not available or error writing
      console.warn('Failed to save theme to localStorage:', error)
    }
  }, [theme, storageKey])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}