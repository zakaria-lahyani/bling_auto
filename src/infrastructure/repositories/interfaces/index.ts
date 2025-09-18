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

// Client-related repositories
export type { IClientRepository } from './client.repository'
export type { IVehicleRepository } from './vehicle.repository'
export type { IAddressRepository } from './address.repository'
export type { IPaymentMethodRepository } from './payment-method.repository'
export type { IBookingRepository } from './booking.repository'
