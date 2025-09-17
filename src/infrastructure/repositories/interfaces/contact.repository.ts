/**
 * Contact Repository Interface
 * 
 * Defines the contract for contact-related data access.
 * Supports both mock and API implementations.
 */

export interface ContactInfo {
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  hours: {
    weekdays: string
    weekends: string
    holidays?: string
  }
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  serviceInterest?: string
  preferredContact?: 'email' | 'phone'
}

export interface ContactFormSubmissionResult {
  success: boolean
  message: string
  confirmationId?: string
  estimatedResponse?: string
}

export interface ContactPageData {
  contactInfo: ContactInfo
  faq?: Array<{
    question: string
    answer: string
  }>
  serviceAreas?: string[]
  testimonials?: Array<{
    name: string
    message: string
    rating: number
  }>
}

export interface IContactRepository {
  /**
   * Get contact page data
   */
  getContactPageData(): Promise<ContactPageData>

  /**
   * Get contact information
   */
  getContactInfo(): Promise<ContactInfo>

  /**
   * Submit contact form
   */
  submitContactForm(formData: ContactFormData): Promise<ContactFormSubmissionResult>

  /**
   * Subscribe to newsletter
   */
  subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }>
}