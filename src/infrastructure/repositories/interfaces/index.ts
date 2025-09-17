/**
 * Repository Interfaces Index
 * 
 * Central export point for all repository interfaces
 */

export type { IServiceRepository, ServiceFilters, ServiceCreateDTO, ServiceUpdateDTO } from './service.repository'
export type { ICategoryRepository } from './category.repository'
export type { 
  IHomePageRepository, 
  HomePageData, 
  HeroSection, 
  HomeServicePreview, 
  Testimonial, 
  CtaSection 
} from './homepage.repository'
export type { 
  IServicesPageRepository, 
  ServicesPageData, 
  ServicesPageHero, 
  ServiceFilter, 
  ServicesPageSEO 
} from './servicespage.repository'
export type {
  IContactRepository,
  ContactInfo,
  ContactFormData,
  ContactFormSubmissionResult,
  ContactPageData
} from './contact.repository'
