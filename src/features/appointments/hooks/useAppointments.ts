import { useQuery } from '@tanstack/react-query'
import { appointmentsApi } from '@/infrastructure/api'
import { mapAppointmentToViewModel } from '../mappers/appointmentMappers'
import type { 
  Appointment, 
  AppointmentFilters 
} from '@/types/apps/appointmentTypes'
import type { AppointmentViewModel } from '../types'

// Query keys
export const appointmentKeys = {
  all: ['appointments'] as const,
  lists: () => [...appointmentKeys.all, 'list'] as const,
  list: (filters?: AppointmentFilters) => [...appointmentKeys.lists(), filters] as const,
  details: () => [...appointmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...appointmentKeys.details(), id] as const,
  customer: (customerId: string) => [...appointmentKeys.all, 'customer', customerId] as const,
  upcoming: () => [...appointmentKeys.all, 'upcoming'] as const,
}

// Main appointments hook
export function useAppointments(filters?: AppointmentFilters) {
  const query = useQuery({
    queryKey: appointmentKeys.list(filters),
    queryFn: () => appointmentsApi.list(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const viewModels = query.data?.appointments.map(mapAppointmentToViewModel) || []

  return {
    ...query,
    appointments: viewModels,
    appointmentsData: query.data,
  }
}

// Single appointment hook
export function useAppointment(id: string) {
  const query = useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => appointmentsApi.getById(id),
    enabled: !!id,
  })

  const viewModel = query.data ? mapAppointmentToViewModel(query.data) : null

  return {
    ...query,
    appointment: viewModel,
    appointmentData: query.data,
  }
}

// Customer appointments hook
export function useCustomerAppointments(customerId: string) {
  const query = useQuery({
    queryKey: appointmentKeys.customer(customerId),
    queryFn: () => appointmentsApi.getByCustomer(customerId),
    enabled: !!customerId,
  })

  const viewModels = query.data?.appointments.map(mapAppointmentToViewModel) || []

  return {
    ...query,
    appointments: viewModels,
    appointmentsData: query.data,
  }
}

// Upcoming appointments hook
export function useUpcomingAppointments() {
  const query = useQuery({
    queryKey: appointmentKeys.upcoming(),
    queryFn: () => appointmentsApi.getUpcoming(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  const viewModels = query.data?.appointments.map(mapAppointmentToViewModel) || []

  return {
    ...query,
    appointments: viewModels,
    appointmentsData: query.data,
  }
}

// TODO: Add mutation hooks when needed (create, update, cancel, delete)