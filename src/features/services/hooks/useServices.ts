import { useQuery } from '@tanstack/react-query'
import { servicesApi } from '../../../lib/sdk'
import { mapServiceToViewModel } from '../mappers/serviceMappers'
import type { ServiceFilters } from '@/types/apps/serviceTypes'

// Query keys
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (filters?: ServiceFilters) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
  popular: () => [...serviceKeys.all, 'popular'] as const,
  active: () => [...serviceKeys.all, 'active'] as const,
}

// Main services hook
export function useServices(filters?: ServiceFilters) {
  const query = useQuery({
    queryKey: serviceKeys.list(filters),
    queryFn: () => servicesApi.list(filters),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const viewModels = query.data?.services.map(mapServiceToViewModel) || []

  return {
    ...query,
    services: viewModels,
    servicesData: query.data,
  }
}

// Single service hook
export function useService(id: string) {
  const query = useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => servicesApi.getById(id),
    enabled: !!id,
  })

  const viewModel = query.data ? mapServiceToViewModel(query.data) : null

  return {
    ...query,
    service: viewModel,
    serviceData: query.data,
  }
}

// Popular services hook
export function usePopularServices() {
  const query = useQuery({
    queryKey: serviceKeys.popular(),
    queryFn: () => servicesApi.getPopular(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })

  const viewModels = query.data?.services.map(mapServiceToViewModel) || []

  return {
    ...query,
    services: viewModels,
    servicesData: query.data,
  }
}

// Active services hook
export function useActiveServices() {
  const query = useQuery({
    queryKey: serviceKeys.active(),
    queryFn: () => servicesApi.getActive(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const viewModels = query.data?.services.map(mapServiceToViewModel) || []

  return {
    ...query,
    services: viewModels,
    servicesData: query.data,
  }
}

// Service search hook - using client-side filtering for now
export function useServiceSearch(query: string) {
  const { services, ...rest } = useServices()
  
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(query.toLowerCase()) ||
    service.description.toLowerCase().includes(query.toLowerCase())
  )
  
  return {
    ...rest,
    services: filteredServices
  }
}

// Services by category hook
export function useServicesByCategory(category: string) {
  return useServices({
    category: category as any
  })
}