# Backend Integration Guide

This guide explains how to integrate the services page with a real backend API. The current implementation uses a mock data structure that mirrors what a backend would return, making the transition seamless.

## Current Architecture

### Data Layer Structure
```
src/
├── data/
│   └── servicesData.ts          # Mock data that simulates backend responses
├── views/marketing/
│   └── ServicesPage.tsx         # Frontend component (no changes needed)
└── app/services/
    └── page.tsx                 # Route configuration
```

## 🚀 Backend Integration Steps

### Step 1: Create API Service Layer

Create a new API service layer to replace the mock data:

```typescript
// src/services/api/servicesApi.ts
import { Service, ServiceCategory } from '@/data/servicesData'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export class ServicesAPI {
  /**
   * Fetch all services from backend
   */
  static async getAllServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services`)
    if (!response.ok) {
      throw new Error('Failed to fetch services')
    }
    return response.json()
  }

  /**
   * Fetch services by category
   */
  static async getServicesByCategory(categorySlug: string): Promise<Service[]> {
    if (categorySlug === 'all') {
      return this.getAllServices()
    }
    
    const response = await fetch(`${API_BASE_URL}/services?category=${categorySlug}`)
    if (!response.ok) {
      throw new Error('Failed to fetch services by category')
    }
    return response.json()
  }

  /**
   * Search services
   */
  static async searchServices(query: string): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error('Failed to search services')
    }
    return response.json()
  }

  /**
   * Fetch service categories
   */
  static async getServiceCategories(): Promise<ServiceCategory[]> {
    const response = await fetch(`${API_BASE_URL}/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  }

  /**
   * Fetch single service by ID
   */
  static async getServiceById(id: string): Promise<Service> {
    const response = await fetch(`${API_BASE_URL}/services/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch service')
    }
    return response.json()
  }

  /**
   * Fetch featured services
   */
  static async getFeaturedServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services?featured=true`)
    if (!response.ok) {
      throw new Error('Failed to fetch featured services')
    }
    return response.json()
  }

  /**
   * Fetch popular services
   */
  static async getPopularServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services?popular=true`)
    if (!response.ok) {
      throw new Error('Failed to fetch popular services')
    }
    return response.json()
  }
}
```

### Step 2: Update Services Page with API Integration

Replace the mock data imports with API calls:

```typescript
// src/views/marketing/ServicesPage.tsx
import { ServicesAPI } from '@/services/api/servicesApi'

const ServicesPage = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileOnly, setShowMobileOnly] = useState<boolean>(false)
  
  // New state for API data
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const [servicesData, categoriesData] = await Promise.all([
          ServicesAPI.getAllServices(),
          ServicesAPI.getServiceCategories()
        ])
        setServices(servicesData)
        setCategories(categoriesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Filter and search logic (updated to use state data)
  const filteredServices = useMemo(async () => {
    try {
      let result: Service[]
      
      if (searchQuery) {
        result = await ServicesAPI.searchServices(searchQuery)
      } else {
        result = await ServicesAPI.getServicesByCategory(selectedCategory)
      }
      
      if (showMobileOnly) {
        result = result.filter(service => service.availability.mobile)
      }
      
      return result
    } catch (err) {
      console.error('Failed to filter services:', err)
      return []
    }
  }, [selectedCategory, searchQuery, showMobileOnly])

  // Add loading and error states to JSX
  if (loading) {
    return (
      <MarketingLayout header={{ variant: 'default', showAuth: true }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-content-muted">Loading services...</p>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  if (error) {
    return (
      <MarketingLayout header={{ variant: 'default', showAuth: true }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-brand-500 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  // Rest of component remains the same...
}
```

### Step 3: Environment Configuration

Add API configuration to your environment files:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# .env.production
NEXT_PUBLIC_API_BASE_URL=https://your-production-api.com/api
```

## 📋 Backend Requirements

### Required API Endpoints

Your backend should implement these endpoints that match the current data structure:

#### 1. Services Endpoints
```
GET /api/services
- Returns: Service[]
- Description: Get all services

GET /api/services?category={slug}
- Returns: Service[]
- Description: Get services by category

GET /api/services?featured=true
- Returns: Service[]
- Description: Get featured services

GET /api/services?popular=true
- Returns: Service[]
- Description: Get popular services

GET /api/services/search?q={query}
- Returns: Service[]
- Description: Search services

GET /api/services/{id}
- Returns: Service
- Description: Get single service
```

#### 2. Categories Endpoints
```
GET /api/categories
- Returns: ServiceCategory[]
- Description: Get all service categories
```

### Required Data Models

Your backend must return data matching these TypeScript interfaces:

```typescript
interface Service {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  duration: string
  image: string
  category: {
    id: string
    name: string
    slug: string
  }
  popular: boolean
  featured: boolean
  tags: string[]
  features: string[]
  benefits: string[]
  addOns?: {
    id: string
    name: string
    price: number
    description: string
  }[]
  availability: {
    mobile: boolean
    inShop: boolean
  }
  rating: number
  reviewCount: number
  estimatedTime: {
    min: number
    max: number
  }
  createdAt: string
  updatedAt: string
}

interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  serviceCount: number
  popular: boolean
}
```

## 🔄 Migration Process

### Phase 1: Setup (No Frontend Changes)
1. Create the API service layer
2. Set up environment variables
3. Test API endpoints with mock data

### Phase 2: Gradual Migration
1. Replace `getAllServices()` first
2. Test and verify functionality
3. Replace category and search functions
4. Add loading and error states

### Phase 3: Optimization
1. Add caching with React Query or SWR
2. Implement optimistic updates
3. Add pagination if needed

## 🚨 **Is It Ready to Use?**

### ✅ **YES - The frontend is 100% ready** if your backend returns the exact data structure shown above.

### ⚠️ **Minor tweaks needed** if:

1. **Different API Response Format**: If your API wraps responses differently:
```typescript
// Your API returns: { data: Service[], meta: {...} }
// Instead of: Service[]

// Easy fix in ServicesAPI:
static async getAllServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/services`)
  const result = await response.json()
  return result.data // Extract the services array
}
```

2. **Different Field Names**: If your backend uses different property names:
```typescript
// Backend returns 'title' instead of 'name'
// Backend returns 'cost' instead of 'price'

// Create a mapper function:
const mapBackendService = (backendService: any): Service => ({
  ...backendService,
  name: backendService.title,
  price: backendService.cost,
  // ... other mappings
})
```

3. **Authentication Required**: If your API requires auth headers:
```typescript
static async getAllServices(): Promise<Service[]> {
  const token = await getAuthToken() // Your auth method
  const response = await fetch(`${API_BASE_URL}/services`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
```

## 🎯 **Recommendation**

1. **Start with mock data** (current setup) ✅
2. **Build your backend** to match the provided data structure
3. **Replace mock imports** with API calls (15-minute change)
4. **Add error handling and loading states**

The frontend is architected to work seamlessly with a backend that returns the documented data structure. The transition should be smooth and require minimal code changes.

## 🔧 **Advanced Features**

### Caching with React Query
```typescript
// Optional: Add React Query for better performance
import { useQuery } from '@tanstack/react-query'

const { data: services, isLoading, error } = useQuery({
  queryKey: ['services', selectedCategory, searchQuery],
  queryFn: () => searchQuery 
    ? ServicesAPI.searchServices(searchQuery)
    : ServicesAPI.getServicesByCategory(selectedCategory),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

### Pagination Support
```typescript
// If you need pagination, add these parameters:
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

static async getAllServices(page = 1, limit = 10): Promise<PaginatedResponse<Service>> {
  const response = await fetch(`${API_BASE_URL}/services?page=${page}&limit=${limit}`)
  return response.json()
}
```

The services page is designed to be backend-agnostic and easily adaptable to your specific API requirements!