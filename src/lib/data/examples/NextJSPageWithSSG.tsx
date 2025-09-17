/**
 * Example: Next.js Page with SSG + ISR using Data Package
 * 
 * This shows how to implement Static Site Generation (SSG) with 
 * Incremental Static Regeneration (ISR) using the new data package.
 * 
 * File: app/services/page.tsx (App Router)
 * or pages/services.tsx (Pages Router)
 */

import { Metadata } from 'next'
import { getServicesPageData, getRevalidationConfig } from '@/lib/data'
import { ServicesPageData } from '@/lib/data/marketing/types'
import ServicesPage from '@/views/marketing/ServicesPage'

interface Props {
  data: ServicesPageData
}

// App Router Example (app/services/page.tsx)
// Note: Use ServicesPageWithSSG instead of the regular ServicesPage for SSG support
export default function ServicesPageRoute({ data }: Props) {
  // Import the SSG-compatible version
  const { default: ServicesPageWithSSG } = require('./ServicesPageWithSSG')
  return <ServicesPageWithSSG initialData={data} />
}

// Static Site Generation with ISR
export async function generateStaticParams() {
  // For services page, we don't need dynamic params
  return []
}

// Get static props with revalidation
export async function getStaticProps() {
  try {
    const data: ServicesPageData = await getServicesPageData()
    const revalidationConfig = getRevalidationConfig('services')

    return {
      props: {
        data
      },
      revalidate: revalidationConfig.revalidate, // 30 minutes
      // Next.js 13+ supports tags for on-demand revalidation
      tags: revalidationConfig.tags
    }
  } catch (error) {
    console.error('Failed to load services page data:', error)
    
    // Return notFound or error page
    return {
      notFound: true,
      revalidate: 60 // Retry in 1 minute
    }
  }
}

// SEO Metadata (App Router)
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data: ServicesPageData = await getServicesPageData()
    
    return {
      title: data.seo.title,
      description: data.seo.description,
      keywords: data.seo.keywords,
      openGraph: {
        title: data.seo.title,
        description: data.seo.description,
        images: data.seo.ogImage ? [{ url: data.seo.ogImage }] : undefined,
        url: data.seo.canonicalUrl
      },
      twitter: {
        card: 'summary_large_image',
        title: data.seo.title,
        description: data.seo.description,
        images: data.seo.ogImage ? [data.seo.ogImage] : undefined
      },
      alternates: {
        canonical: data.seo.canonicalUrl
      },
      other: {
        // Add JSON-LD structured data
        'application/ld+json': JSON.stringify(data.seo.jsonLd)
      }
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    
    // Fallback metadata
    return {
      title: 'Professional Car Care Services - Bling Auto',
      description: 'Browse our complete range of professional car care services.'
    }
  }
}

// Pages Router Example (pages/services.tsx)
export async function getStaticPropsPages() {
  try {
    const data: ServicesPageData = await getServicesPageData()
    const revalidationConfig = getRevalidationConfig('services')

    return {
      props: {
        data,
        // Pass revalidation info to component if needed
        lastUpdated: data.lastUpdated,
        revalidateIn: revalidationConfig.revalidate
      },
      revalidate: revalidationConfig.revalidate
    }
  } catch (error) {
    console.error('Failed to load services page data:', error)
    
    return {
      notFound: true,
      revalidate: 60
    }
  }
}

// On-demand revalidation API route (app/api/revalidate/route.ts)
export async function revalidateServicesPage(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    // Verify secret to prevent abuse
    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Import revalidateTag or revalidatePath from next/cache
    const { revalidateTag, revalidatePath } = await import('next/cache')
    
    // Revalidate specific tags or paths
    revalidateTag('services')
    revalidatePath('/services')
    
    return Response.json({ 
      message: 'Services page revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Revalidation failed:', error)
    return Response.json(
      { message: 'Revalidation failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Usage examples:

// 1. Manual revalidation via API:
// POST /api/revalidate?secret=your-secret&path=/services

// 2. Webhook from CMS:
// When content changes, trigger revalidation via webhook

// 3. Time-based revalidation:
// Automatically revalidates based on revalidate value

// 4. Background updates:
// ISR serves stale content while regenerating in background

/**
 * Benefits of this approach:
 * 
 * 1. **Performance**: Static generation for fast loading
 * 2. **SEO**: Pre-rendered HTML with proper metadata
 * 3. **Flexibility**: Can switch between static and API data
 * 4. **Scalability**: Handles high traffic with static files
 * 5. **Fresh Content**: ISR ensures content stays updated
 * 6. **Error Handling**: Graceful fallbacks for failures
 * 7. **Cache Control**: Fine-grained cache invalidation
 * 8. **Development**: Easy to test with static data
 * 9. **Production**: Seamless API integration
 * 10. **Monitoring**: Built-in performance tracking
 */