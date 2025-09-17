/**
 * DTO Validation Integration Tests
 * 
 * Tests the DTO validation layer across repositories
 * to ensure data consistency and proper error handling
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { 
  ServiceMapper, 
  HomePageMapper, 
  BookingMapper,
  ValidationUtils 
} from '@/infrastructure/dto'
import { ZodError } from 'zod'

describe('DTO Validation Integration Tests', () => {
  describe('Service DTO Validation', () => {
    it('should validate correct service data', () => {
      const validServiceData = {
        id: '1',
        name: 'Premium Wash',
        slug: 'premium-wash',
        description: 'Complete car wash service',
        shortDescription: 'Complete car wash',
        price: 50,
        duration: '60 min',
        image: '/images/service.jpg',
        isActive: true,
        category: {
          id: 'wash',
          name: 'Wash Services',
          slug: 'wash'
        },
        featured: true,
        popular: false,
        availability: {
          mobile: true,
          inShop: true
        },
        features: ['Exterior wash', 'Interior clean'],
        tags: ['premium', 'wash'],
        rating: 4.5,
        reviewCount: 100,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      expect(() => ServiceMapper.toDomain(validServiceData)).not.toThrow()
      
      const domainService = ServiceMapper.toDomain(validServiceData)
      expect(domainService.name).toBe('Premium Wash')
      expect(domainService.price).toBe(50)
      expect(domainService.availability.mobile).toBe(true)
    })

    it('should reject invalid service data', () => {
      const invalidServiceData = {
        id: '',
        name: '',
        price: -10,
        duration: '',
        availability: {
          mobile: 'yes' // Should be boolean
        }
      }

      expect(() => ServiceMapper.toDomain(invalidServiceData as any)).toThrow(ZodError)
    })

    it('should validate service creation data', () => {
      const validCreateData = {
        name: 'New Service',
        description: 'A new service offering',
        price: 75,
        duration: 90,
        category: 'premium',
        availability: {
          mobile: true,
          inShop: false
        },
        tags: ['new', 'premium']
      }

      expect(() => ServiceMapper.toCreateDTO(validCreateData)).not.toThrow()
      
      const createDTO = ServiceMapper.toCreateDTO(validCreateData)
      expect(createDTO.name).toBe('New Service')
      expect(createDTO.price).toBe(75)
    })

    it('should normalize duration formats', () => {
      expect(ServiceMapper.normalizeDuration(60)).toBe('60 min')
      expect(ServiceMapper.normalizeDuration('45 min')).toBe('45 min')
      expect(ServiceMapper.normalizeDuration('1 hour')).toBe('1 hour')
    })

    it('should extract duration minutes correctly', () => {
      expect(ServiceMapper.extractDurationMinutes('60 min')).toBe(60)
      expect(ServiceMapper.extractDurationMinutes('2 hours')).toBe(2)
      expect(ServiceMapper.extractDurationMinutes('invalid')).toBe(60) // fallback
    })

    it('should validate service arrays', () => {
      const serviceArray = [
        {
          id: '1',
          name: 'Service 1',
          slug: 'service-1',
          description: 'First service',
          shortDescription: 'First',
          price: 30,
          duration: '30 min',
          image: '/image1.jpg',
          isActive: true,
          category: { id: 'basic', name: 'Basic', slug: 'basic' },
          featured: false,
          popular: true,
          availability: { mobile: true, inShop: true },
          features: [],
          tags: [],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }
      ]

      expect(() => ServiceMapper.toDomainArray(serviceArray)).not.toThrow()
      
      const domainArray = ServiceMapper.toDomainArray(serviceArray)
      expect(domainArray).toHaveLength(1)
      expect(domainArray[0].name).toBe('Service 1')
    })
  })

  describe('Booking DTO Validation', () => {
    it('should validate correct booking data', () => {
      const validBookingData = {
        id: 'booking-1',
        userId: 'user-1',
        serviceId: 'service-1',
        serviceName: 'Premium Wash',
        scheduledDate: '2024-06-01T10:00:00Z',
        location: {
          type: 'mobile' as const,
          address: '123 Main St'
        },
        status: 'confirmed' as const,
        price: 50,
        duration: '60 min',
        vehicleInfo: {
          make: 'Toyota',
          model: 'Camry',
          year: 2020,
          color: 'Silver'
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      expect(() => BookingMapper.toDomain(validBookingData)).not.toThrow()
      
      const domainBooking = BookingMapper.toDomain(validBookingData)
      expect(domainBooking.serviceName).toBe('Premium Wash')
      expect(domainBooking.scheduledDate).toBeInstanceOf(Date)
      expect(domainBooking.vehicleInfo?.make).toBe('Toyota')
    })

    it('should reject invalid booking data', () => {
      const invalidBookingData = {
        id: '',
        userId: '',
        scheduledDate: 'invalid-date',
        location: {
          type: 'invalid-type'
        },
        status: 'invalid-status',
        price: 'not-a-number'
      }

      expect(() => BookingMapper.toDomain(invalidBookingData as any)).toThrow(ZodError)
    })

    it('should validate booking creation data', () => {
      const validCreateData = {
        userId: 'user-1',
        serviceId: 'service-1',
        scheduledDate: '2024-06-01T10:00:00Z',
        location: {
          type: 'mobile' as const,
          address: '123 Main St'
        },
        vehicleInfo: {
          make: 'Honda',
          model: 'Civic',
          year: 2019
        }
      }

      expect(() => BookingMapper.toCreateDTO(validCreateData)).not.toThrow()
      
      const createDTO = BookingMapper.toCreateDTO(validCreateData)
      expect(createDTO.userId).toBe('user-1')
      expect(createDTO.vehicleInfo.make).toBe('Honda')
    })

    it('should validate vehicle info correctly', () => {
      const validVehicleInfo = {
        make: 'BMW',
        model: 'X5',
        year: 2022,
        color: 'Black',
        licensePlate: 'ABC123'
      }

      const invalidVehicleInfo = {
        make: '',
        model: '',
        year: 1800, // Too old
        color: 'Red'
      }

      // Should pass validation when part of create data
      const validBookingCreate = {
        userId: 'user-1',
        serviceId: 'service-1',
        scheduledDate: '2024-06-01T10:00:00Z',
        location: { type: 'mobile' as const },
        vehicleInfo: validVehicleInfo
      }

      expect(() => BookingMapper.toCreateDTO(validBookingCreate)).not.toThrow()

      // Should fail validation
      const invalidBookingCreate = {
        ...validBookingCreate,
        vehicleInfo: invalidVehicleInfo
      }

      expect(() => BookingMapper.toCreateDTO(invalidBookingCreate)).toThrow(ZodError)
    })
  })

  describe('Homepage DTO Validation', () => {
    it('should validate complete homepage data', () => {
      const validHomepageData = {
        hero: {
          title: 'Welcome to Car Wash',
          subtitle: 'Professional service',
          primaryCTA: {
            text: 'Book Now',
            href: '/booking'
          }
        },
        featuredServices: [
          {
            id: '1',
            name: 'Basic Wash',
            description: 'Quick and efficient',
            price: 25,
            duration: '30 min',
            image: '/image.jpg',
            href: '/services/basic-wash'
          }
        ],
        testimonials: [
          {
            id: '1',
            name: 'John Doe',
            content: 'Great service!',
            rating: 5
          }
        ],
        cta: {
          title: 'Ready to book?',
          description: 'Get started today',
          primaryCTA: {
            text: 'Book Service',
            href: '/booking'
          }
        }
      }

      expect(() => HomePageMapper.validateAndMapHomePage(validHomepageData)).not.toThrow()
      
      const homepage = HomePageMapper.validateAndMapHomePage(validHomepageData)
      expect(homepage.hero.title).toBe('Welcome to Car Wash')
      expect(homepage.featuredServices).toHaveLength(1)
      expect(homepage.testimonials[0].rating).toBe(5)
    })

    it('should validate individual homepage sections', () => {
      const validHero = {
        title: 'Hero Title',
        subtitle: 'Hero Subtitle',
        primaryCTA: {
          text: 'Get Started',
          href: '/start'
        }
      }

      expect(() => HomePageMapper.validateAndMapHero(validHero)).not.toThrow()
      
      const hero = HomePageMapper.validateAndMapHero(validHero)
      expect(hero.primaryCTA.variant).toBe('primary') // Default value
    })

    it('should validate testimonials with ratings', () => {
      const validTestimonials = [
        {
          id: '1',
          name: 'Alice Smith',
          content: 'Excellent service, highly recommended!',
          rating: 5,
          date: '2024-03-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Bob Johnson',
          content: 'Good value for money.',
          rating: 4
        }
      ]

      expect(() => HomePageMapper.validateAndMapTestimonials(validTestimonials)).not.toThrow()
      
      const testimonials = HomePageMapper.validateAndMapTestimonials(validTestimonials)
      expect(testimonials).toHaveLength(2)
      expect(testimonials[0].date).toBeInstanceOf(Date)
      expect(testimonials[1].date).toBeUndefined()
    })

    it('should reject invalid rating values', () => {
      const invalidTestimonial = [
        {
          id: '1',
          name: 'Test User',
          content: 'Test content',
          rating: 6 // Invalid: greater than 5
        }
      ]

      expect(() => HomePageMapper.validateAndMapTestimonials(invalidTestimonial)).toThrow(ZodError)
    })
  })

  describe('Validation Utilities', () => {
    it('should safely parse valid data', () => {
      const schema = ServiceMapper.ServiceResponseSchema
      const validData = {
        id: '1',
        name: 'Test Service',
        slug: 'test-service',
        description: 'Test description',
        shortDescription: 'Test',
        price: 50,
        duration: '60 min',
        image: '/test.jpg',
        isActive: true,
        category: { id: 'test', name: 'Test', slug: 'test' },
        featured: false,
        popular: false,
        availability: { mobile: true, inShop: false },
        features: [],
        tags: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      const result = ValidationUtils.safeParseWithContext(schema, validData, 'test context')
      
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('Test Service')
      }
    })

    it('should safely parse invalid data with context', () => {
      const schema = ServiceMapper.ServiceResponseSchema
      const invalidData = { name: '', price: 'invalid' }

      const result = ValidationUtils.safeParseWithContext(schema, invalidData, 'test context')
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toContain('test context')
        expect(result.details).toBeDefined()
      }
    })

    it('should format validation errors user-friendly', () => {
      const mockZodIssues = [
        {
          code: 'invalid_type' as const,
          expected: 'string',
          received: 'number',
          path: ['name'],
          message: 'Expected string, received number'
        },
        {
          code: 'too_small' as const,
          minimum: 1,
          type: 'string' as const,
          inclusive: true,
          exact: false,
          path: ['description'],
          message: 'String must contain at least 1 character(s)'
        }
      ]

      const formatted = ValidationUtils.formatValidationErrors(mockZodIssues)
      
      expect(formatted).toHaveProperty('name')
      expect(formatted).toHaveProperty('description')
      expect(formatted.name).toContain('Expected string')
      expect(formatted.description).toContain('at least 1 character')
    })

    it('should clean objects by removing undefined values', () => {
      const dirtyObject = {
        name: 'Test',
        description: undefined,
        price: 50,
        category: null,
        tags: []
      }

      const cleaned = ValidationUtils.cleanObject(dirtyObject)
      
      expect(cleaned).toHaveProperty('name')
      expect(cleaned).toHaveProperty('price')
      expect(cleaned).toHaveProperty('tags')
      expect(cleaned).not.toHaveProperty('description')
      expect(cleaned).not.toHaveProperty('category')
    })

    it('should deep merge objects correctly', () => {
      const target = {
        name: 'Original',
        details: {
          price: 50,
          category: 'old'
        },
        tags: ['old']
      }

      const source = {
        details: {
          category: 'new',
          featured: true
        },
        active: true
      }

      const merged = ValidationUtils.deepMerge(target, source)
      
      expect(merged.name).toBe('Original')
      expect(merged.details.price).toBe(50)
      expect(merged.details.category).toBe('new')
      expect(merged.details.featured).toBe(true)
      expect(merged.active).toBe(true)
      expect(merged.tags).toEqual(['old'])
    })
  })

  describe('Cross-DTO Consistency', () => {
    it('should maintain consistent ID formats across DTOs', () => {
      const serviceId = 'service-123'
      const userId = 'user-456'
      
      // IDs should be consistent across different DTOs
      const serviceData = {
        id: serviceId,
        name: 'Test Service',
        slug: 'test-service',
        description: 'Test',
        shortDescription: 'Test',
        price: 50,
        duration: '60 min',
        image: '/test.jpg',
        isActive: true,
        category: { id: 'test', name: 'Test', slug: 'test' },
        featured: false,
        popular: false,
        availability: { mobile: true, inShop: false },
        features: [],
        tags: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      const bookingData = {
        id: 'booking-789',
        userId: userId,
        serviceId: serviceId,
        serviceName: 'Test Service',
        scheduledDate: '2024-06-01T10:00:00Z',
        location: { type: 'mobile' as const },
        status: 'pending' as const,
        price: 50,
        duration: '60 min',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      const service = ServiceMapper.toDomain(serviceData)
      const booking = BookingMapper.toDomain(bookingData)

      expect(service.id).toBe(serviceId)
      expect(booking.serviceId).toBe(serviceId)
      expect(booking.userId).toBe(userId)
    })

    it('should maintain consistent timestamp formats', () => {
      const timestamp = '2024-01-01T10:30:00Z'
      
      const serviceData = {
        id: '1',
        name: 'Test',
        slug: 'test',
        description: 'Test',
        shortDescription: 'Test',
        price: 50,
        duration: '60 min',
        image: '/test.jpg',
        isActive: true,
        category: { id: 'test', name: 'Test', slug: 'test' },
        featured: false,
        popular: false,
        availability: { mobile: true, inShop: false },
        features: [],
        tags: [],
        createdAt: timestamp,
        updatedAt: timestamp
      }

      const bookingData = {
        id: '1',
        userId: 'user-1',
        serviceId: 'service-1',
        serviceName: 'Test',
        scheduledDate: timestamp,
        location: { type: 'mobile' as const },
        status: 'pending' as const,
        price: 50,
        duration: '60 min',
        createdAt: timestamp,
        updatedAt: timestamp
      }

      const service = ServiceMapper.toDomain(serviceData)
      const booking = BookingMapper.toDomain(bookingData)

      expect(service.createdAt).toBe(timestamp)
      expect(booking.createdAt).toBeInstanceOf(Date)
      expect(booking.scheduledDate).toBeInstanceOf(Date)
    })
  })
})