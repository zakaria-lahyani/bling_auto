/**
 * About Page
 * 
 * Professional company information page with clean, modern design
 * focusing on company story, mission, and achievements.
 */
'use client'

import React from 'react'
import { 
  Users, 
  Award, 
  Clock, 
  Shield, 
  Target, 
  Heart, 
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react'
import { MarketingLayout } from '@/shared/layouts/marketing'

const AboutPage = () => {
  // Newsletter signup handler (consistent with other pages)
  const handleNewsletterSignup = (email: string) => {
    console.log('Newsletter signup:', email)
    // TODO: Implement newsletter signup logic
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
      {/* Hero Header - Clean and Professional */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-content-primary mb-6">
              About Bling Auto
            </h1>
            <p className="text-xl text-content-secondary leading-relaxed">
              We're revolutionizing automotive care through premium mobile services, 
              cutting-edge technology, and an unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-content-secondary">
                <p className="text-lg leading-relaxed">
                  Founded in 2020, Bling Auto began with a simple observation: car care shouldn't be 
                  a hassle. Our founders, passionate automotive enthusiasts, saw an opportunity to 
                  transform the industry by bringing premium services directly to our customers.
                </p>
                <p className="text-lg leading-relaxed">
                  What started as a small mobile operation has grown into a trusted brand serving 
                  thousands of customers across the region. We've maintained our core values of 
                  quality, convenience, and customer satisfaction while continuously innovating 
                  our services and processes.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we're proud to be the preferred choice for discerning vehicle owners who 
                  demand excellence without compromise.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">2020</div>
                  <div className="text-sm text-content-secondary">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">2,500+</div>
                  <div className="text-sm text-content-secondary">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">25+</div>
                  <div className="text-sm text-content-secondary">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">4.9★</div>
                  <div className="text-sm text-content-secondary">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-4">
              Our Foundation
            </h2>
            <p className="text-xl text-content-secondary max-w-3xl mx-auto">
              The principles that guide our decisions and define our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-content-primary mb-4">Our Mission</h3>
              <p className="text-content-secondary">
                To deliver exceptional automotive care that saves time while exceeding expectations, 
                making vehicle maintenance effortless and results outstanding.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-content-primary mb-4">Our Vision</h3>
              <p className="text-content-secondary">
                To become the leading automotive care provider, setting new standards for 
                convenience, quality, and customer satisfaction in every market we serve.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-content-primary mb-4">Our Values</h3>
              <p className="text-content-secondary">
                Excellence in every detail, unwavering reliability, customer-first approach, 
                and complete trust through transparency and professional integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-content-secondary">
              Key milestones that shaped our growth and success.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-brand-600 font-semibold mb-1">2020</div>
                  <h3 className="text-xl font-bold text-content-primary mb-2">Company Founded</h3>
                  <p className="text-content-secondary">
                    Launched with a mobile-first approach, serving our first customers with 
                    premium on-site vehicle care services.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-brand-600 font-semibold mb-1">2021</div>
                  <h3 className="text-xl font-bold text-content-primary mb-2">Rapid Expansion</h3>
                  <p className="text-content-secondary">
                    Expanded our service area and team, reaching 500+ satisfied customers 
                    and establishing our reputation for excellence.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-brand-600 font-semibold mb-1">2022</div>
                  <h3 className="text-xl font-bold text-content-primary mb-2">Industry Recognition</h3>
                  <p className="text-content-secondary">
                    Achieved 4.9-star average rating and received multiple customer service 
                    awards for our commitment to quality.
                  </p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-brand-600 font-semibold mb-1">2024</div>
                  <h3 className="text-xl font-bold text-content-primary mb-2">Innovation & Growth</h3>
                  <p className="text-content-secondary">
                    Launched advanced booking system, expanded service offerings, and now 
                    proudly serve over 2,500 customers with our growing team of professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Commitment</h2>
            <p className="text-xl text-brand-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Every member of our team shares the same passion for automotive excellence and 
              customer satisfaction. We're not just cleaning cars—we're delivering peace of mind.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-lg font-semibold">Fully Insured</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-lg font-semibold">Eco-Friendly</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-lg font-semibold">Professional Team</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-lg font-semibold">Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-content-primary mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-content-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Bling Auto with their vehicle care needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-brand-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started Today
            </a>
            <a
              href="/services"
              className="border-2 border-brand-500 text-brand-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default AboutPage