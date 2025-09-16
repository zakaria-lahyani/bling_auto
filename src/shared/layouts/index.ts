/**
 * Consolidated Layout System
 * 
 * This file exports all layout components organized by category.
 * All layout components from @layouts, components/layouts, and components/layout
 * have been consolidated here for better organization and maintainability.
 */

// Utility Components (page-level containers and sections)
export { PageContainer } from './PageContainer'
export { Section } from './Section' 
export { default as StandardPage } from './StandardPage'
export { default as ThemeWrapper } from './ThemeWrapper'

// All component categories
export * from './components'

// Organized component groups for easier importing
export * from './components/core'      // Core layout wrappers
export * from './components/specialized'  // Feature-specific layouts  
export * from './components/shared'    // Shared UI components
export * from './components/shell'     // App shell components