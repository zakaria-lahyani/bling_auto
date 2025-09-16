/**
 * Home Page Data
 * 
 * Centralized data configuration for the home page blocks.
 * This makes it easy to update content without touching the component code.
 */

import type { 
  HeroBlockProps, 
  Feature, 
  Service, 
  Testimonial, 
  Stat 
} from '@/components/blocks'

// Hero Section Data
export const heroData: Omit<HeroBlockProps, 'title'> & { title: string } = {
  title: "Premium Car Wash, Wherever You Are",
  subtitle: "Professional car wash services that come to you. Book online, track your service, and keep your vehicle looking its absolute best.",
  badges: [
    "⚡ Same Day Service",
    "🚗 Mobile Available", 
    "🌱 Eco-Friendly"
  ],
  primaryCTA: {
    text: "Book Now - $25",
    href: "/apps/booking"
  },
  secondaryCTA: {
    text: "Connect With Us",
    href: "/connect"
  },
  image: {
    src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop",
    alt: "Professional car wash service"
  },
  stats: {
    value: "2,500+",
    label: "Happy Customers"
  }
}

// Features Section Data  
export const featuresData = {
  title: "Why Choose CarWash Pro?",
  subtitle: "We're not just another car wash. We're your vehicle care partners, committed to convenience, quality, and your satisfaction.",
  features: [
    {
      icon: 'Clock',
      title: 'Same-Day Service',
      description: 'Book online and get your car cleaned today. Fast, reliable service.',
    },
    {
      icon: 'Droplets',
      title: 'Eco-Friendly',
      description: 'Water-efficient processes and biodegradable cleaning products.',
    },
    {
      icon: 'Shield',
      title: 'Fully Insured',
      description: 'Professional team with full insurance coverage for your peace of mind.',
    },
    {
      icon: 'Car',
      title: 'Mobile Service',
      description: 'We come to you! Available at your home or office location.',
    }
  ] as Feature[]
}

// Services Section Data
export const servicesData = {
  title: "Our Services",
  subtitle: "From quick maintenance to premium detailing, we've got you covered",
  services: [
    {
      id: '1',
      name: 'Basic Wash',
      description: 'Perfect for regular maintenance with exterior wash and basic cleaning',
      price: 25,
      duration: '30 min',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      popular: false,
      features: ['Exterior wash', 'Wheel cleaning', 'Basic dry']
    },
    {
      id: '2',
      name: 'Premium Wash',
      description: 'Complete interior and exterior cleaning for a spotless finish',
      price: 55,
      duration: '75 min',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
      popular: true,
      features: ['Interior cleaning', 'Exterior wash', 'Wax finish', 'Tire shine']
    },
    {
      id: '3',
      name: 'Ceramic Protection',
      description: 'Professional nano-ceramic coating for long-lasting protection',
      price: 299,
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop',
      popular: false,
      features: ['9H ceramic coating', 'UV protection', 'Hydrophobic surface', '2-year warranty']
    },
  ] as Service[]
}

// Testimonials Section Data
export const testimonialsData = {
  title: "What Our Customers Say",
  subtitle: "Don't just take our word for it - hear from our satisfied customers",
  testimonials: [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'CarWash Pro has been amazing! The mobile service is so convenient and they always do an excellent job.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b667f553?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      role: 'Father of 3',
      content: 'With three kids, keeping the car clean is impossible. These guys make it easy and affordable.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Jennifer Davis',
      role: 'Marketing Director',
      content: 'Professional service every time. My car looks showroom ready after every wash!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'BOBO Mi',
      role: 'Marketing Director',
      content: 'Professional service every time. My car looks showroom ready after every wash!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ] as Testimonial[]
}

// CTA Section Data
export const ctaData = {
  title: "Ready to Get Your Car Sparkling?",
  subtitle: "Join thousands of satisfied customers who trust CarWash Pro for their vehicle care needs. Book your first service today and see the difference!",
  primaryCTA: {
    text: "Get Started Today",
    href: "/apps/booking"
  },
  secondaryCTA: {
    text: "Connect With Us", 
    href: "/connect"
  },
  icon: 'Sparkles'
}

// Stats Section Data (optional - can be added to any page)
export const statsData = {
  title: "Trusted by Thousands",
  stats: [
    {
      value: "2,500+",
      label: "Happy Customers",
      icon: 'Car',
      color: "brand" as const
    },
    {
      value: "15,000+", 
      label: "Cars Cleaned",
      icon: 'Droplets',
      color: "blue" as const
    },
    {
      value: "4.9",
      label: "Average Rating", 
      suffix: "/5",
      icon: 'CheckCircle',
      color: "green" as const
    },
    {
      value: "24",
      label: "Hour Service",
      suffix: "/7",
      icon: 'Clock',
      color: "orange" as const
    }
  ] as Stat[]
}