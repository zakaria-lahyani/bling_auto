/**
 * Modern Payment & Wallet Management Page
 * Premium glassmorphism design with enhanced UX and animations
 */

'use client'

import React, { useState } from 'react'
import {
  CreditCard,
  Wallet,
  Plus,
  Download,
  Eye,
  EyeOff,
  Shield,
  Gift,
  TrendingUp,
  Receipt,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Percent,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  Lock,
  CreditCardIcon,
  Sparkles,
  Zap,
  Crown,
  Flame,
  Copy,
  ExternalLink,
  RefreshCw
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'

interface PaymentPageProps {
  user?: {
    name: string
    email: string
    loyaltyPoints: number
    membershipStatus: string
    walletBalance: number
  }
}

type TransactionType = 'payment' | 'refund' | 'points' | 'promo'
type TransactionStatus = 'completed' | 'pending' | 'failed'

const PaymentPage: React.FC<PaymentPageProps> = ({
  user = {
    name: 'Sarah',
    email: 'sarah@example.com',
    loyaltyPoints: 850,
    membershipStatus: 'Premium',
    walletBalance: 45.50
  }
}) => {
  const [activeTab, setActiveTab] = useState<'methods' | 'wallet' | 'transactions' | 'invoices'>('methods')
  const [showAddCard, setShowAddCard] = useState(false)
  const [showPromoCode, setShowPromoCode] = useState(false)

  // Mock payment methods
  const paymentMethods = [
    {
      id: 'card1',
      type: 'visa',
      last4: '1234',
      expiry: '12/25',
      name: 'Sarah Johnson',
      primary: true,
      icon: '💳'
    },
    {
      id: 'card2',
      type: 'mastercard',
      last4: '5678',
      expiry: '06/24',
      name: 'Sarah Johnson',
      primary: false,
      icon: '💳'
    },
    {
      id: 'apple',
      type: 'apple',
      last4: '9012',
      expiry: null,
      name: 'Apple Pay',
      primary: false,
      icon: '🍎'
    }
  ]

  // Mock transactions
  const transactions = [
    {
      id: 'TXN001',
      type: 'payment' as TransactionType,
      amount: 85,
      description: 'Premium Detail Service',
      date: '2024-01-15',
      status: 'completed' as TransactionStatus,
      method: 'Visa ****1234',
      bookingId: 'B003'
    },
    {
      id: 'TXN002',
      type: 'points' as TransactionType,
      amount: 85,
      description: 'Loyalty Points Earned',
      date: '2024-01-15',
      status: 'completed' as TransactionStatus,
      method: 'Loyalty Program',
      bookingId: 'B003'
    },
    {
      id: 'TXN003',
      type: 'refund' as TransactionType,
      amount: 25,
      description: 'Cancelled Booking Refund',
      date: '2024-01-05',
      status: 'completed' as TransactionStatus,
      method: 'Visa ****1234',
      bookingId: 'B005'
    },
    {
      id: 'TXN004',
      type: 'promo' as TransactionType,
      amount: 10,
      description: 'New Year Promo Applied',
      date: '2024-01-01',
      status: 'completed' as TransactionStatus,
      method: 'Promo Code: NEWYEAR2024',
      bookingId: null
    }
  ]

  // Mock invoices
  const invoices = [
    {
      id: 'INV001',
      date: '2024-01-15',
      amount: 85,
      service: 'Premium Detail',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV002',
      date: '2024-01-10',
      amount: 45,
      service: 'Express Wax',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV003',
      date: '2024-01-05',
      amount: 25,
      service: 'Basic Wash',
      status: 'refunded',
      downloadUrl: '#'
    }
  ]

  // Active promo codes
  const promoCodes = [
    {
      code: 'WINTER20',
      description: '20% off all services',
      validUntil: '2024-02-29',
      used: false,
      minPurchase: 50
    },
    {
      code: 'LOYALTY10',
      description: '10% off for Premium members',
      validUntil: '2024-12-31',
      used: true,
      minPurchase: 0
    }
  ]

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />
      case 'refund':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />
      case 'points':
        return <Star className="w-5 h-5 text-yellow-500" />
      case 'promo':
        return <Gift className="w-5 h-5 text-purple-500" />
    }
  }

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case 'payment':
        return 'text-red-600'
      case 'refund':
        return 'text-green-600'
      case 'points':
        return 'text-yellow-600'
      case 'promo':
        return 'text-purple-600'
    }
  }

  return (
    <ClientLayout user={user}>
      <div className="space-y-8">
        
        {/* Modern Header with Glassmorphism */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
            <Wallet className="w-6 h-6 text-brand-600" />
            <span className="text-brand-700 font-semibold">Financial Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Payment & Wallet
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Complete financial control with secure payments and smart rewards
          </p>
        </div>

        {/* Enhanced Wallet Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02]">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-1/2 -left-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="relative p-6 sm:p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 sm:p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Wallet className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                <span className="text-xs sm:text-sm opacity-90 font-medium">Available</span>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">${user.walletBalance.toFixed(2)}</div>
              <p className="text-white/80 mb-4 text-sm sm:text-base">Wallet Balance</p>
              <button className="group flex items-center gap-2 text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30">
                <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                <span>Add Funds</span>
                <ArrowUpRight className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="relative p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Star className="w-8 h-8" />
                </div>
                <span className="text-sm opacity-90 font-medium">Available</span>
              </div>
              <div className="text-4xl font-bold mb-2">{user.loyaltyPoints}</div>
              <p className="text-white/80 mb-1">Loyalty Points</p>
              <p className="text-sm text-white/70">≈ ${Math.floor(user.loyaltyPoints / 10)} value</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="relative p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <span className="text-sm opacity-90 font-medium">This Month</span>
              </div>
              <div className="text-4xl font-bold mb-2">$155</div>
              <p className="text-white/80 mb-1">Total Spent</p>
              <p className="text-sm text-white/70">3 services</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="relative p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Gift className="w-8 h-8" />
                </div>
                <span className="text-sm opacity-90 font-medium">Active</span>
              </div>
              <div className="text-4xl font-bold mb-2">2</div>
              <p className="text-white/80 mb-4">Promo Codes</p>
              <button className="group flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30">
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-1 sm:p-2 border border-white/20 shadow-xl mb-8">
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('methods')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                activeTab === 'methods'
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <span className="hidden sm:inline">💳 </span>Payment<span className="hidden md:inline"> Methods</span>
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                activeTab === 'wallet'
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <span className="hidden sm:inline">💰 </span>Wallet<span className="hidden md:inline"> & Points</span>
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                activeTab === 'transactions'
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <span className="hidden sm:inline">📊 </span>History
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                activeTab === 'invoices'
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <span className="hidden sm:inline">📄 </span>Invoices
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'methods' && (
          <div className="space-y-8">
            {/* Enhanced Payment Methods List */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h2>
                  <p className="text-gray-600">Manage your saved payment options securely</p>
                </div>
                <button
                  onClick={() => setShowAddCard(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-brand-500/25"
                >
                  <Plus className="w-5 h-5" />
                  Add New Card
                </button>
              </div>

              <div className="grid gap-6">
                {paymentMethods.map((method, index) => (
                  <div 
                    key={method.id} 
                    className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Background Gradient */}
                    <div className={`absolute inset-0 ${
                      method.type === 'visa' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                      method.type === 'mastercard' ? 'bg-gradient-to-r from-red-600 to-orange-600' :
                      'bg-gradient-to-r from-gray-800 to-gray-900'
                    }`}></div>
                    
                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                    </div>
                    
                    <div className="relative p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                            {method.type === 'visa' && '💳'}
                            {method.type === 'mastercard' && '💳'}
                            {method.type === 'apple' && '🍎'}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-xl font-bold">
                                {method.type === 'visa' && 'Visa'}
                                {method.type === 'mastercard' && 'Mastercard'}
                                {method.type === 'apple' && 'Apple Pay'}
                                {' '}****{method.last4}
                              </span>
                              {method.primary && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full font-bold shadow-lg">
                                  PRIMARY
                                </span>
                              )}
                            </div>
                            <div className="text-white/80">
                              {method.expiry ? `Expires ${method.expiry}` : 'Digital Wallet'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!method.primary && (
                            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30">
                              Set Primary
                            </button>
                          )}
                          <button className="p-3 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="p-3 text-white/80 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-white/60 text-sm">
                          {method.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-white/60" />
                          <span className="text-white/60 text-sm">Secured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Your payment info is secure</h3>
                    <p className="text-sm text-blue-700">
                      We use industry-standard encryption and never store your full card details.
                      All transactions are processed through secure payment gateways.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Codes */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Promo Codes</h2>
                <button
                  onClick={() => setShowPromoCode(true)}
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Add Code
                </button>
              </div>

              <div className="space-y-4">
                {promoCodes.map((promo) => (
                  <div key={promo.code} className={`p-4 border rounded-xl ${
                    promo.used ? 'border-gray-200 bg-gray-50' : 'border-green-200 bg-green-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-lg text-gray-900">{promo.code}</span>
                          {promo.used && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                              Used
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{promo.description}</p>
                        <div className="text-sm text-gray-500">
                          {promo.minPurchase > 0 && <span>Min. ${promo.minPurchase} • </span>}
                          Valid until {promo.validUntil}
                        </div>
                      </div>
                      {!promo.used && (
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            {/* Wallet Balance */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Wallet Balance</h2>
              
              <div className="bg-gradient-to-r from-brand-50 to-green-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Current Balance</p>
                    <div className="text-4xl font-bold text-gray-900">${user.walletBalance.toFixed(2)}</div>
                    <p className="text-sm text-gray-500 mt-2">Last updated: Today, 2:30 PM</p>
                  </div>
                  <Wallet className="w-16 h-16 text-brand-600 opacity-20" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <button className="bg-brand-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                  Add $25
                </button>
                <button className="bg-brand-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                  Add $50
                </button>
                <button className="bg-brand-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                  Add $100
                </button>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Loyalty Points</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Available Points</p>
                    <div className="text-4xl font-bold text-gray-900">{user.loyaltyPoints}</div>
                    <p className="text-sm text-gray-500 mt-2">Worth approximately ${Math.floor(user.loyaltyPoints / 10)}</p>
                  </div>
                  <Star className="w-16 h-16 text-yellow-500 opacity-20" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Points earned this month</p>
                    <p className="text-sm text-gray-500">From 3 services</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">+155</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Points redeemed</p>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                  </div>
                  <span className="text-2xl font-bold text-red-600">-0</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                Redeem Points
              </button>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.method}</span>
                        {transaction.bookingId && (
                          <>
                            <span>•</span>
                            <span>#{transaction.bookingId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'refund' || transaction.type === 'promo' ? '+' : transaction.type === 'payment' ? '-' : ''}
                      ${transaction.amount}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-700'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 text-brand-600 hover:text-brand-700 font-medium">
              Load More Transactions
            </button>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Invoices & Receipts</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Calendar className="w-4 h-4" />
                Date Range
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{invoice.id}</td>
                      <td className="py-4 px-4 text-gray-600">{invoice.date}</td>
                      <td className="py-4 px-4 text-gray-600">{invoice.service}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">${invoice.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Receipt className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-700">
                    Need help with invoices? Contact our support team for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  )
}

export default PaymentPage