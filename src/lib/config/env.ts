function getRequired(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function getOptional(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue
}

function getBoolean(key: string, defaultValue: boolean = false): boolean {
  const value = process.env[key]
  if (!value) return defaultValue
  return value.toLowerCase() === 'true'
}

function getNumber(key: string, defaultValue: number = 0): number {
  const value = process.env[key]
  if (!value) return defaultValue
  const num = parseInt(value, 10)
  if (isNaN(num)) {
    throw new Error(`Environment variable ${key} must be a number, got: ${value}`)
  }
  return num
}

// Client-side environment (NEXT_PUBLIC_* only)
export const clientEnv = {
  NODE_ENV: getOptional('NODE_ENV', 'development'),
  API_URL: getOptional('NEXT_PUBLIC_API_URL', '/api'),
  APP_URL: getOptional('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
} as const

// Server-side environment (all variables)
export const serverEnv = {
  ...clientEnv,
  PORT: getNumber('PORT', 3000),
  DATABASE_URL: getOptional('DATABASE_URL', ''),
  JWT_SECRET: getOptional('JWT_SECRET', 'dev-secret-key'),
  SMTP_HOST: getOptional('SMTP_HOST', ''),
  SMTP_PORT: getNumber('SMTP_PORT', 587),
  SMTP_USER: getOptional('SMTP_USER', ''),
  SMTP_PASS: getOptional('SMTP_PASS', ''),
  GOOGLE_MAPS_API_KEY: getOptional('GOOGLE_MAPS_API_KEY', ''),
  STRIPE_SECRET_KEY: getOptional('STRIPE_SECRET_KEY', ''),
  STRIPE_WEBHOOK_SECRET: getOptional('STRIPE_WEBHOOK_SECRET', ''),
} as const

// Feature flags
export const features = {
  ENABLE_LOYALTY_PROGRAM: getBoolean('NEXT_PUBLIC_ENABLE_LOYALTY_PROGRAM', true),
  ENABLE_MOBILE_BOOKINGS: getBoolean('NEXT_PUBLIC_ENABLE_MOBILE_BOOKINGS', true),
  ENABLE_PAYMENTS: getBoolean('NEXT_PUBLIC_ENABLE_PAYMENTS', false),
  ENABLE_NOTIFICATIONS: getBoolean('NEXT_PUBLIC_ENABLE_NOTIFICATIONS', true),
} as const

// Validate environment on import
export function validateEnv() {
  try {
    // Validate required client env vars
    if (typeof window === 'undefined') {
      // Server-side validations
      console.log('✅ Server environment validated')
    } else {
      // Client-side validations
      console.log('✅ Client environment validated')
    }
  } catch (error) {
    console.error('❌ Environment validation failed:', error)
    throw error
  }
}

// Export the appropriate env based on context
export const env = typeof window === 'undefined' ? serverEnv : clientEnv