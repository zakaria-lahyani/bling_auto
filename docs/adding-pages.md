# Adding New Pages Guide

This guide explains how to add new pages to the CarWash Pro application while following the established clean architecture patterns.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Page Types](#page-types)
- [Step-by-Step Guide](#step-by-step-guide)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Architecture Overview

The application follows a clean architecture with the following structure:

```
src/
├── views/                    # Page components
│   ├── marketing/           # Public marketing pages
│   ├── auth/               # Authentication pages  
│   ├── dashboard/          # Protected dashboard pages
│   └── apps/               # Application-specific pages
├── shared/
│   ├── components/         # Reusable UI components
│   │   ├── blocks/        # Page sections (Hero, Features, etc.)
│   │   └── ui/            # Base UI components
│   ├── utils/             # Utilities and helpers
│   └── types/             # Shared TypeScript types
├── features/              # Feature-specific logic
├── infrastructure/        # External services
└── data/                  # Static data and configurations
```

## Page Types

### 1. Marketing Pages
Public pages for visitors and potential customers.
- **Location**: `src/views/marketing/`
- **Examples**: Landing page, About, Pricing, Contact
- **Access**: Public (no authentication required)

### 2. Authentication Pages
User login, registration, and account management.
- **Location**: `src/views/auth/`
- **Examples**: Login, Register, Forgot Password
- **Access**: Public (but redirect if already authenticated)

### 3. Dashboard Pages
Protected pages for authenticated users.
- **Location**: `src/views/dashboard/`
- **Examples**: Analytics, Reports, Settings
- **Access**: Protected (authentication required)

### 4. Application Pages
Feature-specific pages within the application.
- **Location**: `src/views/apps/`
- **Examples**: Booking, Service Management, Customer Portal
- **Access**: Protected with role-based permissions

## Step-by-Step Guide

### Step 1: Determine Page Type and Location

Choose the appropriate directory based on your page type:

```bash
# Marketing page
src/views/marketing/YourPage.tsx

# Auth page  
src/views/auth/YourPage.tsx

# Dashboard page
src/views/dashboard/YourPage.tsx

# App page
src/views/apps/YourPage.tsx
```

### Step 2: Create the Page Component

Create your page component following this template:

```tsx
// src/views/marketing/AboutPage.tsx
'use client'

import React from 'react'
import { 
  HeroBlock,
  FeaturesBlock,
  CTABlock 
} from '@/shared/components/blocks'

// Import page-specific data
import { aboutPageData } from '@/data/aboutPageData'

const AboutPage = () => {
  return (
    <div className="space-y-0">
      {/* Use block components to build your page */}
      <HeroBlock {...aboutPageData.hero} />
      <FeaturesBlock {...aboutPageData.features} />
      <CTABlock {...aboutPageData.cta} />
    </div>
  )
}

export default AboutPage
```

### Step 3: Create Page Data (if needed)

If your page needs static data, create a data file:

```tsx
// src/data/aboutPageData.ts
import { ArrowRight, Shield, Clock, Award } from 'lucide-react'

export const aboutPageData = {
  hero: {
    title: 'About CarWash Pro',
    subtitle: 'Professional car care services since 2020',
    description: 'We\'re committed to providing the best car wash experience...',
    primaryCTA: {
      text: 'Get Started',
      href: '/apps/booking',
      icon: <ArrowRight size={20} />
    }
  },
  features: {
    title: 'Our Values',
    features: [
      {
        icon: Shield,
        title: 'Quality Guarantee',
        description: 'We stand behind every wash with our satisfaction guarantee.'
      },
      // ... more features
    ]
  },
  cta: {
    title: 'Ready to Get Started?',
    description: 'Experience the difference with CarWash Pro today.',
    primaryCTA: {
      text: 'Book Now',
      href: '/apps/booking'
    }
  }
}
```

### Step 4: Add Route Configuration

Add your page to the Next.js App Router by creating the appropriate route file:

```tsx
// app/about/page.tsx
import AboutPage from '@/views/marketing/AboutPage'

export default function About() {
  return <AboutPage />
}

// Optional: Add metadata
export const metadata = {
  title: 'About Us - CarWash Pro',
  description: 'Learn about CarWash Pro and our commitment to quality car care.'
}
```

### Step 5: Add Navigation (if needed)

Update navigation components to include your new page:

```tsx
// src/shared/components/navigation/MainNav.tsx
const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' }, // Add your page
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' }
]
```

## Examples

### Example 1: Simple Marketing Page

```tsx
// src/views/marketing/PricingPage.tsx
'use client'

import React from 'react'
import { Check } from 'lucide-react'

const PricingPage = () => {
  const plans = [
    {
      name: 'Basic Wash',
      price: '$15',
      features: ['Exterior wash', 'Tire cleaning', 'Basic dry']
    },
    {
      name: 'Premium Wash', 
      price: '$25',
      features: ['Everything in Basic', 'Interior vacuum', 'Window cleaning', 'Wax application']
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Pricing</h1>
        <p className="text-lg text-gray-600">Choose the perfect plan for your needs</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold text-primary mb-4">{plan.price}</div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingPage
```

### Example 2: Protected Dashboard Page

```tsx
// src/views/dashboard/ReportsPage.tsx
'use client'

import React from 'react'
import { useAuth } from '@/infrastructure/auth/hooks'
import { DashboardLayout } from '@/shared/components/layouts'
import { Card } from '@/shared/components/ui'

const ReportsPage = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to view reports</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-600">View your business analytics and insights</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Monthly Revenue</h3>
            <div className="text-2xl font-bold text-primary">$12,450</div>
          </Card>
          {/* More report cards */}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ReportsPage
```

### Example 3: Feature-Specific App Page

```tsx
// src/views/apps/BookingPage.tsx
'use client'

import React, { useState } from 'react'
import { Card, Button, Input } from '@/shared/components/ui'
import { useBooking } from '@/features/booking/hooks'

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const { createBooking, isLoading } = useBooking()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createBooking({
      serviceId: selectedService,
      appointmentDate: new Date(appointmentDate)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Book Your Service</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Choose a service...</option>
                <option value="basic">Basic Wash - $15</option>
                <option value="premium">Premium Wash - $25</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Appointment Date
              </label>
              <Input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Booking...' : 'Book Now'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default BookingPage
```

## Best Practices

### 1. Use Block-Based Architecture
Leverage existing block components for consistent layouts:

```tsx
// Good: Using blocks
<HeroBlock {...heroData} />
<FeaturesBlock {...featuresData} />

// Avoid: Custom sections that duplicate existing blocks
```

### 2. Separate Data from Components
Keep static data in separate files:

```tsx
// Good: Separate data file
import { pageData } from '@/data/pageData'

// Avoid: Inline data in components
const data = { title: 'My Title', ... }
```

### 3. Follow Naming Conventions
- Page components: `PascalCase` ending with `Page`
- Data files: `camelCase` ending with `Data`
- Route files: `kebab-case`

### 4. Handle Loading and Error States
Always handle loading and error states in protected pages:

```tsx
const MyPage = () => {
  const { data, isLoading, error } = useMyData()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return <div>{/* Your content */}</div>
}
```

### 5. Use TypeScript
Define types for your page props and data:

```tsx
interface PageData {
  hero: HeroBlockProps
  features: FeaturesBlockProps
}

interface MyPageProps {
  initialData?: PageData
}
```

## Troubleshooting

### Common Issues

1. **Import Errors**
   - Ensure you're using the correct import paths with `@/` prefix
   - Check that exported components match import names

2. **Hydration Errors**
   - Use `'use client'` directive for interactive components
   - Handle client-side only logic with `useEffect`

3. **Authentication Issues**
   - Use `useAuth` hook for protected pages
   - Implement proper loading states
   - Handle redirect logic for unauthorized access

4. **Styling Issues**
   - Follow existing Tailwind CSS patterns
   - Use design system components from `@/shared/components/ui`
   - Maintain consistent spacing with `space-y-*` classes

### Getting Help

- Check existing pages for reference patterns
- Review the component library in `@/shared/components`
- Consult the project's TypeScript types for available props
- Test your page with different user roles and authentication states

## Next Steps

After creating your page:

1. Test with different screen sizes (responsive design)
2. Verify accessibility with keyboard navigation
3. Test with different user roles if applicable
4. Add proper SEO metadata
5. Consider adding loading and error boundaries
6. Write tests for critical user flows

Remember to follow the established patterns and maintain consistency with the existing codebase for the best maintainability and user experience.