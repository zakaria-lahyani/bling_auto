/**
 * Ultra-Modern Client Dashboard
 * Sleek glassmorphism design with enhanced UX and smooth animations
 */

'use client'

import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  Calendar,
  Car,
  Gift,
  Star,
  Clock,
  MapPin,
  Users,
  ArrowUpRight,
  CheckCircle,
  Loader2,
  Plus,
  Repeat,
  Zap,
  ArrowRight,
  DollarSign,
  Activity,
  Bell,
  CreditCard,
  Sparkles,
  Crown,
  Target,
  ChevronRight,
  BarChart3,
  TrendingDown,
  Award,
  Flame,
  Timer,
  Gauge,
  Heart,
  Shield,
  Eye,
  ExternalLink,
  RefreshCw
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'
import { useClientDashboard } from '@/features/client/hooks/useClientData'

interface DashboardPageProps {
  clientId?: string
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  clientId = 'client-1'
}) => {
  const { data, loading, error, refresh } = useClientDashboard(clientId)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update time every minute for real-time feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-brand-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-brand-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 mt-6 font-medium">Loading your personalized dashboard...</p>
            <p className="text-sm text-gray-500 mt-2">Preparing your latest insights</p>
          </div>
        </div>
      </ClientLayout>
    )
  }

  if (error || !data) {
    return (
      <ClientLayout>
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-red-600 mb-6">Error loading dashboard: {error}</p>
          <button 
            onClick={refresh}
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl hover:bg-brand-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </ClientLayout>
    )
  }

  const { client, upcomingBookings, stats } = data
  const nextBooking = upcomingBookings && upcomingBookings.length > 0 ? upcomingBookings[0] : null

  // Enhanced KPI data with modern styling
  const kpiData = [
    {
      title: 'Monthly Spending',
      value: `$${stats.spentThisMonth || 125}`,
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      subtitle: 'Total this month',
      prefix: '$',
      description: 'Great savings with your Premium membership!'
    },
    {
      title: 'Loyalty Points',
      value: client.loyaltyPoints.toLocaleString(),
      change: 8.3,
      trend: 'up',
      icon: Crown,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      subtitle: `${client.membershipStatus} member`,
      prefix: '',
      description: `Worth ~$${Math.floor(client.loyaltyPoints / 10)} in rewards`
    },
    {
      title: 'Services Booked',
      value: stats.bookingsThisMonth,
      change: 2,
      trend: 'up',
      icon: Sparkles,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      subtitle: 'This month',
      prefix: '',
      description: 'You\'re on track for your monthly goal!'
    },
    {
      title: 'Service Rating',
      value: stats.averageRating,
      change: 0.2,
      trend: 'up',
      icon: Star,
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
      subtitle: 'Average rating',
      prefix: '⭐ ',
      description: 'Excellent feedback from our team'
    }
  ]

  const quickActions = [
    {
      title: 'Book Premium Service',
      description: 'Schedule your next car wash experience',
      icon: Zap,
      href: '/client/book',
      gradient: 'from-brand-500 to-brand-600',
      bgGradient: 'from-brand-50 to-purple-50',
      featured: true,
      popular: true
    },
    {
      title: 'Explore Services',
      description: 'Discover our premium offerings',
      icon: Sparkles,
      href: '/client/services',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Manage Payments',
      description: 'Your cards & billing options',
      icon: Shield,
      href: '/client/payment',
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    {
      title: 'Rewards & Benefits',
      description: 'Unlock exclusive member perks',
      icon: Gift,
      href: '/client/rewards',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'booking',
      title: 'Premium Detail Completed',
      description: 'Service #PD-2024-001',
      time: '2 days ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Processed',
      description: '$85.00 - Visa ending in 1234',
      time: '2 days ago',
      status: 'success',
      icon: CreditCard
    },
    {
      id: 3,
      type: 'points',
      title: 'Points Earned',
      description: '+85 loyalty points',
      time: '2 days ago',
      status: 'success',
      icon: Gift
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Service Reminder',
      description: 'Your next wash is due',
      time: '1 day ago',
      status: 'pending',
      icon: Bell
    }
  ]

  return (
    <ClientLayout user={{
      name: client.name,
      email: client.email,
      loyaltyPoints: client.loyaltyPoints,
      membershipStatus: client.membershipStatus.charAt(0).toUpperCase() + client.membershipStatus.slice(1),
      avatar: client.avatar
    }}>
      <div className="space-y-8">
        
        {/* Compact Hero Section for Mobile */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600"></div>
          
          {/* Animated Background Elements - Smaller for mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/4 left-1/3 w-32 sm:w-64 h-32 sm:h-64 bg-white/5 rounded-full blur-2xl animate-float"></div>
          </div>
          
          <div className="relative p-4 sm:p-6 lg:p-12 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs sm:text-sm font-medium">
                      {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-white/60 text-xs">
                      {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4">
                  Welcome back, {client.name.split(' ')[0]}! ✨
                </h1>
                <p className="text-sm sm:text-base lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                  Your premium car care journey continues.
                </p>
              </div>
              
              {/* Compact Quick Action CTA */}
              <div className="flex-shrink-0">
                <a
                  href="/client/book"
                  className="group inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-semibold hover:bg-white hover:text-brand-600 transition-all duration-300 border border-white/30 hover:border-white hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Book Now</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            {/* Compact Mini Stats Bar */}
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 border-t border-white/20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-xs sm:text-sm">Next: {nextBooking ? 'Tomorrow' : 'Not scheduled'}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Crown className="w-3 sm:w-4 h-3 sm:h-4 text-amber-400" />
                <span className="text-white/80 text-xs sm:text-sm">{client.membershipStatus}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Target className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" />
                <span className="text-white/80 text-xs sm:text-sm">2/3 Goal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligent Adaptive KPI Cards */}
        <div className="space-y-4">
          {/* Large Screens: Auto-fit grid (shows 4 cards if text fits, 3 if medium text, 2 if long text) */}
          <div className="hidden lg:block">
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {kpiData.map((kpi, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-50`}></div>
                  
                  {/* Glassmorphism Layer */}
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border border-white/20"></div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-sm font-semibold text-gray-600 mb-2 leading-tight">{kpi.title}</p>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-bold text-gray-900 leading-none">{kpi.prefix}{kpi.value}</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-tight">{kpi.subtitle}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <kpi.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3.5 h-3.5 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-sm font-bold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'} leading-none`}>
                          +{kpi.change}%
                        </span>
                        <span className="text-sm text-gray-500 leading-none">vs last</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-tight">{kpi.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medium Screens: Smart 2-column grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-4">
              {kpiData.map((kpi, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-50`}></div>
                  
                  {/* Glassmorphism Layer */}
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border border-white/20"></div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-xs font-semibold text-gray-600 mb-1 leading-tight">{kpi.title.length > 12 ? kpi.title.split(' ')[0] + '...' : kpi.title}</p>
                        <div className="flex items-baseline gap-1 mb-0.5">
                          <span className="text-base font-bold text-gray-900 leading-none">{kpi.prefix}{kpi.value}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-tight">{kpi.subtitle}</p>
                      </div>
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <kpi.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-0.5">
                        <TrendingUp className={`w-3 h-3 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-xs font-bold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'} leading-none`}>
                          +{kpi.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Responsive 2-column grid with vertical layout for long titles */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {kpiData.map((kpi, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-50`}></div>
                  
                  {/* Glassmorphism Layer */}
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border border-white/20"></div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-3">
                    {/* Vertical layout for better text fitting */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${kpi.gradient} shadow-lg flex-shrink-0`}>
                          <kpi.icon className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex items-center gap-0.5">
                          <TrendingUp className={`w-2.5 h-2.5 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                          <span className={`text-xs font-bold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'} leading-none`}>
                            +{kpi.change}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-600 leading-tight">{kpi.title.length > 10 ? kpi.title.split(' ')[0] : kpi.title}</p>
                        <div className="text-sm font-bold text-gray-900 leading-none">{kpi.prefix}{kpi.value}</div>
                        <p className="text-xs text-gray-500 leading-tight">{kpi.subtitle.length > 12 ? kpi.subtitle.split(' ')[0] + '...' : kpi.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            
            {/* Intelligent Adaptive Quick Actions */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-6 lg:p-8 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-6 lg:mb-8">
                <div className="flex-1 min-w-0 pr-3">
                  <h2 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">Quick Actions</h2>
                  <p className="text-sm sm:text-sm md:text-sm lg:text-base text-gray-600 hidden sm:block leading-tight">Everything you need, just one click away</p>
                </div>
                <div className="p-2 sm:p-2.5 md:p-2 lg:p-3 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl sm:rounded-2xl flex-shrink-0">
                  <Zap className="w-4 sm:w-5 md:w-4 lg:w-6 h-4 sm:h-5 md:h-4 lg:h-6 text-white" />
                </div>
              </div>
              
              {/* Large Screens: Smart Auto-Fit Grid */}
              <div className="hidden xl:block">
                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                  {quickActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.href}
                      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
                        action.featured ? 'xl:col-span-2' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} opacity-60`}></div>
                      
                      {/* Glassmorphism Layer */}
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-white/20"></div>
                      
                      {/* Hover Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <div className="relative p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                <action.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors leading-tight">{action.title}</h3>
                                {action.popular && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-medium animate-pulse mt-1">
                                    <Flame className="w-2.5 h-2.5" />
                                    Most Popular
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-tight">{action.description}</p>
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-brand-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Large Screens (lg): 2x2 Grid */}
              <div className="hidden lg:block xl:hidden">
                <div className="grid grid-cols-2 gap-5">
                  {quickActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.href}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} opacity-60`}></div>
                      
                      {/* Glassmorphism Layer */}
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-white/20"></div>
                      
                      {/* Hover Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <div className="relative p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <action.icon className="w-4 h-4 text-white" />
                          </div>
                          {action.popular && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-medium animate-pulse">
                              <Flame className="w-2.5 h-2.5" />
                              <span className="hidden xl:inline">Popular</span>
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-600 transition-colors leading-tight">{action.title}</h3>
                          <p className="text-sm text-gray-600 leading-tight">{action.description}</p>
                        </div>
                        <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-brand-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Medium Screens: Compact 2-Column */}
              <div className="hidden md:block lg:hidden">
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.href}
                      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-[1.01]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} opacity-60`}></div>
                      
                      {/* Glassmorphism Layer */}
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-white/20"></div>
                      
                      {/* Hover Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <div className="relative p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <action.icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors leading-tight">{action.title.length > 15 ? action.title.split(' ')[0] + ' ' + action.title.split(' ')[1] : action.title}</h3>
                            {action.popular && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-medium animate-pulse mt-1">
                                <Flame className="w-2 h-2" />
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-tight">{action.description.length > 35 ? action.description.substring(0, 32) + '...' : action.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile: Vertical List */}
              <div className="space-y-3 md:hidden">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-[1.01]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.bgGradient} opacity-60`}></div>
                    
                    {/* Glassmorphism Layer */}
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-white/20"></div>
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <action.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors leading-tight">{action.title}</h3>
                              <p className="text-xs text-gray-600 leading-tight mt-0.5">{action.description}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                              {action.popular && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-medium animate-pulse">
                                  <Flame className="w-2.5 h-2.5" />
                                </span>
                              )}
                              <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-brand-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Responsive Recent Activity */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 lg:p-8 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-7 lg:mb-8">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">Recent Activity</h2>
                  <p className="text-sm sm:text-sm md:text-base text-gray-600 hidden sm:block leading-tight">Your latest car care highlights</p>
                </div>
                <a href="/client/activity" className="group inline-flex items-center gap-1 sm:gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors text-sm sm:text-sm md:text-base">
                  <span className="hidden md:inline">View all</span>
                  <span className="md:hidden">All</span>
                  <ArrowUpRight className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
              
              <div className="space-y-3 sm:space-y-3 md:space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="group relative p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-3.5 lg:gap-4">
                      <div className={`p-2 sm:p-2.5 md:p-2.5 lg:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0 ${
                        activity.status === 'success' 
                          ? 'bg-gradient-to-br from-green-500 to-green-600' 
                          : 'bg-gradient-to-br from-amber-500 to-amber-600'
                      }`}>
                        <activity.icon className="w-3 sm:w-4 md:w-4 lg:w-5 h-3 sm:h-4 md:h-4 lg:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors text-sm sm:text-sm md:text-base leading-tight truncate">{activity.title}</p>
                            <p className="text-xs sm:text-xs md:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-tight truncate md:whitespace-normal">{activity.description}</p>
                            <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 md:mt-2.5 lg:mt-3">
                              <Clock className="w-2.5 sm:w-3 md:w-3 h-2.5 sm:h-3 md:h-3 text-gray-400 flex-shrink-0" />
                              <p className="text-xs text-gray-500 font-medium leading-none">{activity.time}</p>
                            </div>
                          </div>
                          <span className={`px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium flex-shrink-0 leading-tight ${
                            activity.status === 'success'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            <span className="hidden md:inline">{activity.status}</span>
                            <span className="md:hidden">{activity.status === 'success' ? '✓' : '⏳'}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            
            {/* Compact Next Appointment Card */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600"></div>
              
              {/* Animated Background Elements - Smaller for mobile */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
              
              <div className="relative p-4 sm:p-6 md:p-6 lg:p-8 text-white">
                
                {nextBooking ? (
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 sm:px-3 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-1.5 lg:py-2 rounded-full text-xs sm:text-sm font-bold leading-tight ${
                        nextBooking.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                          : 'bg-amber-500/20 text-amber-100 border border-amber-400/30'
                      }`}>
                        ✓ {nextBooking.status}
                      </span>
                      <span className="text-white/80 font-medium text-xs sm:text-sm leading-tight">
                        {new Date(nextBooking.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold mb-3 sm:mb-3 md:mb-4 leading-tight">Premium Detail Service</h3>
                      <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <div className="p-1.5 sm:p-2 md:p-2 bg-white/20 rounded-md sm:rounded-lg">
                            <Clock className="w-3 sm:w-4 md:w-4 h-3 sm:h-4 md:h-4" />
                          </div>
                          <span className="font-medium text-sm sm:text-sm md:text-base leading-tight">{nextBooking.scheduledTime || '10:00 AM'}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <div className="p-1.5 sm:p-2 md:p-2 bg-white/20 rounded-md sm:rounded-lg">
                            <MapPin className="w-3 sm:w-4 md:w-4 h-3 sm:h-4 md:h-4" />
                          </div>
                          <span className="font-medium text-sm sm:text-sm md:text-base leading-tight">Home Location</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <div className="p-1.5 sm:p-2 md:p-2 bg-white/20 rounded-md sm:rounded-lg">
                            <Users className="w-3 sm:w-4 md:w-4 h-3 sm:h-4 md:h-4" />
                          </div>
                          <span className="font-medium text-sm sm:text-sm md:text-base leading-tight">Professional Team</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 sm:gap-2.5 md:gap-3 pt-2 sm:pt-3 md:pt-4">
                      <button className="flex-1 py-2 sm:py-2.5 md:py-2.5 lg:py-3 px-2 sm:px-3 md:px-3 lg:px-4 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-300 text-xs sm:text-sm font-semibold border border-white/30 leading-tight">
                        Reschedule
                      </button>
                      <button className="flex-1 py-2 sm:py-2.5 md:py-2.5 lg:py-3 px-2 sm:px-3 md:px-3 lg:px-4 bg-white text-blue-600 rounded-lg sm:rounded-xl hover:bg-white/90 transition-all duration-300 text-xs sm:text-sm font-semibold shadow-lg leading-tight">
                        Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 sm:py-6 lg:py-8">
                    <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                      <Calendar className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">No Upcoming Services</h3>
                    <p className="text-white/80 mb-3 sm:mb-4 lg:mb-6 leading-relaxed text-sm sm:text-base">Ready for your next premium experience?</p>
                    <a
                      href="/client/book"
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-blue-600 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl hover:bg-white/90 transition-all duration-300 font-semibold shadow-lg hover:scale-105 text-sm sm:text-base"
                    >
                      <Zap className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span className="hidden sm:inline">Schedule Service</span>
                      <span className="sm:hidden">Schedule</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Compact Monthly Progress */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600"></div>
              
              {/* Animated Background Elements - Smaller for mobile */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
              
              <div className="relative p-4 sm:p-5 md:p-4 lg:p-6 xl:p-8 text-white">
                <div className="mb-3 sm:mb-4 md:mb-3 lg:mb-5 xl:mb-6">
                  {/* Large screens: side by side */}
                  <div className="hidden lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-xl font-bold leading-tight">Monthly Progress</h2>
                    <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Medium/Small screens: adaptive layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-base sm:text-lg md:text-base font-bold leading-tight">Monthly Progress</h2>
                      <div className="p-1.5 sm:p-2 md:p-1.5 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex-shrink-0">
                        <Target className="w-3.5 sm:w-4 md:w-3.5 h-3.5 sm:h-4 md:h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2.5 sm:space-y-3 md:space-y-2.5 lg:space-y-4 xl:space-y-6">
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 xl:gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 lg:p-3 xl:p-4 border border-white/30">
                      <div className="text-sm sm:text-base md:text-sm lg:text-lg xl:text-xl font-bold leading-tight">{stats.bookingsThisMonth}</div>
                      <div className="text-white/80 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm leading-tight">Services</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 lg:p-3 xl:p-4 border border-white/30">
                      <div className="text-sm sm:text-base md:text-sm lg:text-lg xl:text-xl font-bold leading-tight">${stats.spentThisMonth || 125}</div>
                      <div className="text-white/80 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm leading-tight">Spent</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-2.5 lg:p-3 xl:p-4 border border-white/30">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-1.5 lg:mb-2 xl:mb-3">
                      <span className="font-semibold text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base leading-tight truncate flex-1 min-w-0 pr-2">Goal Progress</span>
                      <span className="text-xs sm:text-sm md:text-xs lg:text-sm xl:text-sm font-bold flex-shrink-0">2/3</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-1.5 sm:h-2 md:h-1.5 lg:h-2 xl:h-3">
                      <div className="bg-white h-1.5 sm:h-2 md:h-1.5 lg:h-2 xl:h-3 rounded-full shadow-lg" style={{ width: '67%' }}></div>
                    </div>
                    <p className="text-white/80 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm mt-1.5 sm:mt-2 md:mt-1.5 lg:mt-2 xl:mt-3 leading-tight">1 more to unlock bonus!</p>
                  </div>
                  
                  <div className="space-y-1.5 sm:space-y-2 md:space-y-1.5 lg:space-y-2 xl:space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/80 text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base leading-tight truncate flex-1 min-w-0">Points Earned</span>
                      <span className="font-bold text-yellow-300 text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base flex-shrink-0">+250</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/80 text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base leading-tight truncate flex-1 min-w-0">Member Savings</span>
                      <span className="font-bold text-green-300 text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base flex-shrink-0">$12.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Last Service Card */}
            <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              
              {/* Gradient Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 opacity-50"></div>
              
              {/* Header Section */}
              <div className="relative p-3 sm:p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-lg">
                    <Award className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">Last Service</h2>
                </div>
              </div>
              
              {/* Service Content */}
              <div className="relative p-3 sm:p-4 space-y-3">
                
                {/* Service Title & Date */}
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Premium Detail</h3>
                  <div className="flex items-center justify-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs sm:text-sm">2 days ago</span>
                  </div>
                </div>
                
                {/* Status Row */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Service completed successfully</span>
                </div>
                
                {/* Price Display */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Total Paid</div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700">$85.00</div>
                </div>
                
                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white py-2.5 sm:py-3 rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group text-sm sm:text-base">
                  <Repeat className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Book Same Service</span>
                  <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
                
              </div>
            </div>
          </div>
        </div>
        
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
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
          
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite linear;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200px 100%;
          }
        `}</style>
      </div>
    </ClientLayout>
  )
}

export default DashboardPage