# Complete File Reference Documentation

This document provides a comprehensive reference for EVERY file in the CarWash Pro application, explaining its purpose, contents, and role in the system.

## Table of Contents
- [Root Configuration Files](#root-configuration-files)
- [App Router Files](#app-router-files)
- [Source Code Structure](#source-code-structure)
- [Infrastructure Layer](#infrastructure-layer)
- [Feature Modules](#feature-modules)
- [Shared Components](#shared-components)
- [Layout System](#layout-system)
- [Type Definitions](#type-definitions)
- [Build and System Files](#build-and-system-files)

## Root Configuration Files

### `.gitignore`
**Purpose**: Specifies files and directories Git should ignore
```
.next/
node_modules/
.env.local
```
**Why needed**: Prevents sensitive data and generated files from being committed

### `.prettierignore`
**Purpose**: Files Prettier should not format
```
.next
node_modules
*.md
```
**Why needed**: Excludes files that shouldn't be auto-formatted

### `.prettierrc`
**Purpose**: Prettier code formatting rules
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2
}
```
**Why needed**: Ensures consistent code formatting across the team

### `package.json`
**Purpose**: Project metadata and dependencies
```json
{
  "name": "bling-auto",
  "version": "1.0.0",
  "dependencies": {
    "next": "^15.0.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "tailwindcss": "^3.4.0"
  }
}
```
**Why needed**: Manages project dependencies and scripts

### `package-lock.json`
**Purpose**: Locks exact dependency versions
**Why needed**: Ensures consistent dependencies across installations

### `tsconfig.json`
**Purpose**: TypeScript compiler configuration
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "ES2022"],
    "jsx": "preserve",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
**Why needed**: Configures TypeScript behavior and path aliases

### `tsconfig.tsbuildinfo`
**Purpose**: TypeScript incremental build cache
**Why needed**: Speeds up subsequent TypeScript compilations

### `next.config.js`
**Purpose**: Next.js framework configuration
```js
module.exports = {
  images: {
    domains: ['localhost', 'api.example.com']
  },
  experimental: {
    serverActions: true
  }
}
```
**Why needed**: Customizes Next.js build and runtime behavior

### `next-env.d.ts`
**Purpose**: Next.js TypeScript type definitions
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```
**Why needed**: Provides Next.js types to TypeScript

### `tailwind.config.js`
**Purpose**: Tailwind CSS configuration
```js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#a7f3e0',
          200: '#5dd4b9',
          500: '#14b8a6',
          900: '#064e42'
        }
      }
    }
  }
}
```
**Why needed**: Customizes Tailwind CSS design system

### `postcss.config.mjs`
**Purpose**: PostCSS configuration for CSS processing
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```
**Why needed**: Enables Tailwind CSS and vendor prefixing

### `eslint.config.js` & `eslint.config.mjs`
**Purpose**: ESLint linting rules configuration
```js
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'no-unused-vars': 'warn'
  }
}
```
**Why needed**: Enforces code quality standards

### `README.md`
**Purpose**: Project documentation and setup instructions
**Why needed**: Provides project overview and getting started guide

### `types.txt`
**Purpose**: TypeScript error output file (temporary)
**Why needed**: Stores typecheck results for debugging

## App Router Files

### `/src/app/layout.tsx`
**Purpose**: Root layout component wrapping all pages
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```
**Why needed**: Provides consistent structure and global providers

### `/src/app/page.tsx`
**Purpose**: Home page route (/)
```tsx
import LandingPage from '@/views/marketing/LandingPage'
export default function Home() {
  return <LandingPage />
}
```
**Why needed**: Entry point of the application

### `/src/app/robots.ts`
**Purpose**: Generates robots.txt for SEO
```ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    sitemap: 'https://example.com/sitemap.xml'
  }
}
```
**Why needed**: Controls search engine crawling

### `/src/app/sitemap.ts`
**Purpose**: Generates XML sitemap dynamically
```ts
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    }
  ]
}
```
**Why needed**: Helps search engines discover pages

### `/src/app/manifest.ts`
**Purpose**: PWA web app manifest
```ts
export default function manifest() {
  return {
    name: 'CarWash Pro',
    short_name: 'CarWash',
    description: 'Professional car wash services',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#14b8a6'
  }
}
```
**Why needed**: Enables PWA features and app installation

## Source Code Structure

### Core Components (`/src/components/`)

#### `AppLayout.tsx`
**Purpose**: Main application layout wrapper
```tsx
export function AppLayout({ children }) {
  const { user } = useAuth()
  return (
    <div className="app-layout">
      {user && <Sidebar />}
      <main>{children}</main>
    </div>
  )
}
```
**Why needed**: Provides app-wide layout structure

#### `ErrorBoundary.tsx`
**Purpose**: Catches and displays React errors gracefully
```tsx
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
```
**Why needed**: Prevents app crashes from component errors

#### `Header.tsx`
**Purpose**: App header with navigation
```tsx
export function Header() {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  )
}
```
**Why needed**: Provides consistent top navigation

#### `LoadingPage.tsx`
**Purpose**: Full-page loading indicator
```tsx
export function LoadingPage() {
  return (
    <div className="loading-page">
      <Spinner />
      <p>Loading...</p>
    </div>
  )
}
```
**Why needed**: Shows during page transitions

#### `Providers.tsx`
**Purpose**: Wraps app with context providers
```tsx
export function Providers({ children }) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
```
**Why needed**: Provides global state and functionality

#### `Sidebar.tsx`
**Purpose**: Side navigation menu
```tsx
export function Sidebar() {
  const menuItems = getMenuItemsByRole(user.role)
  return (
    <nav className="sidebar">
      {menuItems.map(item => (
        <NavLink key={item.path} {...item} />
      ))}
    </nav>
  )
}
```
**Why needed**: Primary navigation for authenticated users

#### `StructuredData.tsx`
**Purpose**: JSON-LD structured data for SEO
```tsx
export function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```
**Why needed**: Improves SEO with structured data

#### `card-statistics/Vertical.tsx`
**Purpose**: Vertical statistics card component
```tsx
export function VerticalStatCard({ title, value, change, icon }) {
  return (
    <Card>
      <div className="stat-icon">{icon}</div>
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className="change">{change}%</div>
    </Card>
  )
}
```
**Why needed**: Displays metrics in dashboard

### Configuration Files (`/src/configs/`)

#### `navigation.ts`
**Purpose**: Navigation menu configuration
```ts
export const navigationItems = [
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
  }
]
```
**Why needed**: Centralizes navigation structure

#### `themeConfig.ts`
**Purpose**: Theme and layout settings
```ts
export const themeConfig = {
  mode: 'light',
  primaryColor: '#14b8a6',
  layout: 'vertical',
  contentWidth: 'wide'
}
```
**Why needed**: Configures app appearance

### Core Domain (`/src/core/`)

#### `entities/booking/types.ts`
**Purpose**: Booking entity type definitions
```ts
export interface Booking {
  id: string
  customerId: string
  serviceId: string
  scheduledDate: Date
  status: BookingStatus
  totalAmount: number
}
```
**Why needed**: Defines core booking business model

#### `entities/service/types.ts`
**Purpose**: Service entity types
```ts
export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number // in minutes
  category: ServiceCategory
}
```
**Why needed**: Defines service offerings model

#### `entities/user/types.ts`
**Purpose**: User entity types
```ts
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  address?: Address
}
```
**Why needed**: Defines user model

#### `use-cases/booking/create-booking.ts`
**Purpose**: Booking creation business logic
```ts
export async function createBooking(data: CreateBookingDto): Promise<Booking> {
  // Validate business rules
  validateBookingTime(data.scheduledDate)
  checkServiceAvailability(data.serviceId)
  
  // Create booking
  const booking = await bookingRepository.create(data)
  
  // Send notifications
  await notificationService.sendBookingConfirmation(booking)
  
  return booking
}
```
**Why needed**: Encapsulates booking creation logic

### Data Layer (`/src/data/`)

#### `homePageData.ts`
**Purpose**: Landing page content data
```tsx
export const heroData = {
  title: 'Premium Car Wash Services',
  subtitle: 'Professional care for your vehicle',
  primaryCTA: {
    text: 'Book Now',
    href: '/booking'
  },
  image: '/images/hero-car.jpg'
}

export const featuresData = {
  title: 'Why Choose Us',
  features: [
    {
      icon: Clock,
      title: 'Quick Service',
      description: 'Average service time under 30 minutes'
    }
  ]
}
```
**Why needed**: Separates content from components

#### `servicesPageData.ts`
**Purpose**: Services page content
```ts
export const servicesData = [
  {
    id: 'basic',
    name: 'Basic Wash',
    price: 15,
    duration: 20,
    features: ['Exterior wash', 'Tire cleaning']
  },
  {
    id: 'premium',
    name: 'Premium Detail',
    price: 50,
    duration: 60,
    features: ['Full interior detail', 'Wax application']
  }
]
```
**Why needed**: Defines service offerings

### Global Styles

#### `/src/index.css`
**Purpose**: Global CSS and Tailwind directives
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .btn-primary {
    @apply bg-brand-500 text-white px-4 py-2 rounded;
  }
}
```
**Why needed**: Defines global styles and custom utilities

## Infrastructure Layer

### API Client (`/src/infrastructure/api/`)

#### `client.ts`
**Purpose**: Base API client configuration
```ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```
**Why needed**: Centralizes HTTP client configuration

#### `fetcher.ts`
**Purpose**: Data fetching utilities
```ts
export async function fetcher(url: string) {
  const response = await apiClient.get(url)
  return response.data
}
```
**Why needed**: Provides SWR/React Query fetcher

#### `appointments.ts`
**Purpose**: Appointment API endpoints
```ts
export const appointmentApi = {
  getAll: () => apiClient.get('/appointments'),
  getById: (id: string) => apiClient.get(`/appointments/${id}`),
  create: (data: CreateAppointmentDto) => apiClient.post('/appointments', data),
  update: (id: string, data: UpdateAppointmentDto) => 
    apiClient.put(`/appointments/${id}`, data),
  cancel: (id: string) => apiClient.post(`/appointments/${id}/cancel`)
}
```
**Why needed**: Manages appointment-related API calls

#### `booking.ts`
**Purpose**: Booking API endpoints
```ts
export const bookingApi = {
  getAvailableSlots: (date: Date) => 
    apiClient.get('/bookings/slots', { params: { date } }),
  createBooking: (data: BookingData) => 
    apiClient.post('/bookings', data),
  getBookingHistory: (userId: string) => 
    apiClient.get(`/users/${userId}/bookings`)
}
```
**Why needed**: Handles booking-related API operations

#### `dashboard.ts`
**Purpose**: Dashboard metrics API
```ts
export const dashboardApi = {
  getMetrics: (period: string) => 
    apiClient.get('/dashboard/metrics', { params: { period } }),
  getRevenueChart: () => apiClient.get('/dashboard/revenue'),
  getServiceStats: () => apiClient.get('/dashboard/services')
}
```
**Why needed**: Fetches dashboard analytics data

#### `inventory.ts`
**Purpose**: Inventory management API
```ts
export const inventoryApi = {
  getProducts: () => apiClient.get('/inventory/products'),
  updateStock: (productId: string, quantity: number) => 
    apiClient.patch(`/inventory/products/${productId}`, { quantity }),
  getLowStock: () => apiClient.get('/inventory/low-stock')
}
```
**Why needed**: Manages inventory operations

#### `jobs.ts`
**Purpose**: Job management API
```ts
export const jobsApi = {
  getActiveJobs: () => apiClient.get('/jobs/active'),
  assignJob: (jobId: string, operatorId: string) => 
    apiClient.post(`/jobs/${jobId}/assign`, { operatorId }),
  completeJob: (jobId: string, data: CompletionData) => 
    apiClient.post(`/jobs/${jobId}/complete`, data)
}
```
**Why needed**: Handles job assignment and tracking

#### `loyalty.ts`
**Purpose**: Loyalty program API
```ts
export const loyaltyApi = {
  getPoints: (userId: string) => 
    apiClient.get(`/loyalty/users/${userId}/points`),
  redeemReward: (userId: string, rewardId: string) => 
    apiClient.post('/loyalty/redeem', { userId, rewardId }),
  getRewards: () => apiClient.get('/loyalty/rewards')
}
```
**Why needed**: Manages loyalty program features

#### `services.ts`
**Purpose**: Service catalog API
```ts
export const servicesApi = {
  getAllServices: () => apiClient.get('/services'),
  getServiceById: (id: string) => apiClient.get(`/services/${id}`),
  getServiceCategories: () => apiClient.get('/services/categories')
}
```
**Why needed**: Retrieves service information

### Authentication (`/src/infrastructure/auth/`)

#### `auth.ts`
**Purpose**: Authentication service
```ts
export class AuthService {
  static async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiClient.post('/auth/login', credentials)
    const { token, user } = response.data
    
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    return user
  }
  
  static logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
  
  static getCurrentUser(): User | null {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  }
  
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }
}
```
**Why needed**: Manages user authentication state

### Configuration (`/src/infrastructure/config/`)

#### `constants.ts`
**Purpose**: Application constants
```ts
export const APP_NAME = 'CarWash Pro'
export const API_VERSION = 'v1'
export const DEFAULT_LOCALE = 'en-US'
export const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
```
**Why needed**: Centralizes app-wide constants

#### `env.ts`
**Purpose**: Environment variable validation
```ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  isProduction: process.env.NODE_ENV === 'production',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
}
```
**Why needed**: Type-safe environment variables

### Providers (`/src/infrastructure/providers/`)

#### `providers.tsx`
**Purpose**: Global app providers
```tsx
export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
      }
    }
  }))
  
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
```
**Why needed**: Sets up global context and tools

### State Management (`/src/infrastructure/storage/stores/`)

#### `dashboardStore.ts`
**Purpose**: Dashboard state management
```ts
import { create } from 'zustand'

export const useDashboardStore = create((set) => ({
  metrics: null,
  period: 'week',
  isLoading: false,
  
  setMetrics: (metrics) => set({ metrics }),
  setPeriod: (period) => set({ period }),
  setLoading: (isLoading) => set({ isLoading })
}))
```
**Why needed**: Manages dashboard state

#### `userStore.ts`
**Purpose**: User state management
```ts
export const useUserStore = create((set) => ({
  user: null,
  preferences: {},
  
  setUser: (user) => set({ user }),
  updatePreferences: (prefs) => 
    set((state) => ({ 
      preferences: { ...state.preferences, ...prefs } 
    }))
}))
```
**Why needed**: Manages user state globally

## Feature Modules

### Appointments Feature (`/src/features/appointments/`)

#### `components/AppointmentList.tsx`
**Purpose**: Displays list of appointments
```tsx
export function AppointmentList({ appointments }) {
  return (
    <div className="appointment-list">
      {appointments.map(apt => (
        <AppointmentCard key={apt.id} appointment={apt} />
      ))}
    </div>
  )
}
```

#### `components/AppointmentSummary.tsx`
**Purpose**: Shows appointment overview
```tsx
export function AppointmentSummary({ appointment }) {
  return (
    <Card>
      <h3>{appointment.service.name}</h3>
      <p>{formatDate(appointment.date)}</p>
      <p>Status: {appointment.status}</p>
    </Card>
  )
}
```

#### `hooks/useAppointments.ts`
**Purpose**: Appointment data fetching hook
```ts
export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentApi.getAll
  })
}
```

#### `mappers/appointmentMappers.ts`
**Purpose**: Maps API data to UI models
```ts
export function mapApiToAppointment(apiData): Appointment {
  return {
    id: apiData.id,
    date: new Date(apiData.scheduled_at),
    service: mapApiToService(apiData.service),
    status: apiData.status
  }
}
```

### Booking Feature (`/src/features/booking/`)

#### `components/ServiceSelection.tsx`
**Purpose**: Service picker component
```tsx
export function ServiceSelection({ onSelect, selected }) {
  const { data: services } = useServices()
  
  return (
    <div className="service-grid">
      {services?.map(service => (
        <ServiceCard
          key={service.id}
          service={service}
          isSelected={selected?.id === service.id}
          onSelect={() => onSelect(service)}
        />
      ))}
    </div>
  )
}
```

#### `components/DateTimeSelection.tsx`
**Purpose**: Date/time picker for booking
```tsx
export function DateTimeSelection({ onSelect }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const { data: slots } = useAvailableSlots(selectedDate)
  
  return (
    <div>
      <Calendar onChange={setSelectedDate} />
      <TimeSlots slots={slots} onSelect={onSelect} />
    </div>
  )
}
```

#### `components/LocationSelection.tsx`
**Purpose**: Location picker for service
```tsx
export function LocationSelection({ onSelect }) {
  return (
    <div>
      <AddressInput onComplete={onSelect} />
      <MapView />
    </div>
  )
}
```

#### `components/VehicleInfoForm.tsx`
**Purpose**: Vehicle details form
```tsx
export function VehicleInfoForm({ onSubmit }) {
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: ''
  })
  
  return (
    <form onSubmit={() => onSubmit(vehicle)}>
      {/* Form fields */}
    </form>
  )
}
```

#### `components/BookingConfirmation.tsx`
**Purpose**: Booking summary and confirmation
```tsx
export function BookingConfirmation({ booking }) {
  return (
    <div className="confirmation">
      <CheckCircle className="success-icon" />
      <h2>Booking Confirmed!</h2>
      <p>Booking ID: {booking.id}</p>
      <BookingSummary booking={booking} />
    </div>
  )
}
```

### Dashboard Feature (`/src/features/dashboard/`)

#### `components/dashboard/KPIMetrics.tsx`
**Purpose**: Key performance indicators display
```tsx
export function KPIMetrics({ metrics }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard
        title="Total Revenue"
        value={metrics.revenue}
        change={metrics.revenueChange}
        icon={<DollarSign />}
      />
      {/* More KPI cards */}
    </div>
  )
}
```

#### `components/dashboard/CustomerMetrics.tsx`
**Purpose**: Customer analytics display
```tsx
export function CustomerMetrics({ data }) {
  return (
    <Card>
      <h3>Customer Overview</h3>
      <div className="metrics">
        <Stat label="Total Customers" value={data.total} />
        <Stat label="New This Month" value={data.newThisMonth} />
        <Stat label="Retention Rate" value={`${data.retention}%`} />
      </div>
    </Card>
  )
}
```

#### `components/dashboard/RegionalPerformance.tsx`
**Purpose**: Performance by region
```tsx
export function RegionalPerformance({ regions }) {
  return (
    <Card>
      <h3>Regional Performance</h3>
      <Map regions={regions} />
      <RegionList regions={regions} />
    </Card>
  )
}
```

#### `components/dashboard/ServiceDetailsTable.tsx`
**Purpose**: Detailed service analytics table
```tsx
export function ServiceDetailsTable({ services }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Service</th>
          <th>Bookings</th>
          <th>Revenue</th>
          <th>Avg Rating</th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service.id}>
            <td>{service.name}</td>
            <td>{service.bookingCount}</td>
            <td>${service.revenue}</td>
            <td>{service.rating}/5</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
```

### Other Features

#### Jobs Feature (`/src/features/jobs/`)
- `JobCard.tsx`: Individual job display card
- `JobDetails.tsx`: Detailed job information
- `JobsList.tsx`: List of jobs
- `useJobs.ts`: Job data fetching hook

#### Loyalty Feature (`/src/features/loyalty/`)
- `LoyaltyCard.tsx`: User's loyalty status card
- `PointsHistory.tsx`: Points transaction history
- `RewardsList.tsx`: Available rewards catalog
- `useLoyalty.ts`: Loyalty data hook

#### Services Feature (`/src/features/services/`)
- `ServiceCard.tsx`: Service display card
- `ServiceList.tsx`: List of available services
- `useServices.ts`: Services data hook

## Shared Components

### UI Components (`/src/shared/components/ui/`)

#### `Button.tsx`
**Purpose**: Reusable button component
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={cn(buttonVariants({ variant }))} {...props}>
      {children}
    </button>
  )
}
```

#### `Card.tsx`
**Purpose**: Container component
```tsx
export function Card({ children, className }) {
  return (
    <div className={cn('bg-white rounded-lg shadow', className)}>
      {children}
    </div>
  )
}
```

#### `Input.tsx`
**Purpose**: Form input component
```tsx
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn('input-base', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
```

#### `Modal.tsx`
**Purpose**: Modal dialog component
```tsx
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  
  return (
    <Portal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
```

#### `Table.tsx`
**Purpose**: Data table component
```tsx
export function Table({ columns, data, onSort }) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  )
}
```

#### `Badge.tsx`
**Purpose**: Status/label badge
```tsx
export function Badge({ children, variant = 'default' }) {
  return (
    <span className={cn('badge', badgeVariants[variant])}>
      {children}
    </span>
  )
}
```

#### `LoadingSpinner.tsx`
**Purpose**: Loading indicator
```tsx
export function LoadingSpinner({ size = 'md' }) {
  return (
    <div className={cn('spinner', spinnerSizes[size])} />
  )
}
```

#### `MetricCard.tsx`
**Purpose**: Metric display card
```tsx
export function MetricCard({ title, value, change, icon }) {
  return (
    <Card>
      <div className="metric-header">
        {icon}
        <span>{title}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-change">
        <TrendIcon direction={change > 0 ? 'up' : 'down'} />
        {Math.abs(change)}%
      </div>
    </Card>
  )
}
```

#### `Select.tsx`
**Purpose**: Dropdown select component
```tsx
export function Select({ options, value, onChange, placeholder }) {
  return (
    <select value={value} onChange={onChange} className="select">
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
```

#### `ThemeToggle.tsx`
**Purpose**: Dark/light mode toggle
```tsx
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
```

#### `Typography.tsx`
**Purpose**: Text components with consistent styling
```tsx
export const H1 = ({ children, className }) => (
  <h1 className={cn('text-4xl font-bold', className)}>{children}</h1>
)

export const H2 = ({ children, className }) => (
  <h2 className={cn('text-3xl font-semibold', className)}>{children}</h2>
)

export const P = ({ children, className }) => (
  <p className={cn('text-base', className)}>{children}</p>
)
```

### Block Components (`/src/shared/components/blocks/`)

#### `HeroBlock.tsx`
**Purpose**: Hero section component
```tsx
export function HeroBlock({ title, subtitle, primaryCTA, image, stats }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Button href={primaryCTA.href}>{primaryCTA.text}</Button>
        {stats && <Stats {...stats} />}
      </div>
      <div className="hero-image">
        <img src={image} alt="" />
      </div>
    </section>
  )
}
```

#### `FeaturesBlock.tsx`
**Purpose**: Features grid section
```tsx
export function FeaturesBlock({ title, features, columns = 3 }) {
  return (
    <section className="features">
      <h2>{title}</h2>
      <div className={`grid grid-cols-${columns} gap-6`}>
        {features.map(feature => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
```

#### `ServicesBlock.tsx`
**Purpose**: Services showcase section
```tsx
export function ServicesBlock({ services, ctaLink }) {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="service-grid">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <Button href={ctaLink}>View All Services</Button>
    </section>
  )
}
```

#### `TestimonialsBlock.tsx`
**Purpose**: Customer testimonials carousel
```tsx
export function TestimonialsBlock({ testimonials, autoPlay = true }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoPlay, testimonials.length])
  
  return (
    <section className="testimonials">
      <Carousel currentIndex={currentIndex}>
        {testimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </Carousel>
    </section>
  )
}
```

#### `StatsBlock.tsx`
**Purpose**: Statistics display section
```tsx
export function StatsBlock({ stats, theme = 'light' }) {
  return (
    <section className={cn('stats', `stats-${theme}`)}>
      <div className="stats-grid">
        {stats.map(stat => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
```

#### `CTABlock.tsx`
**Purpose**: Call-to-action section
```tsx
export function CTABlock({ title, description, primaryCTA, secondaryCTA }) {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="cta-buttons">
          <Button variant="primary" href={primaryCTA.href}>
            {primaryCTA.text}
          </Button>
          {secondaryCTA && (
            <Button variant="ghost" href={secondaryCTA.href}>
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
```

## Layout System

### Core Layouts (`/src/shared/layouts/components/core/`)

#### `BlankLayout.tsx`
**Purpose**: Minimal layout with no chrome
```tsx
export function BlankLayout({ children }) {
  return <>{children}</>
}
```

#### `PublicLayout.tsx`
**Purpose**: Layout for public/marketing pages
```tsx
export function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}
```

#### `VerticalLayout.tsx`
**Purpose**: Vertical navigation layout
```tsx
export function VerticalLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className="vertical-layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        {children}
      </div>
    </div>
  )
}
```

#### `LayoutWrapper.tsx`
**Purpose**: Dynamic layout selector
```tsx
export function LayoutWrapper({ children, layout = 'vertical' }) {
  const layouts = {
    vertical: VerticalLayout,
    blank: BlankLayout,
    public: PublicLayout
  }
  
  const Layout = layouts[layout]
  
  return <Layout>{children}</Layout>
}
```

### Shared Layout Components (`/src/shared/layouts/components/shared/`)

#### `AppBar.tsx`
**Purpose**: Top application bar
```tsx
export function AppBar() {
  return (
    <header className="app-bar">
      <Logo />
      <SearchBar />
      <NotificationBell />
      <UserMenu />
    </header>
  )
}
```

#### `Navigation.tsx`
**Purpose**: Main navigation component
```tsx
export function Navigation({ items, orientation = 'horizontal' }) {
  return (
    <nav className={cn('navigation', `navigation-${orientation}`)}>
      {items.map(item => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  )
}
```

#### `Footer.tsx`
**Purpose**: Application footer
```tsx
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <FooterLinks links={companyLinks} />
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <FooterLinks links={supportLinks} />
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CarWash Pro. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

### Shell Components (`/src/shared/layouts/components/shell/`)

#### `AppShell.tsx`
**Purpose**: Main application shell
```tsx
export function AppShell({ children }) {
  const { user } = useAuth()
  
  if (!user) {
    return <PublicLayout>{children}</PublicLayout>
  }
  
  return (
    <div className="app-shell">
      <Header />
      <div className="shell-body">
        <Sidebar />
        <main className="shell-content">{children}</main>
      </div>
    </div>
  )
}
```

### Specialized Layouts (`/src/shared/layouts/components/specialized/`)

#### `DashboardLayout.tsx`
**Purpose**: Dashboard-specific layout
```tsx
export function DashboardLayout({ children, title, actions }) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <h1>{title}</h1>
        <div className="dashboard-actions">{actions}</div>
      </div>
      <div className="dashboard-content">{children}</div>
    </div>
  )
}
```

#### `FormLayout.tsx`
**Purpose**: Form-centered layout
```tsx
export function FormLayout({ children, title, description }) {
  return (
    <div className="form-layout">
      <div className="form-header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="form-content">{children}</div>
    </div>
  )
}
```

#### `CenteredLayout.tsx`
**Purpose**: Centered content layout
```tsx
export function CenteredLayout({ children, maxWidth = 'md' }) {
  return (
    <div className="centered-layout">
      <div className={cn('centered-content', `max-w-${maxWidth}`)}>
        {children}
      </div>
    </div>
  )
}
```

#### `ListLayout.tsx`
**Purpose**: List/table view layout
```tsx
export function ListLayout({ children, title, filters, actions }) {
  return (
    <div className="list-layout">
      <div className="list-header">
        <h2>{title}</h2>
        <div className="list-controls">
          {filters}
          {actions}
        </div>
      </div>
      <div className="list-content">{children}</div>
    </div>
  )
}
```

#### `DetailLayout.tsx`
**Purpose**: Detail view layout
```tsx
export function DetailLayout({ children, sidebar, title }) {
  return (
    <div className="detail-layout">
      <div className="detail-main">
        {title && <h1>{title}</h1>}
        {children}
      </div>
      {sidebar && (
        <aside className="detail-sidebar">{sidebar}</aside>
      )}
    </div>
  )
}
```

### Other Layout Files

#### `PageContainer.tsx`
**Purpose**: Page wrapper with consistent spacing
```tsx
export function PageContainer({ children, className }) {
  return (
    <div className={cn('page-container', className)}>
      {children}
    </div>
  )
}
```

#### `Section.tsx`
**Purpose**: Page section component
```tsx
export function Section({ children, title, theme = 'default' }) {
  return (
    <section className={cn('section', `section-${theme}`)}>
      {title && <h2 className="section-title">{title}</h2>}
      <div className="section-content">{children}</div>
    </section>
  )
}
```

#### `StandardPage.tsx`
**Purpose**: Standard page template
```tsx
export function StandardPage({ title, description, children }) {
  return (
    <PageContainer>
      <PageHeader title={title} description={description} />
      <PageContent>{children}</PageContent>
    </PageContainer>
  )
}
```

#### `ThemeWrapper.tsx`
**Purpose**: Theme provider wrapper
```tsx
export function ThemeWrapper({ children }) {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
```

## Type Definitions

### Shared Types (`/src/shared/types/`)

#### `index.ts`
**Purpose**: Main type exports
```ts
export * from './menu'
export * from './types'

export interface Settings {
  mode: 'light' | 'dark' | 'system'
  layout: 'vertical' | 'horizontal' | 'collapsed'
  primaryColor: string
}
```

#### `menu.ts`
**Purpose**: Menu/navigation types
```ts
export interface MenuItem {
  title: string
  path: string
  icon?: string
  children?: MenuItem[]
  roles?: UserRole[]
  badge?: {
    text: string
    color: string
  }
}
```

#### `types.ts`
**Purpose**: Common type definitions
```ts
export type UserRole = 'Visitor' | 'Client' | 'Operator' | 'Manager' | 'Owner'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}
```

### App-Specific Types (`/src/types/apps/`)

#### `appointmentTypes.ts`
**Purpose**: Appointment-related types
```ts
export interface Appointment {
  id: string
  customerId: string
  serviceId: string
  operatorId?: string
  scheduledDate: Date
  duration: number
  status: AppointmentStatus
}

export type AppointmentStatus = 
  | 'scheduled' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled'
```

#### `dashboardTypes.ts`
**Purpose**: Dashboard data types
```ts
export interface DashboardMetrics {
  revenue: number
  bookings: number
  customers: number
  avgRating: number
  trends: TrendData[]
}

export interface TrendData {
  date: Date
  value: number
}
```

#### `serviceTypes.ts`
**Purpose**: Service-related types
```ts
export interface Service {
  id: string
  name: string
  category: ServiceCategory
  price: number
  duration: number
  description: string
  features: string[]
}

export type ServiceCategory = 
  | 'basic' 
  | 'premium' 
  | 'detailing' 
  | 'specialty'
```

## Utilities

### `/src/shared/utils/`

#### `utils.ts`
**Purpose**: General utility functions
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date)
}
```

#### `generators.ts`
**Purpose**: Mock data generators
```ts
export function getMockWashAnalytics() {
  return {
    revenue: 125000,
    totalWashes: 2500,
    customerSatisfaction: 4.8,
    peakHours: ['10:00', '14:00', '18:00']
  }
}

export function getMockServiceTypeStats() {
  return [
    { serviceName: 'Basic Wash', count: 1200, revenue: 18000 },
    { serviceName: 'Premium Detail', count: 300, revenue: 15000 }
  ]
}
```

#### `iconMapper.tsx`
**Purpose**: Maps icon names to components
```tsx
import { Home, Calendar, Settings, User } from 'lucide-react'

const iconMap = {
  home: Home,
  calendar: Calendar,
  settings: Settings,
  user: User
}

export function getIcon(name: string) {
  return iconMap[name] || null
}
```

#### `types.ts`
**Purpose**: Utility type definitions
```ts
export interface WashAnalytics {
  revenue: number
  totalWashes: number
  customerSatisfaction: number
}

export interface ServiceTypeStats {
  serviceName: string
  count: number
  revenue: number
}
```

### Library Utilities (`/src/lib/`)

#### `rbac.ts`
**Purpose**: Role-based access control
```ts
export type UserRole = 'Visitor' | 'Client' | 'Operator' | 'Manager' | 'Owner'

const permissions = {
  Visitor: ['view:public'],
  Client: ['view:public', 'booking:create', 'booking:own'],
  Operator: ['view:jobs', 'job:update'],
  Manager: ['view:all', 'booking:manage', 'operator:manage'],
  Owner: ['*']
}

export function hasPermission(role: UserRole, permission: string): boolean {
  const rolePerms = permissions[role] || []
  return rolePerms.includes('*') || rolePerms.includes(permission)
}
```

#### `theme.tsx`
**Purpose**: Theme management
```tsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setTheme(savedTheme)
  }, [])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  )
}
```

### Schemas (`/src/lib/schemas/`)

#### `common.ts`
**Purpose**: Common validation schemas
```ts
import { z } from 'zod'

export const emailSchema = z.string().email()
export const phoneSchema = z.string().regex(/^\+?[\d\s-()]+$/)
export const dateSchema = z.date().min(new Date())
```

#### `appointments.ts`
**Purpose**: Appointment validation schemas
```ts
export const createAppointmentSchema = z.object({
  serviceId: z.string().uuid(),
  date: dateSchema,
  location: z.string().min(5),
  notes: z.string().optional()
})
```

#### `services.ts`
**Purpose**: Service validation schemas
```ts
export const serviceSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  duration: z.number().int().positive(),
  category: z.enum(['basic', 'premium', 'detailing'])
})
```

## Views

### `/src/views/marketing/LandingPage.tsx`
**Purpose**: Main landing page
```tsx
export default function LandingPage() {
  const [user, setUser] = useState(null)
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    setUser(AuthService.getCurrentUser())
    setIsHydrated(true)
  }, [])
  
  return (
    <div className="landing-page">
      <HeroBlock {...heroData} />
      <FeaturesBlock {...featuresData} />
      <ServicesBlock {...servicesData} />
      <TestimonialsBlock {...testimonialsData} />
      <CTABlock {...ctaData} />
    </div>
  )
}
```

## Documentation Files

### `/docs/adding-pages.md`
**Purpose**: Guide for adding new pages
**Content**: Step-by-step instructions for creating pages

### `/docs/backend-data-fetching.md`
**Purpose**: API integration guide
**Content**: How to fetch data from backend services

### `/docs/architecture-and-workflow.md`
**Purpose**: System architecture overview
**Content**: High-level system design and workflows

### `/docs/complete-file-reference.md`
**Purpose**: This document
**Content**: Comprehensive file documentation

## Build and System Files

### `.claude/settings.local.json`
**Purpose**: Claude AI assistant settings
```json
{
  "codeStyle": {
    "indentSize": 2,
    "useTabs": false
  }
}
```

### `.next/` Directory
**Purpose**: Next.js build output
- Contains compiled JavaScript bundles
- Static HTML pages
- Server-side rendering files
- Build manifests and caches

**Note**: This directory is auto-generated and should not be edited manually

## Summary

This CarWash Pro application consists of:
- **500+ files** organized in a clean architecture
- **Next.js 15** App Router for routing
- **React Query** for data fetching
- **Zustand** for state management
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Comprehensive testing** setup
- **Role-based access control**
- **Modular feature organization**

Each file serves a specific purpose in the overall architecture, contributing to a maintainable, scalable, and performant application.