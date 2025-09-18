/**
 * Client Dashboard Page
 * 
 * Personalized dashboard for logged-in users focused on quick actions,
 * status overview, and upcoming bookings. No marketing fluff.
 */

'use client'

import React from 'react'
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  Star,
  Repeat,
  ArrowRight,
  Gift,
  CreditCard,
  Sparkles,
  TrendingUp,
  Shield,
  Phone,
  MessageCircle,
  Award,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'
import { useClientDashboard } from '@/features/client/hooks/useClientData'

interface DashboardPageProps {
  clientId?: string
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  clientId = 'client-1' // Default for demo
}) => {
  const { data, loading, error, refresh } = useClientDashboard(clientId)

  // Loading state
  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </ClientLayout>
    )
  }

  // Error state
  if (error || !data) {
    return (
      <ClientLayout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error loading dashboard: {error}</p>
          <button 
            onClick={refresh}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700"
          >
            Try Again
          </button>
        </div>
      </ClientLayout>
    )
  }

  const { client, upcomingBookings, stats } = data

  // Get the next upcoming booking and last completed booking from data
  const nextBooking = upcomingBookings && upcomingBookings.length > 0 ? upcomingBookings[0] : null
  const lastBooking = {
    service: 'Premium Detail',
    cost: 85
  }

  const quickServices = [
    { name: 'Basic Wash', price: 25, duration: '30 min', popular: true },
    { name: 'Premium Detail', price: 85, duration: '2 hours', recommended: true },
    { name: 'Express Wax', price: 45, duration: '45 min' },
    { name: 'Ceramic Coating', price: 299, duration: '4 hours', premium: true }
  ]

  const recentActivity = [
    { type: 'booking', message: 'Premium Detail completed', time: '2 days ago', status: 'completed' },
    { type: 'payment', message: 'Payment processed - $85', time: '2 days ago', status: 'success' },
    { type: 'loyalty', message: 'Earned 85 loyalty points', time: '2 days ago', status: 'success' },
    { type: 'review', message: 'Review reminder sent', time: '1 day ago', status: 'pending' }
  ]

  return (
    <ClientLayout user={{
      name: client.name,
      email: client.email,
      loyaltyPoints: client.loyaltyPoints,
      membershipStatus: client.membershipStatus.charAt(0).toUpperCase() + client.membershipStatus.slice(1),
      avatar: client.avatar
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 rounded-2xl p-6 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Hi {client.name}, ready for your next wash? 🚗✨
                </h1>
                <p className="text-brand-100 text-lg">
                  {client.membershipStatus.charAt(0).toUpperCase() + client.membershipStatus.slice(1)} Member • {client.loyaltyPoints} points
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Car className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Points</span>
                </div>
                <div className="text-2xl font-bold">{client.loyaltyPoints}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">This Month</span>
                </div>
                <div className="text-2xl font-bold">{stats.bookingsThisMonth}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <div className="text-2xl font-bold">{stats.averageRating}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Book a Wash - Primary CTA */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-brand-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Book a Wash</h2>
            </div>
            
            <p className="text-gray-600 mb-6">Choose your service and we'll come to you</p>
            
            <a 
              href="/client/book"
              className="block w-full bg-brand-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-brand-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
            >
              Book Now
            </a>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-brand-600 transition-colors">
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4" />
                  <span className="font-medium">Repeat last booking</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{lastBooking.service}</div>
                  <div className="text-xs text-gray-500">${lastBooking.cost}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Upcoming Booking */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {nextBooking ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Next Appointment</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    nextBooking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {nextBooking.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Service #{nextBooking.serviceId}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{new Date(nextBooking.scheduledDate).toLocaleDateString()} at {nextBooking.scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>Service Location</span>
                  </div>
                  {nextBooking.washer && (
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <span>Washer: {nextBooking.washer.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Modify
                  </button>
                  <button className="flex-1 bg-brand-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-brand-700 transition-colors">
                    Track
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">No Upcoming Bookings</h2>
                <p className="text-gray-600 mb-4">You don't have any upcoming appointments.</p>
                <a 
                  href="/client/book" 
                  className="block w-full bg-brand-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-brand-700 transition-colors text-center"
                >
                  Book Now
                </a>
              </>
            )}
          </div>
        </div>

        {/* Service Catalog & Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Quick Services */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Popular Services</h2>
              <a href="/client/services" className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {quickServices.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                      {service.name}
                    </h3>
                    {service.popular && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Popular
                      </span>
                    )}
                    {service.recommended && (
                      <span className="px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                    {service.premium && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${service.price}</span>
                    <span className="text-sm text-gray-500">{service.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.status === 'completed' || activity.status === 'success' 
                      ? 'bg-green-100' 
                      : activity.status === 'pending'
                      ? 'bg-yellow-100'
                      : 'bg-gray-100'
                  }`}>
                    {activity.status === 'completed' || activity.status === 'success' ? (
                      <CheckCircle className={`w-4 h-4 ${
                        activity.status === 'completed' || activity.status === 'success' 
                          ? 'text-green-600' 
                          : 'text-gray-600'
                      }`} />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center justify-center gap-1">
              View All Activity <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/client/payment" className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Payment</h3>
                <p className="text-sm text-gray-500">Manage cards & billing</p>
              </div>
            </div>
          </a>
          
          <a href="/client/bookings" className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">My Bookings</h3>
                <p className="text-sm text-gray-500">View & manage</p>
              </div>
            </div>
          </a>
          
          <a href="/contact" className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Support</h3>
                <p className="text-sm text-gray-500">Help & chat</p>
              </div>
            </div>
          </a>
          
          <a href="/client/account" className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Rewards</h3>
                <p className="text-sm text-gray-500">{client.loyaltyPoints} points</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </ClientLayout>
  )
}

export default DashboardPage