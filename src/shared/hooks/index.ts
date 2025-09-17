/**
 * Shared Hooks Export
 * 
 * Centralized export for all shared hooks
 */

// Data fetching hooks
export {
  useDataWithStates,
  usePaginatedDataWithStates,
  useMultipleDataSources,
  useOptimisticData,
  type DataState
} from './useDataWithStates'

// Existing hooks
export { useDebounce } from './useDebounce'
export { useSettings } from './useSettings'

// Re-export for convenience
export * from './useDataWithStates'