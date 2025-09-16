/**
 * Services Page Data
 * 
 * Centralized data configuration for the services page blocks.
 * Demonstrates how different pages can have different content
 * while using the same reusable blocks.
 */

import type { 
  HeroBlockProps,
  Service,
  Feature,
  Stat,
  CTABlockProps
} from '@/shared/components/blocks'

// Services Page Hero
export const servicesHeroData: Omit<HeroBlockProps, 'title'> & { title: string } = {
  title: "Our Premium Services",
  subtitle: "From basic washes to comprehensive detailing packages, we offer professional car care services tailored to your needs and budget.",
  badges: [
    "🚗 Professional Equipment",
    "⭐ Expert Technicians", 
    "🔒 Fully Insured"
  ],
  primaryCTA: {
    text: "Book Service Now",
    href: "/apps/booking"
  },
  secondaryCTA: {
    text: "Get Quote",
    href: "/connect"
  },
  theme: 'gradient' as const
}

// All Available Services
export const allServicesData = {
  title: "Complete Car Care Services",
  subtitle: "Choose from our comprehensive range of professional car care services",
  services: [
    {
      id: 'basic-wash',
      name: 'Basic Exterior Wash',
      description: 'Essential exterior cleaning for regular maintenance',
      price: 25,
      duration: '30 minutes',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      popular: false,
      features: [
        'Pre-rinse and soap wash',
        'Wheel and tire cleaning', 
        'Hand dry with microfiber',
        'Basic interior vacuum'
      ]
    },
    {
      id: 'premium-wash',
      name: 'Premium Full Service',
      description: 'Complete interior and exterior deep cleaning service',
      price: 55,
      duration: '75 minutes',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
      popular: true,
      features: [
        'Full exterior wash and rinse',
        'Complete interior detailing',
        'Dashboard and console cleaning',
        'Window cleaning inside/out',
        'Tire shine application',
        'Air freshener'
      ]
    },
    {
      id: 'ceramic-coating',
      name: 'Ceramic Protection Package',
      description: 'Professional nano-ceramic coating for ultimate protection',
      price: 299,
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop',
      popular: false,
      features: [
        '9H hardness ceramic coating',
        'UV protection treatment',
        'Hydrophobic water repelling',
        'Enhanced gloss finish',
        '2-year warranty included',
        'Paint correction prep'
      ]
    },
    {
      id: 'detail-package',
      name: 'Ultimate Detail Package',
      description: 'The most comprehensive car care service available',
      price: 199,
      duration: '3 hours',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop',
      popular: false,
      features: [
        'Paint correction treatment',
        'Deep interior shampooing',
        'Leather conditioning',
        'Engine bay cleaning',
        'Headlight restoration',
        'Chrome polishing'
      ]
    },
    {
      id: 'express-wash',
      name: 'Express Quick Wash',
      description: 'Fast and efficient cleaning for busy schedules',
      price: 15,
      duration: '15 minutes',
      image: 'https://images.unsplash.com/photo-1544033527-2dd516c90016?w=400&h=300&fit=crop',
      popular: false,
      features: [
        'Quick exterior rinse',
        'Automated soap application',
        'Machine dry finish',
        'Tire cleaning'
      ]
    },
    {
      id: 'monthly-plan',
      name: 'Monthly Unlimited Plan',
      description: 'Unlimited premium washes with exclusive member benefits',
      price: 79,
      duration: 'Unlimited',
      image: 'https://images.unsplash.com/photo-1609979481671-eae5e2e5d358?w=400&h=300&fit=crop',
      popular: true,
      features: [
        'Unlimited premium washes',
        'Priority booking access',
        'Member-only discounts',
        'Free add-on services',
        'Mobile service included',
        'No commitment required'
      ]
    }
  ] as Service[]
}

// Service Features/Benefits
export const servicesFeatures = {
  title: "Why Our Services Stand Out",
  subtitle: "Professional equipment, expert technicians, and attention to detail in every service",
  features: [
    {
      icon: 'Car',
      title: 'Professional Equipment',
      description: 'State-of-the-art cleaning equipment and premium products for superior results.',
    },
    {
      icon: 'Clock',
      title: 'Time Efficient',
      description: 'Quick service without compromising quality. Most services completed in under 2 hours.',
    },
    {
      icon: 'Shield',
      title: 'Quality Guarantee',
      description: 'Not satisfied? We\'ll make it right. 100% satisfaction guarantee on all services.',
    },
    {
      icon: 'Sparkles',
      title: 'Attention to Detail',
      description: 'Our trained technicians ensure every inch of your vehicle gets the care it deserves.',
    }
  ] as Feature[]
}

// Service Statistics
export const servicesStats = {
  title: "Trusted by Car Owners Everywhere",
  stats: [
    {
      value: "50,000+",
      label: "Services Completed",
      icon: 'Car',
      color: "brand" as const
    },
    {
      value: "4.9",
      label: "Average Rating",
      suffix: "/5",
      icon: 'Star',
      color: "green" as const
    },
    {
      value: "30",
      label: "Minutes Average",
      description: "Service time",
      icon: 'Clock',
      color: "blue" as const
    },
    {
      value: "100%",
      label: "Satisfaction Rate",
      icon: 'Shield',
      color: "purple" as const
    }
  ] as Stat[]
}

// Services CTA
export const servicesCTAData: CTABlockProps = {
  title: "Ready to Give Your Car the Care It Deserves?",
  subtitle: "Book your service today and experience the CarWash Pro difference. Professional results, competitive pricing, and convenient scheduling.",
  primaryCTA: {
    text: "Book Service Now",
    href: "/apps/booking"
  },
  secondaryCTA: {
    text: "Get Custom Quote",
    href: "/connect"
  },
  icon: 'Droplets',
  theme: "gradient"
}