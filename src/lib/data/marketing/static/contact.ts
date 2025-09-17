/**
 * Static Contact Page Data
 * 
 * Complete contact page content with SEO optimization.
 * Structured for both static use and API compatibility.
 */

import type { ContactPageData } from '../types'

export const contactPageData: ContactPageData = {
  seo: {
    title: 'Contact Bling Auto - Book Professional Car Care Services',
    description: 'Contact Bling Auto for professional car care services. Call (555) 123-4567, email info@blingauto.com, or book online. Mobile and in-shop services available.',
    keywords: [
      'contact bling auto',
      'book car service',
      'car detailing appointment',
      'mobile car wash booking',
      'car care contact',
      'auto detailing phone',
      'vehicle service booking',
      'professional car care',
      'schedule car service',
      'auto care appointment'
    ],
    ogImage: '/images/og/contact-page.jpg',
    canonicalUrl: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Bling Auto',
      'description': 'Contact information and booking for professional car care services.',
      'mainEntity': {
        '@type': 'LocalBusiness',
        'name': 'Bling Auto',
        'telephone': '(555) 123-4567',
        'email': 'info@blingauto.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '123 Car Care Lane',
          'addressLocality': 'Automotive City',
          'addressRegion': 'CA',
          'postalCode': '90210',
          'addressCountry': 'US'
        }
      }
    }
  },
  hero: {
    title: 'Get In Touch With Our Car Care Experts',
    description: 'Ready to transform your vehicle? Contact us today to schedule your service or get a free quote. We offer flexible booking options and same-day service availability.',
    benefits: [
      'Free quotes and consultations',
      'Same-day service available',
      'Mobile and in-shop options',
      'Flexible scheduling',
      'Professional customer service',
      'Satisfaction guarantee'
    ]
  },
  info: {
    phone: '(555) 123-4567',
    email: 'info@blingauto.com',
    address: {
      street: '123 Car Care Lane',
      city: 'Automotive City',
      state: 'CA',
      zip: '90210',
      country: 'US',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437
      }
    },
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed',
      timezone: 'PST'
    },
    socialMedia: {
      facebook: 'https://facebook.com/blingauto',
      instagram: 'https://instagram.com/blingauto',
      twitter: 'https://twitter.com/blingauto',
      google: 'https://g.page/blingauto',
      yelp: 'https://yelp.com/biz/bling-auto'
    },
    emergencyContact: {
      phone: '(555) 123-HELP',
      available: '24/7 for emergency roadside assistance'
    }
  },
  locations: [
    {
      id: '1',
      name: 'Main Service Center',
      address: {
        street: '123 Car Care Lane',
        city: 'Automotive City',
        state: 'CA',
        zip: '90210',
        country: 'US',
        coordinates: {
          lat: 34.0522,
          lng: -118.2437
        }
      },
      phone: '(555) 123-4567',
      hours: {
        monday: '8:00 AM - 6:00 PM',
        tuesday: '8:00 AM - 6:00 PM',
        wednesday: '8:00 AM - 6:00 PM',
        thursday: '8:00 AM - 6:00 PM',
        friday: '8:00 AM - 6:00 PM',
        saturday: '9:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      services: [
        'Full Detailing',
        'Paint Correction',
        'Ceramic Coating',
        'Interior Detailing',
        'Engine Bay Cleaning',
        'Headlight Restoration'
      ],
      manager: 'Sarah Chen',
      image: '/images/locations/main-center.jpg'
    },
    {
      id: '2',
      name: 'Mobile Service Hub',
      address: {
        street: '456 Mobile Way',
        city: 'Service District',
        state: 'CA',
        zip: '90211',
        country: 'US',
        coordinates: {
          lat: 34.0622,
          lng: -118.2537
        }
      },
      phone: '(555) 123-MOBILE',
      hours: {
        monday: '7:00 AM - 7:00 PM',
        tuesday: '7:00 AM - 7:00 PM',
        wednesday: '7:00 AM - 7:00 PM',
        thursday: '7:00 AM - 7:00 PM',
        friday: '7:00 AM - 7:00 PM',
        saturday: '8:00 AM - 5:00 PM',
        sunday: '9:00 AM - 3:00 PM'
      },
      services: [
        'Mobile Complete Wash',
        'Basic Wash',
        'Premium Wash',
        'Express Detail',
        'Headlight Restoration'
      ],
      manager: 'Lisa Thompson',
      image: '/images/locations/mobile-hub.jpg'
    }
  ],
  faqs: {
    title: 'Frequently Asked Questions',
    items: [
      {
        id: '1',
        question: 'How do I schedule an appointment?',
        answer: 'You can schedule an appointment by calling us at (555) 123-4567, emailing info@blingauto.com, or using our online booking form. We offer same-day service based on availability.',
        category: 'booking'
      },
      {
        id: '2',
        question: 'Do you offer mobile services?',
        answer: 'Yes! We offer mobile services for many of our car care options. Our mobile team will come to your location with all necessary equipment and supplies. Some specialized services like paint correction require our in-shop facility.',
        category: 'services'
      },
      {
        id: '3',
        question: 'What areas do you serve for mobile services?',
        answer: 'We provide mobile services within a 25-mile radius of our main facility in Automotive City, CA. This includes most of Los Angeles County and surrounding areas. Contact us to confirm service availability in your area.',
        category: 'services'
      },
      {
        id: '4',
        question: 'How long do services typically take?',
        answer: 'Service duration varies by type: Basic Wash (30 min), Premium Wash (75 min), Full Detailing (4 hours), Paint Correction (6 hours). We provide estimated timeframes when you book and will keep you updated throughout the service.',
        category: 'services'
      },
      {
        id: '5',
        question: 'What forms of payment do you accept?',
        answer: 'We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and digital payments including Apple Pay and Google Pay. Payment is due upon completion of service.',
        category: 'payment'
      },
      {
        id: '6',
        question: 'Do you offer any guarantees?',
        answer: 'Absolutely! We offer a 100% satisfaction guarantee on all services. If you\'re not completely satisfied with our work, we\'ll re-service your vehicle at no additional charge or provide a full refund.',
        category: 'policy'
      },
      {
        id: '7',
        question: 'How often should I have my car detailed?',
        answer: 'For optimal protection and appearance, we recommend full detailing every 3-4 months, with maintenance washes every 2-3 weeks. However, frequency depends on your driving conditions, vehicle usage, and personal preferences.',
        category: 'maintenance'
      },
      {
        id: '8',
        question: 'What should I do to prepare my vehicle?',
        answer: 'Remove all personal items from your vehicle before service. For mobile services, ensure access to water and electricity if possible. No other preparation is needed - we handle everything else!',
        category: 'preparation'
      },
      {
        id: '9',
        question: 'Do you work on all vehicle types?',
        answer: 'Yes! We service all types of vehicles including cars, trucks, SUVs, motorcycles, and RVs. Our team has experience with luxury vehicles, classic cars, and everyday drivers.',
        category: 'vehicles'
      },
      {
        id: '10',
        question: 'What if I need to cancel or reschedule?',
        answer: 'We understand plans change! Please give us at least 24 hours notice for cancellations or rescheduling to avoid any fees. You can call us or email to make changes to your appointment.',
        category: 'policy'
      },
      {
        id: '11',
        question: 'Are your products safe for the environment?',
        answer: 'Yes! We use eco-friendly, biodegradable products whenever possible and employ water-efficient techniques. We\'re committed to providing excellent results while minimizing environmental impact.',
        category: 'environment'
      },
      {
        id: '12',
        question: 'Do you offer corporate or fleet services?',
        answer: 'Yes! We offer special pricing and scheduling for corporate fleets, dealerships, and businesses with multiple vehicles. Contact us to discuss your specific needs and receive a custom quote.',
        category: 'business'
      }
    ]
  },
  lastUpdated: new Date().toISOString()
}