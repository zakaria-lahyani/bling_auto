/**
 * DashboardHeader Component
 * 
 * Header specifically designed for dashboard and authenticated pages.
 * Built on BaseHeader with dashboard-specific navigation and actions.
 * 
 * Features:
 * - Search functionality
 * - User menu with profile and settings
 * - Notifications bell
 * - Theme toggle
 * - Mobile menu toggle for sidebar
 */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Bell, Settings, User, Sun, Moon, Menu, LogOut, UserCircle } from 'lucide-react'
import { BaseHeader } from '../base'
import { AuthService } from '@/infrastructure/auth/auth'
import { useSettings } from '@/shared/hooks/useSettings'
import { cn } from '@/shared/utils'

export interface DashboardHeaderProps {
  /** Mobile menu toggle handler */
  onMobileMenuToggle?: () => void
  
  /** Search handler */
  onSearch?: (query: string) => void
  
  /** Search placeholder text */
  searchPlaceholder?: string
  
  /** Whether to show search bar */
  showSearch?: boolean
  
  /** Whether to show notifications */
  showNotifications?: boolean
  
  /** Whether to show theme toggle */
  showThemeToggle?: boolean
  
  /** Custom logo component */
  customLogo?: React.ReactNode
  
  /** Additional CSS classes */
  className?: string
  
  /** Notification count */
  notificationCount?: number
}

export function DashboardHeader({
  onMobileMenuToggle,
  onSearch,
  searchPlaceholder = 'Search...',
  showSearch = true,
  showNotifications = true,
  showThemeToggle = true,
  customLogo,
  className,
  notificationCount = 0
}: DashboardHeaderProps) {
  const [user, setUser] = useState<ReturnType<typeof AuthService.getCurrentUser>>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { settings, updateSettings } = useSettings()

  useEffect(() => {
    setUser(AuthService.getCurrentUser())
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim())
    }
  }

  const handleThemeToggle = () => {
    const newMode = settings.mode === 'light' ? 'dark' : 'light'
    updateSettings({ mode: newMode })
  }

  const handleLogout = async () => {
    await AuthService.logout()
    window.location.href = '/auth/login'
  }

  // Logo Component
  const Logo = customLogo || (
    <Link href="/dashboard" className="flex items-center gap-2 group">
      <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:bg-brand-600 transition-colors">
        <span className="text-white font-bold text-sm">CP</span>
      </div>
      <span className="hidden lg:block text-lg font-semibold text-content-primary">
        CarWash Pro
      </span>
    </Link>
  )

  // Search Component
  const SearchBar = showSearch && (
    <form onSubmit={handleSearch} className="relative max-w-md w-full">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full pl-10 pr-4 py-2 bg-surface-muted border border-border rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:bg-surface"
      />
    </form>
  )

  // Dashboard Actions
  const DashboardActions = (
    <div className="flex items-center gap-3">
      
      {/* Theme Toggle */}
      {showThemeToggle && (
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-lg hover:bg-surface-muted transition-colors"
          aria-label="Toggle theme"
        >
          {settings.mode === 'dark' ? (
            <Sun size={20} className="text-content-secondary" />
          ) : (
            <Moon size={20} className="text-content-secondary" />
          )}
        </button>
      )}

      {/* Notifications */}
      {showNotifications && (
        <button className="relative p-2 rounded-lg hover:bg-surface-muted transition-colors">
          <Bell size={20} className="text-content-secondary" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
      )}

      {/* Settings */}
      <Link
        href="/dashboard/settings"
        className="p-2 rounded-lg hover:bg-surface-muted transition-colors"
      >
        <Settings size={20} className="text-content-secondary" />
      </Link>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-muted transition-colors"
        >
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-content-primary">
              {user?.name || 'Guest User'}
            </div>
            <div className="text-xs text-content-muted">
              {user?.role || 'Visitor'}
            </div>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name || 'User'} 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User size={16} className="text-brand-600" />
            )}
          </div>
        </button>

        {/* User Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-50">
            <div className="py-2">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-muted transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <UserCircle size={16} />
                View Profile
              </Link>
              
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-muted transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings size={16} />
                Settings
              </Link>
              
              <hr className="my-2 border-border" />
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      {onMobileMenuToggle && (
        <button
          onClick={onMobileMenuToggle}
          className="p-2 rounded-lg hover:bg-surface-muted transition-colors lg:hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu size={20} className="text-content-secondary" />
        </button>
      )}
    </div>
  )

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showUserMenu && !target.closest('[data-user-menu]')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showUserMenu])

  return (
    <BaseHeader
      logo={Logo}
      navigation={SearchBar}
      actions={
        <div data-user-menu>
          {DashboardActions}
        </div>
      }
      variant="default"
      className={cn('dashboard-header', className)}
    />
  )
}

export default DashboardHeader