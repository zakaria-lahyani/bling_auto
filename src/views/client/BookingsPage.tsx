/**
 * Bookings Management Page
 * 
 * Displays upcoming and past bookings with status tracking,
 * modification options, and quick re-booking capabilities.
 */

'use client'

import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Star,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  Truck,
  CreditCard,
  Receipt,
  Repeat,
  Edit,
  Trash2,
  MessageCircle,
  Navigation,
  Filter,
  Search,
  Download,
  Eye
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'

interface BookingsPageProps {
  user?: {
    name: string
    email: string
    loyaltyPoints: number
    membershipStatus: string
  }
}

type BookingStatus = 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
type FilterType = 'all' | 'upcoming' | 'completed' | 'cancelled'

const BookingsPage: React.FC<BookingsPageProps> = ({
  user = {
    name: 'Sarah',
    email: 'sarah@example.com',
    loyaltyPoints: 850,
    membershipStatus: 'Premium'
  }
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock bookings data
  const bookings = [
    {
      id: 'B001',
      service: 'Basic Wash',
      date: '2024-01-22',
      time: '2:00 PM',
      status: 'upcoming' as BookingStatus,
      location: { name: 'Office', address: '456 Business Ave, Manhattan, NY' },
      car: '2022 Tesla Model 3',
      washer: { name: 'Mike Johnson', rating: 4.9, photo: null },
      price: 25,
      estimatedDuration: '30 min',
      canModify: true,
      canCancel: true
    },
    {
      id: 'B002',
      service: 'Premium Detail',
      date: '2024-01-25',
      time: '10:00 AM',
      status: 'upcoming' as BookingStatus,
      location: { name: 'Home', address: '123 Main Street, Brooklyn, NY' },
      car: '2022 Tesla Model 3',
      washer: { name: 'Alex Rodriguez', rating: 4.8, photo: null },
      price: 85,
      estimatedDuration: '2 hours',
      canModify: true,
      canCancel: true
    },
    {
      id: 'B003',
      service: 'Premium Detail',
      date: '2024-01-15',
      time: '3:00 PM',
      status: 'completed' as BookingStatus,
      location: { name: 'Home', address: '123 Main Street, Brooklyn, NY' },
      car: '2022 Tesla Model 3',
      washer: { name: 'Mike Johnson', rating: 4.9, photo: null },
      price: 85,
      estimatedDuration: '2 hours',
      canModify: false,
      canCancel: false,
      completed: {
        rating: 5,
        review: 'Excellent service! Car looks brand new.',
        photos: ['photo1.jpg', 'photo2.jpg']
      }
    },
    {
      id: 'B004',
      service: 'Express Wax',
      date: '2024-01-10',
      time: '11:00 AM',
      status: 'completed' as BookingStatus,
      location: { name: 'Office', address: '456 Business Ave, Manhattan, NY' },
      car: '2022 Tesla Model 3',
      washer: { name: 'Carlos Martinez', rating: 4.7, photo: null },
      price: 45,
      estimatedDuration: '45 min',
      canModify: false,
      canCancel: false,
      completed: {
        rating: 4,
        review: 'Good service, car looks clean.',
        photos: ['photo3.jpg']
      }
    },
    {
      id: 'B005',
      service: 'Basic Wash',
      date: '2024-01-05',
      time: '9:00 AM',
      status: 'cancelled' as BookingStatus,
      location: { name: 'Home', address: '123 Main Street, Brooklyn, NY' },
      car: '2022 Tesla Model 3',
      washer: null,
      price: 25,
      estimatedDuration: '30 min',
      canModify: false,
      canCancel: false,
      cancellation: {
        reason: 'Weather conditions',
        refundAmount: 25,
        refundStatus: 'processed'
      }
    }
  ]

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'in-progress':
        return <Truck className="w-5 h-5 text-orange-500" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700'
      case 'in-progress':
        return 'bg-orange-100 text-orange-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'upcoming' 
      ? ['upcoming', 'in-progress'].includes(booking.status)
      : ['completed', 'cancelled'].includes(booking.status)
    
    const matchesFilter = filter === 'all' || booking.status === filter
    
    const matchesSearch = searchTerm === '' || 
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesTab && matchesFilter && matchesSearch
  })

  const upcomingCount = bookings.filter(b => ['upcoming', 'in-progress'].includes(b.status)).length
  const pastCount = bookings.filter(b => ['completed', 'cancelled'].includes(b.status)).length

  return (
    <ClientLayout user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-1">Manage your car wash appointments</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
              <Car className="w-5 h-5 inline mr-2" />
              Book New Wash
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past ({pastCount})
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming appointments" 
                  : "No past bookings match your search"}
              </p>
              {activeTab === 'upcoming' && (
                <button className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                  Book Your First Wash
                </button>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                      <Car className="w-6 h-6 text-brand-600" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{booking.service}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Booking ID: {booking.id}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.date} at {booking.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.estimatedDuration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.location.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">${booking.price}</span>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Location & Vehicle</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{booking.location.address}</p>
                      <p className="font-medium">{booking.car}</p>
                    </div>
                  </div>
                  
                  {booking.washer && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Washer</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {booking.washer.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.washer.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{booking.washer.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Completed Booking Details */}
                {booking.status === 'completed' && booking.completed && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < booking.completed!.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          "{booking.completed.review}"
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">
                          <Eye className="w-4 h-4 inline mr-1" />
                          View Photos
                        </button>
                        <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">
                          <Download className="w-4 h-4 inline mr-1" />
                          Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cancelled Booking Details */}
                {booking.status === 'cancelled' && booking.cancellation && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Cancelled due to: <span className="font-medium">{booking.cancellation.reason}</span>
                        </p>
                        <p className="text-sm text-green-600">
                          Refund: ${booking.cancellation.refundAmount} ({booking.cancellation.refundStatus})
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {booking.status === 'upcoming' && (
                    <>
                      {booking.canModify && (
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Edit className="w-4 h-4" />
                          Modify
                        </button>
                      )}
                      {booking.canCancel && (
                        <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Navigation className="w-4 h-4" />
                        Directions
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Contact Washer
                      </button>
                    </>
                  )}
                  
                  {booking.status === 'completed' && (
                    <>
                      <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                        <Repeat className="w-4 h-4" />
                        Book Again
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Receipt className="w-4 h-4" />
                        Download Receipt
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ClientLayout>
  )
}

export default BookingsPage