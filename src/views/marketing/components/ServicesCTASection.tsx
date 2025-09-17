/**
 * Services CTA Section Component
 * 
 * Call-to-action section that appears at the bottom of the services page
 * when services are available, encouraging users to book.
 */

import React from 'react'
import Link from 'next/link'

interface ServicesCTASectionProps {
  hasServices: boolean
  className?: string
}

const ArrowIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M7 17L17 7M17 7H8M17 7V16" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const ServicesCTASection: React.FC<ServicesCTASectionProps> = ({ 
  hasServices,
  className = ''
}) => {
  if (!hasServices) {
    return null
  }

  return (
    <section className={`py-16 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Book Your Service?
        </h2>
        <p className="text-xl text-brand-100 mb-8">
          Choose from our professional car care services and experience the difference.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-brand-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
          >
            Book Now
            <div className="w-5 h-5">
              <ArrowIcon />
            </div>
          </Link>
          
          <Link
            href="/about"
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-brand-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            Learn More
          </Link>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 text-sm text-brand-100">
          <p>📞 Call us at (555) 123-4567 or book online</p>
          <p>✨ Same-day service available • 🚗 Mobile service at your location</p>
        </div>
      </div>
    </section>
  )
}