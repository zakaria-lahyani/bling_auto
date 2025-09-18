/**
 * Account Page - Clean Architecture Version
 * 
 * Demonstrates clean architecture patterns:
 * - Uses domain entities (Client, Vehicle, PaymentMethod)
 * - Separates business logic from UI components
 * - Type-safe entity definitions
 * 
 * Note: This version uses mock data for demonstration.
 * In production, this would integrate with use cases and repositories.
 */

'use client'

import React, { useState } from 'react'
import {
  User,
  Car,
  Settings,
  Crown,
  HelpCircle,
  Edit,
  Save,
  X,
  Plus,
  CheckCircle,
  Camera
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'

// Clean Architecture imports
import {
  Client,
  Vehicle,
  PaymentMethod,
  PaymentMethodType,
  MembershipStatus
} from '@/features/client'

interface AccountPageCleanProps {
  clientId: string
}

type TabType = 'profile' | 'vehicles' | 'preferences' | 'membership' | 'support'

const AccountPageClean: React.FC<AccountPageCleanProps> = ({ clientId }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data representing clean architecture entities
  const client: Client = {
    id: clientId,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    avatar: undefined,
    membershipStatus: MembershipStatus.PREMIUM,
    memberSince: new Date('2020-06-15'),
    loyaltyPoints: 850,
    walletBalance: 45.50,
    preferredPaymentMethodId: 'payment-1',
    defaultAddressId: 'address-1',
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      services: {
        ecoFriendly: true,
        premiumProducts: true,
        expressService: false,
        preferredTimeSlots: ['9:00 AM', '2:00 PM']
      },
      communication: {
        marketingEmails: false,
        serviceTips: true,
        promotions: true
      },
      display: {
        darkMode: false,
        language: 'en',
        currency: 'USD'
      }
    },
    vehicles: [],
    createdAt: new Date('2020-06-15'),
    updatedAt: new Date()
  }

  const vehicles: Vehicle[] = [
    {
      id: 'vehicle-1',
      clientId: clientId,
      make: 'Tesla',
      model: 'Model 3',
      year: '2022',
      color: 'Pearl White',
      plateNumber: 'ABC123',
      vin: '5YJ3E1EA5KF123456',
      isPrimary: true,
      notes: 'Main vehicle for family use',
      createdAt: new Date('2022-01-15'),
      updatedAt: new Date()
    },
    {
      id: 'vehicle-2',
      clientId: clientId,
      make: 'BMW',
      model: 'X5',
      year: '2021',
      color: 'Black',
      plateNumber: 'XYZ789',
      vin: 'WBAJA7C55KC123456',
      isPrimary: false,
      notes: 'Weekend vehicle',
      createdAt: new Date('2022-03-20'),
      updatedAt: new Date()
    }
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'payment-1',
      clientId: clientId,
      type: PaymentMethodType.CARD,
      provider: 'visa',
      last4: '1234',
      expiryMonth: 12,
      expiryYear: 2025,
      holderName: 'Sarah Johnson',
      isPrimary: true,
      isActive: true,
      createdAt: new Date('2022-01-15'),
      updatedAt: new Date()
    }
  ]

  // Form state for editing
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone
  })

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      // Simulate API call - in real app, this would use clean architecture use cases
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleAddVehicle = async (vehicleData: any) => {
    try {
      setLoading(true)
      // Simulate API call - in real app, this would use clean architecture use cases
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Vehicle added successfully!')
    } catch (error) {
      alert('Failed to add vehicle')
    } finally {
      setLoading(false)
    }
  }

  const handleSetPrimaryVehicle = async (vehicleId: string) => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('Primary vehicle updated!')
    } catch (error) {
      alert('Failed to update primary vehicle')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveVehicle = async (vehicleId: string) => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('Vehicle removed successfully!')
    } catch (error) {
      alert('Failed to remove vehicle')
    } finally {
      setLoading(false)
    }
  }

  const getMembershipStatusDisplay = (status: MembershipStatus): string => {
    switch (status) {
      case MembershipStatus.BASIC:
        return 'Basic'
      case MembershipStatus.PREMIUM:
        return 'Premium'
      case MembershipStatus.ELITE:
        return 'Elite'
      default:
        return 'Basic'
    }
  }

  return (
    <ClientLayout user={{
      name: client.name,
      email: client.email,
      loyaltyPoints: client.loyaltyPoints,
      membershipStatus: getMembershipStatusDisplay(client.membershipStatus),
      avatar: client.avatar
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header with User Info */}
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{client.name}</h1>
                <p className="text-brand-100 mb-2">{client.email}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-white/20 rounded-full">
                    {getMembershipStatusDisplay(client.membershipStatus)} Member
                  </span>
                  <span>Member since {client.memberSince.getFullYear()}</span>
                </div>
              </div>
            </div>
            <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
              <Camera className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-gray-100 rounded-xl p-1 mb-6">
          {[
            { key: 'profile', label: 'Profile', icon: User },
            { key: 'vehicles', label: 'Vehicles', icon: Car },
            { key: 'preferences', label: 'Preferences', icon: Settings },
            { key: 'membership', label: 'Membership', icon: Crown },
            { key: 'support', label: 'Support', icon: HelpCircle }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabType)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content - Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isEditing ? 'border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isEditing ? 'border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isEditing ? 'border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab Content - Vehicles */}
        {activeTab === 'vehicles' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Vehicles</h2>
              <button 
                onClick={() => {
                  // This would open a modal or form to add a vehicle
                  const vehicleData = {
                    make: 'Tesla',
                    model: 'Model 3',
                    year: '2023',
                    color: 'White',
                    plateNumber: 'TEST123'
                  }
                  handleAddVehicle(vehicleData)
                }}
                disabled={loading}
                className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                Add Vehicle
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Car className="w-8 h-8 text-gray-600" />
                    </div>
                    {vehicle.isPrimary && (
                      <span className="px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded-full font-medium">
                        Primary
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{vehicle.color} • {vehicle.plateNumber}</p>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex-1 text-sm text-brand-600 hover:text-brand-700 font-medium">
                      Edit
                    </button>
                    {!vehicle.isPrimary && (
                      <button 
                        onClick={() => handleSetPrimaryVehicle(vehicle.id)}
                        disabled={loading}
                        className="flex-1 text-sm text-gray-600 hover:text-gray-900 font-medium disabled:opacity-50"
                      >
                        Set Primary
                      </button>
                    )}
                    <button 
                      onClick={() => handleRemoveVehicle(vehicle.id)}
                      disabled={loading}
                      className="flex-1 text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly... */}
      </div>
    </ClientLayout>
  )
}

export default AccountPageClean