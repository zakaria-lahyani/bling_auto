/**
 * Home Page Data Hook
 * 
 * Provides service-driven data access for home page components.
 * Abstracts data source (mock/API) from components.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { repositoryFactory } from '@/infrastructure/repositories/factory/repository.factory'
import type { HomePageData, HeroSection, HomeServicePreview, Testimonial, CtaSection } from '@/infrastructure/repositories/interfaces/homepage.repository'
import { ErrorFactory, ErrorCode } from '@/shared/errors'

/**
 * Hook for complete home page data
 */
export function useHomePageData() {
  return useQuery({
    queryKey: ['homePage', 'complete'],
    queryFn: async (): Promise<HomePageData> => {
      try {
        const repository = repositoryFactory.getHomePageRepository()
        return await repository.getPageData()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useHomePageData',
          action: 'getPageData'
        })
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
    retry: (failureCount, error) => {
      // Don't retry if it's a configuration error
      if (error instanceof Error && error.message.includes('configuration')) {
        return false
      }
      return failureCount < 3
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

/**
 * Hook for hero section data only
 */
export function useHeroData() {
  return useQuery({
    queryKey: ['homePage', 'hero'],
    queryFn: async (): Promise<HeroSection> => {
      try {
        const repository = repositoryFactory.getHomePageRepository()
        return await repository.getHeroData()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useHeroData',
          action: 'getHeroData'
        })
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes (hero data changes less frequently)
    gcTime: 30 * 60 * 1000 // 30 minutes
  })
}

/**
 * Hook for featured services on home page
 */
export function useFeaturedServices() {
  return useQuery({
    queryKey: ['homePage', 'featuredServices'],
    queryFn: async (): Promise<HomeServicePreview[]> => {
      try {
        const repository = repositoryFactory.getHomePageRepository()
        return await repository.getFeaturedServices()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useFeaturedServices',
          action: 'getFeaturedServices'
        })
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000 // 15 minutes
  })
}

/**
 * Hook for testimonials
 */
export function useTestimonials() {
  return useQuery({
    queryKey: ['homePage', 'testimonials'],
    queryFn: async (): Promise<Testimonial[]> => {
      try {
        const repository = repositoryFactory.getHomePageRepository()
        return await repository.getTestimonials()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useTestimonials',
          action: 'getTestimonials'
        })
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes (testimonials change less frequently)
    gcTime: 60 * 60 * 1000 // 1 hour
  })
}

/**
 * Hook for CTA section data
 */
export function useCtaData() {
  return useQuery({
    queryKey: ['homePage', 'cta'],
    queryFn: async (): Promise<CtaSection> => {
      try {
        const repository = repositoryFactory.getHomePageRepository()
        return await repository.getCtaData()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useCtaData',
          action: 'getCtaData'
        })
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes (CTA changes rarely)
    gcTime: 2 * 60 * 60 * 1000 // 2 hours
  })
}

/**
 * Prefetch home page data (useful for optimization)
 */
export function usePrefetchHomePageData() {
  const queryClient = useQueryClient()
  
  const prefetchHomePageData = async () => {
    if (queryClient) {
      await queryClient.prefetchQuery({
        queryKey: ['homePage', 'complete'],
        queryFn: async () => {
          const repository = repositoryFactory.getHomePageRepository()
          return repository.getPageData()
        },
        staleTime: 5 * 60 * 1000
      })
    }
  }

  return { prefetchHomePageData }
}