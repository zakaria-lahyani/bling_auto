/**
 * Client Layout - For logged-in users
 * 
 * Focused on dashboard functionality with minimal marketing content.
 * Emphasizes booking actions, account management, and service access.
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Car, 
  Calendar, 
  CreditCard, 
  User, 
  Settings, 
  HelpCircle,
  Bell,
  Menu,
  X,
  Home,
  MapPin,
  Star
} from 'lucide-react'
import { useState } from 'react'

interface ClientLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
    loyaltyPoints?: number
    membershipStatus?: string
    avatar?: string
  }
  notifications?: number
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ 
  children, 
  user = { name: 'Sarah', email: 'sarah@example.com', loyaltyPoints: 850, membershipStatus: 'Premium' },
  notifications = 2
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/client' },
    { icon: Calendar, label: 'Bookings', href: '/client/bookings' },
    { icon: Car, label: 'Services', href: '/client/services' },
    { icon: CreditCard, label: 'Payment', href: '/client/payment' },
    { icon: User, label: 'Account', href: '/client/account' },
  ]

  const isActive = (href: string) => {
    if (href === '/client') {
      return pathname === '/client'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Bling Auto</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side - User info and notifications */}
            <div className="hidden md:flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.membershipStatus} Member</div>
                </div>
                <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-brand-100 text-brand-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Mobile user section */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{user.name.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="text-xs text-brand-600 font-medium">{user.membershipStatus} Member</div>
                </div>
                <div className="ml-auto relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex">
          <Link 
            href="/client/book"
            className="flex-1 bg-brand-600 text-white py-4 flex items-center justify-center gap-2 font-semibold hover:bg-brand-700 transition-colors"
          >
            <Car className="w-5 h-5" />
            Book a Wash
          </Link>
          <Link 
            href="/client/bookings"
            className="flex-1 bg-gray-100 text-gray-700 py-4 flex items-center justify-center gap-2 font-medium hover:bg-gray-200 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            My Bookings
          </Link>
        </div>
      </div>

      {/* Spacer for mobile sticky CTA */}
      <div className="h-16 md:hidden"></div>
    </div>
  )
}

export default ClientLayout