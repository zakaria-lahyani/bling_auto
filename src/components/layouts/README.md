# Layout System

This directory contains all the layout components for the Car Wash application. The layout system is designed to be flexible, consistent, and easy to use.

## Global Layout

The global layout is handled by `AppLayout.tsx` in the components root, which includes:
- **Sidebar**: Navigation menu with role-based links
- **Header**: Search bar, theme toggle, user menu
- **Main Content Area**: Where page content is rendered

## Layout Components

### 1. DashboardLayout
**Use for**: Dashboard pages, analytics, metrics
**Features**: 
- Page title and subtitle
- Header actions (buttons, filters)
- Consistent spacing for dashboard widgets

```tsx
import { DashboardLayout } from '../components/layouts';

<DashboardLayout 
  title="Dashboard" 
  subtitle="Overview of your car wash operations"
  headerActions={<RefreshButton />}
>
  <MetricsGrid />
  <ChartsSection />
</DashboardLayout>
```

### 2. ListLayout
**Use for**: List views, tables, management pages
**Features**:
- Search functionality
- Filter controls
- Add new item button
- Consistent list container

```tsx
import { ListLayout } from '../components/layouts';

<ListLayout
  title="Appointments"
  subtitle="Manage customer appointments"
  searchPlaceholder="Search appointments..."
  onSearch={handleSearch}
  onFilter={handleFilter}
  onAdd={handleAddNew}
  addButtonText="New Appointment"
>
  <AppointmentsList />
</ListLayout>
```

### 3. FormLayout
**Use for**: Forms, settings, input pages
**Features**:
- Centered content area
- Back button navigation
- Form-friendly styling
- Configurable width

```tsx
import { FormLayout } from '../components/layouts';

<FormLayout
  title="Edit Profile"
  subtitle="Update your account information"
  showBackButton={true}
  maxWidth="lg"
>
  <ProfileForm />
</FormLayout>
```

### 4. DetailLayout
**Use for**: Detail views, profile pages, item details
**Features**:
- Back navigation
- Edit/Delete actions
- Breadcrumb navigation
- Custom action buttons

```tsx
import { DetailLayout } from '../components/layouts';

<DetailLayout
  title="John Smith"
  subtitle="Customer Profile"
  breadcrumbs={[
    { label: 'Customers', href: '/customers' },
    { label: 'John Smith' }
  ]}
  onEdit={handleEdit}
  onDelete={handleDelete}
>
  <CustomerDetails />
</DetailLayout>
```

### 5. CenteredLayout
**Use for**: Auth pages, connection page, simple modals
**Features**:
- Vertical and horizontal centering
- Logo display
- Minimal, clean design
- Configurable width

```tsx
import { CenteredLayout } from '../components/layouts';

<CenteredLayout
  title="Welcome"
  subtitle="Connect to your car wash system"
  maxWidth="sm"
>
  <ConnectionForm />
</CenteredLayout>
```

## Basic Components

### PageContainer
General-purpose page container with responsive padding and background variants.

### Section
Flexible section component with spacing, background, and width options.

### ThemeWrapper
Simple wrapper that applies theme classes - useful for legacy pages.

## Usage Guidelines

1. **Choose the right layout** based on your page type:
   - Dashboard → `DashboardLayout`
   - Lists/Tables → `ListLayout`
   - Forms → `FormLayout`
   - Detail Views → `DetailLayout`
   - Auth/Connection → `CenteredLayout`

2. **Combine layouts** when needed:
   ```tsx
   <DashboardLayout title="Analytics">
     <Section variant="elevated">
       <MetricsCards />
     </Section>
   </DashboardLayout>
   ```

3. **Use consistent props**:
   - Always provide meaningful titles
   - Include subtitles for context
   - Use header actions for page-level controls

4. **Follow the theme system**:
   - All layouts support dark/light mode
   - Use semantic colors (slate, teal)
   - Maintain consistent spacing

## Migration from Old Layouts

If you have pages using old layout patterns:

**Before:**
```tsx
<ThemeWrapper>
  <div className="max-w-6xl mx-auto p-6">
    <h1>My Page</h1>
    {content}
  </div>
</ThemeWrapper>
```

**After:**
```tsx
<DashboardLayout title="My Page">
  {content}
</DashboardLayout>
```