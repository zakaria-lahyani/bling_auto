/**
 * Contact Data Hooks
 * 
 * Provides service-driven data access for contact page components.
 */

import { useMutation, useQuery } from '@tanstack/react-query'
import { repositoryFactory } from '@/infrastructure/repositories/factory/repository.factory'
import type { 
  ContactPageData, 
  ContactInfo, 
  ContactFormData,
  ContactFormSubmissionResult 
} from '@/infrastructure/repositories/interfaces/contact.repository'
import { ErrorFactory } from '@/shared/errors'

/**
 * Hook for complete contact page data
 */
export function useContactPageData() {
  return useQuery({
    queryKey: ['contactPage', 'complete'],
    queryFn: async (): Promise<ContactPageData> => {
      try {
        const repository = repositoryFactory.getContactRepository()
        return await repository.getContactPageData()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useContactPageData',
          action: 'getContactPageData'
        })
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes (contact info changes rarely)
    gcTime: 60 * 60 * 1000 // 1 hour
  })
}

/**
 * Hook for contact information only
 */
export function useContactInfo() {
  return useQuery({
    queryKey: ['contact', 'info'],
    queryFn: async (): Promise<ContactInfo> => {
      try {
        const repository = repositoryFactory.getContactRepository()
        return await repository.getContactInfo()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useContactInfo',
          action: 'getContactInfo'
        })
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000 // 2 hours
  })
}

/**
 * Hook for contact form submission
 */
export function useContactForm() {
  return useMutation({
    mutationFn: async (formData: ContactFormData): Promise<ContactFormSubmissionResult> => {
      try {
        const repository = repositoryFactory.getContactRepository()
        return await repository.submitContactForm(formData)
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useContactForm',
          action: 'submitContactForm'
        })
      }
    },
    onSuccess: (result) => {
      if (result.success) {
        // Could trigger analytics event here
        console.log('Contact form submitted successfully:', result.confirmationId)
      }
    },
    onError: (error) => {
      console.error('Contact form submission failed:', error)
    }
  })
}

/**
 * Hook for newsletter subscription
 */
export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: async (email: string): Promise<{ success: boolean; message: string }> => {
      try {
        const repository = repositoryFactory.getContactRepository()
        return await repository.subscribeToNewsletter(email)
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useNewsletterSubscription',
          action: 'subscribeToNewsletter'
        })
      }
    },
    onSuccess: (result) => {
      if (result.success) {
        console.log('Newsletter subscription successful')
      }
    },
    onError: (error) => {
      console.error('Newsletter subscription failed:', error)
    }
  })
}