/**
 * Enhanced Services Hook with Comprehensive State Management
 * 
 * Provides robust error handling, retry logic, and state management
 * for service-related data fetching operations.
 */

import { useDataWithStates, usePaginatedDataWithStates, useMultipleDataSources } from '@/shared/hooks/useDataWithStates'
import { repositories } from '@/infrastructure/repositories'
import type { ServiceFilters } from '@/infrastructure/repositories'
import { serviceQueryKeys } from './useServices'

/**
 * Enhanced services hook with comprehensive state management
 */
export function useServicesWithStates(filters?: ServiceFilters) {
  return useDataWithStates(
    serviceQueryKeys.list(filters),
    async () => {
      if (filters) {
        return repositories.service.findWithFilters(filters)
      }
      return repositories.service.findAll()
    },
    {
      logContext: {
        component: 'useServicesWithStates',
        action: 'fetchServices'
      },
      retryAttempts: 3,
      staleTime: 10 * 60 * 1000, // 10 minutes
      emptyChecker: (data) => !data || data.length === 0
    }
  )
}

/**
 * Enhanced single service hook
 */
export function useServiceWithStates(id: string) {
  return useDataWithStates(
    serviceQueryKeys.detail(id),
    () => repositories.service.findById(id),
    {
      enabled: !!id,
      logContext: {
        component: 'useServiceWithStates',
        action: 'fetchService'
      },
      retryAttempts: 2,
      staleTime: 15 * 60 * 1000, // 15 minutes
      emptyChecker: (data) => !data
    }
  )
}

/**
 * Paginated services hook with state management
 */
export function useServicesPaginated(
  filters?: ServiceFilters,
  initialPage = 1,
  pageSize = 12
) {
  return usePaginatedDataWithStates(
    serviceQueryKeys.list(filters),
    async (page) => {
      const allServices = filters 
        ? await repositories.service.findWithFilters(filters)
        : await repositories.service.findAll()

      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      const pageData = allServices.slice(startIndex, endIndex)
      
      return {
        data: pageData,
        total: allServices.length,
        hasNext: endIndex < allServices.length
      }
    },
    {
      initialPage,
      logContext: {
        component: 'useServicesPaginated',
        action: 'fetchPaginatedServices'
      },
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  )
}

/**
 * Featured services with state management
 */
export function useFeaturedServicesWithStates() {
  return useDataWithStates(
    serviceQueryKeys.featured(),
    () => repositories.service.findFeatured(),
    {
      logContext: {
        component: 'useFeaturedServicesWithStates',
        action: 'fetchFeaturedServices'
      },
      staleTime: 15 * 60 * 1000, // 15 minutes
      emptyChecker: (data) => !data || data.length === 0
    }
  )
}

/**
 * Popular services with state management
 */
export function usePopularServicesWithStates() {
  return useDataWithStates(
    serviceQueryKeys.popular(),
    () => repositories.service.findPopular(),
    {
      logContext: {
        component: 'usePopularServicesWithStates',
        action: 'fetchPopularServices'
      },
      staleTime: 15 * 60 * 1000, // 15 minutes
      emptyChecker: (data) => !data || data.length === 0
    }
  )
}

/**
 * Services by category with state management
 */
export function useServicesByCategoryWithStates(categorySlug: string) {
  return useDataWithStates(
    serviceQueryKeys.category(categorySlug),
    () => repositories.service.findByCategory(categorySlug),
    {
      enabled: !!categorySlug,
      logContext: {
        component: 'useServicesByCategoryWithStates',
        action: 'fetchServicesByCategory'
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
      emptyChecker: (data) => !data || data.length === 0
    }
  )
}

/**
 * Service search with state management
 */
export function useServiceSearchWithStates(query: string) {
  return useDataWithStates(
    serviceQueryKeys.search(query),
    () => repositories.service.search(query),
    {
      enabled: query.length > 2,
      logContext: {
        component: 'useServiceSearchWithStates',
        action: 'searchServices'
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      emptyChecker: (data) => !data || data.length === 0
    }
  )
}

/**
 * Related services with state management
 */
export function useRelatedServicesWithStates(serviceId: string, limit = 3) {
  return useDataWithStates(
    [...serviceQueryKeys.detail(serviceId), 'related', limit],
    () => repositories.service.findRelated(serviceId, limit),
    {
      enabled: !!serviceId,
      logContext: {
        component: 'useRelatedServicesWithStates',
        action: 'fetchRelatedServices'
      },
      staleTime: 15 * 60 * 1000, // 15 minutes
      emptyChecker: (data) => !data || data.length === 0
    }
  )
}

/**
 * Service statistics with state management
 */
export function useServiceStatsWithStates(serviceId: string) {
  return useMultipleDataSources({
    rating: {
      queryKey: [...serviceQueryKeys.detail(serviceId), 'rating'],
      queryFn: () => repositories.service.getAverageRating(serviceId),
      options: {
        enabled: !!serviceId,
        staleTime: 30 * 60 * 1000, // 30 minutes
        logContext: {
          component: 'useServiceStatsWithStates',
          action: 'fetchServiceRating'
        }
      }
    },
    bookingCount: {
      queryKey: [...serviceQueryKeys.detail(serviceId), 'bookingCount'],
      queryFn: () => repositories.service.getBookingCount(serviceId),
      options: {
        enabled: !!serviceId,
        staleTime: 10 * 60 * 1000, // 10 minutes
        logContext: {
          component: 'useServiceStatsWithStates',
          action: 'fetchServiceBookingCount'
        }
      }
    }
  })
}

/**
 * Complete service page data (service + related + stats)
 */
export function useServicePageData(serviceId: string) {
  return useMultipleDataSources({
    service: {
      queryKey: serviceQueryKeys.detail(serviceId),
      queryFn: () => repositories.service.findById(serviceId),
      options: {
        enabled: !!serviceId,
        staleTime: 15 * 60 * 1000,
        emptyChecker: (data) => !data
      }
    },
    relatedServices: {
      queryKey: [...serviceQueryKeys.detail(serviceId), 'related'],
      queryFn: () => repositories.service.findRelated(serviceId, 3),
      options: {
        enabled: !!serviceId,
        staleTime: 15 * 60 * 1000,
        emptyChecker: (data) => !data || data.length === 0
      }
    },
    stats: {
      queryKey: [...serviceQueryKeys.detail(serviceId), 'stats'],
      queryFn: async () => {
        const [rating, bookingCount] = await Promise.all([
          repositories.service.getAverageRating(serviceId),
          repositories.service.getBookingCount(serviceId)
        ])
        return { rating, bookingCount }
      },
      options: {
        enabled: !!serviceId,
        staleTime: 30 * 60 * 1000
      }
    }
  })
}

/**
 * Services overview data for dashboard/homepage
 */
export function useServicesOverview() {
  return useMultipleDataSources({
    featured: {
      queryKey: serviceQueryKeys.featured(),
      queryFn: () => repositories.service.findFeatured(),
      options: {
        staleTime: 15 * 60 * 1000,
        emptyChecker: (data) => !data || data.length === 0
      }
    },
    popular: {
      queryKey: serviceQueryKeys.popular(),
      queryFn: () => repositories.service.findPopular(),
      options: {
        staleTime: 15 * 60 * 1000,
        emptyChecker: (data) => !data || data.length === 0
      }
    },
    total: {
      queryKey: [...serviceQueryKeys.all, 'count'],
      queryFn: () => repositories.service.count(),
      options: {
        staleTime: 30 * 60 * 1000
      }
    }
  })
}