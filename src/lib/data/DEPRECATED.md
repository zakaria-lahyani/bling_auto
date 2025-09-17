# DEPRECATED: Direct Data Fetchers

This directory contains deprecated data fetching patterns.

## Migration Guide

**Old Pattern (DEPRECATED):**
```typescript
import { dataManager } from '@/lib/data'
const services = await dataManager.getServices()
```

**New Pattern (RECOMMENDED):**
```typescript
import { useServices } from '@/features/services/hooks'
const { data: services } = useServices()
```

## Why This Change?

1. **Repository Pattern**: Single source of truth for data access
2. **React Query Integration**: Automatic caching, background updates, optimistic updates
3. **Type Safety**: Better TypeScript support with core entity types
4. **Consistency**: All features use the same data fetching approach

## Migration Steps

1. Replace `dataManager` calls with appropriate feature hooks
2. Update components to use React Query patterns
3. Remove direct imports from `@/lib/data`

## Timeline

- ✅ **Phase 1**: Repository pattern implemented
- 🚧 **Phase 2**: Migrate remaining usage (current)
- ❌ **Phase 3**: Remove deprecated fetchers (planned)

For questions, see the main architecture documentation.