# Layout System Documentation

## Overview

The CarWash Pro application uses a modern, composable layout system built with React and TypeScript. The system follows clear naming conventions and separation of concerns, providing reusable components for different application contexts.

## Table of Contents

- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Components](#components)
  - [Base Components](#base-components)
  - [Marketing Components](#marketing-components)
  - [Dashboard Components](#dashboard-components)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)

## Architecture

```
┌─────────────────────────────────────────┐
│            Application Pages             │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│          Layout Components              │
│  ┌─────────────┐    ┌─────────────┐   │
│  │  Marketing  │    │  Dashboard  │   │
│  │   Layout    │    │   Layout    │   │
│  └─────────────┘    └─────────────┘   │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Base Components                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │Header│ │Footer│ │ Nav  │ │Sidebar│ │
│  └──────┘ └──────┘ └──────┘ └──────┘ │
└─────────────────────────────────────────┘
```

## Directory Structure

```
src/shared/layouts/
├── base/                    # Shared base components
│   ├── BaseHeader.tsx       # Core header functionality
│   ├── BaseFooter.tsx       # Core footer functionality
│   ├── BaseNavigation.tsx   # Core navigation logic
│   ├── BaseSidebar.tsx      # Core sidebar functionality
│   └── index.ts            
│
├── marketing/               # Marketing/public pages
│   ├── MarketingHeader.tsx  # Public page header
│   ├── MarketingFooter.tsx  # Public page footer
│   ├── MarketingLayout.tsx  # Complete marketing layout
│   └── index.ts            
│
├── dashboard/               # Dashboard/authenticated pages
│   ├── DashboardHeader.tsx  # Dashboard header with search
│   ├── DashboardSidebar.tsx # Dashboard navigation sidebar
│   ├── DashboardFooter.tsx  # Minimal dashboard footer
│   ├── DashboardLayout.tsx  # Complete dashboard layout
│   └── index.ts            
│
├── PageContainer.tsx        # Page content wrapper
├── Section.tsx             # Page section component
├── StandardPage.tsx        # Standard page template
├── ThemeWrapper.tsx        # Theme provider wrapper
├── index.ts                # Main exports
└── README.md               # This file
```

## Components

### Base Components

Base components provide shared functionality that can be composed into specialized layouts.

#### BaseHeader

Core header component with customizable slots.

```tsx
import { BaseHeader } from '@/shared/layouts/base'

<BaseHeader
  logo={<YourLogo />}
  navigation={<YourNav />}
  actions={<YourActions />}
  sticky={true}
  variant="default" // 'default' | 'transparent' | 'elevated'
  width="container" // 'full' | 'container'
/>
```

**Props:**
- `logo`: Logo component or branding
- `navigation`: Navigation menu component
- `actions`: Action buttons (auth, theme, etc.)
- `sticky`: Whether header sticks to top
- `variant`: Visual style variant
- `width`: Content width constraint

#### BaseFooter

Flexible footer component with content areas.

```tsx
import { BaseFooter } from '@/shared/layouts/base'

<BaseFooter
  variant="minimal" // 'minimal' | 'full' | 'marketing'
  position="static" // 'static' | 'fixed' | 'sticky'
  leftContent={<Copyright />}
  rightContent={<Links />}
  width="container"
/>
```

**Props:**
- `variant`: Footer layout style
- `position`: Positioning behavior
- `leftContent`: Left section content
- `centerContent`: Center section content
- `rightContent`: Right section content
- `width`: Content width constraint

#### BaseNavigation

Role-based navigation component with icons and badges.

```tsx
import { BaseNavigation } from '@/shared/layouts/base'

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['Client', 'Manager'],
    badge: { content: 'New', variant: 'success' }
  }
]

<BaseNavigation
  items={navItems}
  orientation="vertical" // 'horizontal' | 'vertical'
  variant="sidebar" // 'default' | 'pills' | 'underline' | 'sidebar'
  userRole="Manager"
  showIcons={true}
  showBadges={true}
/>
```

#### BaseSidebar

Collapsible sidebar with hover expand functionality.

```tsx
import { BaseSidebar } from '@/shared/layouts/base'

<BaseSidebar
  isCollapsed={false}
  onToggleCollapse={() => {}}
  header={<Logo />}
  footer={<UserInfo />}
  collapsedWidth="80px"
  expandedWidth="260px"
>
  <Navigation />
</BaseSidebar>
```

### Marketing Components

Components designed for public-facing marketing pages.

#### MarketingLayout

Complete layout solution for marketing pages.

```tsx
import { MarketingLayout } from '@/shared/layouts/marketing'

export default function MarketingPage() {
  return (
    <MarketingLayout
      header={{
        variant: 'default',
        showAuth: true
      }}
      footer={{
        showNewsletter: true,
        onNewsletterSignup: handleSignup
      }}
    >
      <YourContent />
    </MarketingLayout>
  )
}
```

**Features:**
- Clean, professional header with navigation
- Company branding and authentication CTAs
- Simple footer with company info, services, and contact
- Optional newsletter signup
- Responsive mobile menu

#### MarketingHeader

Header component for marketing pages.

```tsx
<MarketingHeader
  variant="default"
  showAuth={true}
  navigationItems={customItems}
  customLogo={<CustomLogo />}
/>
```

#### MarketingFooter

Clean footer for marketing pages.

```tsx
<MarketingFooter
  showNewsletter={true}
  onNewsletterSignup={handleSignup}
/>
```

### Dashboard Components

Components designed for authenticated dashboard pages.

#### DashboardLayout

Complete layout solution for dashboard pages with authentication.

```tsx
import { DashboardLayout } from '@/shared/layouts/dashboard'

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard Overview"
      description="Monitor your performance"
      header={{
        showSearch: true,
        showNotifications: true,
        notificationCount: 3,
        onSearch: handleSearch
      }}
      sidebar={{
        defaultCollapsed: false,
        customNavItems: customItems
      }}
      footer={{
        showVersion: true,
        showStatus: true,
        systemStatus: 'operational'
      }}
      requireAuth={true}
      requiredRoles={['Manager', 'Owner']}
    >
      <YourDashboardContent />
    </DashboardLayout>
  )
}
```

**Features:**
- Authentication and role checking
- Collapsible sidebar navigation
- Search functionality
- User menu with profile
- Notifications system
- Theme toggle
- System status indicators

#### DashboardHeader

Feature-rich header for dashboard pages.

```tsx
<DashboardHeader
  onMobileMenuToggle={toggleSidebar}
  onSearch={handleSearch}
  searchPlaceholder="Search..."
  showSearch={true}
  showNotifications={true}
  notificationCount={5}
/>
```

#### DashboardSidebar

Role-based navigation sidebar.

```tsx
<DashboardSidebar
  isCollapsed={false}
  onToggleCollapse={toggle}
  isOpen={mobileOpen}
  onToggleOpen={toggleMobile}
  customNavItems={items}
/>
```

#### DashboardFooter

Minimal footer for dashboard pages.

```tsx
<DashboardFooter
  isFixed={false}
  showVersion={true}
  version="1.0.0"
  showStatus={true}
  systemStatus="operational"
/>
```

## Usage Examples

### Example 1: Simple Marketing Page

```tsx
// pages/pricing.tsx
import { MarketingLayout } from '@/shared/layouts/marketing'
import { PricingContent } from '@/components/pricing'

export default function PricingPage() {
  return (
    <MarketingLayout>
      <PricingContent />
    </MarketingLayout>
  )
}
```

### Example 2: Dashboard with Custom Navigation

```tsx
// pages/dashboard/analytics.tsx
import { DashboardLayout } from '@/shared/layouts/dashboard'
import { AnalyticsCharts } from '@/features/analytics'

const customNavItems = [
  { title: 'Overview', href: '/dashboard', icon: Home },
  { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart }
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout
      title="Analytics"
      sidebar={{ customNavItems }}
      requiredRoles={['Manager', 'Owner']}
    >
      <AnalyticsCharts />
    </DashboardLayout>
  )
}
```

### Example 3: Custom Layout Composition

```tsx
// Using base components for custom layout
import { BaseHeader, BaseFooter } from '@/shared/layouts/base'

export function CustomLayout({ children }) {
  return (
    <>
      <BaseHeader
        logo={<CustomLogo />}
        navigation={<CustomNav />}
        actions={<CustomActions />}
      />
      
      <main className="min-h-screen">
        {children}
      </main>
      
      <BaseFooter
        variant="minimal"
        leftContent={<Copyright />}
        rightContent={<Links />}
      />
    </>
  )
}
```

## Best Practices

### 1. Choose the Right Layout

```tsx
// ✅ Marketing pages
<MarketingLayout>
  <PublicContent />
</MarketingLayout>

// ✅ Dashboard pages
<DashboardLayout requireAuth={true}>
  <ProtectedContent />
</DashboardLayout>

// ✅ Custom needs
<BaseHeader {...props} />
<CustomContent />
<BaseFooter {...props} />
```

### 2. Configure Through Props

```tsx
// ✅ Good: Configuration via props
<DashboardLayout
  header={{ showSearch: true }}
  footer={{ showVersion: true }}
>

// ❌ Bad: Hardcoded values in components
```

### 3. Handle Authentication Properly

```tsx
// ✅ Good: Use layout authentication
<DashboardLayout
  requireAuth={true}
  requiredRoles={['Admin']}
>

// ❌ Bad: Manual auth checks in every page
```

### 4. Responsive Design

All layouts automatically handle responsive behavior:
- Mobile menu for small screens
- Collapsible sidebar on tablets
- Optimized spacing and sizing

### 5. TypeScript Usage

All components are fully typed:

```tsx
import { DashboardLayoutProps } from '@/shared/layouts/dashboard'

const layoutConfig: DashboardLayoutProps = {
  title: 'My Page',
  requireAuth: true,
  // TypeScript will validate all props
}
```

## Migration Guide

### From Old System

If migrating from an older layout system:

```tsx
// Old approach
import PublicLayout from '@/layouts/PublicLayout'
<PublicLayout>
  <Content />
</PublicLayout>

// New approach
import { MarketingLayout } from '@/shared/layouts/marketing'
<MarketingLayout>
  <Content />
</MarketingLayout>
```

### Key Changes

1. **Import Paths**: Use new organized imports
2. **Component Names**: Follow new naming convention
3. **Props**: Update to new prop interfaces
4. **Routes**: Simplified routing structure

## Configuration

### Theme Integration

Layouts respect global theme settings:

```tsx
// themeConfig.ts
export const themeConfig = {
  mode: 'light', // 'light' | 'dark'
  primaryColor: '#14b8a6',
  layout: 'vertical'
}
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="CarWash Pro"
NEXT_PUBLIC_API_URL="https://api.example.com"
```

## Troubleshooting

### Common Issues

1. **Import Errors**
   ```tsx
   // ✅ Correct
   import { MarketingLayout } from '@/shared/layouts/marketing'
   
   // ❌ Wrong
   import MarketingLayout from '@/shared/layouts/MarketingLayout'
   ```

2. **TypeScript Errors**
   - Ensure all required props are provided
   - Check prop types match interfaces

3. **Hydration Errors**
   - Use client-side state properly
   - Handle SSR/CSR differences

## Support

For issues or questions:
- Check TypeScript definitions
- Review example implementations
- Consult component prop interfaces

## License

This layout system is part of the CarWash Pro application.
© 2024 CarWash Pro. All rights reserved.