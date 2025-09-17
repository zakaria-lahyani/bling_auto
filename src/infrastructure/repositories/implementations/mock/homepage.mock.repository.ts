/**
 * Mock Home Page Repository Implementation
 * 
 * Provides static data for home page content.
 * Easy to swap with API implementation later.
 */

import type { 
  IHomePageRepository, 
  HomePageData, 
  HeroSection, 
  HomeServicePreview, 
  Testimonial, 
  CtaSection 
} from '../../interfaces/homepage.repository'

export class MockHomePageRepository implements IHomePageRepository {
  private simulateDelay(ms: number = 100): Promise<void> {
    if (process.env.NODE_ENV === 'test') return Promise.resolve()
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getPageData(): Promise<HomePageData> {
    await this.simulateDelay()

    const [hero, services, testimonials, cta] = await Promise.all([
      this.getHeroData(),
      this.getFeaturedServices(),
      this.getTestimonials(),
      this.getCtaData()
    ])

    return {
      hero,
      services,
      testimonials,
      cta,
      stats: {
        happyCustomers: 2500,
        servicesCompleted: 15000,
        averageRating: 4.8,
        yearsExperience: 10
      }
    }
  }

  async getHeroData(): Promise<HeroSection> {
    await this.simulateDelay()
    
    return {
      title: "Premium Car Care Services",
      subtitle: "Mobile & In-Shop Professional Detailing - Transform your vehicle with our expert car care services",
      badges: ["Mobile Service Available", "Eco-Friendly Products", "Satisfaction Guaranteed"],
      primaryCTA: {
        text: "Book Service Now",
        href: "/booking"
      },
      secondaryCTA: {
        text: "View Services",
        href: "/services"
      },
      image: {
        src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop",
        alt: "Professional car detailing service",
        width: 800,
        height: 600
      },
      stats: {
        value: "2,500+",
        label: "Happy Customers"
      },
      theme: 'gradient'
    }
  }

  async getFeaturedServices(): Promise<HomeServicePreview[]> {
    await this.simulateDelay()
    
    return [
      {
        id: "2",
        name: "Premium Wash",
        description: "Complete interior and exterior wash with premium protection",
        price: 55,
        duration: "45 min",
        image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop",
        popular: true,
        features: [
          "Interior & Exterior Cleaning",
          "Wax Protection",
          "Tire Shine",
          "Window Cleaning"
        ]
      },
      {
        id: "5",
        name: "Full Detailing",
        description: "Comprehensive detailing service with paint correction and ceramic coating",
        price: 149,
        duration: "3 hours",
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop",
        popular: true,
        features: [
          "Paint Correction",
          "Interior Deep Clean",
          "Ceramic Coating",
          "Engine Bay Cleaning"
        ]
      },
      {
        id: "10",
        name: "Mobile Complete Wash",
        description: "Professional car wash service at your location with complete equipment",
        price: 75,
        duration: "1 hour",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        popular: true,
        features: [
          "At Your Location",
          "Complete Service",
          "Professional Equipment",
          "Flexible Scheduling"
        ]
      }
    ]
  }

  async getTestimonials(): Promise<Testimonial[]> {
    await this.simulateDelay()
    
    return [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Business Owner",
        image: "https://images.unsplash.com/photo-1494790108755-2616b2e5c6e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        content: "Absolutely incredible service! They came to my office and my car looks brand new. The attention to detail is amazing.",
        location: "Downtown",
        serviceUsed: "Mobile Complete Wash",
        date: "2024-03-15"
      },
      {
        id: "2",
        name: "Mike Chen",
        role: "Software Engineer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        content: "The ceramic coating service was worth every penny. My car still looks amazing after 6 months, and water just rolls off.",
        location: "Tech District",
        serviceUsed: "Ceramic Protection",
        date: "2024-03-10"
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        role: "Marketing Manager",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        content: "Professional, reliable, and convenient. I love that they send updates with photos showing the progress. Highly recommend!",
        location: "Suburbs",
        serviceUsed: "Premium Wash",
        date: "2024-03-08"
      }
    ]
  }

  async getCtaData(): Promise<CtaSection> {
    await this.simulateDelay()
    
    return {
      title: "Ready to Transform Your Vehicle?",
      description: "Join thousands of satisfied customers who trust us with their car care needs. Book your service today and experience the difference professional detailing makes.",
      primaryButton: {
        text: "Book Now",
        href: "/booking"
      },
      secondaryButton: {
        text: "Get Quote",
        href: "/quote"
      },
      backgroundImage: "/images/cta-background.jpg"
    }
  }
}