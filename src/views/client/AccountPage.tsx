/**
 * Account & Support Page
 * 
 * Comprehensive account management including profile, vehicles,
 * preferences, membership, and integrated support options.
 */

'use client'

import React, { useState } from 'react'
import {
  User,
  Car,
  Settings,
  Shield,
  Bell,
  Heart,
  Crown,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  HelpCircle,
  FileText,
  Video,
  Clock,
  Star,
  TrendingUp,
  Gift,
  LogOut,
  ChevronRight,
  Globe,
  Moon,
  Sun
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'

interface AccountPageProps {
  user?: {
    name: string
    email: string
    phone: string
    loyaltyPoints: number
    membershipStatus: string
    memberSince: string
    avatar?: string
  }
}

type TabType = 'profile' | 'vehicles' | 'preferences' | 'membership' | 'support'

const AccountPage: React.FC<AccountPageProps> = ({
  user = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    loyaltyPoints: 850,
    membershipStatus: 'Premium',
    memberSince: '2020-06-15'
  }
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: '123 Main Street, Brooklyn, NY 11201'
  })

  // Mock vehicles data
  const vehicles = [
    {
      id: 'v1',
      make: 'Tesla',
      model: 'Model 3',
      year: '2022',
      color: 'Pearl White',
      plate: 'ABC123',
      primary: true,
      image: null
    },
    {
      id: 'v2',
      make: 'BMW',
      model: 'X5',
      year: '2021',
      color: 'Black',
      plate: 'XYZ789',
      primary: false,
      image: null
    }
  ]

  // User preferences
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true
    },
    services: {
      ecoFriendly: true,
      premiumProducts: true,
      expressService: false
    },
    communication: {
      marketingEmails: false,
      serviceTips: true,
      promotions: true
    },
    display: {
      darkMode: false,
      language: 'en'
    }
  })

  // Membership tiers
  const membershipTiers = [
    {
      name: 'Basic',
      price: 0,
      benefits: ['Basic wash discounts', 'Loyalty points', 'Email support'],
      current: false
    },
    {
      name: 'Premium',
      price: 9.99,
      benefits: ['10% off all services', '2x loyalty points', 'Priority booking', 'Free monthly basic wash', '24/7 support'],
      current: true
    },
    {
      name: 'Elite',
      price: 29.99,
      benefits: ['20% off all services', '3x loyalty points', 'VIP booking', 'Unlimited basic washes', 'Dedicated account manager', 'Exclusive services'],
      current: false
    }
  ]

  // Support options
  const supportOptions = [
    { icon: MessageCircle, title: 'Live Chat', description: 'Chat with our support team', action: 'Start Chat', available: true },
    { icon: Phone, title: 'Phone Support', description: '24/7 customer service', action: 'Call Now', available: true },
    { icon: Mail, title: 'Email Support', description: 'Get help via email', action: 'Send Email', available: true },
    { icon: FileText, title: 'Help Center', description: 'Browse FAQs and guides', action: 'View Articles', available: true },
    { icon: Video, title: 'Video Call', description: 'Schedule a video consultation', action: 'Schedule', available: user.membershipStatus === 'Premium' }
  ]

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  return (
    <ClientLayout user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header with User Info */}
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <p className="text-brand-100 mb-2">{user.email}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-white/20 rounded-full">
                    {user.membershipStatus} Member
                  </span>
                  <span>Member since {new Date(user.memberSince).getFullYear()}</span>
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

        {/* Tab Content */}
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
                    className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isEditing ? 'border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Shield className="w-4 h-4" />
                  Change Password
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Bell className="w-4 h-4" />
                  Notification Settings
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Vehicles</h2>
                <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors">
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
                      {vehicle.primary && (
                        <span className="px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded-full font-medium">
                          Primary
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-1">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{vehicle.color} • {vehicle.plate}</p>
                    
                    <div className="flex items-center gap-2">
                      <button className="flex-1 text-sm text-brand-600 hover:text-brand-700 font-medium">
                        Edit
                      </button>
                      {!vehicle.primary && (
                        <button className="flex-1 text-sm text-gray-600 hover:text-gray-900 font-medium">
                          Set Primary
                        </button>
                      )}
                      <button className="flex-1 text-sm text-red-600 hover:text-red-700 font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Booking confirmations and updates</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.email}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, email: e.target.checked }
                    })}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Appointment reminders and updates</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.sms}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, sms: e.target.checked }
                    })}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-500">Real-time updates on mobile app</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.push}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, push: e.target.checked }
                    })}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                  />
                </label>
              </div>
            </div>

            {/* Service Preferences */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Service Preferences</h2>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Eco-Friendly Products</p>
                      <p className="text-sm text-gray-500">Prefer environmentally conscious options</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.services.ecoFriendly}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      services: { ...preferences.services, ecoFriendly: e.target.checked }
                    })}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Premium Products</p>
                      <p className="text-sm text-gray-500">Use high-end cleaning products</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.services.premiumProducts}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      services: { ...preferences.services, premiumProducts: e.target.checked }
                    })}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                  />
                </label>
              </div>
            </div>

            {/* Display Preferences */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Display Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    {preferences.display.darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                    <div>
                      <p className="font-medium text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-500">Easier on the eyes in low light</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({
                      ...preferences,
                      display: { ...preferences.display, darkMode: !preferences.display.darkMode }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.display.darkMode ? 'bg-brand-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.display.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Language</p>
                      <p className="text-sm text-gray-500">Choose your preferred language</p>
                    </div>
                  </div>
                  <select
                    value={preferences.display.language}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      display: { ...preferences.display, language: e.target.value }
                    })}
                    className="px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'membership' && (
          <div className="space-y-6">
            {/* Current Membership */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Membership</h2>
                <Crown className="w-8 h-8 opacity-80" />
              </div>
              <div className="mb-4">
                <p className="text-3xl font-bold mb-1">{user.membershipStatus} Member</p>
                <p className="text-purple-100">Member since {new Date(user.memberSince).toLocaleDateString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-sm text-purple-100 mb-1">Loyalty Points</p>
                  <p className="text-xl font-bold">{user.loyaltyPoints}</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-sm text-purple-100 mb-1">Next Reward</p>
                  <p className="text-xl font-bold">2 washes</p>
                </div>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Membership Tiers</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {membershipTiers.map((tier) => (
                  <div key={tier.name} className={`border-2 rounded-xl p-6 ${
                    tier.current ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}>
                    {tier.current && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                        Current Plan
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{tier.name}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ${tier.price}<span className="text-sm text-gray-500">/month</span>
                    </p>
                    <ul className="space-y-2 mb-6">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {!tier.current && (
                      <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        tier.name === 'Elite' 
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                        {tier.name === 'Elite' ? 'Upgrade' : 'Downgrade'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-6">
            {/* Quick Support Options */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportOptions.map((option) => (
                <div key={option.title} className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${
                  !option.available ? 'opacity-60' : 'hover:shadow-xl transition-all cursor-pointer'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    {option.title === 'Video Call' && user.membershipStatus === 'Premium' && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    option.available
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`} disabled={!option.available}>
                    {option.action}
                  </button>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {[
                  { q: 'How do I cancel a booking?', a: 'You can cancel up to 2 hours before your appointment from the Bookings page.' },
                  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, Apple Pay, and loyalty points.' },
                  { q: 'How do loyalty points work?', a: 'Earn 1 point per dollar spent. Redeem 100 points for $10 off any service.' },
                  { q: 'What if I need to reschedule?', a: 'You can reschedule anytime up to your appointment time from the Bookings page.' }
                ].map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <span className="font-medium text-gray-900">{faq.q}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-4">
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-brand-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Need More Help?</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-600" />
                  <span className="text-gray-700">support@blingauto.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span className="text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  )
}

export default AccountPage