import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../index.css'
import StructuredData from '../components/StructuredData'
import { Providers } from '@/infrastructure/providers/providers'
import DevNavigation from '../components/DevNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Premium Car Wash | Professional Mobile & Onsite Car Cleaning Services',
    template: '%s | Premium Car Wash'
  },
  description: 'Premium car wash services offering mobile and onsite cleaning. Same-day availability, eco-friendly products, and trusted professionals. Book your appointment today!',
  keywords: [
    'car wash',
    'mobile car wash',
    'car cleaning',
    'auto detailing',
    'car care',
    'onsite car wash',
    'premium car wash',
    'eco-friendly car wash',
    'professional car cleaning'
  ],
  authors: [{ name: 'Premium Car Wash' }],
  creator: 'Premium Car Wash',
  publisher: 'Premium Car Wash',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://premiumcarwash.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Premium Car Wash | Professional Mobile & Onsite Car Cleaning Services',
    description: 'Premium car wash services offering mobile and onsite cleaning. Same-day availability, eco-friendly products, and trusted professionals.',
    url: 'https://premiumcarwash.com',
    siteName: 'Premium Car Wash',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Car Wash Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Car Wash | Professional Mobile & Onsite Car Cleaning Services',
    description: 'Premium car wash services offering mobile and onsite cleaning. Same-day availability, eco-friendly products, and trusted professionals.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f766e" />
      </head>
      <body className={inter.className}>
        <StructuredData />
        <Providers>
          {children}
          <DevNavigation />
        </Providers>
      </body>
    </html>
  )
}