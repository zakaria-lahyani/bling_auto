// Business constants
export const BUSINESS = {
  NAME: 'Premium Car Wash',
  TAGLINE: 'Professional Mobile & Onsite Car Cleaning Services',
  PHONE: '+1-555-CAR-WASH',
  EMAIL: 'info@premiumcarwash.com',
  ADDRESS: {
    STREET: '123 Car Wash Street',
    CITY: 'Your City',
    STATE: 'Your State',
    ZIP: '12345',
    COUNTRY: 'US',
  },
  HOURS: {
    WEEKDAYS: { open: '08:00', close: '18:00' },
    SATURDAY: { open: '08:00', close: '16:00' },
    SUNDAY: { open: '10:00', close: '15:00' },
  },
  COORDINATES: {
    LAT: 40.7128,
    LNG: -74.0060,
  },
} as const

// App configuration
export const APP = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  CACHE: {
    DEFAULT_TTL: 300, // 5 minutes
    LONG_TTL: 3600, // 1 hour
  },
  TIMEOUTS: {
    API_REQUEST: 10000, // 10 seconds
    FILE_UPLOAD: 30000, // 30 seconds
  },
} as const

// Service configuration
export const SERVICES = {
  MIN_PRICE: 0,
  MAX_PRICE: 1000,
  MIN_DURATION: 15, // minutes
  MAX_DURATION: 480, // 8 hours
  POPULAR_THRESHOLD: 0.8, // 80% rating threshold for popular services
} as const

// Booking configuration  
export const BOOKING = {
  ADVANCE_BOOKING_DAYS: 30,
  MIN_BOOKING_NOTICE_HOURS: 2,
  TIME_SLOTS: [
    '09:00',
    '10:30', 
    '12:00',
    '13:30',
    '15:00',
    '16:30',
  ],
  MOBILE_SERVICE_RADIUS: 50, // km
} as const

// UI constants
export const UI = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  SIDEBAR_WIDTH: 256,
  HEADER_HEIGHT: 64,
  TOAST_DURATION: 5000,
} as const

// API configuration
export const API = {
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },
  CORS_ORIGINS: [
    'http://localhost:3000',
    'https://premiumcarwash.com',
    'https://www.premiumcarwash.com',
  ],
} as const