/**
 * MarketingFooter Component
 * 
 * Footer specifically designed for marketing and public pages.
 * Clean, simple design with essential information.
 * 
 * Features:
 * - Company branding
 * - Service links
 * - Contact information  
 * - Legal links
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { Car, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface MarketingFooterProps {
  /** Whether to show newsletter signup */
  showNewsletter?: boolean
  
  /** Newsletter signup handler */
  onNewsletterSignup?: (email: string) => void
  
  /** Additional CSS classes */
  className?: string
}

export function MarketingFooter({
  showNewsletter = false,
  onNewsletterSignup,
  className
}: MarketingFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = React.useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail && onNewsletterSignup) {
      onNewsletterSignup(newsletterEmail)
      setNewsletterEmail('')
    }
  }

  return (
    <footer className={cn("bg-surface border-t border-border mt-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-content-primary">
                CarWash Pro
              </span>
            </div>
            <p className="text-content-secondary mb-4 max-w-md">
              Professional car wash services at your convenience. Book online, 
              track your service, and keep your vehicle looking its best.
            </p>
            
            {/* Newsletter Signup */}
            {showNewsletter && (
              <div className="max-w-md">
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email for updates"
                    className="flex-1 px-3 py-2 bg-surface-muted border border-border rounded-lg text-sm focus:outline-none focus:border-brand-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors text-sm font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-content-primary font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-content-secondary hover:text-content-primary">
                  Basic Wash
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-content-secondary hover:text-content-primary">
                  Premium Wash
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-content-secondary hover:text-content-primary">
                  Ceramic Coating
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-content-secondary hover:text-content-primary">
                  Mobile Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-content-primary font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-content-secondary mb-6">
              <li>support@carwashpro.com</li>
              <li>(555) 123-4567</li>
              <li>Mon-Sat: 8AM-6PM</li>
              <li>Sun: 10AM-4PM</li>
            </ul>
            
            {/* Social Media Links */}
            <div>
              <h4 className="text-content-primary font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/blingauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-muted hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 text-content-secondary group-hover:text-white" />
                </a>
                <a
                  href="https://twitter.com/blingauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-muted hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5 text-content-secondary group-hover:text-white" />
                </a>
                <a
                  href="https://instagram.com/blingauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-muted hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 text-content-secondary group-hover:text-white" />
                </a>
                <a
                  href="https://youtube.com/@blingauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-muted hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="w-5 h-5 text-content-secondary group-hover:text-white" />
                </a>
                <a
                  href="https://linkedin.com/company/blingauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-muted hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-content-secondary group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-content-muted text-sm">
            © {new Date().getFullYear()} CarWash Pro. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-content-muted hover:text-content-secondary text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-content-muted hover:text-content-secondary text-sm">
              Terms of Service
            </Link>
            <Link href="/support" className="text-content-muted hover:text-content-secondary text-sm">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MarketingFooter