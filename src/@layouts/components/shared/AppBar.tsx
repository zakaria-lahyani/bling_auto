'use client'

import { Bell, Search, User, Menu, Sun, Moon, Settings } from 'lucide-react'
import { useSettings } from '@core/hooks/useSettings'
import { AuthService } from '@/lib/auth'
import { cn } from '@core/utils'

interface AppBarProps {
  isFixed?: boolean
  onMenuToggle?: () => void
}

const AppBar = ({ isFixed = false, onMenuToggle }: AppBarProps) => {
  const { settings, updateSettings } = useSettings()
  const user = AuthService.getCurrentUser()

  const toggleTheme = () => {
    const newMode = settings.mode === 'light' ? 'dark' : 'light'
    updateSettings({ mode: newMode })
  }

  return (
    <header className={cn(
      'h-16 bg-surface border-b border-border flex items-center px-6 z-30',
      isFixed && 'fixed top-0 right-0 left-0'
    )}>
      <div className="flex items-center justify-between w-full">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-surface-muted transition-colors lg:hidden"
            >
              <Menu size={20} />
            </button>
          )}
          
          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-surface-muted border border-border rounded-lg text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface-muted transition-colors"
          >
            {settings.mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-surface-muted transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-surface-muted transition-colors">
            <Settings size={20} />
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-content-primary">
                {user?.name || 'Guest User'}
              </div>
              <div className="text-xs text-content-muted">
                {user?.role || 'Visitor'}
              </div>
            </div>
            
            <button className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
              <User size={20} className="text-brand-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppBar