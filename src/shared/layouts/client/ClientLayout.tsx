/**
 * Modern Responsive Client Layout
 * Visually stunning design with smooth animations and perfect responsiveness
 */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard,
  Car,
  Calendar,
  CreditCard,
  User,
  Gift,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
  Star,
  Crown,
  Zap,
  ChevronRight,
  Phone,
  Mail,
  Home,
  Briefcase,
  MessageCircle
} from 'lucide-react'

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
  user = { 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    loyaltyPoints: 850, 
    membershipStatus: 'Premium' 
  },
  notifications = 3
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items with enhanced styling
  const navigationItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/client', 
      badge: null,
      description: 'Overview & insights',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Calendar, 
      label: 'Bookings', 
      href: '/client/bookings', 
      badge: '3',
      description: 'Manage appointments',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: Car, 
      label: 'Services', 
      href: '/client/services', 
      badge: null,
      description: 'Browse & book',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      icon: CreditCard, 
      label: 'Payments', 
      href: '/client/payment', 
      badge: null,
      description: 'Cards & billing',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    { 
      icon: Gift, 
      label: 'Rewards', 
      href: '/client/rewards', 
      badge: 'NEW',
      description: 'Loyalty benefits',
      gradient: 'from-amber-500 to-amber-600'
    },
    { 
      icon: User, 
      label: 'Profile', 
      href: '/client/account', 
      badge: null,
      description: 'Account settings',
      gradient: 'from-rose-500 to-rose-600'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/client') {
      return pathname === '/client'
    }
    return pathname.startsWith(href)
  }

  const getMembershipIcon = () => {
    switch (user.membershipStatus?.toLowerCase()) {
      case 'premium':
        return Crown
      case 'elite':
        return Sparkles
      default:
        return Star
    }
  }

  const getMembershipGradient = () => {
    switch (user.membershipStatus?.toLowerCase()) {
      case 'premium':
        return 'from-purple-500 via-purple-600 to-indigo-600'
      case 'elite':
        return 'from-amber-500 via-orange-500 to-red-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const MembershipIcon = getMembershipIcon()

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-user-menu]')) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/3 to-pink-400/3 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Refined Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-white/85 backdrop-blur-xl border-r border-white/20 shadow-xl shadow-black/3 transform transition-all duration-500 ease-out lg:translate-x-0 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo Section - Refined and compact */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 to-purple-500/8 backdrop-blur-sm"></div>
          <div className="relative flex items-center gap-2.5 px-3 sm:px-4 py-3 sm:py-4 border-b border-white/15">
            <div className="relative">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 transition-all duration-300">
                <Car className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-emerald-500 border border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm sm:text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                Bling Auto
              </h1>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">Premium Care</p>
            </div>
            
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white/40 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Profile Section - Refined and minimal */}
        <div className="flex-shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
            <div className="relative">
              <div className={`w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br ${getMembershipGradient()} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/15`}>
                <span className="text-white font-bold text-xs sm:text-sm">{user.name.charAt(0)}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-white rounded-full flex items-center justify-center shadow-md">
                <MembershipIcon className="w-1.5 sm:w-2 h-1.5 sm:h-2 text-amber-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-medium text-brand-600">{user.membershipStatus}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600">{user.loyaltyPoints?.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Minimal Quick Stats */}
          <div className="hidden sm:grid grid-cols-2 gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg backdrop-blur-sm border border-blue-200/30">
              <div className="text-sm font-bold text-blue-600">3</div>
              <div className="text-xs text-blue-600/70 font-medium">Days left</div>
            </div>
            <div className="p-2 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg backdrop-blur-sm border border-emerald-200/30">
              <div className="text-sm font-bold text-emerald-600">$85</div>
              <div className="text-xs text-emerald-600/70 font-medium">Saved</div>
            </div>
          </div>
        </div>

        {/* Navigation - Refined and compact */}
        <nav className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1 overflow-y-auto min-h-0">
          {navigationItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex items-center gap-2.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover:scale-[1.01] ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-brand-50 to-purple-50 text-brand-700 shadow-md shadow-brand-500/8'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-sm'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`relative p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-300 group-hover:scale-105 ${
                isActive(item.href)
                  ? `bg-gradient-to-br ${item.gradient} text-white shadow-md`
                  : 'bg-gray-100 group-hover:bg-gray-200 text-gray-500'
              }`}>
                <item.icon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-white/15 rounded-md sm:rounded-lg"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-xs font-bold rounded-full flex-shrink-0 ml-1 ${
                      item.badge === 'NEW' 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 group-hover:text-gray-500 transition-colors truncate hidden sm:block">
                  {item.description}
                </p>
              </div>

              {/* Active Indicator - Refined */}
              {isActive(item.href) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-brand-500 to-purple-500 rounded-r-full shadow-sm"></div>
              )}
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500/3 to-purple-500/3 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions - Minimal and refined */}
        <div className="flex-shrink-0 px-2.5 sm:px-3 py-2 sm:py-3 border-t border-white/15 space-y-1">
          <Link
            href="/client/settings"
            className="flex items-center gap-2 px-2 py-1.5 sm:py-2 text-gray-600 hover:text-gray-900 hover:bg-white/40 rounded-lg transition-all duration-200"
          >
            <Settings className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span className="font-medium text-xs sm:text-sm">Settings</span>
          </Link>
          
          <button className="flex items-center gap-2 px-2 py-1.5 sm:py-2 text-gray-600 hover:text-red-600 hover:bg-red-50/60 rounded-lg transition-all duration-200 w-full">
            <LogOut className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span className="font-medium text-xs sm:text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-72 xl:ml-80 transition-all duration-300">
        {/* Refined Header */}
        <header className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/85 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/3' 
            : 'bg-white/70 backdrop-blur-sm border-b border-white/15'
        }`}>
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden group p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all duration-200"
            >
              <Menu className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Compact Search Bar */}
            <div className="hidden sm:block flex-1 max-w-lg mx-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl text-sm placeholder-gray-400 focus:bg-white/80 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/30 focus:outline-none transition-all duration-300 hover:bg-white/70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/3 to-purple-500/3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Compact Header Actions */}
            <div className="flex items-center gap-2">
              {/* Quick Book Button */}
              <Link
                href="/client/book"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-500/20 text-sm"
              >
                <Zap className="w-4 h-4" />
                <span>Book</span>
              </Link>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all duration-200 group">
                <Bell className="w-5 h-5 group-hover:animate-bounce" />
                {notifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-md font-bold">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Compact User Menu */}
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-white/50 rounded-lg transition-all duration-200 group"
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${getMembershipGradient()} rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                    <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-all duration-300 ${userMenuOpen ? 'rotate-180 text-gray-600' : ''}`} />
                </button>

                {/* Compact User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-300">
                    <div className="px-4 py-3 border-b border-white/20">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-9 h-9 bg-gradient-to-br ${getMembershipGradient()} rounded-lg flex items-center justify-center shadow-md`}>
                          <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs rounded-full font-semibold shadow-md">
                          {user.membershipStatus}
                        </span>
                        <span className="text-xs text-gray-600 font-medium">{user.loyaltyPoints?.toLocaleString()} pts</span>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      {[
                        { icon: User, label: 'Profile', href: '/client/account' },
                        { icon: Settings, label: 'Settings', href: '/client/settings' },
                        { icon: Phone, label: 'Support', href: '/contact' },
                        { icon: MessageCircle, label: 'Feedback', href: '/feedback' }
                      ].map((item, index) => (
                        <Link 
                          key={item.label}
                          href={item.href} 
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white/50 transition-all duration-200"
                        >
                          <item.icon className="w-3.5 h-3.5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t border-white/20 pt-1">
                      <button className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-all duration-200 w-full">
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Page Content */}
        <main className="relative">
          <div className="px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay with Animation */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        
        .animate-in {
          animation: animate-in 0.3s ease-out;
        }
        
        .slide-in-from-top-2 {
          animation: slideInFromTop 0.3s ease-out;
        }
        
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(59 130 246), rgb(147 51 234));
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(37 99 235), rgb(126 34 206));
        }
      `}</style>
    </div>
  )
}

export default ClientLayout