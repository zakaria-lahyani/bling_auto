/**
 * Static About Page Data
 * 
 * Complete about page content with SEO optimization.
 * Structured for both static use and API compatibility.
 */

import type { AboutPageData } from '../types'

export const aboutPageData: AboutPageData = {
  seo: {
    title: 'About Bling Auto - Professional Car Care Experts',
    description: 'Learn about Bling Auto, your trusted car care professionals. 8+ years of experience, 2,500+ satisfied customers, and a passion for automotive excellence.',
    keywords: [
      'about bling auto',
      'car care experts',
      'professional detailing',
      'automotive specialists',
      'car care team',
      'detailing professionals',
      'automotive experience',
      'car care company',
      'vehicle specialists',
      'auto detailing experts'
    ],
    ogImage: '/images/og/about-page.jpg',
    canonicalUrl: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About Bling Auto',
      'description': 'Learn about Bling Auto, your trusted car care professionals with 8+ years of experience.',
      'mainEntity': {
        '@type': 'LocalBusiness',
        'name': 'Bling Auto',
        'foundingDate': '2016',
        'founder': {
          '@type': 'Person',
          'name': 'Michael Rodriguez'
        },
        'numberOfEmployees': '12-25',
        'description': 'Professional car care and detailing services'
      }
    }
  },
  hero: {
    title: 'Passionate About Your Vehicle\'s Excellence',
    description: 'For over 8 years, we\'ve been dedicated to providing exceptional car care services that exceed expectations. Our team of skilled professionals treats every vehicle with the care and attention it deserves.',
    image: '/images/about/team-hero.jpg',
    stats: [
      {
        id: '1',
        label: 'Years Experience',
        value: '8',
        description: 'In professional car care',
        icon: 'calendar',
        suffix: '+'
      },
      {
        id: '2',
        label: 'Happy Customers',
        value: '2,500',
        description: 'Satisfied with our service',
        icon: 'users',
        suffix: '+'
      },
      {
        id: '3',
        label: 'Services Completed',
        value: '15,000',
        description: 'Professional services delivered',
        icon: 'check-circle',
        suffix: '+'
      },
      {
        id: '4',
        label: 'Team Members',
        value: '18',
        description: 'Dedicated professionals',
        icon: 'user-check',
        suffix: ''
      }
    ]
  },
  story: {
    title: 'Our Story',
    content: 'Bling Auto was founded in 2016 with a simple mission: to provide the highest quality car care services while making them accessible and convenient for everyone. What started as a small mobile detailing operation has grown into a full-service automotive care company, but our core values remain the same - exceptional quality, outstanding customer service, and a genuine passion for automotive excellence.\n\nOur founder, Michael Rodriguez, started with just a van and a dream. As a lifelong car enthusiast, he noticed a gap in the market for truly professional, reliable car care services. Today, we operate from our state-of-the-art facility while continuing to offer the mobile convenience that started it all.\n\nWe believe that your vehicle is more than just transportation - it\'s an investment, a reflection of your personality, and often a source of pride. That\'s why we treat every car, truck, or SUV that comes through our doors with the same level of care and attention we\'d give our own vehicles.',
    timeline: [
      {
        year: '2016',
        title: 'Humble Beginnings',
        description: 'Started as a mobile-only operation with one van and unlimited passion for car care.'
      },
      {
        year: '2018',
        title: 'First Milestone',
        description: 'Reached 500 satisfied customers and expanded to include interior detailing services.'
      },
      {
        year: '2020',
        title: 'Facility Expansion',
        description: 'Opened our permanent facility, adding paint correction and ceramic coating services.'
      },
      {
        year: '2022',
        title: 'Team Growth',
        description: 'Expanded to 12 team members and introduced specialty services like engine bay cleaning.'
      },
      {
        year: '2024',
        title: 'Excellence Recognized',
        description: 'Achieved 2,500+ happy customers and 4.9-star average rating across all platforms.'
      }
    ],
    images: [
      '/images/about/story-1.jpg',
      '/images/about/story-2.jpg',
      '/images/about/story-3.jpg'
    ]
  },
  team: {
    title: 'Meet Our Expert Team',
    description: 'Our certified professionals bring years of experience and genuine passion for automotive care.',
    members: [
      {
        id: '1',
        name: 'Michael Rodriguez',
        role: 'Founder & CEO',
        bio: 'With over 12 years in the automotive industry, Michael founded Bling Auto to revolutionize car care services. He\'s certified in paint correction and ceramic coating application.',
        image: '/images/team/michael-rodriguez.jpg',
        social: {
          linkedin: 'https://linkedin.com/in/michael-rodriguez',
          email: 'michael@blingauto.com'
        }
      },
      {
        id: '2',
        name: 'Sarah Chen',
        role: 'Operations Manager',
        bio: 'Sarah ensures every service meets our high standards. She has 6 years of experience in automotive services and specializes in customer experience optimization.',
        image: '/images/team/sarah-chen.jpg',
        social: {
          linkedin: 'https://linkedin.com/in/sarah-chen',
          email: 'sarah@blingauto.com'
        }
      },
      {
        id: '3',
        name: 'David Kim',
        role: 'Lead Detailing Technician',
        bio: 'David is our paint correction specialist with 8 years of experience. He\'s trained in advanced polishing techniques and ceramic coating application.',
        image: '/images/team/david-kim.jpg',
        social: {
          linkedin: 'https://linkedin.com/in/david-kim-detailing'
        }
      },
      {
        id: '4',
        name: 'Lisa Thompson',
        role: 'Mobile Service Coordinator',
        bio: 'Lisa manages our mobile operations, ensuring seamless service delivery at customer locations. She has 5 years of experience in mobile automotive services.',
        image: '/images/team/lisa-thompson.jpg',
        social: {
          email: 'lisa@blingauto.com'
        }
      },
      {
        id: '5',
        name: 'Carlos Martinez',
        role: 'Interior Specialist',
        bio: 'Carlos specializes in interior detailing and restoration. His attention to detail and fabric care expertise make him invaluable to our team.',
        image: '/images/team/carlos-martinez.jpg'
      },
      {
        id: '6',
        name: 'Jennifer Walsh',
        role: 'Customer Success Manager',
        bio: 'Jennifer ensures every customer has an exceptional experience from booking to completion. She manages customer relationships and service quality.',
        image: '/images/team/jennifer-walsh.jpg',
        social: {
          email: 'jennifer@blingauto.com'
        }
      }
    ]
  },
  values: {
    title: 'Our Core Values',
    description: 'These principles guide everything we do and define who we are as a company.',
    values: [
      {
        id: '1',
        title: 'Quality Excellence',
        description: 'We never compromise on quality. Every service is performed to the highest standards using professional-grade equipment and products.',
        icon: 'award'
      },
      {
        id: '2',
        title: 'Customer First',
        description: 'Your satisfaction is our priority. We listen to your needs and exceed your expectations with personalized service and attention to detail.',
        icon: 'heart'
      },
      {
        id: '3',
        title: 'Integrity & Trust',
        description: 'We build lasting relationships through honest communication, transparent pricing, and reliable service you can count on.',
        icon: 'shield-check'
      },
      {
        id: '4',
        title: 'Innovation & Growth',
        description: 'We continuously improve our services, adopt new technologies, and train our team to stay at the forefront of automotive care.',
        icon: 'trending-up'
      },
      {
        id: '5',
        title: 'Environmental Responsibility',
        description: 'We use eco-friendly products and water-efficient techniques to minimize our environmental impact while delivering exceptional results.',
        icon: 'leaf'
      },
      {
        id: '6',
        title: 'Community Impact',
        description: 'We\'re proud to serve our local community and support local causes that make a positive difference in people\'s lives.',
        icon: 'users'
      }
    ]
  },
  achievements: {
    title: 'Recognition & Achievements',
    items: [
      {
        id: '1',
        title: 'Best Mobile Detailing Service 2023',
        description: 'Awarded by California Auto Care Association for outstanding mobile service quality and customer satisfaction.',
        icon: 'trophy',
        date: '2023'
      },
      {
        id: '2',
        title: 'Certified Ceramic Coating Installer',
        description: 'Official certification from leading ceramic coating manufacturers for professional application techniques.',
        icon: 'shield',
        date: '2022'
      },
      {
        id: '3',
        title: '4.9 Star Average Rating',
        description: 'Consistently high ratings across Google, Yelp, and Facebook from over 500 customer reviews.',
        icon: 'star',
        date: '2024'
      },
      {
        id: '4',
        title: 'Environmental Excellence Award',
        description: 'Recognized for eco-friendly practices and water conservation in automotive care services.',
        icon: 'leaf',
        date: '2023'
      },
      {
        id: '5',
        title: 'Small Business of the Year Finalist',
        description: 'Nominated by the local Chamber of Commerce for outstanding business growth and community impact.',
        icon: 'building',
        date: '2023'
      },
      {
        id: '6',
        title: 'Professional Training Certified',
        description: 'All team members certified in advanced automotive care techniques and customer service excellence.',
        icon: 'graduation-cap',
        date: '2024'
      }
    ]
  },
  cta: {
    title: 'Ready to Experience the Bling Auto Difference?',
    description: 'Join thousands of satisfied customers who trust us with their vehicles. Experience professional car care that exceeds expectations.',
    primaryCta: {
      text: 'Book Your Service',
      href: '/contact',
      variant: 'primary'
    },
    secondaryCta: {
      text: 'View Our Services',
      href: '/services',
      variant: 'secondary'
    },
    backgroundPattern: 'geometric'
  },
  lastUpdated: new Date().toISOString()
}