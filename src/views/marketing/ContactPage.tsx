/**
 * Contact Page - Refactored for Service-Driven Architecture
 * 
 * Pure presentation component that uses service hooks.
 * Single responsibility: Coordinate contact data and form interactions.
 */

'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
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

  // Loading state
  if (isLoading) {
    return (
      <MarketingLayout
        header={{ variant: 'default', showAuth: true }}
        footer={{ showNewsletter: true, onNewsletterSignup: handleNewsletterSignup }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contact information...</p>
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Unable to load contact information</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700"
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              We've received your message and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="bg-brand-600 text-white px-6 py-2 rounded-md hover:bg-brand-700"
            >
              Send Another Message
            </button>
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
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
                <p className="text-xl text-brand-100 max-w-3xl mx-auto">
                  Have questions about our services? Ready to book your car care appointment? 
                  We'd love to hear from you!
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-brand-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-brand-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-brand-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        {contactInfo.address.street}<br />
                        {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-brand-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Hours</h3>
                      <p className="text-gray-600">
                        <strong>Weekdays:</strong> {contactInfo.hours.weekdays}<br />
                        <strong>Weekends:</strong> {contactInfo.hours.weekends}
                        {contactInfo.hours.holidays && (
                          <>
                            <br />
                            <strong>Holidays:</strong> {contactInfo.hours.holidays}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                
                {contactFormMutation.error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700">
                      {contactFormMutation.error.message || 'Failed to send message. Please try again.'}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="serviceInterest" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Interest
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="">Select a service</option>
                        <option value="basic-wash">Basic Wash</option>
                        <option value="premium-wash">Premium Wash</option>
                        <option value="full-detailing">Full Detailing</option>
                        <option value="ceramic-coating">Ceramic Coating</option>
                        <option value="mobile-service">Mobile Service</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Tell us about your car care needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactFormMutation.isPending}
                    className="w-full bg-brand-600 text-white px-6 py-3 rounded-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {contactFormMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </MarketingLayout>
    </ErrorBoundary>
  )
}

export default ContactPage