# Service Types Migration Guide

## Overview
All Service-related types have been consolidated into a single source of truth located at:
`src/core/entities/service/types.ts`

## Migration Steps

### 1. Update Your Imports

#### Before:
```typescript
// From various locations
import { Service } from '@/lib/data/types'
import { Service } from '@/lib/data/marketing/types'
import { Service } from '@/types/apps/serviceTypes'
import { Service } from '@/data/servicesData'
```

#### After:
```typescript
// Single import from core entities
import { Service } from '@/core/entities/service'
// OR for specific types
import type { Service, ServiceCategory, ServiceAddOn } from '@/core/entities/service'
```

### 2. Type Compatibility

The new `Service` interface is designed to be backward compatible with most existing code:

- ✅ All existing properties are preserved
- ✅ Optional properties remain optional
- ✅ Legacy fields are supported (but marked for deprecation)

### 3. Field Mappings

Some fields have been reorganized for better structure:

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `isPopular` | `popular` | Legacy `isPopular` still supported |
| `categories: string[]` | `category: ServiceCategory` | Legacy array still supported |
| `imageUrl` | `image` | Legacy `imageUrl` still supported |
| `estimatedDuration` | `estimatedTime.min/max` | More precise time estimation |

### 4. New Features

The consolidated types provide new capabilities:

- **Type Guards**: Use `isService()` and `isServicePackage()` for runtime type checking
- **Specialized Types**: 
  - `ServiceSummary` for list displays
  - `ServiceBooking` for cart/booking contexts
  - `ServicePackage` for bundles
- **Better Search**: `ServiceSearchParams` and `ServiceSearchResponse`
- **SEO Support**: Built-in `SeoData` type

### 5. Gradual Migration

You don't need to migrate everything at once:

1. **Phase 1**: Update critical components (booking, services page)
2. **Phase 2**: Update data fetchers and API layers
3. **Phase 3**: Update remaining components
4. **Phase 4**: Remove duplicate type definitions

### 6. Type Aliases for Compatibility

These aliases are available for backward compatibility:
```typescript
export type ServiceType = Service // Legacy alias
export type ServiceListItem = ServiceSummary
export type BookingService = ServiceBooking
```

## Files to Update

Priority files that should be migrated first:

### High Priority (Core Business Logic)
- [ ] `src/lib/data/types.ts` - Remove Service definition
- [ ] `src/lib/data/marketing/types.ts` - Remove Service definition
- [ ] `src/lib/data/fetchers/static.ts` - Update imports
- [ ] `src/lib/data/fetchers/api.ts` - Update imports
- [ ] `src/views/marketing/ServicesPage.tsx` - Update imports

### Medium Priority (Features)
- [ ] `src/features/booking/components/ServiceSelection.tsx`
- [ ] `src/features/booking/components/BookingConfirmation.tsx`
- [ ] `src/features/services/mappers/serviceMappers.ts`
- [ ] `src/components/marketing/services/*.tsx`

### Low Priority (Can use legacy support)
- [ ] `src/data/servicesData.ts` - Can be removed or updated
- [ ] `src/types/apps/serviceTypes.ts` - Can be removed
- [ ] `src/shared/components/blocks/ServicesBlock.tsx`

## Example Migration

### Before:
```typescript
// src/views/marketing/ServicesPage.tsx
import { Service } from '@/lib/data'
import { ServiceCategory } from '@/data/servicesData'

interface Props {
  services: Service[]
  categories: ServiceCategory[]
}
```

### After:
```typescript
// src/views/marketing/ServicesPage.tsx
import { Service, ServiceCategory } from '@/core/entities/service'

interface Props {
  services: Service[]
  categories: ServiceCategory[]
}
```

## Benefits After Migration

1. **Single Source of Truth**: No more confusion about which Service type to use
2. **Better Type Safety**: Comprehensive types with proper optional fields
3. **Improved IntelliSense**: Better autocomplete and documentation
4. **Easier Maintenance**: Update types in one place
5. **Future-Proof**: Ready for new features and API changes

## Questions or Issues?

If you encounter any issues during migration:
1. Check if legacy fields are being used
2. Ensure imports are from `@/core/entities/service`
3. Use type guards for runtime validation
4. Refer to the comprehensive type definitions in `types.ts`