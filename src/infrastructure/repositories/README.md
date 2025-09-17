# Repository Pattern Implementation

## Overview

This directory implements the Repository Pattern to abstract data access, allowing seamless switching between different data sources (API, Mock, GraphQL, etc.) without changing business logic.

## Architecture

```
repositories/
├── interfaces/          # Repository contracts
├── implementations/     # Concrete implementations
│   ├── api/            # Real API implementations
│   ├── mock/           # Mock data implementations
│   └── graphql/        # GraphQL implementations (future)
├── factory/            # Repository factory
└── index.ts            # Main export
```

## Key Benefits

1. **Separation of Concerns**: Business logic doesn't know about data source
2. **Testability**: Easy to mock repositories for testing
3. **Flexibility**: Switch data sources via environment variables
4. **Type Safety**: Full TypeScript support with interfaces
5. **Caching**: Built-in caching strategies
6. **Error Handling**: Consistent error handling across all data sources

## Usage

```typescript
import { repositoryFactory } from '@/infrastructure/repositories'

// Get repository instance (automatically selects based on env)
const serviceRepo = repositoryFactory.getServiceRepository()

// Use the same API regardless of data source
const services = await serviceRepo.findAll()
const service = await serviceRepo.findById('123')
```

## Configuration

Set in `.env`:
```bash
# Options: 'api', 'mock', 'hybrid'
NEXT_PUBLIC_DATA_SOURCE=mock

# API configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Feature flags
NEXT_PUBLIC_USE_CACHE=true
NEXT_PUBLIC_CACHE_TTL=300000
```

## Adding New Repositories

1. Create interface in `interfaces/`
2. Implement for each data source in `implementations/`
3. Register in factory
4. Export from index