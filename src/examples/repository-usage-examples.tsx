/**
 * Repository Pattern Usage Examples
 * 
 * This file demonstrates various ways to use the new repository pattern
 * for different scenarios and use cases.
 */

import React, { useState } from 'react'
import type { Service } from '@/core/entities/service'
import { 
  useServices, 
  useService, 
  useServiceSearch,
  useServicesWithFilters,
  useServicesPaginated,
  useFeaturedServices 
} from '@/features/services/hooks/useServices'

// Example 1: Basic Service List
export const BasicServiceList: React.FC = () => {
  const { data: services, isLoading, error } = useServices()

  if (isLoading) return <div>Loading services...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>All Services</h2>
      {services?.map((service: Service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>${service.price}</p>
        </div>
      ))}
    </div>
  )
}

// Example 2: Service Detail Page
export const ServiceDetailPage: React.FC<{ serviceId: string }> = ({ serviceId }) => {
  const { data: service, isLoading, error } = useService(serviceId)

  if (isLoading) return <div>Loading service details...</div>
  if (error) return <div>Service not found</div>
  if (!service) return <div>Service not found</div>

  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <p>Price: ${service.price}</p>
      <p>Duration: {service.duration} minutes</p>
    </div>
  )
}

// Example 3: Search Interface
export const ServiceSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const { data: searchResults, isLoading } = useServiceSearch(query)

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search services..."
      />
      
      {isLoading && <div>Searching...</div>}
      
      {searchResults?.map((service: Service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  )
}

// Example 4: Advanced Filtering
export const FilteredServiceList: React.FC = () => {
  const [filters, setFilters] = useState({
    category: '',
    featured: false,
    priceRange: { min: 0, max: 100 }
  })

  const { data: services, isLoading } = useServicesWithFilters(filters)

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <div className="filters">
        <select 
          value={filters.category} 
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="mobile">Mobile</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={filters.featured}
            onChange={(e) => updateFilter('featured', e.target.checked)}
          />
          Featured Only
        </label>

        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange.max}
          onChange={(e) => updateFilter('priceRange', { 
            ...filters.priceRange, 
            max: parseInt(e.target.value) 
          })}
        />
        <span>Max Price: ${filters.priceRange.max}</span>
      </div>

      {isLoading && <div>Loading filtered services...</div>}

      <div className="results">
        {services?.map((service: Service) => (
          <div key={service.id}>
            <h3>{service.name}</h3>
            <p>${service.price}</p>
            {service.featured && <span className="badge">Featured</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Example 5: Paginated Service List
export const PaginatedServiceList: React.FC = () => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { 
    data: paginatedData, 
    isLoading 
  } = useServicesPaginated({
    page,
    limit: 10,
    sort: { field: sortBy, order: sortOrder }
  })

  return (
    <div>
      <div className="controls">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>

        <button 
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {isLoading && <div>Loading...</div>}

      {paginatedData && (
        <>
          <div className="results">
            {paginatedData.data.map((service: Service) => (
              <div key={service.id}>
                <h3>{service.name}</h3>
                <p>${service.price}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button 
              disabled={!paginatedData.hasPrev}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            
            <span>
              Page {paginatedData.page} of {Math.ceil(paginatedData.total / 10)}
            </span>
            
            <button 
              disabled={!paginatedData.hasNext}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// Example 6: Featured Services Carousel
export const FeaturedServicesCarousel: React.FC = () => {
  const { data: featuredServices, isLoading, error } = useFeaturedServices()

  if (isLoading) return <div>Loading featured services...</div>
  if (error) return <div>Failed to load featured services</div>
  if (!featuredServices?.length) return <div>No featured services available</div>

  return (
    <div className="carousel">
      <h2>Featured Services</h2>
      <div className="carousel-container">
        {featuredServices.map((service: Service) => (
          <div key={service.id} className="carousel-item">
            <img src={service.image} alt={service.name} />
            <h3>{service.name}</h3>
            <p>${service.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Example 7: Error Handling with Fallbacks
export const RobustServiceList: React.FC = () => {
  const { data: services, isLoading, error, refetch } = useServices()

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Loading services...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    )
  }

  if (!services?.length) {
    return (
      <div className="empty-state">
        <h3>No services available</h3>
        <p>Check back later for new services!</p>
      </div>
    )
  }

  return (
    <div className="service-grid">
      {services.map((service: Service) => (
        <div key={service.id} className="service-card">
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <div className="service-meta">
            <span className="price">${service.price}</span>
            <span className="duration">{service.duration}min</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Example 8: Data Source Switcher (Development Tool)
export const DataSourceSwitcher: React.FC = () => {
  const [currentSource, setCurrentSource] = useState('mock')

  const switchDataSource = (source: 'mock' | 'api' | 'hybrid') => {
    // This would typically be handled by environment variables
    // but can be useful for development/testing
    console.log(`Switching to ${source} data source`)
    setCurrentSource(source)
    
    // In a real implementation, you'd update the repository factory
    // repositoryFactory.updateConfig({ dataSource: source })
  }

  return (
    <div className="data-source-switcher">
      <h3>Data Source: {currentSource}</h3>
      <div className="buttons">
        <button 
          onClick={() => switchDataSource('mock')}
          className={currentSource === 'mock' ? 'active' : ''}
        >
          Mock Data
        </button>
        <button 
          onClick={() => switchDataSource('api')}
          className={currentSource === 'api' ? 'active' : ''}
        >
          API Data
        </button>
        <button 
          onClick={() => switchDataSource('hybrid')}
          className={currentSource === 'hybrid' ? 'active' : ''}
        >
          Hybrid Mode
        </button>
      </div>
    </div>
  )
}

// Example 9: Performance Optimized Component
const OptimizedServiceCard = React.memo<{ service: any }>(({ service }) => {
  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p>${service.price}</p>
    </div>
  )
})

export const PerformanceOptimizedList: React.FC = () => {
  const { data: services } = useServices()

  return (
    <div>
      {services?.map((service: Service) => (
        <OptimizedServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}

// Example 10: Integration with Form
export const ServiceBookingForm: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const { data: services } = useServices()
  const { data: selectedService } = useService(selectedServiceId)

  return (
    <form>
      <div>
        <label>Select Service:</label>
        <select 
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
        >
          <option value="">Choose a service...</option>
          {services?.map((service: Service) => (
            <option key={service.id} value={service.id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>
      </div>

      {selectedService && (
        <div className="service-details">
          <h3>Selected Service: {selectedService.name}</h3>
          <p>Price: ${selectedService.price}</p>
          <p>Duration: {selectedService.duration} minutes</p>
        </div>
      )}

      <button type="submit">Book Service</button>
    </form>
  )
}