/**
 * Mock Contact Repository Implementation
 * 
 * Provides static data for contact page and handles form submissions.
 */

import type { 
  IContactRepository, 
  ContactInfo, 
  ContactFormData, 
  ContactFormSubmissionResult,
  ContactPageData
} from '../../interfaces/contact.repository'

export class MockContactRepository implements IContactRepository {
  private simulateDelay(ms: number = 100): Promise<void> {
    if (process.env.NODE_ENV === 'test') return Promise.resolve()
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getContactPageData(): Promise<ContactPageData> {
    await this.simulateDelay()

    const [contactInfo] = await Promise.all([
      this.getContactInfo()
    ])

    return {
      contactInfo,
      faq: [
        {
          question: "Do you offer same-day service?",
          answer: "Yes! We offer same-day service for most of our car wash and basic detailing services. For more complex services like ceramic coating, we may need 24-48 hours notice."
        },
        {
          question: "What areas do you serve?",
          answer: "We provide mobile services throughout the greater metropolitan area, including downtown, suburbs, and surrounding counties within a 50-mile radius."
        },
        {
          question: "Do you work in bad weather?",
          answer: "For mobile services, we may reschedule during severe weather for safety reasons. Our in-shop services are available year-round regardless of weather conditions."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cash for on-site services."
        }
      ],
      serviceAreas: [
        "Downtown",
        "Midtown", 
        "Uptown",
        "East Side",
        "West End",
        "North Hills",
        "South Bay",
        "Suburbs"
      ],
      testimonials: [
        {
          name: "Jennifer K.",
          message: "Amazing service! They were punctual, professional, and my car looks incredible.",
          rating: 5
        },
        {
          name: "Mark R.",
          message: "Best mobile car wash I've ever used. Will definitely book again!",
          rating: 5
        },
        {
          name: "Sarah L.",
          message: "Professional team with attention to detail. Highly recommend!",
          rating: 5
        }
      ]
    }
  }

  async getContactInfo(): Promise<ContactInfo> {
    await this.simulateDelay()
    
    return {
      phone: "(555) 123-WASH",
      email: "hello@blingauto.com",
      address: {
        street: "123 Clean Street",
        city: "Car City",
        state: "CA",
        zipCode: "90210"
      },
      hours: {
        weekdays: "7:00 AM - 7:00 PM",
        weekends: "8:00 AM - 6:00 PM",
        holidays: "9:00 AM - 5:00 PM"
      },
      socialLinks: {
        facebook: "https://facebook.com/blingauto",
        instagram: "https://instagram.com/blingauto", 
        twitter: "https://twitter.com/blingauto",
        linkedin: "https://linkedin.com/company/blingauto"
      }
    }
  }

  async submitContactForm(formData: ContactFormData): Promise<ContactFormSubmissionResult> {
    // Simulate API delay
    await this.simulateDelay(1000)

    // Mock validation
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: "Please fill in all required fields."
      }
    }

    // Mock success response
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      confirmationId: `CONF-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      estimatedResponse: "within 24 hours"
    }
  }

  async subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await this.simulateDelay(500)

    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: "Please enter a valid email address."
      }
    }

    return {
      success: true,
      message: "Successfully subscribed to our newsletter!"
    }
  }
}