/**
 * Services Page Data Hook
 * 
 * Provides service-driven data access for services page components.
 * Abstracts data source (mock/API) from components.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { repositoryFactory } from '@/infrastructure/repositories/factory/repository.factory'
import type { 
  ServicesPageData, 
  ServicesPageHero, 
  ServiceFilter,
  ServicesPageSEO 
} from '@/infrastructure/repositories/interfaces/servicespage.repository'
import type { Service, ServiceCategory } from '@/core/entities/service/types'
import { ErrorFactory } from '@/shared/errors'

/**
 * Hook for complete services page data
 */
export function useServicesPageData() {
  return useQuery({
    queryKey: ['servicesPage', 'complete'],
    queryFn: async (): Promise<ServicesPageData> => {
      try {
        const repository = repositoryFactory.getServicesPageRepository()
        return await repository.getPageData()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useServicesPageData',
          action: 'getPageData'
        })
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
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
 * Hook for services page hero data
 */
export function useServicesPageHero() {
  return useQuery({
    queryKey: ['servicesPage', 'hero'],
    queryFn: async (): Promise<ServicesPageHero> => {
      try {
        const repository = repositoryFactory.getServicesPageRepository()
        return await repository.getHeroData()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useServicesPageHero',
          action: 'getHeroData'
        })
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000 // 30 minutes
  })
}

/**
 * Hook for services page services list
 */
export function useServicesPageServices() {
  return useQuery({
    queryKey: ['servicesPage', 'services'],
    queryFn: async (): Promise<Service[]> => {
      try {
        const repository = repositoryFactory.getServicesPageRepository()
        return await repository.getServices()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useServicesPageServices',
          action: 'getServices'
        })
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000 // 15 minutes
  })
}

/**
 * Hook for service categories
 */
export function useServiceCategories() {
  return useQuery({
    queryKey: ['servicesPage', 'categories'],
    queryFn: async (): Promise<ServiceCategory[]> => {
      try {
        const repository = repositoryFactory.getServicesPageRepository()
        return await repository.getCategories()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useServiceCategories',
          action: 'getCategories'
        })
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes (categories change less frequently)
    gcTime: 60 * 60 * 1000 // 1 hour
  })
}

/**
 * Hook for filter configuration
 */
export function useServiceFilters() {
  return useQuery({
    queryKey: ['servicesPage', 'filters'],
    queryFn: async (): Promise<ServiceFilter> => {
      try {
        const repository = repositoryFactory.getServicesPageRepository()
        return await repository.getFilters()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useServiceFilters',
          action: 'getFilters'
        })
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000 // 1 hour
  })
}

/**
 * Hook for SEO data
 */
export function useServicesPageSEO() {
  return useQuery({
    queryKey: ['servicesPage', 'seo'],
    queryFn: async (): Promise<ServicesPageSEO> => {
      try {
        const repository = repositoryFactory.getServicesPageRepository()
        return await repository.getSEOData()
      } catch (error) {
        throw ErrorFactory.fromUnknownError(error, {
          component: 'useServicesPageSEO',
          action: 'getSEOData'
        })
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes (SEO data changes rarely)
    gcTime: 2 * 60 * 60 * 1000 // 2 hours
  })
}

/**
 * Combined hook for services page essentials
 * Returns the most commonly needed data together
 */
export function useServicesPageEssentials() {
  const servicesQuery = useServicesPageServices()
  const categoriesQuery = useServiceCategories()
  const filtersQuery = useServiceFilters()
  const heroQuery = useServicesPageHero()

  return {
    services: servicesQuery.data,
    categories: categoriesQuery.data,
    filters: filtersQuery.data,
    hero: heroQuery.data,
    isLoading: servicesQuery.isLoading || categoriesQuery.isLoading || filtersQuery.isLoading || heroQuery.isLoading,
    error: servicesQuery.error || categoriesQuery.error || filtersQuery.error || heroQuery.error,
    isSuccess: servicesQuery.isSuccess && categoriesQuery.isSuccess && filtersQuery.isSuccess && heroQuery.isSuccess
  }
}

/**
 * Prefetch services page data (useful for optimization)
 */
export function usePrefetchServicesPageData() {
  const queryClient = useQueryClient()
  
  const prefetchServicesPageData = async () => {
    if (queryClient) {
      await queryClient.prefetchQuery({
        queryKey: ['servicesPage', 'complete'],
        queryFn: async () => {
          const repository = repositoryFactory.getServicesPageRepository()
          return repository.getPageData()
        },
        staleTime: 5 * 60 * 1000
      })
    }
  }

  return { prefetchServicesPageData }
}