/**
 * Development Navigation Component
 * 
 * Simple navigation helper for accessing client pages during development.
 * This can be removed in production or replaced with proper authentication.
 */

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, User, Calendar, CreditCard, Settings, Home, Car } from 'lucide-react'

const DevNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const clientRoutes = [
    {
      name: 'Dashboard',
      href: '/client',
      icon: Home,
      description: 'Client dashboard with overview'
    },
    {
      name: 'Book Service',
      href: '/client/book',
      icon: Calendar,
      description: 'Book a new service'
    },
    {
      name: 'My Bookings',
      href: '/client/bookings',
      icon: Calendar,
      description: 'View and manage bookings'
    },
    {
      name: 'Services',
      href: '/client/services',
      icon: Car,
      description: 'Browse available services'
    },
    {
      name: 'Account',
      href: '/client/account',
      icon: User,
      description: 'Manage profile and vehicles'
    },
    {
      name: 'Payment',
      href: '/client/payment',
      icon: CreditCard,
      description: 'Payment methods and wallet'
    },
    {
      name: 'Account (Clean)',
      href: '/client/account-clean',
      icon: Settings,
      description: 'Clean architecture version'
    }
  ]

  const marketingRoutes = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Dev Navigation
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 max-h-96 overflow-y-auto">
            
            {/* Marketing Routes */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Marketing Pages
            </div>
            {marketingRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {route.name}
              </Link>
            ))}

            {/* Client Routes */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t border-b border-gray-100 mt-2">
              Client Dashboard
            </div>
            {clientRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <route.icon className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{route.name}</div>
                    <div className="text-xs text-gray-500">{route.description}</div>
                  </div>
                </div>
              </Link>
            ))}

            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-100 mt-2">
              Development navigation - remove in production
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DevNavigation