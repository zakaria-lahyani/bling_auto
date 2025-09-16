/**
 * Blocks Index - Export all reusable block components
 * 
 * This file provides a centralized export point for all block components,
 * making it easy to import multiple blocks in any page or component.
 * 
 * Usage:
 * ```tsx
 * import { HeroBlock, FeaturesBlock, ServicesBlock } from '@/components/blocks'
 * ```
 * 
 * Or import individually:
 * ```tsx
 * import HeroBlock from '@/components/blocks/HeroBlock'
 * ```
 */

// Block Components
export { default as HeroBlock } from './HeroBlock'
export { default as FeaturesBlock } from './FeaturesBlock'
export { default as ServicesBlock } from './ServicesBlock'
export { default as TestimonialsBlock } from './TestimonialsBlock'
export { default as CTABlock } from './CTABlock'
export { default as StatsBlock } from './StatsBlock'

// Type Exports
export type { HeroBlockProps } from './HeroBlock'
export type { FeaturesBlockProps, Feature } from './FeaturesBlock'
export type { ServicesBlockProps, Service } from './ServicesBlock'
export type { TestimonialsBlockProps, Testimonial } from './TestimonialsBlock'
export type { CTABlockProps, CTAButton } from './CTABlock'
export type { StatsBlockProps, Stat } from './StatsBlock'