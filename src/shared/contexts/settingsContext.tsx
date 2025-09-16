/**
 * Settings Context - Global application settings management
 * 
 * This context provides centralized settings management for the entire application,
 * including theme preferences, layout configuration, and UI appearance settings.
 * 
 * Features:
 * - Theme mode (light/dark/system)
 * - Layout configuration (vertical/horizontal)
 * - Content width and appearance
 * - Persistent storage via cookies
 * - System theme detection
 * 
 * Usage:
 * ```tsx
 * const { settings, updateSettings } = useSettings()
 * updateSettings({ mode: 'dark' })
 * ```
 */
'use client'

import { createContext, useState, useEffect, useMemo, ReactNode } from 'react'
import type { Settings, Mode, SystemMode, Skin, Layout, ContentWidth } from '@/shared/types'

/**
 * Context value type definition
 * Provides methods and state for settings management
 */
export type SettingsContextValue = {
  /** Current application settings */
  settings: Settings
  /** Update specific settings */
  updateSettings: (settings: Partial<Settings>) => void
  /** Flag indicating if settings have been modified from defaults */
  isSettingsChanged: boolean
  /** Reset all settings to defaults */
  resetSettings: () => void
}

/**
 * Props for the SettingsProvider component
 */
type SettingsProviderProps = {
  /** Child components */
  children: ReactNode
  /** Settings loaded from server-side cookie */
  settingsCookie: Settings | null
  /** System color scheme preference */
  mode?: SystemMode
}

/**
 * Default application settings
 * These are the fallback values when no user preferences are stored
 */
const initialSettings: Settings = {
  mode: 'light',              // Theme mode: light/dark/system
  skin: 'default',            // UI skin variation
  layout: 'vertical',         // Navigation layout: vertical/horizontal
  appBar: {
    type: 'fixed',            // AppBar type: fixed/static
    contentWidth: 'wide'      // Content width: wide/boxed
  },
  footer: {
    type: 'static',           // Footer type: static/sticky
    contentWidth: 'wide'      // Footer content width
  },
  navbarContentWidth: 'wide', // Navigation content width
  contentWidth: 'wide',       // Main content width
  primaryColor: '#14b8a6'     // Brand color (Teal for car wash theme)
}

/**
 * Settings Context - provides settings state and methods to all child components
 * Default values are used when no provider is present (should never happen)
 */
export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  updateSettings: () => {},
  isSettingsChanged: false,
  resetSettings: () => {}
})

/**
 * Settings Provider Component
 * 
 * Manages application settings state and provides methods to update them.
 * Settings are persisted in cookies and synchronized across browser tabs.
 * 
 * @param children - Child components that need access to settings
 * @param settingsCookie - Settings loaded from server-side cookie
 * @param mode - System color scheme preference
 */
export const SettingsProvider = ({ children, settingsCookie, mode = 'light' }: SettingsProviderProps) => {
  // Initialize settings from cookie or defaults
  const initialSettingsState = settingsCookie || initialSettings
  
  // Settings state with mode override from system preference
  const [settings, setSettings] = useState<Settings>({
    ...initialSettingsState,
    mode: mode || initialSettingsState.mode
  })
  
  // Track if user has modified settings from defaults
  const [isSettingsChanged, setIsSettingsChanged] = useState(false)

  // Update settings and save to cookie
  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    setIsSettingsChanged(true)
    
    // Save to cookie
    if (typeof window !== 'undefined') {
      document.cookie = `settings=${JSON.stringify(updatedSettings)}; path=/; max-age=${60 * 60 * 24 * 30}` // 30 days
    }
  }

  // Reset to initial settings
  const resetSettings = () => {
    setSettings(initialSettings)
    setIsSettingsChanged(false)
    
    // Clear cookie
    if (typeof window !== 'undefined') {
      document.cookie = 'settings=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }

  // Detect system color scheme changes
  useEffect(() => {
    if (settings.mode === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        updateSettings({ mode: 'system' })
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [settings.mode])

  const contextValue = useMemo(
    () => ({
      settings,
      updateSettings,
      isSettingsChanged,
      resetSettings
    }),
    [settings, isSettingsChanged]
  )

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}