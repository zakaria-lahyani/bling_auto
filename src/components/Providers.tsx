'use client'

import { ReactNode } from 'react'
import { SettingsProvider } from '@core/contexts/settingsContext'
import type { Settings } from '@core/types'

interface ProvidersProps {
  children: ReactNode
  settings?: Settings | null
  systemMode?: 'light' | 'dark' | 'system'
}

export default function Providers({ children, settings, systemMode = 'light' }: ProvidersProps) {
  return (
    <SettingsProvider settingsCookie={settings || null} mode={systemMode}>
      {children}
    </SettingsProvider>
  )
}