/**
 * Contact Page - Redesigned with Ergonomic UX
 * 
 * Enhanced with one-click actions, accessibility features,
 * mobile-optimized interactions, and modern design.
 */

'use client'

import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  Navigation,
  Shield,
  Sparkles,
  ExternalLink,
  User,
  Calendar,
  MessageSquare,
  ArrowRight
} from 'lucide-react'
import { MarketingLayout } from '@/shared/layouts/marketing'
import { ErrorBoundary } from '@/shared/errors'
import { 
  useContactPageData, 
  useContactForm, 
  useNewsletterSubscription 
} from '@/features/contact/hooks/useContactData'
import type { ContactFormData } from '@/infrastructure/repositories/interfaces/contact.repository'
import { logger, logFormSubmission } from '@/shared/utils/logger'

const ContactPage = () => {
  // Service-driven data fetching
  const { data: contactData, isLoading, error } = useContactPageData()
  const contactFormMutation = useContactForm()
  const newsletterMutation = useNewsletterSubscription()

  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceInterest: '',
    preferredContact: 'email'
  })

  // UI state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const result = await contactFormMutation.mutateAsync(formData)
      if (result.success) {
        logFormSubmission('contact_form', true, { component: 'ContactPage', userId: formData.email })
        setShowSuccessMessage(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          serviceInterest: '',
          preferredContact: 'email'
        })
      }
    } catch (error) {
      logFormSubmission('contact_form', false, { 
        component: 'ContactPage', 
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' } 
      })
    }
  }

  const handleNewsletterSignup = async (email: string) => {
    try {
      await newsletterMutation.mutateAsync(email)
      logFormSubmission('newsletter_signup', true, { component: 'ContactPage', userId: email })
    } catch (error) {
      logFormSubmission('newsletter_signup', false, { 
        component: 'ContactPage', 
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' } 
      })
    }
  }

  // One-click action handlers
  const handlePhoneCall = () => {
    window.location.href = `tel:${contactData?.contactInfo.phone || '+1-555-123-4567'}`
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactData?.contactInfo.email || 'info@blingauto.com'}?subject=Car Wash Service Inquiry`
  }

  const handleWhatsAppClick = () => {
    const phone = contactData?.contactInfo.phone?.replace(/[^\d]/g, '') || '15551234567'
    const message = encodeURIComponent('Hi! I\'m interested in your car wash services. Can you help me?')
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  const handleDirections = () => {
    const address = contactData?.contactInfo.address
    if (address) {
      const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
      window.open(googleMapsUrl, '_blank')
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <MarketingLayout
        header={{ variant: 'default', showAuth: true }}
        footer={{ showNewsletter: true, onNewsletterSignup: handleNewsletterSignup }}
      >
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Loading contact information...</p>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  // Error state
  if (error || !contactData) {
    return (
      <MarketingLayout
        header={{ variant: 'default', showAuth: true }}
        footer={{ showNewsletter: true, onNewsletterSignup: handleNewsletterSignup }}
      >
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Issue</h2>
            <p className="text-red-600 mb-6">Unable to load contact information</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  // Success message display
  if (showSuccessMessage) {
    return (
      <MarketingLayout
        header={{ variant: 'default', showAuth: true }}
        footer={{ showNewsletter: true, onNewsletterSignup: handleNewsletterSignup }}
      >
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md mx-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent! 🎉</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Thanks for reaching out! We'll get back to you within 2 hours during business hours.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-all transform hover:scale-105"
              >
                Send Another Message
              </button>
              <button
                onClick={handlePhoneCall}
                className="border-2 border-brand-500 text-brand-600 px-8 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Us Instead
              </button>
            </div>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  const { contactInfo } = contactData

  return (
    <ErrorBoundary>
      <MarketingLayout
        header={{ variant: 'default', showAuth: true }}
        footer={{ showNewsletter: true, onNewsletterSignup: handleNewsletterSignup }}
      >
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          {/* Hero Section - Enhanced */}
          <section className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <MessageCircle className="w-4 h-4" />
                  Get In Touch
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Let's Make Your Car 
                  <span className="block text-yellow-400">Shine Together</span>
                </h1>
                <p className="text-xl lg:text-2xl text-brand-100 leading-relaxed mb-10">
                  Ready to experience premium car care? We're here to help with questions, 
                  bookings, and everything in between.
                </p>
                
                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button
                    onClick={handlePhoneCall}
                    aria-label={`Call us at ${contactInfo.phone}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    aria-label="Contact us via WhatsApp"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-5 h-5" />
                    WhatsApp
                  </button>
                  <button
                    onClick={handleEmailClick}
                    aria-label={`Email us at ${contactInfo.email}`}
                    className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all inline-flex items-center justify-center gap-3"
                  >
                    <Mail className="w-5 h-5" />
                    Email Us
                  </button>
                </div>

                <p className="text-brand-200 text-sm">
                  🕒 Average response time: Under 2 hours during business hours
                </p>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Contact Information - Enhanced */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-brand-600" />
                    </div>
                    Contact Info
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="group">
                      <button
                        onClick={handlePhoneCall}
                        aria-label={`Call us at ${contactInfo.phone}`}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Phone className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-green-700">Phone</h3>
                            <p className="text-gray-600 group-hover:text-green-600">{contactInfo.phone}</p>
                            <p className="text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              Tap to call
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
                        </div>
                      </button>
                    </div>

                    {/* Email */}
                    <div className="group">
                      <button
                        onClick={handleEmailClick}
                        aria-label={`Email us at ${contactInfo.email}`}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Mail className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">Email</h3>
                            <p className="text-gray-600 group-hover:text-blue-600">{contactInfo.email}</p>
                            <p className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              Tap to email
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        </div>
                      </button>
                    </div>

                    {/* Address */}
                    <div className="group">
                      <button
                        onClick={handleDirections}
                        aria-label="Get directions to our location"
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <MapPin className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-700">Address</h3>
                            <p className="text-gray-600 group-hover:text-purple-600">
                              {contactInfo.address.street}<br />
                              {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
                            </p>
                            <p className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              Get directions
                            </p>
                          </div>
                          <Navigation className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                        </div>
                      </button>
                    </div>

                    {/* Hours */}
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Mon-Fri:</strong> {contactInfo.hours.weekdays}</p>
                            <p><strong>Weekends:</strong> {contactInfo.hours.weekends}</p>
                            {contactInfo.hours.holidays && (
                              <p><strong>Holidays:</strong> {contactInfo.hours.holidays}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form and Map Section */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Google Maps - Enhanced */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-brand-600" />
                      </div>
                      Find Us
                    </h2>
                  </div>
                  <div className="h-80 lg:h-96">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-74.0444311846856!3d40.68924797933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316db6c6d7%3A0x58b82c3d6d25f25f!2s123%20Business%20St%2C%20Brooklyn%2C%20NY%2011201!5e0!3m2!1sen!2sus!4v1647834567890!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Bling Auto Business Location"
                      aria-label="Interactive map showing Bling Auto business location"
                    />
                  </div>
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-brand-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{contactInfo.address.street}</p>
                          <p className="text-sm text-gray-600">
                            {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleDirections}
                        aria-label="Get directions to our location"
                        className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-all transform hover:scale-105 inline-flex items-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Directions
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Form - Enhanced with Accessibility */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                        <Send className="w-4 h-4 text-brand-600" />
                      </div>
                      Send us a Message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within 2 hours during business hours.
                    </p>
                  </div>
                  
                  {contactFormMutation.error && (
                    <div 
                      className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-start gap-3"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-red-800">Error sending message</h3>
                        <p className="text-red-700 text-sm">
                          {contactFormMutation.error.message || 'Please try again or call us directly.'}
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label 
                          htmlFor="name" 
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          aria-required="true"
                          aria-describedby="name-error"
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                            focusedField === 'name' 
                              ? 'border-brand-500 ring-4 ring-brand-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100`}
                          placeholder="Your full name"
                        />
                        <div id="name-error" role="alert" aria-live="polite" className="sr-only">
                          {/* Error message would go here */}
                        </div>
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          aria-required="true"
                          aria-describedby="email-error"
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                            focusedField === 'email' 
                              ? 'border-brand-500 ring-4 ring-brand-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100`}
                          placeholder="your@email.com"
                        />
                        <div id="email-error" role="alert" aria-live="polite" className="sr-only">
                          {/* Error message would go here */}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone Field */}
                      <div>
                        <label 
                          htmlFor="phone" 
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          aria-describedby="phone-help"
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                            focusedField === 'phone' 
                              ? 'border-brand-500 ring-4 ring-brand-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100`}
                          placeholder="(555) 123-4567"
                        />
                        <p id="phone-help" className="mt-1 text-xs text-gray-500">
                          Optional - for faster responses
                        </p>
                      </div>

                      {/* Service Interest */}
                      <div>
                        <label 
                          htmlFor="serviceInterest" 
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          <Sparkles className="w-4 h-4 inline mr-2" />
                          Service Interest
                        </label>
                        <select
                          id="serviceInterest"
                          name="serviceInterest"
                          value={formData.serviceInterest}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('serviceInterest')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                            focusedField === 'serviceInterest' 
                              ? 'border-brand-500 ring-4 ring-brand-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100`}
                        >
                          <option value="">Select a service</option>
                          <option value="basic-wash">Basic Wash ($25)</option>
                          <option value="premium-wash">Premium Wash ($45)</option>
                          <option value="full-detailing">Full Detailing ($149)</option>
                          <option value="ceramic-coating">Ceramic Coating ($299)</option>
                          <option value="mobile-service">Mobile Service</option>
                          <option value="subscription">Monthly Subscription</option>
                          <option value="other">Other / Custom Request</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label 
                        htmlFor="message" 
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        aria-required="true"
                        aria-describedby="message-help"
                        rows={5}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 resize-none ${
                          focusedField === 'message' 
                            ? 'border-brand-500 ring-4 ring-brand-100' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100`}
                        placeholder="Tell us about your car care needs, preferred timing, or any specific questions..."
                      />
                      <p id="message-help" className="mt-1 text-xs text-gray-500">
                        Include details about your vehicle, preferred appointment time, or special requests
                      </p>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <fieldset>
                        <legend className="block text-sm font-semibold text-gray-700 mb-3">
                          Preferred Contact Method
                        </legend>
                        <div className="flex flex-wrap gap-4">
                          {[
                            { value: 'email', label: 'Email', icon: Mail },
                            { value: 'phone', label: 'Phone', icon: Phone },
                            { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare }
                          ].map(({ value, label, icon: Icon }) => (
                            <label key={value} className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="preferredContact"
                                value={value}
                                checked={formData.preferredContact === value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                                formData.preferredContact === value
                                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}>
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{label}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-4">
                      <button
                        type="submit"
                        disabled={contactFormMutation.isPending}
                        className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        aria-describedby="submit-help"
                      >
                        {contactFormMutation.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                      
                      {/* Privacy Note */}
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>We'll never share your information. Promise! 🔒</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Actions */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="flex">
            <button
              onClick={handlePhoneCall}
              aria-label={`Call us at ${contactInfo.phone}`}
              className="flex-1 bg-green-500 text-white py-4 flex items-center justify-center gap-2 font-semibold hover:bg-green-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call
            </button>
            <button
              onClick={handleWhatsAppClick}
              aria-label="Contact us via WhatsApp"
              className="flex-1 bg-green-600 text-white py-4 flex items-center justify-center gap-2 font-semibold hover:bg-green-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Chat
            </button>
          </div>
        </div>

        {/* Spacer for mobile sticky actions */}
        <div className="h-16 lg:hidden"></div>
      </MarketingLayout>
    </ErrorBoundary>
  )
}

export default ContactPage