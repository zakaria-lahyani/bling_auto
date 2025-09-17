// Services feature exports
export {
  useServices,
  useService,
  usePopularServices,
  useActiveServices,
  useServiceSearch,
  useServicesByCategory,
  serviceKeys
} from './hooks/useServices'

export { mapServiceToViewModel } from './mappers/serviceMappers'

export type * from './types'

// Re-export components
export { ServiceCard } from './components/ServiceCard'