/**
 * Static Services Data
 * 
 * Complete services data with SEO optimization.
 * Structured for both static use and API compatibility.
 */

import type { ServicesPageData, Service, ServiceCategory } from '../types'

export const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'All Services',
    slug: 'all',
    description: 'Browse all our professional car care services',
    icon: 'grid',
    color: 'gray',
    serviceCount: 10,
    popular: false,
    image: '/images/categories/all-services.jpg',
    seo: {
      title: 'All Car Care Services - Bling Auto',
      description: 'Browse all our professional car care and detailing services. From basic washes to premium ceramic coatings.',
      keywords: ['car services', 'auto detailing', 'car wash', 'all services']
    }
  },
  {
    id: '2',
    name: 'Wash Services',
    slug: 'wash',
    description: 'Basic to premium exterior and interior cleaning services',
    icon: 'droplets',
    color: 'blue',
    serviceCount: 3,
    popular: true,
    image: '/images/categories/wash-services.jpg',
    seo: {
      title: 'Car Wash Services - Professional Cleaning | Bling Auto',
      description: 'Professional car wash services from basic exterior cleaning to premium full-service washes. Mobile and in-shop options available.',
      keywords: ['car wash', 'exterior cleaning', 'interior cleaning', 'premium wash', 'mobile wash']
    }
  },
  {
    id: '3',
    name: 'Detailing',
    slug: 'detailing',
    description: 'Deep cleaning and restoration services for your vehicle',
    icon: 'sparkles',
    color: 'purple',
    serviceCount: 2,
    popular: true,
    image: '/images/categories/detailing.jpg',
    seo: {
      title: 'Auto Detailing Services - Deep Cleaning | Bling Auto',
      description: 'Professional auto detailing services including interior detailing, full detailing packages, and restoration services.',
      keywords: ['auto detailing', 'car detailing', 'interior detailing', 'full detailing', 'deep cleaning']
    }
  },
  {
    id: '4',
    name: 'Protection',
    slug: 'protection',
    description: 'Ceramic coatings and paint protection services',
    icon: 'shield',
    color: 'green',
    serviceCount: 1,
    popular: false,
    image: '/images/categories/protection.jpg',
    seo: {
      title: 'Paint Protection & Ceramic Coating | Bling Auto',
      description: 'Professional ceramic coating and paint protection services. Long-lasting protection for your vehicle\'s finish.',
      keywords: ['ceramic coating', 'paint protection', 'car protection', 'nano coating', 'vehicle protection']
    }
  },
  {
    id: '5',
    name: 'Restoration',
    slug: 'restoration',
    description: 'Paint correction and headlight restoration services',
    icon: 'palette',
    color: 'orange',
    serviceCount: 2,
    popular: false,
    image: '/images/categories/restoration.jpg',
    seo: {
      title: 'Auto Restoration Services - Paint Correction | Bling Auto',
      description: 'Professional auto restoration including paint correction, headlight restoration, and surface repair services.',
      keywords: ['paint correction', 'headlight restoration', 'auto restoration', 'surface repair', 'scratch removal']
    }
  },
  {
    id: '6',
    name: 'Specialty',
    slug: 'specialty',
    description: 'Specialized services for unique vehicle needs',
    icon: 'wrench',
    color: 'red',
    serviceCount: 1,
    popular: false,
    image: '/images/categories/specialty.jpg',
    seo: {
      title: 'Specialty Auto Services - Engine Bay Cleaning | Bling Auto',
      description: 'Specialized auto services including engine bay cleaning, motorcycle detailing, and custom vehicle care.',
      keywords: ['engine bay cleaning', 'specialty services', 'motorcycle detailing', 'custom vehicle care']
    }
  },
  {
    id: '7',
    name: 'Mobile',
    slug: 'mobile',
    description: 'We come to you - mobile car care services',
    icon: 'car',
    color: 'indigo',
    serviceCount: 1,
    popular: true,
    image: '/images/categories/mobile.jpg',
    seo: {
      title: 'Mobile Car Care Services - We Come to You | Bling Auto',
      description: 'Convenient mobile car care services. Professional detailing at your home, office, or any location.',
      keywords: ['mobile car wash', 'mobile detailing', 'on-site car care', 'convenient car wash', 'mobile service']
    }
  }
]

export const services: Service[] = [
  {
    id: '1',
    name: 'Basic Wash',
    slug: 'basic-wash',
    description: 'Perfect for regular maintenance with comprehensive exterior wash, wheel cleaning, and basic drying. Ideal for keeping your vehicle clean and presentable between more intensive services.',
    shortDescription: 'Exterior wash with wheel cleaning and basic dry',
    price: 25,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    isActive: true,
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop'
    ],
    category: {
      id: '2',
      name: 'Wash Services',
      slug: 'wash'
    },
    popular: false,
    featured: false,
    new: false,
    tags: ['affordable', 'quick', 'exterior', 'maintenance'],
    features: [
      'Exterior wash and rinse',
      'Wheel and tire cleaning',
      'Basic towel dry',
      'Window cleaning (exterior)'
    ],
    benefits: [
      'Maintains vehicle appearance',
      'Removes daily dirt and grime',
      'Quick and affordable',
      'Perfect for regular upkeep'
    ],
    availability: {
      mobile: true,
      inShop: true
    },
    rating: 4.2,
    reviewCount: 158,
    estimatedTime: {
      min: 25,
      max: 35
    },
    seo: {
      title: 'Basic Car Wash Service - Affordable Exterior Cleaning | Bling Auto',
      description: 'Professional basic car wash service including exterior cleaning, wheel cleaning, and drying. Perfect for regular vehicle maintenance.',
      keywords: ['basic car wash', 'exterior cleaning', 'affordable car wash', 'regular maintenance', 'quick wash'],
      ogImage: '/images/services/basic-wash-og.jpg'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '2',
    name: 'Premium Wash',
    slug: 'premium-wash',
    description: 'Complete interior and exterior cleaning for a spotless finish. Includes interior vacuuming, dashboard cleaning, tire shine, and exterior wax application for lasting protection and shine.',
    shortDescription: 'Complete interior and exterior cleaning with wax',
    price: 55,
    originalPrice: 65,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop',
    isActive: true,
    gallery: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=600&fit=crop'
    ],
    category: {
      id: '2',
      name: 'Wash Services',
      slug: 'wash'
    },
    popular: true,
    featured: true,
    new: false,
    tags: ['popular', 'comprehensive', 'interior', 'exterior', 'wax'],
    features: [
      'Interior vacuum and cleaning',
      'Exterior wash and wax',
      'Tire shine application',
      'Interior and exterior windows',
      'Dashboard and console cleaning'
    ],
    benefits: [
      'Complete vehicle transformation',
      'Long-lasting wax protection',
      'Fresh interior environment',
      'Enhanced resale value'
    ],
    addOns: [
      {
        id: 'addon1',
        name: 'Air Freshener',
        price: 5,
        description: 'Premium scent application',
        popular: true
      },
      {
        id: 'addon2',
        name: 'Fabric Protection',
        price: 15,
        description: 'Stain and spill protection'
      }
    ],
    availability: {
      mobile: true,
      inShop: true
    },
    rating: 4.7,
    reviewCount: 342,
    estimatedTime: {
      min: 70,
      max: 85
    },
    seo: {
      title: 'Premium Car Wash Service - Complete Interior & Exterior | Bling Auto',
      description: 'Premium car wash service with complete interior and exterior cleaning, wax application, and tire shine. Most popular service.',
      keywords: ['premium car wash', 'interior exterior cleaning', 'car wax', 'complete car wash', 'popular service'],
      ogImage: '/images/services/premium-wash-og.jpg'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '3',
    name: 'Express Detail',
    slug: 'express-detail',
    description: 'Quick but thorough cleaning for busy schedules. Perfect balance of speed and quality with exterior wash, interior vacuum, window cleaning, and basic detailing touches.',
    shortDescription: 'Quick but thorough cleaning for busy schedules',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop',
    isActive: true,
    category: {
      id: '2',
      name: 'Wash Services',
      slug: 'wash'
    },
    popular: false,
    featured: false,
    new: true,
    tags: ['quick', 'efficient', 'busy-schedule', 'thorough'],
    features: [
      'Exterior wash and dry',
      'Interior vacuum',
      'Window cleaning',
      'Quick tire shine',
      'Dashboard wipe down'
    ],
    benefits: [
      'Time-efficient service',
      'Maintains vehicle cleanliness',
      'Perfect for busy professionals',
      'Good value for money'
    ],
    availability: {
      mobile: true,
      inShop: true
    },
    rating: 4.3,
    reviewCount: 127,
    estimatedTime: {
      min: 40,
      max: 50
    },
    seo: {
      title: 'Express Car Detailing - Quick Professional Service | Bling Auto',
      description: 'Express car detailing service for busy schedules. Quick but thorough cleaning with professional results in 45 minutes.',
      keywords: ['express detailing', 'quick car wash', 'busy schedule', 'fast service', 'professional cleaning'],
      ogImage: '/images/services/express-detail-og.jpg'
    },
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '4',
    name: 'Interior Detailing',
    slug: 'interior-detailing',
    description: 'Deep cleaning and conditioning for your vehicle\'s interior. Includes steam cleaning, leather conditioning, fabric protection, odor elimination, and UV protectant application.',
    shortDescription: 'Deep interior cleaning and conditioning',
    price: 89,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1586337459984-6ae5ad0b9cb0?w=800&h=600&fit=crop',
    isActive: true,
    category: {
      id: '3',
      name: 'Detailing',
      slug: 'detailing'
    },
    popular: false,
    featured: true,
    tags: ['deep-clean', 'interior', 'conditioning', 'premium'],
    features: [
      'Deep vacuum and steam cleaning',
      'Leather conditioning',
      'Fabric protection treatment',
      'Odor elimination',
      'UV protectant application'
    ],
    benefits: [
      'Fresh, clean interior environment',
      'Extended material lifespan',
      'Improved air quality',
      'Enhanced comfort'
    ],
    availability: {
      mobile: false,
      inShop: true
    },
    rating: 4.6,
    reviewCount: 89,
    estimatedTime: {
      min: 110,
      max: 130
    },
    seo: {
      title: 'Interior Car Detailing - Deep Cleaning Service | Bling Auto',
      description: 'Professional interior car detailing with deep cleaning, leather conditioning, and fabric protection. Transform your vehicle\'s interior.',
      keywords: ['interior detailing', 'deep cleaning', 'leather conditioning', 'fabric protection', 'car interior'],
      ogImage: '/images/services/interior-detailing-og.jpg'
    },
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '5',
    name: 'Full Detailing',
    slug: 'full-detailing',
    description: 'Complete interior and exterior detailing service. The ultimate car care experience with paint correction, deep interior cleaning, protection application, engine bay cleaning, and headlight restoration.',
    shortDescription: 'Ultimate interior and exterior detailing experience',
    price: 149,
    originalPrice: 179,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=600&fit=crop',
    isActive: true,
    category: {
      id: '3',
      name: 'Detailing',
      slug: 'detailing'
    },
    popular: true,
    featured: true,
    tags: ['premium', 'complete', 'ultimate', 'transformation'],
    features: [
      'Complete exterior paint correction',
      'Deep interior detailing',
      'Ceramic coating application',
      'Engine bay cleaning',
      'Headlight restoration'
    ],
    benefits: [
      'Complete vehicle transformation',
      'Maximum protection and shine',
      'Showroom-quality results',
      'Long-lasting protection'
    ],
    addOns: [
      {
        id: 'addon3',
        name: 'Paint Protection Film',
        price: 299,
        description: 'Clear protective film application'
      }
    ],
    availability: {
      mobile: false,
      inShop: true
    },
    rating: 4.9,
    reviewCount: 167,
    estimatedTime: {
      min: 220,
      max: 260
    },
    seo: {
      title: 'Full Auto Detailing Service - Complete Car Transformation | Bling Auto',
      description: 'Complete auto detailing service with paint correction, interior detailing, and protection. Ultimate car care experience.',
      keywords: ['full detailing', 'complete detailing', 'paint correction', 'ultimate car care', 'transformation'],
      ogImage: '/images/services/full-detailing-og.jpg'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '6',
    name: 'Ceramic Protection',
    slug: 'ceramic-protection',
    description: 'Professional nano-ceramic coating for long-lasting protection. Provides superior gloss, hydrophobic properties, UV protection, and easy maintenance for your vehicle\'s paint.',
    shortDescription: 'Professional nano-ceramic coating with 2-year warranty',
    price: 299,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=600&fit=crop',
    isActive: true,
    category: {
      id: '4',
      name: 'Protection',
      slug: 'protection'
    },
    popular: false,
    featured: true,
    tags: ['protection', 'ceramic', 'long-lasting', 'professional'],
    features: [
      '9H ceramic coating application',
      'UV protection',
      'Hydrophobic surface',
      '2-year warranty',
      'Paint correction prep'
    ],
    benefits: [
      'Superior paint protection',
      'Easy maintenance washing',
      'Enhanced gloss and depth',
      'Long-term value protection'
    ],
    availability: {
      mobile: false,
      inShop: true
    },
    rating: 4.8,
    reviewCount: 93,
    estimatedTime: {
      min: 240,
      max: 280
    },
    seo: {
      title: 'Ceramic Coating Service - Professional Paint Protection | Bling Auto',
      description: 'Professional ceramic coating service with 2-year warranty. Superior paint protection with hydrophobic properties and UV protection.',
      keywords: ['ceramic coating', 'paint protection', 'nano coating', 'hydrophobic', 'car protection'],
      ogImage: '/images/services/ceramic-protection-og.jpg'
    },
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '7',
    name: 'Paint Correction',
    slug: 'paint-correction',
    description: 'Professional multi-stage paint correction to remove swirl marks, scratches, and imperfections. Restores your vehicle\'s paint to showroom condition with machine polishing and cutting compounds.',
    shortDescription: 'Multi-stage correction to remove swirls and scratches',
    price: 199,
    originalPrice: 249,
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1586337459984-6ae5ad0b9cb0?w=800&h=600&fit=crop',
    isActive: true,
    gallery: [
      'https://images.unsplash.com/photo-1586337459984-6ae5ad0b9cb0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    ],
    category: {
      id: '5',
      name: 'Restoration',
      slug: 'restoration'
    },
    popular: false,
    featured: false,
    tags: ['restoration', 'correction', 'polish', 'swirl-removal'],
    features: [
      'Multi-stage polishing process',
      'Swirl mark removal',
      'Scratch elimination',
      'Paint depth restoration',
      'Professional grade compounds'
    ],
    benefits: [
      'Restored paint clarity',
      'Enhanced vehicle value',
      'Showroom-quality finish',
      'Improved light reflection'
    ],
    addOns: [
      {
        id: 'addon4',
        name: 'Ceramic Coating',
        price: 199,
        description: 'Protect the corrected paint'
      }
    ],
    availability: {
      mobile: false,
      inShop: true
    },
    rating: 4.7,
    reviewCount: 76,
    estimatedTime: {
      min: 330,
      max: 390
    },
    seo: {
      title: 'Paint Correction Service - Remove Swirls & Scratches | Bling Auto',
      description: 'Professional paint correction service to remove swirl marks and scratches. Multi-stage polishing for showroom-quality results.',
      keywords: ['paint correction', 'swirl removal', 'scratch removal', 'polishing', 'paint restoration'],
      ogImage: '/images/services/paint-correction-og.jpg'
    },
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '8',
    name: 'Headlight Restoration',
    slug: 'headlight-restoration',
    description: 'Restore cloudy, yellowed, and oxidized headlights to crystal clear condition. Improves visibility and safety while enhancing your vehicle\'s appearance with professional-grade restoration.',
    shortDescription: 'Restore cloudy headlights to crystal clear condition',
    price: 79,
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop',
    isActive: true,
    category: {
      id: '5',
      name: 'Restoration',
      slug: 'restoration'
    },
    popular: false,
    featured: false,
    new: false,
    tags: ['restoration', 'headlights', 'safety', 'visibility'],
    features: [
      'Multi-stage sanding process',
      'Professional polishing compounds',
      'UV protective coating',
      'Before and after photos',
      'Improved light output'
    ],
    benefits: [
      'Enhanced driving safety',
      'Improved vehicle appearance',
      'Better light visibility',
      'Cost-effective vs replacement'
    ],
    availability: {
      mobile: true,
      inShop: true
    },
    rating: 4.4,
    reviewCount: 112,
    estimatedTime: {
      min: 80,
      max: 100
    },
    seo: {
      title: 'Headlight Restoration Service - Crystal Clear Results | Bling Auto',
      description: 'Professional headlight restoration service. Remove cloudiness and yellowing for improved visibility and safety.',
      keywords: ['headlight restoration', 'cloudy headlights', 'headlight cleaning', 'visibility improvement', 'safety'],
      ogImage: '/images/services/headlight-restoration-og.jpg'
    },
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '9',
    name: 'Engine Bay Cleaning',
    slug: 'engine-bay-cleaning',
    description: 'Professional engine bay detailing and cleaning service. Remove grease, dirt, and grime from your engine compartment with safe, effective techniques that protect sensitive components.',
    shortDescription: 'Professional engine compartment cleaning and detailing',
    price: 65,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=600&fit=crop',
    isActive: true,
    category: {
      id: '6',
      name: 'Specialty',
      slug: 'specialty'
    },
    popular: false,
    featured: false,
    tags: ['specialty', 'engine', 'degreasing', 'detailed'],
    features: [
      'Safe engine bay degreasing',
      'Protective component covering',
      'Steam cleaning application',
      'Plastic and rubber treatment',
      'Final protective dressing'
    ],
    benefits: [
      'Easier maintenance access',
      'Enhanced engine longevity',
      'Improved resale value',
      'Professional appearance'
    ],
    availability: {
      mobile: false,
      inShop: true
    },
    rating: 4.5,
    reviewCount: 43,
    estimatedTime: {
      min: 110,
      max: 130
    },
    seo: {
      title: 'Engine Bay Cleaning Service - Professional Detailing | Bling Auto',
      description: 'Professional engine bay cleaning and detailing. Safe degreasing and cleaning that protects sensitive components.',
      keywords: ['engine bay cleaning', 'engine detailing', 'degreasing', 'engine compartment', 'specialty service'],
      ogImage: '/images/services/engine-bay-cleaning-og.jpg'
    },
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '10',
    name: 'Mobile Complete Wash',
    slug: 'mobile-complete-wash',
    description: 'Full-service mobile car wash and detail at your location. Complete interior and exterior cleaning with the convenience of professional service wherever you are - home, office, or any preferred location.',
    shortDescription: 'Complete mobile wash service at your location',
    price: 75,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    isActive: true,
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop'
    ],
    category: {
      id: '7',
      name: 'Mobile',
      slug: 'mobile'
    },
    popular: true,
    featured: true,
    tags: ['mobile', 'convenient', 'complete', 'popular'],
    features: [
      'Complete exterior wash and wax',
      'Full interior vacuum and cleaning',
      'Window cleaning inside and out',
      'Tire shine and wheel cleaning',
      'Dashboard and console care'
    ],
    benefits: [
      'Ultimate convenience',
      'No travel required',
      'Complete professional service',
      'Flexible scheduling'
    ],
    addOns: [
      {
        id: 'addon5',
        name: 'Interior Protection',
        price: 25,
        description: 'Fabric and leather protection treatment'
      },
      {
        id: 'addon6',
        name: 'Pet Hair Removal',
        price: 15,
        description: 'Specialized pet hair removal service'
      }
    ],
    availability: {
      mobile: true,
      inShop: false
    },
    rating: 4.8,
    reviewCount: 298,
    estimatedTime: {
      min: 110,
      max: 130
    },
    seo: {
      title: 'Mobile Car Wash Service - Complete Wash at Your Location | Bling Auto',
      description: 'Complete mobile car wash service. Professional interior and exterior cleaning at your home, office, or preferred location.',
      keywords: ['mobile car wash', 'mobile detailing', 'on-site car wash', 'convenient car care', 'complete mobile service'],
      ogImage: '/images/services/mobile-complete-wash-og.jpg'
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  }
]

export const servicesPageData: ServicesPageData = {
  seo: {
    title: 'Professional Car Care Services - Auto Detailing | Bling Auto',
    description: 'Browse our complete range of professional car care services. From basic washes to premium detailing and ceramic coatings. Mobile and in-shop options available.',
    keywords: [
      'car services',
      'auto detailing',
      'car wash',
      'mobile car wash',
      'ceramic coating',
      'paint correction',
      'interior detailing',
      'professional car care',
      'vehicle maintenance',
      'automotive services'
    ],
    ogImage: '/images/og/services-page.jpg',
    canonicalUrl: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Professional Car Care Services',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Bling Auto'
      },
      'areaServed': 'California, USA',
      'serviceType': 'Automotive Care'
    }
  },
  hero: {
    title: 'Professional Car Care Services',
    description: 'From basic washes to premium detailing, we offer comprehensive car care solutions with mobile and in-shop availability. Book online for same-day service.',
    stats: {
      totalServices: services.length,
      averageRating: 4.7,
      happyCustomers: 2500
    }
  },
  categories: serviceCategories,
  services: services,
  filters: {
    categories: serviceCategories,
    priceRange: {
      min: Math.min(...services.map(s => s.price)),
      max: Math.max(...services.map(s => s.price))
    },
    availability: ['mobile', 'inShop'],
    tags: Array.from(new Set(services.flatMap(s => s.tags))),
    sortOptions: [
      { value: 'popular', label: 'Most Popular' },
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'duration', label: 'Duration' },
      { value: 'name', label: 'Alphabetical' }
    ]
  },
  lastUpdated: new Date().toISOString()
}