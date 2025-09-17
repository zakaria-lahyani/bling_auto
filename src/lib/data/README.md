# Data Package

This package provides a unified interface for data access, supporting both static data and API endpoints. It's designed to allow seamless switching between development (static) and production (API) modes.

## Quick Start

```ts
import { dataManager, getServices, getHeroContent } from '@/lib/data'

// Get services with filtering
const services = await getServices({ category: 'wash', featured: true })

// Get individual service
const service = await dataManager.getServiceById('1')

// Get homepage content
const heroContent = await getHeroContent()
```

## Configuration

Set environment variables to control data source:

```bash
# Use static data (default)
NEXT_PUBLIC_DATA_SOURCE=static

# Use API endpoints
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/v1
```

## Data Sources

### Static Mode (`static`)
- Uses hardcoded data from TypeScript files
- Perfect for development and prototyping
- No backend dependencies
- Simulates API delays for realistic UX

### API Mode (`api`)
- Fetches data from real backend endpoints
- Automatic retry with exponential backoff
- Caching for performance
- Falls back to static data if API fails

## Architecture

```
src/lib/data/
├── index.ts          # Main entry point
├── types.ts          # TypeScript interfaces
├── config.ts         # Configuration
├── fetchers/
│   ├── base.ts       # Common functionality
│   ├── static.ts     # Static data implementation
│   └── api.ts        # API implementation
└── README.md         # This file
```

## Usage Patterns

### Services

```ts
import { getServices, getServiceById, getServiceCategories } from '@/lib/data'

// All services
const allServices = await getServices()

// Filtered services
const washServices = await getServices({ 
  category: 'wash',
  priceMax: 100,
  availability: ['mobile']
})

// Search
const searchResults = await getServices({ query: 'ceramic' })

// Categories
const categories = await getServiceCategories()
```

### Homepage Content

```ts
import { 
  getHeroContent, 
  getStats, 
  getTestimonials, 
  getFeatures 
} from '@/lib/data'

const heroContent = await getHeroContent()
const stats = await getStats()
const testimonials = await getTestimonials()
const features = await getFeatures()
```

### Business Information

```ts
import { getContactInfo, getBusinessSettings } from '@/lib/data'

const contactInfo = await getContactInfo()
const settings = await getBusinessSettings()
```

## API Integration

When you're ready to connect to your backend:

1. **Set environment variable**:
   ```bash
   NEXT_PUBLIC_DATA_SOURCE=api
   NEXT_PUBLIC_API_BASE_URL=https://your-api.com/v1
   ```

2. **Ensure API endpoints match**:
   ```
   GET /services              # List services
   GET /services/{id}         # Get service by ID
   GET /categories            # List categories
   GET /content/homepage/hero # Hero content
   GET /stats                 # Statistics
   GET /testimonials          # Testimonials
   GET /contact              # Contact information
   GET /settings             # Business settings
   ```

3. **API Response Format**:
   ```ts
   {
     "data": [...],           # Actual data
     "success": true,         # Success flag
     "message": "OK",         # Optional message
     "pagination": {          # Optional pagination
       "page": 1,
       "limit": 10,
       "total": 100,
       "totalPages": 10
     }
   }
   ```

## Advanced Features

### Caching
```ts
import { clearDataCache, clearDataCacheForKey } from '@/lib/data'

// Clear all cache
clearDataCache()

// Clear specific cache
clearDataCacheForKey('services')
```

### Search Parameters
```ts
const services = await getServices({
  query: 'wash',              # Text search
  category: 'wash',           # Category filter
  featured: true,             # Featured only
  popular: true,              # Popular only
  priceMin: 50,              # Price range
  priceMax: 200,
  availability: ['mobile'],   # Availability
  tags: ['premium'],          # Tags
  sortBy: 'price',           # Sort field
  sortOrder: 'asc',          # Sort direction
  page: 1,                   # Pagination
  limit: 10
})
```

### Error Handling
```ts
try {
  const services = await getServices()
} catch (error) {
  console.error('Failed to load services:', error)
  // Handle error state in UI
}
```

## Migration from Existing Code

Replace direct imports with data package:

```ts
// Before
import { allServices, getServicesByCategory } from '@/data/servicesData'

// After
import { getServices, getServicesByCategory } from '@/lib/data'

// Before
const services = getServicesByCategory('wash')

// After
const services = await getServicesByCategory('wash')
```

Note: Functions are now async, so add `await` or use `.then()`

## TypeScript Support

All types are exported for use in components:

```ts
import type { 
  Service, 
  ServiceCategory, 
  HeroContent,
  SearchParams 
} from '@/lib/data'

interface ComponentProps {
  services: Service[]
  categories: ServiceCategory[]
}
```

## Testing

The package supports easy testing with static data:

```ts
// In tests
process.env.NEXT_PUBLIC_DATA_SOURCE = 'static'

import { getServices } from '@/lib/data'

test('should load services', async () => {
  const services = await getServices()
  expect(services).toHaveLength(10)
})
```

## Performance

- **Caching**: Automatic caching with TTL
- **Retries**: Automatic retry with exponential backoff
- **Fallbacks**: Falls back to static data if API fails
- **Lazy Loading**: Data is only fetched when needed

## Best Practices

1. **Use the main interface**: Import from `@/lib/data`, not submodules
2. **Handle loading states**: All functions are async
3. **Handle errors**: Wrap in try/catch blocks
4. **Use TypeScript**: Import types for better development experience
5. **Cache wisely**: Use cache clearing functions sparingly
6. **Test with static**: Develop against static data first

## Future Enhancements

- Real-time updates with WebSockets
- Optimistic updates for better UX
- Background sync for offline support
- GraphQL support
- More sophisticated caching strategies