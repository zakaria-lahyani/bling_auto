# Improved Layout Architecture

## New Naming Convention & Structure

### Clear Naming Rules

1. **Base Components**: `Base` + `ComponentName` (e.g., `BaseHeader`, `BaseFooter`)
2. **Context Components**: `Context` + `ComponentName` (e.g., `MarketingHeader`, `DashboardHeader`)
3. **Layout Components**: `Context` + `Layout` (e.g., `MarketingLayout`, `DashboardLayout`)
4. **Utility Components**: `ComponentName` + `Wrapper/Container/Provider` (e.g., `PageContainer`, `ThemeProvider`)

### Improved Directory Structure

```
src/shared/layouts/
├── base/                    # Shared base components
│   ├── BaseHeader.tsx       # Core header functionality
│   ├── BaseFooter.tsx       # Core footer functionality
│   ├── BaseNavigation.tsx   # Core navigation logic
│   └── BaseSidebar.tsx      # Core sidebar functionality
│
├── marketing/               # Marketing context components
│   ├── MarketingHeader.tsx  # Header for public pages
│   ├── MarketingFooter.tsx  # Footer for public pages
│   ├── MarketingLayout.tsx  # Complete marketing layout
│   └── MarketingNav.tsx     # Marketing navigation
│
├── dashboard/               # Dashboard context components
│   ├── DashboardHeader.tsx  # Header for dashboard pages
│   ├── DashboardFooter.tsx  # Footer for dashboard pages
│   ├── DashboardLayout.tsx  # Complete dashboard layout
│   └── DashboardSidebar.tsx # Dashboard sidebar navigation
│
├── auth/                    # Authentication context components
│   ├── AuthHeader.tsx       # Header for auth pages
│   ├── AuthFooter.tsx       # Footer for auth pages
│   └── AuthLayout.tsx       # Complete auth layout
│
├── containers/              # Layout utility components
│   ├── PageContainer.tsx    # Page content wrapper
│   ├── ContentArea.tsx      # Main content area
│   ├── Section.tsx          # Page sections
│   └── PageWrapper.tsx      # Complete page wrapper
│
├── providers/               # Layout providers and wrappers
│   ├── LayoutProvider.tsx   # Layout context provider
│   ├── ThemeWrapper.tsx     # Theme provider wrapper
│   └── ResponsiveWrapper.tsx # Responsive behavior wrapper
│
└── index.ts                 # Clean exports
```

## Implementation Plan

### Phase 1: Base Components

Create shared base components with slots for customization.

### Phase 2: Context Components

Build specialized components for each context (marketing, dashboard, auth).

### Phase 3: Layout Compositions

Compose complete layouts using base and context components.

### Phase 4: Migration

Update existing files to use new architecture.

This structure provides:
- ✅ Clear naming conventions
- ✅ Logical organization
- ✅ Reusable base components
- ✅ Context-specific specializations
- ✅ Easy maintenance and testing