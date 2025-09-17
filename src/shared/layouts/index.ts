/**
 * Layout System
 * 
 * Complete layout system with base components, specialized contexts,
 * and utility components. Follows clear naming conventions and
 * composition patterns.
 */

// Base Components - Shared logic and functionality
export * from './base'

// Marketing Context - Public and marketing pages
export * from './marketing'

// Dashboard Context - Authenticated and dashboard pages
export * from './dashboard'

// Utility Components
export { PageContainer } from './PageContainer'
export { Section } from './Section' 
export { default as StandardPage } from './StandardPage'
export { default as ThemeWrapper } from './ThemeWrapper'