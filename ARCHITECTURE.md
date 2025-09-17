# Car Wash Application Architecture Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Core Architecture Patterns](#core-architecture-patterns)
4. [Layer-by-Layer Documentation](#layer-by-layer-documentation)
5. [Data Flow](#data-flow)
6. [How to Work with the Architecture](#how-to-work-with-the-architecture)
7. [Best Practices](#best-practices)

---

## Architecture Overview

This car wash application follows **Clean Architecture** principles with a modern React/Next.js stack. The architecture emphasizes:

- **Separation of Concerns**: Clear boundaries between business logic, infrastructure, and presentation
- **Dependency Inversion**: Core business logic doesn't depend on external frameworks
- **Testability**: Each layer can be tested independently
- **Maintainability**: Modular structure allows for easy updates and feature additions
- **Scalability**: Repository pattern enables seamless transition from mock to real APIs

### Technology Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand, React Query (TanStack Query)
- **Validation**: Zod
- **Testing**: Vitest
- **Package Manager**: pnpm

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # Legacy/transitional components
├── configs/               # Application configuration
├── core/                  # Business logic & domain entities
├── features/              # Feature-based modules
├── infrastructure/        # External integrations & data access
├── lib/                   # Utility libraries & helpers
├── shared/                # Reusable components & utilities
├── types/                 # Global type definitions
└── views/                 # Page-level view components
```

---

## Core Architecture Patterns

### 1. **Clean Architecture Layers**

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  (app/, features/*/components/, shared/components/, views/) │
├─────────────────────────────────────────────────────────────┤
│                   Application Layer                         │
│     (features/*/hooks/, core/use-cases/, shared/hooks/)     │
├─────────────────────────────────────────────────────────────┤
│                    Domain Layer                             │
│          (core/entities/, core/services/)                   │
├─────────────────────────────────────────────────────────────┤
│                 Infrastructure Layer                        │
│   (infrastructure/api/, infrastructure/repositories/)       │
└─────────────────────────────────────────────────────────────┘
```

### 2. **Repository Pattern**
- **Abstract interfaces** define data contracts
- **Multiple implementations** (mock, API, hybrid)
- **Factory pattern** for runtime switching between implementations

### 3. **Feature-Based Organization**
Each feature (services, booking, dashboard) contains:
- **Components**: UI elements specific to the feature
- **Hooks**: Business logic and state management
- **Types**: Feature-specific type definitions
- **Mappers**: Data transformation utilities

---

## Layer-by-Layer Documentation

## 📁 `/app` - Next.js App Router

**Purpose**: Next.js 15 App Router pages and routing configuration

### Structure:
```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Homepage route
├── manifest.ts        # PWA manifest
├── robots.ts          # SEO robots.txt
├── sitemap.ts         # SEO sitemap
├── about/
│   └── page.tsx       # About page
├── contact/
│   └── page.tsx       # Contact page
└── services/
    └── page.tsx       # Services page
```

### Key Files:
- **`layout.tsx`**: Root layout providing theme, query client, and global providers
- **`page.tsx`**: Homepage using marketing layout with hero, services, testimonials
- **`manifest.ts`**: PWA configuration for mobile app installation
- **`sitemap.ts`**: Dynamic sitemap generation for SEO

---

## 📁 `/core` - Domain Layer

**Purpose**: Contains business entities, domain services, and use cases

### `/core/entities` - Business Entities
```
entities/
├── booking/
│   └── types.ts       # Booking domain models
├── service/
│   ├── types.ts       # Service domain models
│   └── index.ts       # Service entity exports
└── user/
    └── types.ts       # User domain models
```

**Key Types**:
- **Service**: Core service entity with pricing, duration, availability
- **Booking**: Booking entity with customer, vehicle, and scheduling info
- **User**: User entity with authentication and profile data

### `/core/services` - Domain Services
```
services/
├── availability.service.ts    # Business logic for service availability
└── pricing.service.ts         # Business logic for dynamic pricing
```

### `/core/use-cases` - Application Use Cases
```
use-cases/
└── booking/
    ├── create-booking.ts      # Create booking use case
    └── index.ts               # Use case exports
```

**Purpose**: Orchestrates domain entities and services to fulfill business requirements

---

## 📁 `/infrastructure` - Infrastructure Layer

**Purpose**: External integrations, data access, and technical concerns

### `/infrastructure/repositories` - Data Access Pattern

#### **Repository Interfaces** (`/interfaces`)
```typescript
// Example: service.repository.ts
export interface IServiceRepository extends IBaseRepository<Service> {
  findByCategory(categorySlug: string): Promise<Service[]>
  findFeatured(): Promise<Service[]>
  search(query: string): Promise<Service[]>
}
```

#### **Repository Factory** (`/factory`)
```typescript
// repository.factory.ts - Strategy pattern for data source switching
export class RepositoryFactory {
  static getServiceRepository(mode: 'mock' | 'api' | 'hybrid'): IServiceRepository
}
```

#### **Repository Implementations** (`/implementations`)

**Mock Implementation** (`/mock`):
- Uses JSON files for development
- Simulates API delays and errors
- Perfect for frontend development

**API Implementation** (`/api`):
- Real HTTP client integration
- Error handling and retry logic
- Production-ready data access

**Base Implementation** (`/base`):
- Shared functionality (caching, logging, pagination)
- Common CRUD operations
- Error handling patterns

### `/infrastructure/dto` - Data Transfer Objects
```
dto/
├── service.dto.ts     # Service API contracts with Zod validation
├── booking.dto.ts     # Booking API contracts
└── homepage.dto.ts    # Homepage API contracts
```

**Purpose**: 
- Validates external data with Zod schemas
- Maps between API responses and domain entities
- Ensures type safety across data boundaries

### `/infrastructure/api` - HTTP Client Layer
```
api/
├── client.ts          # Axios configuration and interceptors
├── fetcher.ts         # Generic fetch utilities
├── services.ts        # Service-specific API calls
└── booking.ts         # Booking-specific API calls
```

### `/infrastructure/data/mock` - Mock Data
```
data/mock/
├── services.json      # Service catalog data
├── bookings.json      # Sample booking data
├── homepage.json      # Homepage content data
└── index.ts           # MockDataLoader utility
```

---

## 📁 `/features` - Feature Modules

**Purpose**: Feature-based organization with complete business capabilities

### Feature Structure (Example: `/features/services`)
```
services/
├── components/
│   ├── ServicesPageLayout.tsx     # Main services page layout
│   └── index.ts                   # Component exports
├── hooks/
│   ├── useServices.ts             # Service data fetching
│   ├── useServiceModal.ts         # Modal state management
│   ├── useServicesWithStates.ts   # Enhanced state management
│   └── index.ts                   # Hook exports
├── mappers/
│   └── serviceMappers.ts          # Data transformation utilities
├── types.ts                       # Feature-specific types
└── index.ts                       # Feature exports
```

### Key Features:

#### **Services Feature** (`/features/services`)
- Service catalog browsing
- Search and filtering
- Service details modal
- Category-based navigation

#### **Booking Feature** (`/features/booking`)
- Multi-step booking process
- Date/time selection
- Vehicle information capture
- Booking confirmation

#### **Dashboard Feature** (`/features/dashboard`)
- Business metrics display
- KPI tracking
- Customer analytics
- Regional performance

#### **Appointments Feature** (`/features/appointments`)
- Appointment scheduling
- Appointment management
- Status tracking

---

## 📁 `/shared` - Shared Resources

**Purpose**: Reusable components, utilities, and patterns used across features

### `/shared/components` - Reusable UI Components

#### **UI Components** (`/ui`)
```
ui/
├── Button.tsx         # Consistent button component
├── Modal.tsx          # Modal dialog system
├── Card.tsx           # Card layout component
├── Table.tsx          # Data table component
├── LoadingSpinner.tsx # Loading states
├── ErrorRecovery.tsx  # Error handling components
├── DataStateWrapper.tsx # Data state management wrapper
└── index.ts           # UI exports
```

#### **Block Components** (`/blocks`)
```
blocks/
├── HeroBlock.tsx      # Homepage hero section
├── ServicesBlock.tsx  # Services showcase
├── TestimonialsBlock.tsx # Customer testimonials
├── CTABlock.tsx       # Call-to-action sections
└── StatsBlock.tsx     # Statistics display
```

### `/shared/hooks` - Reusable Business Logic
```
hooks/
├── useDataWithStates.ts    # Enhanced React Query wrapper
├── useDebounce.ts          # Input debouncing
└── useSettings.tsx         # Application settings
```

### `/shared/layouts` - Layout Components
```
layouts/
├── marketing/
│   ├── MarketingLayout.tsx    # Marketing page layout
│   ├── MarketingHeader.tsx    # Marketing header
│   └── MarketingFooter.tsx    # Marketing footer
├── dashboard/
│   ├── DashboardLayout.tsx    # Dashboard layout
│   ├── DashboardSidebar.tsx   # Dashboard navigation
│   └── DashboardHeader.tsx    # Dashboard header
└── base/
    ├── BaseHeader.tsx         # Shared header component
    └── BaseFooter.tsx         # Shared footer component
```

### `/shared/utils` - Utility Functions
```
utils/
├── generators.ts      # ID and data generators
├── logger.ts         # Logging utilities
├── utils.ts          # General utilities
└── iconMapper.tsx    # Icon mapping system
```

---

## 📁 `/views` - Page-Level Views

**Purpose**: Complete page implementations using features and shared components

```
views/marketing/
├── LandingPage.tsx    # Homepage implementation
├── ServicesPage.tsx   # Services catalog page
├── AboutPage.tsx      # About page
└── ContactPage.tsx    # Contact page
```

---

## 📁 `/lib` - Library Code

**Purpose**: External integrations and utility libraries

### `/lib/data` - Data Management
```
data/
├── fetchers/          # Data fetching strategies
├── marketing/         # Marketing content management
└── examples/          # Implementation examples
```

### `/lib/schemas` - Validation Schemas
```
schemas/
├── services.ts        # Service validation
├── appointments.ts    # Appointment validation
└── common.ts          # Shared validation patterns
```

---

## Data Flow

### 1. **User Interaction Flow**
```
User Action → Component → Hook → Use Case → Repository → External API/Mock
                                                    ↓
User Interface ← Component ← Hook ← Mapped Data ← DTO ← API Response
```

### 2. **Repository Pattern Flow**
```
Feature Hook → Repository Interface → Factory → Implementation (Mock/API)
                                                        ↓
Feature Hook ← Domain Entity ← DTO Mapper ← Raw Data ← External Source
```

### 3. **Error Handling Flow**
```
Error Occurs → Repository Catches → Logs Error → Returns Error State → Hook Handles → UI Shows Recovery
```

---

## How to Work with the Architecture

### Adding a New Feature

1. **Create Feature Module**:
```bash
mkdir src/features/new-feature
mkdir src/features/new-feature/{components,hooks,types}
```

2. **Define Domain Types**:
```typescript
// src/core/entities/new-feature/types.ts
export interface NewFeatureEntity {
  id: string
  name: string
  // ... other properties
}
```

3. **Create Repository Interface**:
```typescript
// src/infrastructure/repositories/interfaces/new-feature.repository.ts
export interface INewFeatureRepository extends IBaseRepository<NewFeatureEntity> {
  // feature-specific methods
}
```

4. **Implement Mock Repository**:
```typescript
// src/infrastructure/repositories/implementations/mock/new-feature.mock.repository.ts
export class MockNewFeatureRepository implements INewFeatureRepository {
  // implementation
}
```

5. **Create Feature Hooks**:
```typescript
// src/features/new-feature/hooks/useNewFeature.ts
export const useNewFeature = () => {
  const repository = RepositoryFactory.getNewFeatureRepository()
  return useQuery(['new-feature'], () => repository.findAll())
}
```

6. **Build Components**:
```typescript
// src/features/new-feature/components/NewFeatureList.tsx
export const NewFeatureList = () => {
  const { data, isLoading, error } = useNewFeature()
  // component implementation
}
```

### Working with Mock Data

1. **Add Mock Data**:
```json
// src/infrastructure/data/mock/new-feature.json
[
  {
    "id": "1",
    "name": "Sample Item"
  }
]
```

2. **Update MockDataLoader**:
```typescript
// src/infrastructure/data/mock/index.ts
export class MockDataLoader {
  static getNewFeatureData(): NewFeatureEntity[] {
    return require('./new-feature.json')
  }
}
```

### Switching Between Mock and API

```typescript
// In repository factory or environment configuration
const repository = RepositoryFactory.getServiceRepository(
  process.env.NODE_ENV === 'development' ? 'mock' : 'api'
)
```

### Adding New UI Components

1. **Create Component**:
```typescript
// src/shared/components/ui/NewComponent.tsx
export interface NewComponentProps {
  // props definition
}

export const NewComponent: React.FC<NewComponentProps> = (props) => {
  // implementation
}
```

2. **Export Component**:
```typescript
// src/shared/components/ui/index.ts
export { NewComponent } from './NewComponent'
```

3. **Use in Features**:
```typescript
import { NewComponent } from '@/shared/components/ui'
```

---

## Best Practices

### 1. **Repository Pattern**
- Always work through repository interfaces
- Keep domain entities clean of external dependencies
- Use DTOs for external data validation
- Implement proper error handling and logging

### 2. **Component Architecture**
- Follow single responsibility principle
- Use shared components for common UI patterns
- Keep feature-specific components in feature modules
- Implement proper error boundaries

### 3. **State Management**
- Use React Query for server state
- Use Zustand for client state
- Keep state as close to usage as possible
- Implement proper loading and error states

### 4. **Type Safety**
- Define clear interfaces for all data structures
- Use Zod for runtime validation
- Leverage TypeScript's strict mode
- Create proper type guards for union types

### 5. **Testing Strategy**
- Unit test business logic (use cases, services)
- Integration test repository implementations
- Component test with realistic data
- Mock external dependencies

### 6. **Performance**
- Use React Query for caching and background updates
- Implement proper pagination for large datasets
- Use code splitting for feature modules
- Optimize bundle size with tree shaking

### 7. **Error Handling**
- Implement global error boundaries
- Provide user-friendly error messages
- Log errors with proper context
- Implement retry mechanisms for transient errors

---

## Migration Path

### Current State → Target State

1. **Phase 1**: Repository pattern implementation ✅
2. **Phase 2**: DTO layer with validation ✅
3. **Phase 3**: Enhanced error recovery ✅
4. **Phase 4**: Feature module organization ✅
5. **Phase 5**: API integration (upcoming)
6. **Phase 6**: Advanced features (real-time updates, offline support)

This architecture provides a solid foundation for scaling the car wash application while maintaining code quality, testability, and developer experience.