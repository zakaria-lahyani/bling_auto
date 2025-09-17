# Backend Data Fetching Guide

This guide explains how to fetch data from backend services in the CarWash Pro application, including API calls, state management, and error handling.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [API Infrastructure](#api-infrastructure)
- [Data Fetching Patterns](#data-fetching-patterns)
- [Using React Query](#using-react-query)
- [Creating API Services](#creating-api-services)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Architecture Overview

The application uses a layered approach for data fetching:

```
Frontend Layer
    ↓
React Query (Cache & State Management)
    ↓
API Services (Business Logic)
    ↓
SDK/HTTP Client (Infrastructure)
    ↓
Backend API
```

## API Infrastructure

### SDK Configuration

The base SDK is located at `src/infrastructure/api/sdk.ts`:

```tsx
// src/infrastructure/api/sdk.ts
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Request interceptor for auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('car_wash_auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## Data Fetching Patterns

### Pattern 1: Using React Query Hooks

React Query provides powerful data fetching with caching, synchronization, and error handling.

#### Creating a Query Hook

```tsx
// src/features/booking/hooks/useBookings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BookingService } from '../services/bookingService'
import type { Booking, CreateBookingDto } from '../types'

// Fetch bookings list
export const useBookings = (filters?: BookingFilters) => {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => BookingService.getBookings(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })
}

// Fetch single booking
export const useBooking = (bookingId: string) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => BookingService.getBooking(bookingId),
    enabled: !!bookingId, // Only run if bookingId exists
  })
}

// Create booking mutation
export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBookingDto) => BookingService.createBooking(data),
    onSuccess: () => {
      // Invalidate and refetch bookings list
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: (error) => {
      console.error('Failed to create booking:', error)
    }
  })
}

// Update booking mutation
export const useUpdateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Booking> }) => 
      BookingService.updateBooking(id, data),
    onSuccess: (data, variables) => {
      // Update cache for specific booking
      queryClient.setQueryData(['booking', variables.id], data)
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })
}

// Delete booking mutation
export const useDeleteBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookingId: string) => BookingService.deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })
}
```

### Pattern 2: Creating API Services

Create service classes to encapsulate API logic:

```tsx
// src/features/booking/services/bookingService.ts
import { apiClient } from '@/infrastructure/api/sdk'
import type { Booking, CreateBookingDto, BookingFilters } from '../types'

export class BookingService {
  private static readonly BASE_PATH = '/bookings'

  // GET /api/bookings
  static async getBookings(filters?: BookingFilters): Promise<Booking[]> {
    const { data } = await apiClient.get(this.BASE_PATH, {
      params: filters
    })
    return data
  }

  // GET /api/bookings/:id
  static async getBooking(bookingId: string): Promise<Booking> {
    const { data } = await apiClient.get(`${this.BASE_PATH}/${bookingId}`)
    return data
  }

  // POST /api/bookings
  static async createBooking(bookingData: CreateBookingDto): Promise<Booking> {
    const { data } = await apiClient.post(this.BASE_PATH, bookingData)
    return data
  }

  // PUT /api/bookings/:id
  static async updateBooking(
    bookingId: string, 
    updates: Partial<Booking>
  ): Promise<Booking> {
    const { data } = await apiClient.put(
      `${this.BASE_PATH}/${bookingId}`, 
      updates
    )
    return data
  }

  // DELETE /api/bookings/:id
  static async deleteBooking(bookingId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${bookingId}`)
  }

  // POST /api/bookings/:id/cancel
  static async cancelBooking(bookingId: string): Promise<Booking> {
    const { data } = await apiClient.post(
      `${this.BASE_PATH}/${bookingId}/cancel`
    )
    return data
  }

  // GET /api/bookings/available-slots
  static async getAvailableSlots(date: Date): Promise<string[]> {
    const { data } = await apiClient.get(
      `${this.BASE_PATH}/available-slots`,
      { params: { date: date.toISOString() } }
    )
    return data
  }
}
```

## Examples

### Example 1: Simple Data Fetching in a Component

```tsx
// src/views/apps/BookingListPage.tsx
'use client'

import React from 'react'
import { useBookings } from '@/features/booking/hooks'
import { Card, LoadingSpinner, ErrorMessage } from '@/shared/components/ui'

const BookingListPage = () => {
  const { data: bookings, isLoading, error } = useBookings({
    status: 'active',
    sortBy: 'date'
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!bookings?.length) return <div>No bookings found</div>

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Your Bookings</h1>
      
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{booking.serviceName}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(booking.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-lg font-bold">
                ${booking.price}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BookingListPage
```

### Example 2: Form with Mutation

```tsx
// src/views/apps/CreateBookingPage.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateBooking } from '@/features/booking/hooks'
import { Button, Input, Card } from '@/shared/components/ui'
import { toast } from 'sonner'

const CreateBookingPage = () => {
  const router = useRouter()
  const createBooking = useCreateBooking()
  
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    location: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const result = await createBooking.mutateAsync({
        ...formData,
        date: new Date(`${formData.date}T${formData.time}`)
      })
      
      toast.success('Booking created successfully!')
      router.push(`/bookings/${result.id}`)
    } catch (error) {
      toast.error('Failed to create booking')
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book a Service</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Service</label>
          <select
            value={formData.serviceId}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              serviceId: e.target.value
            }))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a service...</option>
            <option value="basic">Basic Wash</option>
            <option value="premium">Premium Wash</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                date: e.target.value
              }))}
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Time</label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                time: e.target.value
              }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Location</label>
          <Input
            type="text"
            placeholder="Enter your address"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              location: e.target.value
            }))}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={createBooking.isPending}
        >
          {createBooking.isPending ? 'Creating...' : 'Book Now'}
        </Button>
      </form>
    </Card>
  )
}

export default CreateBookingPage
```

### Example 3: Real-time Updates with Polling

```tsx
// src/features/dashboard/hooks/useLiveMetrics.ts
import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '../services/dashboardService'

export const useLiveMetrics = () => {
  return useQuery({
    queryKey: ['metrics', 'live'],
    queryFn: () => DashboardService.getLiveMetrics(),
    refetchInterval: 30000, // Poll every 30 seconds
    refetchIntervalInBackground: false, // Stop polling when tab is not active
  })
}

// Usage in component
const DashboardPage = () => {
  const { data: metrics } = useLiveMetrics()
  
  return (
    <div>
      <h2>Live Metrics</h2>
      <div>Active Bookings: {metrics?.activeBookings}</div>
      <div>Today's Revenue: ${metrics?.todayRevenue}</div>
    </div>
  )
}
```

### Example 4: Infinite Scroll with Pagination

```tsx
// src/features/reviews/hooks/useInfiniteReviews.ts
import { useInfiniteQuery } from '@tanstack/react-query'
import { ReviewService } from '../services/reviewService'

export const useInfiniteReviews = () => {
  return useInfiniteQuery({
    queryKey: ['reviews', 'infinite'],
    queryFn: ({ pageParam = 1 }) => ReviewService.getReviews({ 
      page: pageParam,
      limit: 10 
    }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasMore) {
        return pages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })
}

// Usage in component
const ReviewsPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteReviews()

  return (
    <div>
      {data?.pages.map((page) => (
        page.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      ))}
      
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </div>
  )
}
```

## Error Handling

### Global Error Handling

```tsx
// src/infrastructure/api/errorHandler.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error
    return new ApiError(
      error.response.status,
      error.response.data?.code || 'UNKNOWN',
      error.response.data?.message || 'An error occurred'
    )
  } else if (error.request) {
    // No response received
    return new ApiError(
      0,
      'NETWORK_ERROR',
      'Network error. Please check your connection.'
    )
  } else {
    // Request setup error
    return new ApiError(
      0,
      'REQUEST_ERROR',
      error.message || 'Failed to make request'
    )
  }
}
```

### Component-Level Error Handling

```tsx
// src/features/booking/components/BookingForm.tsx
const BookingForm = () => {
  const [error, setError] = useState<string | null>(null)
  const createBooking = useCreateBooking()

  const handleSubmit = async (data: CreateBookingDto) => {
    try {
      setError(null)
      await createBooking.mutateAsync(data)
    } catch (err) {
      const apiError = handleApiError(err)
      
      // Handle specific error codes
      switch (apiError.code) {
        case 'SLOT_UNAVAILABLE':
          setError('This time slot is no longer available')
          break
        case 'INVALID_DATE':
          setError('Please select a future date')
          break
        default:
          setError(apiError.message)
      }
    }
  }

  return (
    <form>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}
      {/* Form fields */}
    </form>
  )
}
```

## Best Practices

### 1. Use Type-Safe API Calls

Always define TypeScript types for API requests and responses:

```tsx
// types/booking.ts
export interface Booking {
  id: string
  userId: string
  serviceId: string
  date: Date
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  price: number
}

export interface CreateBookingDto {
  serviceId: string
  date: Date
  location: string
  notes?: string
}

export interface BookingFilters {
  status?: string
  startDate?: Date
  endDate?: Date
  sortBy?: 'date' | 'price' | 'status'
}
```

### 2. Implement Optimistic Updates

For better UX, update the UI optimistically:

```tsx
const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (serviceId: string) => ServiceService.toggleFavorite(serviceId),
    onMutate: async (serviceId) => {
      // Cancel in-flight queries
      await queryClient.cancelQueries({ queryKey: ['service', serviceId] })
      
      // Snapshot previous value
      const previousService = queryClient.getQueryData(['service', serviceId])
      
      // Optimistically update
      queryClient.setQueryData(['service', serviceId], (old: Service) => ({
        ...old,
        isFavorite: !old.isFavorite
      }))
      
      // Return context for rollback
      return { previousService }
    },
    onError: (err, serviceId, context) => {
      // Rollback on error
      if (context?.previousService) {
        queryClient.setQueryData(['service', serviceId], context.previousService)
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['services'] })
    }
  })
}
```

### 3. Handle Loading States Properly

Create reusable loading components:

```tsx
// src/shared/components/ui/DataLoader.tsx
interface DataLoaderProps<T> {
  data: T | undefined
  isLoading: boolean
  error: any
  children: (data: T) => React.ReactNode
  loadingComponent?: React.ReactNode
  errorComponent?: React.ReactNode
  emptyComponent?: React.ReactNode
}

export function DataLoader<T>({
  data,
  isLoading,
  error,
  children,
  loadingComponent = <LoadingSpinner />,
  errorComponent = <ErrorMessage error={error} />,
  emptyComponent = <div>No data available</div>
}: DataLoaderProps<T>) {
  if (isLoading) return <>{loadingComponent}</>
  if (error) return <>{errorComponent}</>
  if (!data) return <>{emptyComponent}</>
  
  return <>{children(data)}</>
}

// Usage
<DataLoader
  data={bookings}
  isLoading={isLoading}
  error={error}
  emptyComponent={<div>No bookings yet</div>}
>
  {(bookings) => (
    <div>
      {bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  )}
</DataLoader>
```

### 4. Cache Management

Use query keys effectively for cache management:

```tsx
// Consistent query key structure
const queryKeys = {
  all: ['bookings'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters: BookingFilters) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
}

// Usage
useQuery({
  queryKey: queryKeys.list({ status: 'active' }),
  queryFn: () => BookingService.getBookings({ status: 'active' })
})

// Invalidate specific queries
queryClient.invalidateQueries({ 
  queryKey: queryKeys.lists() // Invalidate all lists
})
```

### 5. Implement Retry Logic

Configure smart retry strategies:

```tsx
const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: BookingService.getBookings,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error.status >= 400 && error.status < 500) {
        return false
      }
      // Retry up to 3 times for other errors
      return failureCount < 3
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
```

### 6. Handle Authentication

Ensure API calls include authentication:

```tsx
// src/infrastructure/api/authInterceptor.ts
import { AuthService } from '@/infrastructure/auth/auth'

apiClient.interceptors.request.use(
  async (config) => {
    const token = AuthService.getToken()
    
    if (token && AuthService.validateToken(token)) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (token) {
      // Token expired, try to refresh
      try {
        const newToken = await AuthService.refreshToken()
        config.headers.Authorization = `Bearer ${newToken}`
      } catch {
        // Refresh failed, redirect to login
        window.location.href = '/login'
      }
    }
    
    return config
  },
  (error) => Promise.reject(error)
)
```

## Testing API Calls

### Unit Testing Services

```tsx
// src/features/booking/services/__tests__/bookingService.test.ts
import { BookingService } from '../bookingService'
import { apiClient } from '@/infrastructure/api/sdk'

jest.mock('@/infrastructure/api/sdk')

describe('BookingService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch bookings', async () => {
    const mockBookings = [{ id: '1', serviceId: 'basic' }]
    ;(apiClient.get as jest.Mock).mockResolvedValue({ data: mockBookings })

    const result = await BookingService.getBookings()

    expect(apiClient.get).toHaveBeenCalledWith('/bookings', {
      params: undefined
    })
    expect(result).toEqual(mockBookings)
  })

  it('should create booking', async () => {
    const newBooking = { serviceId: 'premium', date: new Date() }
    const createdBooking = { id: '1', ...newBooking }
    ;(apiClient.post as jest.Mock).mockResolvedValue({ data: createdBooking })

    const result = await BookingService.createBooking(newBooking)

    expect(apiClient.post).toHaveBeenCalledWith('/bookings', newBooking)
    expect(result).toEqual(createdBooking)
  })
})
```

### Testing Hooks

```tsx
// src/features/booking/hooks/__tests__/useBookings.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useBookings } from '../useBookings'
import { BookingService } from '../../services/bookingService'

jest.mock('../../services/bookingService')

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useBookings', () => {
  it('should fetch bookings', async () => {
    const mockBookings = [{ id: '1', serviceId: 'basic' }]
    ;(BookingService.getBookings as jest.Mock).mockResolvedValue(mockBookings)

    const { result } = renderHook(() => useBookings(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockBookings)
  })
})
```

## Summary

Key points for backend data fetching:

1. **Use React Query** for caching and state management
2. **Create service classes** to encapsulate API logic
3. **Define TypeScript types** for all API interactions
4. **Handle errors gracefully** at both global and component levels
5. **Implement loading states** for better UX
6. **Use optimistic updates** where appropriate
7. **Configure smart retry strategies** for resilience
8. **Test your API calls** and hooks thoroughly

This architecture provides a robust, maintainable, and scalable approach to backend data fetching in your application.