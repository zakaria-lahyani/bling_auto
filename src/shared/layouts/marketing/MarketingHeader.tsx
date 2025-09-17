/**
 * MarketingHeader Component
 * 
 * Header specifically designed for marketing and public pages.
 * Built on BaseHeader with marketing-specific navigation and actions.
 * 
 * Features:
 * - Company branding and logo
 * - Marketing navigation menu
 * - Authentication CTAs
 * - Responsive mobile menu
 */
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Car, ArrowRight } from 'lucide-react'
import { BaseHeader } from '../base'
import { AuthService } from '@/infrastructure/auth/auth'
import { cn } from '@/shared/utils'

export interface MarketingHeaderProps {
  /** Custom navigation items */
  navigationItems?: Array<{
    name: string
    href: string
  }>
  
  /** Whether to show authentication buttons */
  showAuth?: boolean
  
  /** Custom logo component */
  customLogo?: React.ReactNode
  
  /** Header variant */
  variant?: 'default' | 'transparent' | 'elevated'
  
  /** Additional CSS classes */
  className?: string
}

const defaultNavigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

export function MarketingHeader({
  navigationItems = defaultNavigationItems,
  showAuth = true,
  customLogo,
  variant = 'default',
  className
}: MarketingHeaderProps) {
  const [user, setUser] = useState<ReturnType<typeof AuthService.getCurrentUser>>(null)

  useEffect(() => {
    setUser(AuthService.getCurrentUser())
  }, [])

  // Logo Component
  const Logo = customLogo || (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:bg-brand-600 transition-colors">
        <Car className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-content-primary group-hover:text-brand-600 transition-colors">
        CarWash Pro
      </span>
    </Link>
  )

  // Navigation Component
  const Navigation = (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-content-secondary hover:text-content-primary transition-colors font-medium"
        >
          {item.name}
        </Link>
      ))}
    </>
  )

  // Mobile Navigation (for mobile menu)
  const MobileNavigation = (
    <>
      {navigationItems.map((item) => (
        <Link
          key={`mobile-${item.name}`}
          href={item.href}
          className="text-content-secondary hover:text-content-primary transition-colors font-medium px-2 py-2 block"
        >
          {item.name}
        </Link>
      ))}
    </>
  )

  // Authentication Actions
  const AuthActions = showAuth && (
    <>
      {user ? (
        // Authenticated user
        <Link
          href="/dashboard/analytics"
          className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors font-medium"
        >
          Go to Dashboard
          <ArrowRight size={16} />
        </Link>
      ) : (
        // Non-authenticated user
        <>
          <Link
            href="/auth/login"
            className="text-content-secondary hover:text-content-primary transition-colors font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors font-medium"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </>
      )}
    </>
  )

  // Mobile Auth Actions (for mobile menu)
  const MobileAuthActions = showAuth && (
    <div className="flex flex-col gap-2">
      {user ? (
        <Link
          href="/dashboard/analytics"
          className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg font-medium"
        >
          Go to Dashboard
          <ArrowRight size={16} />
        </Link>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="text-content-secondary hover:text-content-primary transition-colors font-medium px-2 py-2 text-center"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg font-medium"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </>
      )}
    </div>
  )

  return (
    <BaseHeader
      logo={Logo}
      navigation={
        <>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {Navigation}
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex flex-col space-y-2">
            {MobileNavigation}
          </div>
        </>
      }
      actions={
        <>
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {AuthActions}
          </div>
          
          {/* Mobile Actions */}
          <div className="md:hidden">
            {MobileAuthActions}
          </div>
        </>
      }
      variant={variant}
      className={cn('marketing-header', className)}
    />
  )
}

export default MarketingHeader