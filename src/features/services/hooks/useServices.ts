/**
 * Updated Services Hook using Repository Pattern
 * 
 * This demonstrates how to use the new repository pattern
 * while maintaining the same API for components.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { repositories } from '@/infrastructure/repositories'
import type { ServiceFilters } from '@/infrastructure/repositories'

// Query key factory
export const serviceQueryKeys = {
  all: ['services'] as const,
  lists: () => [...serviceQueryKeys.all, 'list'] as const,
  list: (filters?: ServiceFilters) => [...serviceQueryKeys.lists(), filters] as const,
  details: () => [...serviceQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceQueryKeys.details(), id] as const,
  popular: () => [...serviceQueryKeys.all, 'popular'] as const,
  featured: () => [...serviceQueryKeys.all, 'featured'] as const,
  category: (slug: string) => [...serviceQueryKeys.all, 'category', slug] as const,
  search: (query: string) => [...serviceQueryKeys.all, 'search', query] as const,
}

// Main services hook with filtering
export function useServices(filters?: ServiceFilters) {
  return useQuery({
    queryKey: serviceQueryKeys.list(filters),
    queryFn: async () => {
      if (filters) {
        return repositories.service.findWithFilters(filters)
      }
      return repositories.service.findAll()
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on validation errors
      if (error?.code === 'VALIDATION_ERROR') return false
      return failureCount < 3
    }
  })
}

// Single service hook
export function useService(id: string) {
  return useQuery({
    queryKey: serviceQueryKeys.detail(id),
    queryFn: () => repositories.service.findById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors
      if (error?.code === 'NOT_FOUND') return false
      return failureCount < 3
    }
  })
}

// Popular services hook
export function usePopularServices() {
  return useQuery({
    queryKey: serviceQueryKeys.popular(),
    queryFn: () => repositories.service.findPopular(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

// Featured services hook
export function useFeaturedServices() {
  return useQuery({
    queryKey: serviceQueryKeys.featured(),
    queryFn: () => repositories.service.findFeatured(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

// Services by category hook
export function useServicesByCategory(categorySlug: string) {
  return useQuery({
    queryKey: serviceQueryKeys.category(categorySlug),
    queryFn: () => repositories.service.findByCategory(categorySlug),
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Service search hook
export function useServiceSearch(query: string) {
  return useQuery({
    queryKey: serviceQueryKeys.search(query),
    queryFn: () => repositories.service.search(query),
    enabled: query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Services with advanced filtering
export function useServicesWithFilters(filters: ServiceFilters) {
  return useQuery({
    queryKey: serviceQueryKeys.list(filters),
    queryFn: () => repositories.service.findWithFilters(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Paginated services hook
export function useServicesPaginated(params: {
  page?: number
  limit?: number
  filters?: ServiceFilters
  sort?: { field: string; order: 'asc' | 'desc' }
}) {
  return useQuery({
    queryKey: [...serviceQueryKeys.list(params.filters), 'paginated', params],
    queryFn: () => repositories.service.findPaginated({
      pagination: { page: params.page, limit: params.limit },
      filters: params.filters,
      sort: params.sort
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Related services hook
export function useRelatedServices(serviceId: string, limit = 3) {
  return useQuery({
    queryKey: [...serviceQueryKeys.detail(serviceId), 'related', limit],
    queryFn: () => repositories.service.findRelated(serviceId, limit),
    enabled: !!serviceId,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

// Service statistics hooks
export function useServiceRating(serviceId: string) {
  return useQuery({
    queryKey: [...serviceQueryKeys.detail(serviceId), 'rating'],
    queryFn: () => repositories.service.getAverageRating(serviceId),
    enabled: !!serviceId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export function useServiceBookingCount(serviceId: string) {
  return useQuery({
    queryKey: [...serviceQueryKeys.detail(serviceId), 'bookingCount'],
    queryFn: () => repositories.service.getBookingCount(serviceId),
    enabled: !!serviceId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Mutation hooks for write operations
export function useCreateService() {
  const queryClient = useQueryClient()
  
  return {
    mutate: async (data: any) => {
      const newService = await repositories.service.create(data)
      
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: serviceQueryKeys.all })
      
      return newService
    }
  }
}

export function useUpdateService() {
  const queryClient = useQueryClient()
  
  return {
    mutate: async ({ id, data }: { id: string; data: any }) => {
      const updatedService = await repositories.service.update(id, data)
      
      // Update specific service in cache
      queryClient.setQueryData(serviceQueryKeys.detail(id), updatedService)
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: serviceQueryKeys.lists() })
      
      return updatedService
    }
  }
}

export function useDeleteService() {
  const queryClient = useQueryClient()
  
  return {
    mutate: async (id: string) => {
      const success = await repositories.service.delete(id)
      
      if (success) {
        // Remove from cache
        queryClient.removeQueries({ queryKey: serviceQueryKeys.detail(id) })
        
        // Invalidate lists
        queryClient.invalidateQueries({ queryKey: serviceQueryKeys.lists() })
      }
      
      return success
    }
  }
}

// Utility hooks
export function useServiceCount(filters?: ServiceFilters) {
  return useQuery({
    queryKey: [...serviceQueryKeys.all, 'count', filters],
    queryFn: () => repositories.service.count(filters),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export function useServiceExists(id: string) {
  return useQuery({
    queryKey: [...serviceQueryKeys.detail(id), 'exists'],
    queryFn: () => repositories.service.exists(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

// Active services hook  
export function useActiveServices() {
  return useQuery({
    queryKey: [...serviceQueryKeys.all, 'active'],
    queryFn: () => repositories.service.findWithFilters({ isActive: true }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Cache management hooks
export function useClearServiceCache() {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.invalidateQueries({ queryKey: serviceQueryKeys.all })
    repositories.service.clearCache?.()
  }
}

export function useRefreshServiceCache() {
  const queryClient = useQueryClient()
  
  return async () => {
    await queryClient.invalidateQueries({ queryKey: serviceQueryKeys.all })
    await repositories.service.refreshCache?.()
  }
}

// Export query keys as serviceKeys for backward compatibility
export const serviceKeys = serviceQueryKeys