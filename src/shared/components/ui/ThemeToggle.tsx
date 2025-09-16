'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import Button from './Button'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      {theme === 'light' ? (
        <Moon size={16} className="text-slate-700 dark:text-slate-300" />
      ) : (
        <Sun size={16} className="text-slate-700 dark:text-slate-300" />
      )}
    </Button>
  )
}