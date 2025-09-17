'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { MarketingLayout } from '@/shared/layouts/marketing'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Newsletter signup handler (same as landing page)
  const handleNewsletterSignup = (email: string) => {
    console.log('Newsletter signup:', email)
    // TODO: Implement newsletter signup logic
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <MarketingLayout
        header={{
          variant: 'default',
          showAuth: true
        }}
        footer={{
          showNewsletter: true,
          onNewsletterSignup: handleNewsletterSignup
        }}
      >
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-gray-100">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-2">Message Sent!</h2>
            <p className="text-content-secondary mb-6">
              Thank you! We'll get back to you within 2 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', email: '', phone: '', message: '' })
              }}
              className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors font-semibold"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  return (
    <MarketingLayout
      header={{
        variant: 'default',
        showAuth: true
      }}
      footer={{
        showNewsletter: true,
        onNewsletterSignup: handleNewsletterSignup
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-content-primary mb-6">Get in Touch</h1>
            <p className="text-xl text-content-secondary max-w-3xl mx-auto leading-relaxed">
              Ready to give your car the premium treatment it deserves? Contact Bling Auto today 
              and experience professional vehicle care at its finest.
            </p>
          </div>

          <div className="space-y-12">
            {/* Two Main Cards Row */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Information Card */}
              <div className="bg-white rounded-2xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center pb-6 border-b border-gray-100">
                    <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-2">Contact Information</h2>
                    <p className="text-content-secondary">Multiple ways to reach our team</p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg">
                      <div className="relative">
                        <Phone className="w-6 h-6 text-white" fill="currentColor" />
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-content-primary mb-2">Call Us</h3>
                      <a 
                        href="tel:+15551234567" 
                        className="text-2xl font-bold text-brand-600 hover:text-brand-700 block mb-1 transition-colors"
                      >
                        (555) 123-4567
                      </a>
                      <p className="text-content-secondary text-sm mb-3">Available 7 days a week</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg">
                        <CheckCircle className="w-3 h-3" />
                        Currently Open
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-content-primary mb-2">Email Us</h3>
                      <a 
                        href="mailto:info@blingauto.com" 
                        className="text-lg font-bold text-brand-600 hover:text-brand-700 block mb-1 transition-colors"
                      >
                        info@blingauto.com
                      </a>
                      <p className="text-content-secondary text-sm mb-3">Response within 2 hours</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                        Fast Response
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-content-primary mb-3">Business Hours</h3>
                      <div className="bg-surface-muted rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-content-secondary text-sm">Monday - Friday</span>
                          <span className="text-content-primary font-semibold text-sm">8:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-content-secondary text-sm">Saturday</span>
                          <span className="text-content-primary font-semibold text-sm">8:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-content-secondary text-sm">Sunday</span>
                          <span className="text-content-primary font-semibold text-sm">10:00 AM - 4:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="bg-white rounded-2xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="text-center pb-6 border-b border-gray-100 mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-2">Send us a Message</h2>
                  <p className="text-content-secondary">We'll get back to you within 2 hours</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-content-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 text-content-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-content-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 text-content-primary"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-content-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 text-content-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-content-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 text-content-primary resize-none"
                      placeholder="Tell us about your vehicle and what service you're interested in..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white py-5 px-6 rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Google Maps Card - Full Width Horizontal */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-300">
              <div className="p-8 border-b border-gray-100">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-2">Find Us on the Map</h2>
                  <p className="text-content-secondary">Conveniently located in downtown Metro City with easy access and free parking</p>
                </div>
              </div>
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
              <div className="p-6 bg-gradient-to-r from-surface-muted to-surface">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-brand-500" />
                    <span className="text-content-primary font-semibold">123 Auto Street, Downtown District, Metro City</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-content-secondary">📍 15 minutes from downtown</span>
                    <a
                      href="https://maps.google.com/maps?q=123+Auto+Street,+Downtown+District,+Metro+City,+MC+12345"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors font-bold flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}

export default ContactPage