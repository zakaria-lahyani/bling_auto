/**
 * Payment & Wallet Management Page
 * 
 * Comprehensive payment management including cards, wallet balance,
 * transaction history, invoices, and promo codes.
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
  CreditCardIcon
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment & Wallet</h1>
          <p className="text-gray-600">Manage your payment methods, wallet, and transaction history</p>
        </div>

        {/* Wallet Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-90">Available</span>
            </div>
            <div className="text-3xl font-bold mb-1">${user.walletBalance.toFixed(2)}</div>
            <p className="text-sm opacity-90">Wallet Balance</p>
            <button className="mt-4 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Add Funds <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-90">Available</span>
            </div>
            <div className="text-3xl font-bold mb-1">{user.loyaltyPoints}</div>
            <p className="text-sm opacity-90">Loyalty Points</p>
            <p className="mt-4 text-sm opacity-90">≈ ${Math.floor(user.loyaltyPoints / 10)} value</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-90">This Month</span>
            </div>
            <div className="text-3xl font-bold mb-1">$155</div>
            <p className="text-sm opacity-90">Total Spent</p>
            <p className="mt-4 text-sm opacity-90">3 services</p>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-90">Active</span>
            </div>
            <div className="text-3xl font-bold mb-1">2</div>
            <p className="text-sm opacity-90">Promo Codes</p>
            <button className="mt-4 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'methods'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Payment Methods
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'wallet'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Wallet & Points
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'invoices'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Invoices
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'methods' && (
          <div className="space-y-6">
            {/* Payment Methods List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Saved Payment Methods</h2>
                <button
                  onClick={() => setShowAddCard(true)}
                  className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Card
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-brand-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        {method.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            {method.type === 'visa' && 'Visa'}
                            {method.type === 'mastercard' && 'Mastercard'}
                            {method.type === 'apple' && 'Apple Pay'}
                            {' '}****{method.last4}
                          </span>
                          {method.primary && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {method.expiry ? `Expires ${method.expiry}` : 'Digital Wallet'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!method.primary && (
                        <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                          Set as Primary
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
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