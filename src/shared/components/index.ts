/**
 * Shared Components Export
 * 
 * Central export point for all shared, reusable components
 * with their variant systems and types.
 */

// Unified components with variant systems
export { default as ServiceCard } from './ServiceCard'
export type { ServiceCardProps, ServiceCardVariant } from './ServiceCard'

// Re-export UI components
export * from './ui'

// Re-export block components  
export * from './blocks'