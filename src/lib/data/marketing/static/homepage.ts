/**
 * Static Homepage Data
 * 
 * All homepage content that can be easily updated.
 * When API is ready, this data structure will be returned by API endpoints.
 */

import type { HomePageData } from '../types'

export const homepageData: HomePageData = {
  seo: {
    title: 'Bling Auto - Premium Car Care & Detailing Services',
    description: 'Professional car care and detailing services. Mobile and in-shop options available. Book online for same-day service. Satisfaction guaranteed.',
    keywords: [
      'car detailing',
      'auto detailing',
      'car wash',
      'mobile car wash',
      'ceramic coating',
      'paint correction',
      'interior detailing',
      'car care services',
      'professional detailing',
      'automotive care'
    ],
    ogImage: '/images/og/homepage.jpg',
    canonicalUrl: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Bling Auto',
      'description': 'Professional car care and detailing services',
      'url': 'https://blingauto.com',
      'telephone': '(555) 123-4567',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '123 Car Care Lane',
        'addressLocality': 'Automotive City',
        'addressRegion': 'CA',
        'postalCode': '90210',
        'addressCountry': 'US'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 34.0522,
        'longitude': -118.2437
      },
      'openingHours': [
        'Mo-Fr 08:00-18:00',
        'Sa 09:00-16:00'
      ],
      'priceRange': '$$',
      'image': '/images/logo.png'
    }
  },
  hero: {
    title: 'Premium Car Care That Comes to You',
    subtitle: 'Professional Detailing Services',
    description: 'Transform your vehicle with our expert car care services. From basic washes to premium detailing, we deliver exceptional results with mobile convenience and in-shop precision.',
    primaryCta: {
      text: 'Book Service Now',
      href: '/contact',
      variant: 'primary'
    },
    secondaryCta: {
      text: 'View All Services',
      href: '/services',
      variant: 'outline'
    },
    backgroundImage: '/images/hero/car-detailing-hero.jpg',
    badge: {
      text: 'Same-Day Service Available',
      variant: 'success'
    },
    highlights: [
      'Mobile & In-Shop Services',
      'Professional Equipment',
      'Satisfaction Guaranteed',
      '500+ Happy Customers'
    ]
  },
  stats: {
    title: 'Trusted by Car Enthusiasts',
    description: 'Join thousands of satisfied customers who trust us with their vehicles',
    items: [
      {
        id: '1',
        label: 'Happy Customers',
        value: '2,500',
        description: 'Satisfied customers trust us',
        icon: 'users',
        suffix: '+'
      },
      {
        id: '2',
        label: 'Services Completed',
        value: '15,000',
        description: 'Professional services delivered',
        icon: 'check-circle',
        suffix: '+'
      },
      {
        id: '3',
        label: 'Years Experience',
        value: '8',
        description: 'In the car care industry',
        icon: 'calendar',
        suffix: '+'
      },
      {
        id: '4',
        label: 'Average Rating',
        value: '4.9',
        description: 'From customer reviews',
        icon: 'star',
        suffix: '/5'
      }
    ]
  },
  services: {
    title: 'Our Premium Services',
    description: 'From quick washes to comprehensive detailing packages, we have the perfect service for your vehicle',
    viewAllCta: {
      text: 'View All Services',
      href: '/services',
      variant: 'primary'
    },
    featuredServices: [] // Will be populated by service data
  },
  features: {
    title: 'Why Choose Bling Auto?',
    description: 'We combine professional expertise with premium products and convenient service',
    items: [
      {
        id: '1',
        title: 'Mobile Convenience',
        description: 'We come to your location - home, office, or anywhere that\'s convenient for you.',
        icon: 'car',
        benefits: [
          'Flexible scheduling',
          'No travel required',
          'Same quality service',
          'Professional mobile setup'
        ],
        cta: {
          text: 'Book Mobile Service',
          href: '/contact?service=mobile'
        }
      },
      {
        id: '2',
        title: 'Professional Equipment',
        description: 'State-of-the-art tools and premium products for superior results every time.',
        icon: 'wrench',
        benefits: [
          'Commercial-grade equipment',
          'Premium cleaning products',
          'Latest technology',
          'Eco-friendly options'
        ]
      },
      {
        id: '3',
        title: 'Expert Technicians',
        description: 'Trained professionals with years of experience and attention to detail.',
        icon: 'users',
        benefits: [
          'Certified technicians',
          'Ongoing training',
          'Quality assurance',
          'Background checked'
        ]
      },
      {
        id: '4',
        title: 'Satisfaction Guarantee',
        description: '100% satisfaction guarantee on all services. Not happy? We\'ll make it right.',
        icon: 'shield-check',
        benefits: [
          'Quality assurance',
          'Re-service if needed',
          'No questions asked',
          'Full refund policy'
        ],
        cta: {
          text: 'Learn More',
          href: '/about#guarantee'
        }
      }
    ]
  },
  testimonials: {
    title: 'What Our Customers Say',
    description: 'Don\'t just take our word for it - hear from real customers who love our service',
    items: [
      {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Business Owner',
        company: 'Tech Startup Inc.',
        content: 'Incredible attention to detail! My car looks brand new after their premium wash service. The mobile team was professional and efficient.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=100&h=100&fit=crop&crop=face',
        location: 'San Francisco, CA',
        serviceUsed: 'Premium Wash'
      },
      {
        id: '2',
        name: 'Mike Chen',
        role: 'Software Engineer',
        company: 'Google',
        content: 'The mobile service is so convenient. They came to my office and did an amazing job on my Tesla. Booking was easy and the results were perfect.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        location: 'Mountain View, CA',
        serviceUsed: 'Full Detailing'
      },
      {
        id: '3',
        name: 'Lisa Rodriguez',
        role: 'Marketing Director',
        company: 'Fashion Brand Co.',
        content: 'Best car detailing service in town. The interior cleaning was phenomenal and they even got out stains I thought were permanent!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
        location: 'Los Angeles, CA',
        serviceUsed: 'Interior Detailing'
      },
      {
        id: '4',
        name: 'David Kim',
        role: 'Real Estate Agent',
        content: 'I use Bling Auto monthly for my work vehicle. Consistent quality, fair pricing, and excellent customer service. Highly recommended!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        location: 'Orange County, CA',
        serviceUsed: 'Monthly Package'
      },
      {
        id: '5',
        name: 'Jennifer Walsh',
        role: 'Doctor',
        company: 'City Medical Center',
        content: 'The ceramic coating service was worth every penny. My car still looks amazing after 6 months and cleaning is so much easier now.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1559548331-f9cb98648c85?w=100&h=100&fit=crop&crop=face',
        location: 'San Diego, CA',
        serviceUsed: 'Ceramic Protection'
      },
      {
        id: '6',
        name: 'Robert Taylor',
        role: 'Retired',
        content: 'These folks know classic cars. They treated my 1967 Mustang with the care and respect it deserves. Outstanding work!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
        location: 'Pasadena, CA',
        serviceUsed: 'Classic Car Detail'
      }
    ]
  },
  cta: {
    title: 'Ready to Transform Your Vehicle?',
    description: 'Join thousands of satisfied customers and experience the Bling Auto difference. Book your service today and see why we\'re the #1 choice for car care.',
    primaryCta: {
      text: 'Book Service Now',
      href: '/contact',
      variant: 'primary'
    },
    secondaryCta: {
      text: 'Get Free Quote',
      href: '/contact?type=quote',
      variant: 'secondary'
    },
    backgroundPattern: 'dots'
  },
  lastUpdated: new Date().toISOString()
}