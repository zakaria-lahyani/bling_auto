import type { UserRole } from './rbac'
import { auth } from './sdk'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
}

// Mock user data for demonstration
const MOCK_USERS: Record<string, User> = {
  'visitor@example.com': {
    id: '1',
    email: 'visitor@example.com',
    name: 'Guest User',
    role: 'Visitor',
    createdAt: new Date().toISOString()
  },
  'client@example.com': {
    id: '2',
    email: 'client@example.com',
    name: 'John Smith',
    role: 'Client',
    avatar: '/avatars/client.jpg',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  'operator@example.com': {
    id: '3',
    email: 'operator@example.com',
    name: 'Mike Johnson',
    role: 'Operator',
    avatar: '/avatars/operator.jpg',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  'manager@example.com': {
    id: '4',
    email: 'manager@example.com',
    name: 'Sarah Wilson',
    role: 'Manager',
    avatar: '/avatars/manager.jpg',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  'owner@example.com': {
    id: '5',
    email: 'owner@example.com',
    name: 'Alex Brown',
    role: 'Owner',
    avatar: '/avatars/owner.jpg',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
}

export class AuthService {
  private static readonly TOKEN_KEY = 'car_wash_auth_token'
  private static readonly USER_KEY = 'car_wash_user'

  /**
   * Get current authenticated user from storage
   */
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    try {
      const userData = localStorage.getItem(this.USER_KEY)
      return userData ? JSON.parse(userData) : null
    } catch {
      return null
    }
  }

  /**
   * Get current auth token
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser()
  }

  /**
   * Login with email and password
   */
  static async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = MOCK_USERS[credentials.email]
    if (!user || credentials.password !== 'password') {
      throw new Error('Invalid email or password')
    }

    const token = this.generateMockToken(user)
    
    // Store in localStorage
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    
    // Set token in SDK
    auth.setToken(token)

    return user
  }

  /**
   * Register new user
   */
  static async register(data: RegisterData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (MOCK_USERS[data.email]) {
      throw new Error('User already exists')
    }

    const user: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: 'Client', // New users default to Client role
      createdAt: new Date().toISOString()
    }

    // In real implementation, this would be saved to database
    MOCK_USERS[data.email] = user

    const token = this.generateMockToken(user)
    
    // Store in localStorage
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    
    // Set token in SDK
    auth.setToken(token)

    return user
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<void> {
    // Clear localStorage
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
    
    // Remove token from SDK
    auth.removeToken()
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(): Promise<string> {
    const user = this.getCurrentUser()
    if (!user) {
      throw new Error('No user to refresh token for')
    }

    const newToken = this.generateMockToken(user)
    localStorage.setItem(this.TOKEN_KEY, newToken)
    auth.setToken(newToken)
    
    return newToken
  }

  /**
   * Update user profile
   */
  static async updateProfile(updates: Partial<Pick<User, 'name' | 'avatar'>>): Promise<User> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      throw new Error('No authenticated user')
    }

    const updatedUser = { ...currentUser, ...updates }
    
    // Update in mock storage
    MOCK_USERS[updatedUser.email] = updatedUser
    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser))

    return updatedUser
  }

  /**
   * Change user password
   */
  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (currentPassword !== 'password') {
      throw new Error('Current password is incorrect')
    }

    // In real implementation, this would update the password in database
    console.log('Password changed successfully')
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!MOCK_USERS[email]) {
      throw new Error('User not found')
    }

    // In real implementation, this would send reset email
    console.log(`Password reset email sent to ${email}`)
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In real implementation, this would validate token and update password
    console.log('Password reset successfully')
  }

  /**
   * Switch user role (for testing purposes)
   */
  static async switchRole(newRole: UserRole): Promise<User> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      throw new Error('No authenticated user')
    }

    const updatedUser = { ...currentUser, role: newRole }
    
    // Update in mock storage
    MOCK_USERS[updatedUser.email] = updatedUser
    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser))

    return updatedUser
  }

  /**
   * Generate mock JWT token
   */
  private static generateMockToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({ 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      iat: Date.now() / 1000,
      exp: (Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }))
    const signature = btoa('mock-signature')
    
    return `${header}.${payload}.${signature}`
  }

  /**
   * Validate and decode token
   */
  static validateToken(token: string): boolean {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return false
      
      const payload = JSON.parse(atob(parts[1]))
      const now = Date.now() / 1000
      
      return payload.exp > now
    } catch {
      return false
    }
  }

  /**
   * Initialize auth state from storage
   */
  static initialize(): AuthState {
    const token = this.getToken()
    const user = this.getCurrentUser()
    
    if (token && user && this.validateToken(token)) {
      auth.setToken(token)
      return {
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    }

    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    }
  }
}