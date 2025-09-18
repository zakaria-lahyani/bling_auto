# Clean Architecture Implementation Guide

This document describes the clean architecture refactoring implemented for the client features in this application.

## Architecture Overview

The implementation follows the clean architecture pattern with clear separation of concerns:

```
Presentation → Application → Domain → Infrastructure
    ↓             ↓          ↓            ↓
  Views        Use Cases   Entities    Repositories
  Hooks                   Services
```

## Layer Structure

### 1. Domain Layer (`/src/core/`)

**Location**: Core business logic with no external dependencies

- **Entities** (`/entities/`): Pure business objects
  - `client/types.ts` - Client domain entities
  - `client-booking/types.ts` - Booking domain entities
  - `service/types.ts` - Service domain entities

- **Services** (`/services/`): Business logic operations
  - `client.service.ts` - Client business rules and calculations

### 2. Application Layer (`/src/core/use-cases/`)

**Location**: Application-specific business rules and orchestration

- **Use Cases** (`/use-cases/client/`): Application operations
  - `get-client-dashboard.ts` - Dashboard data orchestration
  - `get-client-profile.ts` - Profile data retrieval
  - `update-client-profile.ts` - Profile updates with validation
  - `manage-vehicles.ts` - Vehicle CRUD operations
  - `manage-payment-methods.ts` - Payment method CRUD operations

### 3. Infrastructure Layer (`/src/infrastructure/`)

**Location**: External concerns and data persistence

- **Repository Interfaces** (`/repositories/interfaces/`): Contracts for data access
  - `client.repository.ts`
  - `vehicle.repository.ts`
  - `payment-method.repository.ts`
  - `booking.repository.ts`

- **Repository Implementations** (`/repositories/implementations/`):
  - `mock/` - Mock implementations for testing/development
  - `api/` - HTTP API implementations
  - `database/` - Database implementations

### 4. Presentation Layer (`/src/features/client/`)

**Location**: UI components and React-specific logic

- **Hooks** (`/hooks/`): React state management integrating use cases
  - `useClientDashboard.ts`
  - `useClientProfile.ts`
  - `useVehicleManagement.ts`
  - `usePaymentMethods.ts`

- **Views** (`/src/views/client/`): UI components
  - `AccountPage.clean.tsx` - Example refactored component

## Key Principles Applied

### 1. Dependency Inversion
- Higher-level modules don't depend on lower-level modules
- Both depend on abstractions (interfaces)
- Use cases depend on repository interfaces, not implementations

### 2. Single Responsibility
- Each class/module has one reason to change
- Entities contain only business data
- Services contain only business logic
- Use cases orchestrate single operations

### 3. Interface Segregation
- Clients don't depend on interfaces they don't use
- Repository interfaces are specific to their domain

### 4. Open/Closed Principle
- Open for extension, closed for modification
- New repository implementations can be added without changing use cases

## Usage Examples

### 1. Using Clean Architecture in Components

```typescript
// Bad: Direct repository usage in component
const Component = () => {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Directly calling repository - breaks clean architecture
    clientRepository.findById('123').then(setData)
  }, [])
  
  return <div>{data?.name}</div>
}

// Good: Using clean architecture hooks
const Component = () => {
  const { profile, loading, error } = useClientProfile({
    clientId: '123',
    getProfileUseCase,
    updateProfileUseCase
  })
  
  return loading ? <Loading /> : <div>{profile?.client.name}</div>
}
```

### 2. Dependency Injection Pattern

```typescript
// Use cases receive dependencies through constructor
const clientRepository = new MockClientRepository() // or ApiClientRepository
const getProfileUseCase = new GetClientProfileUseCase(
  clientRepository,
  vehicleRepository,
  addressRepository,
  paymentMethodRepository
)

// Hooks receive use cases as dependencies
const { profile } = useClientProfile({
  clientId,
  getProfileUseCase,
  updateProfileUseCase
})
```

### 3. Testing with Clean Architecture

```typescript
// Easy to test - mock repositories
const mockClientRepo = new MockClientRepository()
const useCase = new GetClientProfileUseCase(mockClientRepo, ...)

// Test business logic without UI or external dependencies
const result = await useCase.execute({ clientId: 'test' })
expect(result.client.name).toBe('Test User')
```

## Migration Path

### Current State
- Business logic mixed with UI components
- Direct API calls in components
- Difficult to test and maintain

### Target State
- Clear separation of concerns
- Testable business logic
- Swappable implementations
- Type-safe interfaces

### Migration Steps

1. **Extract Domain Entities** ✅
   - Move types to `/core/entities/`
   - Remove UI-specific properties

2. **Create Domain Services** ✅
   - Extract business logic to `/core/services/`
   - Pure functions with no dependencies

3. **Implement Use Cases** ✅
   - Create application layer in `/core/use-cases/`
   - Orchestrate domain services and repositories

4. **Define Repository Interfaces** ✅
   - Create contracts in `/infrastructure/repositories/interfaces/`
   - Abstract data access patterns

5. **Create Application Hooks** ✅
   - Build React integration in `/features/client/hooks/`
   - Integrate use cases with React state

6. **Refactor Views** 🔄 (In Progress)
   - Update components to use hooks
   - Remove direct business logic

## Benefits Achieved

### 1. Testability
- Business logic can be tested without UI
- Mock repositories for isolated testing
- Clear test boundaries

### 2. Maintainability
- Single responsibility for each module
- Clear dependencies and interfaces
- Easy to understand and modify

### 3. Flexibility
- Swap implementations without changing business logic
- Support multiple data sources (API, mock, database)
- Environment-specific configurations

### 4. Type Safety
- Strong typing throughout all layers
- Compile-time error detection
- Better IDE support and refactoring

## Best Practices

### 1. Keep Entities Pure
```typescript
// Good: Pure business object
interface Client {
  id: string
  name: string
  email: string
  // Business properties only
}

// Bad: Mixed with UI concerns
interface Client {
  id: string
  name: string
  isEditing: boolean // UI state
  showDetails: boolean // UI state
}
```

### 2. Use Cases Should Be Single Purpose
```typescript
// Good: Single responsibility
class UpdateClientProfileUseCase {
  async execute(request: UpdateProfileRequest) {
    // Only handles profile updates
  }
}

// Bad: Multiple responsibilities
class ClientUseCase {
  async updateProfile() { }
  async addVehicle() { }
  async processPayment() { }
}
```

### 3. Inject Dependencies
```typescript
// Good: Dependencies injected
class UseCase {
  constructor(
    private clientRepo: IClientRepository,
    private emailService: IEmailService
  ) {}
}

// Bad: Direct dependencies
class UseCase {
  async execute() {
    const client = await ClientRepository.find() // Hard dependency
  }
}
```

## Next Steps

1. Complete refactoring of remaining client views
2. Implement repository pattern for other domains (services, bookings)
3. Add proper dependency injection container
4. Create integration tests for use cases
5. Add API repository implementations
6. Implement proper error handling patterns