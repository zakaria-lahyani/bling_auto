# Layout Components Guide

This guide provides comprehensive documentation for all layout components in the CarWash Pro application, explaining their purpose, usage, and integration.

## Table of Contents
- [Layout System Overview](#layout-system-overview)
- [Component Documentation](#component-documentation)
  - [PublicLayout](#publiclayout)
  - [VerticalLayout](#verticallayout)
  - [AppBar](#appbar)
  - [Footer](#footer)
  - [Navigation](#navigation)
- [Usage Examples](#usage-examples)
- [Layout Selection Strategy](#layout-selection-strategy)
- [Customization](#customization)

## Layout System Overview

The application uses a dual-layout system:

```
Layout System
├── Public Pages → PublicLayout (self-contained)
│   ├── Marketing pages
│   ├── Landing page
│   └── Auth pages (login, register)
│
└── Dashboard Pages → VerticalLayout (modular)
    ├── Uses AppBar component
    ├── Uses Navigation component
    └── Uses Footer component
```

## Component Documentation

### PublicLayout

**File**: `/src/shared/layouts/components/core/PublicLayout.tsx`

#### Purpose
Provides a complete, self-contained layout for public-facing marketing pages with integrated header and footer.

#### Features
- **Integrated Header**:
  - Company logo and branding
  - Horizontal navigation menu
  - Authentication CTAs (Sign In/Get Started)
  - Mobile-responsive hamburger menu
  
- **Main Content Area**:
  - Full-width container
  - Clean background
  - No sidebar distractions

- **Marketing Footer**:
  - Company information
  - Service links
  - Contact details
  - Business hours
  - Legal links (Privacy, Terms)

#### Props
```tsx
interface PublicLayoutProps {
  children: React.ReactNode  // Page content to render
}
```

#### Usage Example
```tsx
// app/pricing/page.tsx
import PublicLayout from '@/shared/layouts/components/core/PublicLayout'
import PricingContent from '@/views/marketing/PricingPage'

export default function PricingPage() {
  return (
    <PublicLayout>
      <PricingContent />
    </PublicLayout>
  )
}
```

#### When to Use
- Landing pages
- Marketing pages (pricing, about, services)
- Authentication pages (login, register)
- Any public-facing content
- Pages that don't require authentication

#### Navigation Items
```tsx
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Connect', href: '/connect' },
  { name: 'About', href: '/about' },
]
```

#### Responsive Behavior
- **Desktop**: Horizontal navigation, full header
- **Tablet**: Compressed navigation, smaller padding
- **Mobile**: Hamburger menu, stacked navigation

---

### VerticalLayout

**File**: `/src/shared/layouts/components/core/VerticalLayout.tsx`

#### Purpose
Provides a modular, customizable layout for authenticated dashboard pages with sidebar navigation.

#### Features
- **Collapsible Sidebar**:
  - Role-based navigation items
  - Hover expand when collapsed
  - Persistent state management
  
- **Modular Components**:
  - Separate AppBar component
  - Separate Footer component
  - Flexible Navigation component

- **Settings Integration**:
  - Respects theme settings
  - Configurable app bar (fixed/static/hidden)
  - Configurable footer (fixed/static/hidden)
  - Content width options (compact/wide)

#### Props
```tsx
interface VerticalLayoutProps {
  children: React.ReactNode  // Dashboard content to render
}
```

#### Usage Example
```tsx
// app/dashboard/analytics/page.tsx
import VerticalLayout from '@/shared/layouts/components/core/VerticalLayout'
import AnalyticsView from '@/views/dashboard/AnalyticsPage'

export default function AnalyticsPage() {
  return (
    <VerticalLayout>
      <AnalyticsView />
    </VerticalLayout>
  )
}
```

#### When to Use
- Dashboard pages
- Admin panels
- User account pages
- Any authenticated content
- Pages requiring sidebar navigation

#### Layout States
```tsx
// Navigation states
const [navCollapsed, setNavCollapsed] = useState(false)
const [navHovered, setNavHovered] = useState(false)

// Special page handling
const hideNav = pathname === '/connection'  // Hide nav on specific pages

// Collapsed calculation
const isCollapsed = settings.layout === 'collapsed' && navCollapsed && !navHovered
```

#### Content Spacing
```tsx
// Dynamic spacing based on settings
<main className={`
  ${settings.appBar?.type === 'fixed' ? 'pt-16' : ''}
  ${settings.footer?.type === 'fixed' ? 'pb-14' : ''}
`}>
```

---

### AppBar

**File**: `/src/shared/layouts/components/shared/AppBar.tsx`

#### Purpose
Top navigation bar for authenticated pages, providing user controls and notifications.

#### Features
- **Search Bar**: Quick search functionality
- **Theme Toggle**: Switch between light/dark modes
- **Notifications**: Bell icon with unread indicator
- **Settings**: Quick access to app settings
- **User Menu**: Profile display with name and role
- **Mobile Menu Toggle**: Hamburger menu for mobile navigation

#### Props
```tsx
interface AppBarProps {
  isFixed?: boolean        // Whether app bar is fixed to top
  onMenuToggle?: () => void  // Callback for mobile menu toggle
}
```

#### Usage Example
```tsx
// Used internally by VerticalLayout
<AppBar 
  isFixed={settings.appBar?.type === 'fixed'}
  onMenuToggle={() => setNavCollapsed(!navCollapsed)}
/>
```

#### Components Structure
```tsx
<AppBar>
  <LeftSection>
    <MenuToggle />  // Mobile only
    <SearchBar />   // Desktop only
  </LeftSection>
  
  <RightSection>
    <ThemeToggle />
    <NotificationBell />
    <SettingsButton />
    <UserMenu>
      <UserName />
      <UserRole />
      <UserAvatar />
    </UserMenu>
  </RightSection>
</AppBar>
```

#### User Display
```tsx
// Shows current user information
<div className="text-right">
  <div className="text-sm font-medium">
    {user?.name || 'Guest User'}
  </div>
  <div className="text-xs text-content-muted">
    {user?.role || 'Visitor'}
  </div>
</div>
```

---

### Footer

**File**: `/src/shared/layouts/components/shared/Footer.tsx`

#### Purpose
Minimal footer component for dashboard pages with essential links and copyright.

#### Features
- **Copyright Notice**: Dynamic year display
- **Quick Links**: Support, Documentation, Privacy
- **Position Options**: Fixed or static positioning
- **Minimal Height**: Compact 14-unit height

#### Props
```tsx
interface FooterProps {
  isFixed?: boolean  // Whether footer is fixed to bottom
}
```

#### Usage Example
```tsx
// Used internally by VerticalLayout
<Footer isFixed={settings.footer?.type === 'fixed'} />
```

#### Layout Structure
```tsx
<Footer>
  <LeftSection>
    © 2024 CarWash Pro. All rights reserved.
  </LeftSection>
  
  <RightSection>
    <Link href="/support">Support</Link>
    <Link href="/docs">Documentation</Link>
    <Link href="/privacy">Privacy Policy</Link>
  </RightSection>
</Footer>
```

#### Styling Classes
```tsx
className={cn(
  'h-14 bg-surface border-t border-border flex items-center px-6',
  isFixed && 'fixed bottom-0 left-0 right-0 z-20'
)}
```

---

### Navigation

**File**: `/src/shared/layouts/components/shared/Navigation.tsx`

#### Purpose
Sidebar navigation component with role-based menu items and collapsible functionality.

#### Features
- **Role-Based Items**: Shows menu items based on user role
- **Collapsible**: Can be collapsed to icon-only view
- **Hover Expand**: Expands on hover when collapsed
- **Active Item Highlight**: Shows current page
- **Nested Menus**: Supports sub-navigation items

#### Props
```tsx
interface NavigationProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}
```

#### Navigation Configuration
```tsx
// From configs/navigation.ts
const navigationItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    roles: ['Client', 'Manager', 'Owner']
  },
  {
    title: 'Bookings',
    path: '/bookings',
    icon: 'calendar',
    roles: ['Client', 'Operator', 'Manager']
  },
  // ... more items
]
```

## Usage Examples

### Example 1: Creating a Marketing Page

```tsx
// app/services/page.tsx
import PublicLayout from '@/shared/layouts/components/core/PublicLayout'
import { ServicesBlock, HeroBlock } from '@/shared/components/blocks'
import { servicesPageData } from '@/data/servicesPageData'

export default function ServicesPage() {
  return (
    <PublicLayout>
      <HeroBlock 
        title="Our Services"
        subtitle="Professional car care solutions"
      />
      <ServicesBlock 
        services={servicesPageData.services}
        theme="light"
      />
    </PublicLayout>
  )
}
```

### Example 2: Creating a Dashboard Page

```tsx
// app/dashboard/bookings/page.tsx
import VerticalLayout from '@/shared/layouts/components/core/VerticalLayout'
import { BookingList } from '@/features/booking/components'
import { useBookings } from '@/features/booking/hooks'

export default function BookingsPage() {
  return (
    <VerticalLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <BookingList />
      </div>
    </VerticalLayout>
  )
}
```

### Example 3: Custom Layout Configuration

```tsx
// For pages that need special layout handling
export default function SpecialPage() {
  const { updateSettings } = useSettings()
  
  useEffect(() => {
    // Hide footer for this page
    updateSettings({
      footer: { type: 'hidden' }
    })
    
    // Restore on unmount
    return () => {
      updateSettings({
        footer: { type: 'static' }
      })
    }
  }, [])
  
  return (
    <VerticalLayout>
      <SpecialContent />
    </VerticalLayout>
  )
}
```

## Layout Selection Strategy

### Decision Tree

```
Is the page public/marketing?
├── YES → Use PublicLayout
│   └── Examples: Landing, Pricing, About
│
└── NO → Requires authentication?
    ├── NO → Use PublicLayout
    │   └── Examples: Login, Register
    │
    └── YES → Use VerticalLayout
        └── Examples: Dashboard, Settings, Admin
```

### Quick Reference

| Page Type | Layout | Reason |
|-----------|--------|--------|
| Landing Page | PublicLayout | Marketing content, no auth needed |
| Login/Register | PublicLayout | Auth pages but not authenticated yet |
| Dashboard | VerticalLayout | Authenticated, needs sidebar nav |
| User Settings | VerticalLayout | Authenticated, user controls |
| Pricing Page | PublicLayout | Marketing content |
| Admin Panel | VerticalLayout | Authenticated, admin features |
| About Page | PublicLayout | Public information |
| Analytics | VerticalLayout | Authenticated, data views |

## Customization

### Theme Settings

The layouts respect global theme settings from `themeConfig.ts`:

```tsx
// src/configs/themeConfig.ts
const themeConfig = {
  mode: 'light',           // 'light' | 'dark' | 'system'
  layout: 'vertical',      // 'vertical' | 'collapsed'
  
  appBar: {
    type: 'fixed',        // 'fixed' | 'static' | 'hidden'
    contentWidth: 'wide'  // 'compact' | 'wide'
  },
  
  footer: {
    type: 'static',       // 'fixed' | 'static' | 'hidden'
    contentWidth: 'wide'  // 'compact' | 'wide'
  },
  
  contentWidth: 'wide',   // 'compact' | 'wide'
  primaryColor: '#14b8a6'
}
```

### Dynamic Settings Updates

```tsx
// Update settings programmatically
const { settings, updateSettings } = useSettings()

// Change to dark mode
updateSettings({ mode: 'dark' })

// Fix the app bar
updateSettings({
  appBar: { type: 'fixed' }
})

// Collapse navigation by default
updateSettings({
  layout: 'collapsed'
})
```

### Custom CSS Classes

All layout components use Tailwind CSS with custom design tokens:

```css
/* Background colors */
.bg-page-background    /* Main page background */
.bg-surface           /* Card/component background */
.bg-surface-muted     /* Muted surface for inputs */

/* Text colors */
.text-content-primary   /* Primary text */
.text-content-secondary /* Secondary text */
.text-content-muted    /* Muted/disabled text */

/* Border colors */
.border-border        /* Default borders */

/* Brand colors */
.bg-brand-500        /* Primary brand color */
.text-brand-600      /* Brand text color */
.bg-brand-100        /* Light brand background */
```

## Best Practices

### 1. Consistent Layout Usage
- Always use PublicLayout for marketing pages
- Always use VerticalLayout for authenticated pages
- Don't mix layout types in the same user flow

### 2. Settings Management
- Define default settings in themeConfig.ts
- Use useSettings hook for dynamic updates
- Restore settings when leaving special pages

### 3. Responsive Design
- Test layouts on mobile, tablet, and desktop
- Ensure navigation works on all screen sizes
- Check that content remains accessible

### 4. Performance
- Layouts are marked with 'use client' for interactivity
- Static content should be server components
- Minimize re-renders by using proper state management

### 5. Accessibility
- All interactive elements have proper ARIA labels
- Navigation is keyboard accessible
- Color contrast meets WCAG standards

## Migration Guide

If you had pages using the legacy Header component:

```tsx
// OLD - Using legacy Header
import Header from '@/components/Header'

export default function OldPage() {
  return (
    <>
      <Header />
      <Content />
    </>
  )
}

// NEW - Using proper layout
import PublicLayout from '@/shared/layouts/components/core/PublicLayout'
// OR
import VerticalLayout from '@/shared/layouts/components/core/VerticalLayout'

export default function NewPage() {
  return (
    <PublicLayout>  {/* or VerticalLayout */}
      <Content />
    </PublicLayout>
  )
}
```

## Summary

The layout system provides:

1. **PublicLayout**: Complete solution for marketing/public pages
2. **VerticalLayout**: Flexible dashboard layout with modular components
3. **AppBar**: Feature-rich header for authenticated pages
4. **Footer**: Minimal footer with essential links
5. **Navigation**: Role-based sidebar navigation

Each component is designed for specific use cases and works together to create a cohesive, professional application experience.