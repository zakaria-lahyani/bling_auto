/**
 * Booking Flow - Premium, Modern booking experience
 * 
 * Features smooth step transitions, enhanced visual feedback,
 * and premium UI elements with glassmorphism design.
 */

'use client'

import React, { useState, useEffect } from 'react'
import {
  Car,
  Calendar,
  MapPin,
  CreditCard,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Sparkles,
  Droplets,
  Award,
  Home,
  Building,
  MapPinIcon,
  Plus,
  Gift,
  Info,
  Zap,
  Heart,
  Crown,
  Flame,
  ChevronRight,
  Users,
  Timer,
  Truck
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'

interface BookingFlowProps {
  user?: {
    name: string
    email: string
    loyaltyPoints: number
    membershipStatus: string
  }
}

type BookingStep = 'service' | 'datetime' | 'location' | 'payment' | 'confirmation'

const BookingFlow: React.FC<BookingFlowProps> = ({
  user = {
    name: 'Sarah',
    email: 'sarah@example.com',
    loyaltyPoints: 850,
    membershipStatus: 'Premium'
  }
}) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('service')
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Enhanced service data with modern appeal
  const services = [
    {
      id: 'basic',
      name: 'Essential Wash',
      price: 25,
      originalPrice: null,
      duration: '30 min',
      description: 'Perfect for regular maintenance with premium soap and care',
      features: ['Exterior wash', 'Premium soap', 'Spot-free rinse', 'Basic dry'],
      popular: true,
      discount: null,
      icon: Droplets,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      rating: 4.8,
      bookings: '2.1k+'
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      price: 72,
      originalPrice: 85,
      duration: '2 hours',
      description: 'Complete transformation inside and out',
      features: ['Interior deep clean', 'Exterior detail', 'Premium products', 'Tire shine', 'Air freshener'],
      recommended: true,
      discount: 15,
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      rating: 4.9,
      bookings: '1.8k+'
    },
    {
      id: 'express',
      name: 'Express Shine',
      price: 45,
      originalPrice: null,
      duration: '45 min',
      description: 'Quick wash with lasting protection',
      features: ['Wash & rinse', 'Wax application', 'Quick dry', 'Wheel clean'],
      popular: false,
      discount: null,
      icon: Zap,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'from-amber-50 to-amber-100',
      rating: 4.7,
      bookings: '980+'
    },
    {
      id: 'ceramic',
      name: 'Ceramic Shield',
      price: 254,
      originalPrice: 299,
      duration: '4 hours',
      description: 'Ultimate protection with ceramic coating technology',
      features: ['Paint correction', 'Ceramic application', '2-year warranty', 'Hydrophobic finish', 'UV protection'],
      premium: true,
      discount: 15,
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      rating: 5.0,
      bookings: '450+'
    }
  ]

  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true }
  ]

  const savedLocations = [
    { id: 'home', name: 'Home', address: '123 Main Street, Brooklyn, NY 11201', icon: Home, type: 'Residential' },
    { id: 'office', name: 'Office', address: '456 Business Ave, Manhattan, NY 10001', icon: Building, type: 'Commercial' }
  ]

  const paymentMethods = [
    { id: 'card1', type: 'card', name: 'Visa ****1234', icon: CreditCard, primary: true },
    { id: 'card2', type: 'card', name: 'Mastercard ****5678', icon: CreditCard, primary: false },
    { id: 'points', type: 'points', name: 'Loyalty Points', icon: Gift, balance: user.loyaltyPoints, primary: false }
  ]

  const steps = [
    { key: 'service', title: 'Service', icon: Car, completed: currentStep !== 'service', color: 'from-blue-500 to-blue-600' },
    { key: 'datetime', title: 'Date & Time', icon: Calendar, completed: ['location', 'payment', 'confirmation'].includes(currentStep), color: 'from-green-500 to-green-600' },
    { key: 'location', title: 'Location', icon: MapPin, completed: ['payment', 'confirmation'].includes(currentStep), color: 'from-orange-500 to-orange-600' },
    { key: 'payment', title: 'Payment', icon: CreditCard, completed: currentStep === 'confirmation', color: 'from-purple-500 to-purple-600' },
    { key: 'confirmation', title: 'Confirm', icon: CheckCircle, completed: false, color: 'from-emerald-500 to-emerald-600' }
  ]

  const nextStep = () => {
    const stepOrder: BookingStep[] = ['service', 'datetime', 'location', 'payment', 'confirmation']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      const nextStepValue = stepOrder[currentIndex + 1]
      if (nextStepValue) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentStep(nextStepValue)
          setIsAnimating(false)
        }, 150)
      }
    }
  }

  const prevStep = () => {
    const stepOrder: BookingStep[] = ['service', 'datetime', 'location', 'payment', 'confirmation']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      const prevStepValue = stepOrder[currentIndex - 1]
      if (prevStepValue) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentStep(prevStepValue)
          setIsAnimating(false)
        }, 150)
      }
    }
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 'service':
        return (
          <div className={`space-y-8 transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
                <Car className="w-6 h-6 text-brand-600" />
                <span className="text-brand-700 font-semibold">Step 1 of 5</span>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Choose Your Service
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the perfect wash experience for your vehicle
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
                    selectedService?.id === service.id
                      ? 'shadow-2xl shadow-brand-500/25 ring-2 ring-brand-500'
                      : 'shadow-xl hover:shadow-2xl hover:shadow-gray-500/20'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-50`}></div>
                  
                  {/* Selection Overlay */}
                  {selectedService?.id === service.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`}></div>
                  )}
                  
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 h-full">
                    {/* Service badges */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex flex-wrap gap-2">
                        {service.popular && (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full font-medium shadow-lg">
                            <Flame className="w-3 h-3" />
                            Popular
                          </span>
                        )}
                        {service.recommended && (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs rounded-full font-medium shadow-lg">
                            <Crown className="w-3 h-3" />
                            Recommended
                          </span>
                        )}
                        {service.premium && (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs rounded-full font-medium shadow-lg">
                            <Award className="w-3 h-3" />
                            Premium
                          </span>
                        )}
                        {service.discount && (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full font-medium shadow-lg animate-pulse">
                            <Zap className="w-3 h-3" />
                            {service.discount}% OFF
                          </span>
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </div>

                      {/* Rating and Social Proof */}
                      <div className="flex items-center gap-4 py-2">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 ml-1">{service.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{service.bookings} bookings</span>
                        </div>
                      </div>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">${service.price}</span>
                      {service.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${service.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                  </div>
                    </div>

                  {selectedService?.id === service.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'datetime':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick Date & Time</h2>
              <p className="text-gray-600">When would you like your {selectedService?.name}?</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Select Date</h3>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDateTime({ ...selectedDateTime, date })}
                        className={`p-2 text-sm rounded-lg transition-colors ${
                          selectedDateTime?.date === date
                            ? 'bg-brand-500 text-white'
                            : date < 18
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        disabled={date < 18}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Time slots */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Available Times</h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedDateTime({ ...selectedDateTime, time: slot.time })}
                      disabled={!slot.available}
                      className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                        selectedDateTime?.time === slot.time
                          ? 'bg-brand-500 text-white'
                          : slot.available
                          ? 'bg-white border border-gray-200 text-gray-700 hover:border-brand-300'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'location':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Location</h2>
              <p className="text-gray-600">Where should we come to wash your car?</p>
            </div>
            
            <div className="space-y-4">
              {savedLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation?.id === location.id
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                      <location.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{location.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {location.type}
                        </span>
                      </div>
                      <p className="text-gray-600">{location.address}</p>
                    </div>
                    {selectedLocation?.id === location.id && (
                      <CheckCircle className="w-6 h-6 text-brand-500" />
                    )}
                  </div>
                </div>
              ))}
              
              <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-600 hover:border-brand-300 hover:text-brand-600 transition-colors">
                <div className="flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Location
                </div>
              </button>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
              <p className="text-gray-600">How would you like to pay?</p>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method)}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedPayment?.id === method.id
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                        {method.type === 'points' && (
                          <p className="text-sm text-gray-600">{method.balance} points available</p>
                        )}
                        {method.primary && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedPayment?.id === method.id && (
                      <CheckCircle className="w-6 h-6 text-brand-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedService?.name}</span>
                  <span className="font-medium">${selectedService?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-medium">$2</span>
                </div>
                {user.membershipStatus === 'Premium' && (
                  <div className="flex justify-between text-green-600">
                    <span>Premium discount (10%)</span>
                    <span>-${Math.round((selectedService?.price * 0.1) || 0)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${Math.round((selectedService?.price || 0) + 2 - (user.membershipStatus === 'Premium' ? (selectedService?.price * 0.1 || 0) : 0))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'confirmation':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h2>
              <p className="text-gray-600">Your car wash has been scheduled successfully</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time</span>
                  <span className="font-medium">Jan {selectedDateTime?.date}, {selectedDateTime?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{selectedLocation?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold">${Math.round((selectedService?.price || 0) + 2 - (user.membershipStatus === 'Premium' ? (selectedService?.price * 0.1 || 0) : 0))}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Track Your Booking
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                Back to Dashboard
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ClientLayout user={user}>
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed
                    ? 'bg-brand-500 text-white'
                    : currentStep === step.key
                    ? 'bg-brand-100 text-brand-700 border-2 border-brand-500'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step.completed || currentStep === step.key ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ml-4 ${
                    step.completed ? 'bg-brand-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {getStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 'service'}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              currentStep === 'service'
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          {currentStep !== 'confirmation' && (
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 'service' && !selectedService) ||
                (currentStep === 'datetime' && (!selectedDateTime?.date || !selectedDateTime?.time)) ||
                (currentStep === 'location' && !selectedLocation) ||
                (currentStep === 'payment' && !selectedPayment)
              }
              className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 'payment' ? 'Confirm Booking' : 'Continue'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </ClientLayout>
  )
}

export default BookingFlow