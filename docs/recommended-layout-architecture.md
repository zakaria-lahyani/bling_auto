# Recommended Layout Architecture

## Optimal Solution: Hybrid Component Architecture

### Overview

The best practice is a hybrid approach that uses **composition over configuration**, combining shared base components with specialized wrappers.

```
Shared Base Components
├── BaseHeader (core header functionality)
├── BaseFooter (core footer functionality)
└── BaseNavigation (core navigation logic)

Specialized Wrappers
├── MarketingHeader (extends BaseHeader)
├── MarketingFooter (extends BaseFooter)
├── DashboardHeader (extends BaseHeader)
└── DashboardFooter (extends BaseFooter)
```

## Implementation Example

### 1. Base Components (Shared Logic)

```tsx
// src/shared/components/base/BaseHeader.tsx
interface BaseHeaderProps {
  logo?: React.ReactNode
  navigation?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function BaseHeader({ logo, navigation, actions, className }: BaseHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <header className={cn('header-base', className)}>
      <div className="header-container">
        <div className="header-left">
          {logo}
          {navigation}
        </div>
        <div className="header-right">
          {actions}
        </div>
        <MobileMenuToggle 
          isOpen={isMobileMenuOpen} 
          onToggle={setIsMobileMenuOpen} 
        />
      </div>
      <MobileMenu isOpen={isMobileMenuOpen}>
        {navigation}
        {actions}
      </MobileMenu>
    </header>
  )
}
```

```tsx
// src/shared/components/base/BaseFooter.tsx
interface BaseFooterProps {
  children: React.ReactNode
  className?: string
  variant?: 'full' | 'minimal'
}

export function BaseFooter({ children, className, variant = 'full' }: BaseFooterProps) {
  return (
    <footer className={cn('footer-base', `footer-${variant}`, className)}>
      <div className="footer-container">
        {children}
      </div>
    </footer>
  )
}
```

### 2. Specialized Components (Context-Specific)

```tsx
// src/shared/components/marketing/MarketingHeader.tsx
export function MarketingHeader() {
  const user = useAuth()
  
  return (
    <BaseHeader
      logo={<Logo size="large" />}
      navigation={<MarketingNav />}
      actions={
        user ? (
          <Button href="/dashboard">Go to Dashboard</Button>
        ) : (
          <>
            <Button variant="ghost" href="/login">Sign In</Button>
            <Button variant="primary" href="/register">Get Started</Button>
          </>
        )
      }
      className="marketing-header"
    />
  )
}
```

```tsx
// src/shared/components/dashboard/DashboardHeader.tsx
export function DashboardHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  const user = useAuth()
  const { theme, setTheme } = useTheme()
  
  return (
    <BaseHeader
      logo={<Logo size="small" />}
      navigation={<SearchBar />}
      actions={
        <>
          <ThemeToggle theme={theme} onChange={setTheme} />
          <NotificationBell />
          <UserMenu user={user} />
        </>
      }
      className="dashboard-header"
    />
  )
}
```

### 3. Layout Components Using Composition

```tsx
// src/shared/layouts/MarketingLayout.tsx
export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-layout">
      <MarketingHeader />
      <main className="marketing-content">
        {children}
      </main>
      <MarketingFooter />
    </div>
  )
}
```

```tsx
// src/shared/layouts/DashboardLayout.tsx
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className="dashboard-layout">
      <DashboardHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="dashboard-body">
        <DashboardSidebar isOpen={sidebarOpen} />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
      <DashboardFooter />
    </div>
  )
}
```

## Benefits of This Approach

### 1. Best of Both Worlds
- **Shared logic** in base components (DRY)
- **Specialized behavior** in wrapper components (SRP)
- **Clear separation** of concerns

### 2. Maintainability
- Global changes can be made in base components
- Context-specific changes isolated to wrappers
- Easy to understand component hierarchy

### 3. Flexibility
- Can create new variants easily
- Mix and match components as needed
- Progressive enhancement possible

### 4. Performance
- Only load what's needed
- Tree-shaking still effective
- Code splitting by route

### 5. Type Safety
- Clear prop interfaces
- Predictable component behavior
- Better IDE support

## Implementation Strategy

### Step 1: Create Base Components
```tsx
// Shared, reusable logic
BaseHeader
BaseFooter
BaseNavigation
BaseSidebar
```

### Step 2: Create Context-Specific Wrappers
```tsx
// Marketing context
MarketingHeader extends BaseHeader
MarketingFooter extends BaseFooter

// Dashboard context
DashboardHeader extends BaseHeader
DashboardFooter extends BaseFooter
DashboardSidebar extends BaseSidebar

// Admin context (if needed)
AdminHeader extends BaseHeader
AdminSidebar extends BaseSidebar
```

### Step 3: Compose into Layouts
```tsx
MarketingLayout
├── MarketingHeader
├── Content
└── MarketingFooter

DashboardLayout
├── DashboardHeader
├── DashboardSidebar
├── Content
└── DashboardFooter
```

## Example: Adaptive Component with Composition

Instead of one complex adaptive component:

```tsx
// ❌ Not Recommended: Too Complex
function Header({ variant, user, showSearch, showNav, navItems, ... }) {
  if (variant === 'marketing') {
    // 50 lines of marketing logic
  } else if (variant === 'dashboard') {
    // 50 lines of dashboard logic
  } else if (variant === 'admin') {
    // 50 lines of admin logic
  }
  // Hard to maintain, test, and understand
}
```

Use composition:

```tsx
// ✅ Recommended: Clear and Maintainable
// Base component with shared logic
function BaseHeader({ logo, navigation, actions }) {
  // 20 lines of shared logic
}

// Specialized components
function MarketingHeader() {
  return <BaseHeader {...marketingProps} />
}

function DashboardHeader() {
  return <BaseHeader {...dashboardProps} />
}
```

## When to Use What

### Use Separate Components When:
- Layouts are fundamentally different (marketing vs. app)
- Different user contexts (public vs. authenticated)
- Different navigation patterns (top nav vs. sidebar)

### Use Shared Base Components When:
- Common functionality exists (mobile menu, responsive behavior)
- Consistent styling needed (design system)
- Shared utilities (theme toggle, search)

### Use Adaptive Components When:
- Minor variations of the same component
- Same structure with different content
- Progressive enhancement scenarios

## Migration Path

### Phase 1: Identify Shared Logic
- Mobile menu behavior
- Responsive utilities
- Theme switching
- Common animations

### Phase 2: Extract Base Components
- Create BaseHeader with slots
- Create BaseFooter with variants
- Extract shared hooks

### Phase 3: Create Specialized Wrappers
- MarketingHeader/Footer
- DashboardHeader/Footer
- Keep existing layouts

### Phase 4: Refactor Layouts
- Update to use new components
- Remove duplicated code
- Test thoroughly

## Code Organization

```
src/shared/components/
├── base/                    # Shared base components
│   ├── BaseHeader.tsx
│   ├── BaseFooter.tsx
│   ├── BaseNavigation.tsx
│   └── BaseSidebar.tsx
├── marketing/               # Marketing-specific
│   ├── MarketingHeader.tsx
│   ├── MarketingFooter.tsx
│   └── MarketingNav.tsx
├── dashboard/               # Dashboard-specific
│   ├── DashboardHeader.tsx
│   ├── DashboardFooter.tsx
│   └── DashboardSidebar.tsx
└── common/                  # Shared UI elements
    ├── Logo.tsx
    ├── SearchBar.tsx
    ├── ThemeToggle.tsx
    └── UserMenu.tsx
```

## Testing Strategy

### Base Components
- Unit tests for shared logic
- Prop variation tests
- Accessibility tests

### Specialized Components
- Integration tests
- User flow tests
- Visual regression tests

### Full Layouts
- E2E tests
- Performance tests
- Responsive tests

## Conclusion

The hybrid approach provides:

1. **Clean code** through composition
2. **Reusability** through base components
3. **Flexibility** through specialization
4. **Maintainability** through separation of concerns
5. **Performance** through targeted loading

This is the pattern used by successful design systems like:
- Material-UI
- Ant Design
- Chakra UI
- Adobe Spectrum

It's the recommended approach for modern React applications that need both marketing and application interfaces.