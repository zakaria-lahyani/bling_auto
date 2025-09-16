# Consolidated Layout System

This directory contains all layout components that were previously scattered across multiple directories (`@layouts`, `components/layouts`, and `components/layout`). The new organization provides better structure and easier maintenance.

## Directory Structure

```
src/shared/layouts/
├── components/
│   ├── core/           # Core layout wrappers
│   │   ├── BlankLayout.tsx
│   │   ├── LayoutWrapper.tsx
│   │   ├── PublicLayout.tsx
│   │   └── VerticalLayout.tsx
│   ├── specialized/    # Feature-specific layouts
│   │   ├── CenteredLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── DetailLayout.tsx
│   │   ├── FormLayout.tsx
│   │   └── ListLayout.tsx
│   ├── shared/         # Shared UI components
│   │   ├── AppBar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── shell/          # App shell components
│       ├── AppShell.tsx
│       ├── Header.tsx
│       └── Sidebar.tsx
├── PageContainer.tsx   # Basic page container utility
├── Section.tsx         # Reusable section component
├── StandardPage.tsx    # Standard page template
├── ThemeWrapper.tsx    # Theme provider wrapper
├── index.ts           # Main exports file
└── README.md          # This file
```

## Usage

### Import Everything from Main Index

```typescript
// Import any layout component from the main index
import { PublicLayout, DashboardLayout, AppShell } from '@/shared/layouts'
```

### Import from Specific Categories

```typescript
// Core layouts
import { BlankLayout, VerticalLayout } from '@/shared/layouts/components/core'

// Specialized layouts
import { FormLayout, ListLayout } from '@/shared/layouts/components/specialized' 

// Shell components
import { AppShell, Sidebar } from '@/shared/layouts/components/shell'
```

## Layout Categories

### Core Layouts
- **BlankLayout**: Minimal layout for auth/simple pages
- **LayoutWrapper**: Dynamic layout selector based on settings
- **PublicLayout**: Marketing/public pages with header/footer
- **VerticalLayout**: Dashboard layout with collapsible sidebar

### Specialized Layouts
- **CenteredLayout**: Centered content for forms/auth
- **DashboardLayout**: Analytics/dashboard pages
- **DetailLayout**: Detail/view pages with back navigation
- **FormLayout**: Form-focused pages
- **ListLayout**: List/table views with search/filter

### Shell Components
- **AppShell**: Complete app wrapper with sidebar/header
- **Header**: Top navigation bar
- **Sidebar**: Left navigation sidebar

### Shared Components
- **AppBar**: Configurable top bar
- **Footer**: Site footer
- **Navigation**: Vertical navigation menu

## Migration Notes

All imports have been updated to use the new consolidated structure. The old directories have been removed:
- `src/@layouts/` → `src/shared/layouts/components/core/` and `components/shared/`
- `src/components/layouts/` → `src/shared/layouts/components/specialized/`
- `src/components/layout/` → `src/shared/layouts/components/shell/`

The TypeScript path mapping for `@layouts/*` has been updated to point to the new location.