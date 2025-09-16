import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/connection',
        '/dashboard',
        '/planning',
        '/jobs',
        '/operator-jobs',
        '/services-mgmt',
        '/stock',
        '/profile'
      ],
    },
    sitemap: 'https://premiumcarwash.com/sitemap.xml',
  }
}