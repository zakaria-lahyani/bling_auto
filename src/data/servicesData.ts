/**
 * Services Data
 * 
 * This file simulates data that would come from a backend API.
 * It includes all services with detailed information, categories, and metadata.
 * 
 * When API is ready, this data structure can be easily replaced with API calls.
 */

export interface Service {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  duration: string
  image: string
  category: {
    id: string
    name: string
    slug: string
  }
  popular: boolean
  featured: boolean
  tags: string[]
  features: string[]
  benefits: string[]
  addOns?: {
    id: string
    name: string
    price: number
    description: string
  }[]
  availability: {
    mobile: boolean
    inShop: boolean
  }
  rating: number
  reviewCount: number
  estimatedTime: {
    min: number
    max: number
  }
  createdAt: string
  updatedAt: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  serviceCount: number
  popular: boolean
}

// Service Categories
export const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'All Services',
    slug: 'all',
    description: 'View all available services',
    icon: 'grid',
    color: 'gray',
    serviceCount: 10,
    popular: false
  },
  {
    id: '2',
    name: 'Wash Services',
    slug: 'wash',
    description: 'Basic to premium exterior and interior cleaning',
    icon: 'droplets',
    color: 'blue',
    serviceCount: 3,
    popular: true
  },
  {
    id: '3',
    name: 'Detailing',
    slug: 'detailing',
    description: 'Deep cleaning and restoration services',
    icon: 'sparkles',
    color: 'purple',
    serviceCount: 2,
    popular: true
  },
  {
    id: '4',
    name: 'Protection',
    slug: 'protection',
    description: 'Ceramic coatings and paint protection',
    icon: 'shield',
    color: 'green',
    serviceCount: 1,
    popular: false
  },
  {
    id: '5',
    name: 'Restoration',
    slug: 'restoration',
    description: 'Paint correction and headlight restoration',
    icon: 'palette',
    color: 'orange',
    serviceCount: 2,
    popular: false
  },
  {
    id: '6',
    name: 'Specialty',
    slug: 'specialty',
    description: 'Specialized services for specific needs',
    icon: 'wrench',
    color: 'red',
    serviceCount: 1,
    popular: false
  },
  {
    id: '7',
    name: 'Mobile',
    slug: 'mobile',
    description: 'We come to you anywhere',
    icon: 'car',
    color: 'indigo',
    serviceCount: 1,
    popular: true
  }
]

// All Services Data
export const allServices: Service[] = [
  {
    id: '1',
    name: 'Basic Wash',
    description: 'Perfect for regular maintenance with comprehensive exterior wash, wheel cleaning, and basic drying. Ideal for keeping your vehicle clean and presentable.',
    shortDescription: 'Exterior wash with wheel cleaning and basic dry',
    price: 25,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: {
      id: '2',
      name: 'Wash Services',
      slug: 'wash'
    },
    popular: false,
    featured: false,
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
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '2',
    name: 'Premium Wash',
    description: 'Complete interior and exterior cleaning for a spotless finish. Includes interior vacuuming, dashboard cleaning, and exterior wax application.',
    shortDescription: 'Complete interior and exterior cleaning with wax',
    price: 55,
    originalPrice: 65,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
    category: {
      id: '2',
      name: 'Wash Services',
      slug: 'wash'
    },
    popular: true,
    featured: true,
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
        description: 'Premium scent application'
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
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '3',
    name: 'Express Detail',
    description: 'Quick but thorough cleaning for busy schedules. Perfect balance of speed and quality with exterior wash, interior vacuum, and basic detailing.',
    shortDescription: 'Quick but thorough cleaning for busy schedules',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
    category: {
      id: '2',
      name: 'Wash Services',
      slug: 'wash'
    },
    popular: false,
    featured: false,
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
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '4',
    name: 'Interior Detailing',
    description: 'Deep cleaning and conditioning for your vehicle\'s interior. Includes steam cleaning, leather conditioning, fabric protection, and odor elimination.',
    shortDescription: 'Deep interior cleaning and conditioning',
    price: 89,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1586337459984-6ae5ad0b9cb0?w=400&h=300&fit=crop',
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
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '5',
    name: 'Full Detailing',
    description: 'Complete interior and exterior detailing service. The ultimate car care experience with paint correction, deep interior cleaning, and protection application.',
    shortDescription: 'Ultimate interior and exterior detailing experience',
    price: 149,
    originalPrice: 179,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop',
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
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '6',
    name: 'Ceramic Protection',
    description: 'Professional nano-ceramic coating for long-lasting protection. Provides superior gloss, hydrophobic properties, and UV protection for your vehicle\'s paint.',
    shortDescription: 'Professional nano-ceramic coating with 2-year warranty',
    price: 299,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop',
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
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '7',
    name: 'Paint Correction',
    description: 'Professional paint restoration to remove swirls, scratches, and oxidation. Multi-stage polishing process restores paint clarity and depth.',
    shortDescription: 'Professional paint restoration and swirl removal',
    price: 199,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    category: {
      id: '5',
      name: 'Restoration',
      slug: 'restoration'
    },
    popular: false,
    featured: false,
    tags: ['restoration', 'paint', 'correction', 'professional'],
    features: [
      'Multi-stage polishing',
      'Swirl mark removal',
      'Scratch elimination',
      'Paint depth restoration',
      'Protective sealant application'
    ],
    benefits: [
      'Restored paint clarity',
      'Eliminated swirl marks',
      'Enhanced vehicle value',
      'Professional-grade results'
    ],
    availability: {
      mobile: false,
      inShop: true
    },
    rating: 4.5,
    reviewCount: 76,
    estimatedTime: {
      min: 180,
      max: 200
    },
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '8',
    name: 'Headlight Restoration',
    description: 'Restore clarity and brightness to foggy or yellowed headlights. Professional restoration process improves visibility and vehicle appearance.',
    shortDescription: 'Restore clarity to foggy or yellowed headlights',
    price: 79,
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    category: {
      id: '5',
      name: 'Restoration',
      slug: 'restoration'
    },
    popular: false,
    featured: false,
    tags: ['restoration', 'headlights', 'clarity', 'safety'],
    features: [
      'UV damage removal',
      'Clarity restoration',
      'Protective coating',
      'Both headlights included',
      '1-year warranty'
    ],
    benefits: [
      'Improved visibility',
      'Enhanced safety',
      'Better vehicle appearance',
      'Increased resale value'
    ],
    availability: {
      mobile: true,
      inShop: true
    },
    rating: 4.4,
    reviewCount: 112,
    estimatedTime: {
      min: 55,
      max: 65
    },
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '9',
    name: 'Engine Bay Cleaning',
    description: 'Professional engine compartment cleaning and detailing. Safe degreasing process cleans and protects all engine components.',
    shortDescription: 'Professional engine compartment cleaning',
    price: 69,
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    category: {
      id: '6',
      name: 'Specialty',
      slug: 'specialty'
    },
    popular: false,
    featured: false,
    tags: ['specialty', 'engine', 'degreasing', 'maintenance'],
    features: [
      'Degreasing and cleaning',
      'Component protection',
      'Hose and belt conditioning',
      'Plastic restoration',
      'Final protective coating'
    ],
    benefits: [
      'Clean engine compartment',
      'Easier maintenance access',
      'Improved engine cooling',
      'Professional appearance'
    ],
    availability: {
      mobile: false,
      inShop: true
    },
    rating: 4.1,
    reviewCount: 45,
    estimatedTime: {
      min: 85,
      max: 95
    },
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '10',
    name: 'Mobile Service',
    description: 'We come to you! Professional car care at your location with all the same quality standards. Perfect for home, office, or any convenient location.',
    shortDescription: 'Professional car care at your location',
    price: 35,
    duration: 'Varies',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: {
      id: '7',
      name: 'Mobile',
      slug: 'mobile'
    },
    popular: true,
    featured: true,
    tags: ['mobile', 'convenient', 'at-location', 'flexible'],
    features: [
      'At your location service',
      'Flexible scheduling',
      'Professional equipment',
      'No travel required',
      'Same quality standards'
    ],
    benefits: [
      'Ultimate convenience',
      'Time-saving solution',
      'No disruption to schedule',
      'Professional results anywhere'
    ],
    availability: {
      mobile: true,
      inShop: false
    },
    rating: 4.6,
    reviewCount: 234,
    estimatedTime: {
      min: 30,
      max: 180
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  }
]

// Helper functions that would typically be API calls
export const getServicesByCategory = (categorySlug: string): Service[] => {
  if (categorySlug === 'all') {
    return allServices
  }
  return allServices.filter(service => service.category.slug === categorySlug)
}

export const getFeaturedServices = (): Service[] => {
  return allServices.filter(service => service.featured)
}

export const getPopularServices = (): Service[] => {
  return allServices.filter(service => service.popular)
}

export const searchServices = (query: string): Service[] => {
  const searchTerm = query.toLowerCase()
  return allServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

export const getServiceById = (id: string): Service | undefined => {
  return allServices.find(service => service.id === id)
}