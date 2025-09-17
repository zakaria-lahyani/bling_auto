/**
 * Services Page Route
 * 
 * Route configuration for the comprehensive services showcase page.
 */

import { Metadata } from 'next'
import ServicesPage from '@/views/marketing/ServicesPage'

export const metadata: Metadata = {
  title: 'All Services - Bling Auto | Professional Car Care & Detailing',
  description: 'Browse all 10+ professional car care services with filters by category. From $25 basic washes to premium detailing, ceramic protection, mobile services, and more. Book online today!',
  keywords: [
    'car wash services',
    'auto detailing services',
    'ceramic coating',
    'paint correction',
    'mobile car wash',
    'interior detailing',
    'headlight restoration',
    'engine bay cleaning',
    'service filters',
    'car care packages',
    'professional detailing',
    'same day service'
  ],
  openGraph: {
    title: 'All Services - Browse & Filter Car Care Options | Bling Auto',
    description: 'Explore 10+ professional car care services with easy filtering. Mobile available, same-day service, satisfaction guaranteed.',
    type: 'website',
    images: [
      {
        url: '/images/services-page-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bling Auto - All Car Care Services with Filters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Services - Browse & Filter Car Care Options | Bling Auto',
    description: 'Explore 10+ professional car care services with easy filtering. Mobile available, same-day service, satisfaction guaranteed.',
  },
}

export default function Page() {
  return <ServicesPage />
}