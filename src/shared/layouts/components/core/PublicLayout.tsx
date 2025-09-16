'use client'

import Link from 'next/link'
import { Car, Menu, X, User, LogIn } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { ChildrenType } from '@/shared/types'
import { AuthService } from '@/infrastructure/auth/auth'
import { cn } from '@/shared/utils'

const PublicLayout = ({ children }: ChildrenType) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<ReturnType<typeof AuthService.getCurrentUser>>(null)

  useEffect(() => {
    setUser(AuthService.getCurrentUser())
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Connect', href: '/connect' },
    { name: 'About', href: '/about' },
  ]

  return (
    <div className="min-h-screen bg-page-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-content-primary">
                CarWash Pro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-content-secondary hover:text-content-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <Link
                  href="/dashboards/analytics"
                  className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors font-medium"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-content-secondary hover:text-content-primary transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-muted transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-content-secondary hover:text-content-primary transition-colors font-medium px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border flex flex-col gap-2">
                  {user ? (
                    <Link
                      href="/dashboards/analytics"
                      className="bg-brand-500 text-white px-4 py-2 rounded-lg text-center font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-content-secondary hover:text-content-primary transition-colors font-medium px-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/login"
                        className="bg-brand-500 text-white px-4 py-2 rounded-lg text-center font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
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
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-content-primary font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-content-secondary hover:text-content-primary">Basic Wash</Link></li>
                <li><Link href="/services" className="text-content-secondary hover:text-content-primary">Premium Wash</Link></li>
                <li><Link href="/services" className="text-content-secondary hover:text-content-primary">Ceramic Coating</Link></li>
                <li><Link href="/services" className="text-content-secondary hover:text-content-primary">Mobile Service</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-content-primary font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-content-secondary">
                <li>support@carwashpro.com</li>
                <li>(555) 123-4567</li>
                <li>Mon-Sat: 8AM-6PM</li>
                <li>Sun: 10AM-4PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-content-muted text-sm">
              © 2024 CarWash Pro. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-content-muted hover:text-content-secondary text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-content-muted hover:text-content-secondary text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-content-muted hover:text-content-secondary text-sm">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout