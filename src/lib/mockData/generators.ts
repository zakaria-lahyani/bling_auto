import { 
  WashAnalytics, 
  ServiceTypeStats, 
  LocationStats, 
  DailyStats, 
  CustomerMetrics,
  UserProfile,
  UserCar,
  LoyaltyTier,
  LoyaltyReward,
  PointsTransaction,
  Operator,
  PlanningAppointment,
  StockItem,
  Supplier,
  StockTransaction,
  OperationSlot,
  DailyOperations
} from './types';

// Dashboard Analytics Generators
export const getMockWashAnalytics = (): WashAnalytics => ({
  totalWashes: 2847,
  mobileWashes: 1523,
  onsiteWashes: 1324,
  homeWashes: 892,
  revenue: 185420,
  avgServiceTime: 45,
  customerSatisfaction: 4.7
});

export const getMockServiceTypeStats = (): ServiceTypeStats[] => [
  { serviceName: 'Basic Wash', count: 1285, revenue: 32125, avgDuration: 30, percentage: 45.2 },
  { serviceName: 'Premium Wash', count: 842, revenue: 67360, avgDuration: 45, percentage: 29.6 },
  { serviceName: 'Full Detail', count: 520, revenue: 67600, avgDuration: 120, percentage: 18.3 },
  { serviceName: 'Quick Rinse', count: 200, revenue: 3000, avgDuration: 15, percentage: 7.0 }
];

export const getMockLocationStats = (): LocationStats[] => [
  { region: 'Downtown', washes: 892, revenue: 58980, avgRating: 4.8 },
  { region: 'North End', washes: 674, revenue: 44620, avgRating: 4.6 },
  { region: 'South Side', washes: 721, revenue: 47765, avgRating: 4.7 },
  { region: 'Mobile Service', washes: 560, revenue: 44800, avgRating: 4.9 }
];

export const getMockDailyStats = (): DailyStats[] => {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const baseWashes = 80 + Math.random() * 40;
    const mobile = Math.floor(baseWashes * (0.4 + Math.random() * 0.2));
    const onsite = Math.floor(baseWashes - mobile);
    
    days.push({
      date: date.toISOString().split('T')[0],
      washes: Math.floor(baseWashes),
      revenue: Math.floor(baseWashes * (45 + Math.random() * 30)),
      mobile,
      onsite
    });
  }
  return days;
};

export const getMockCustomerMetrics = (): CustomerMetrics => ({
  totalCustomers: 15847,
  newCustomers: 324,
  returningCustomers: 2234,
  loyaltyMembers: 8932,
  churnRate: 2.3
});

// User Profile Generators
export const getMockUserProfile = (): UserProfile => ({
  id: '1',
  name: 'John Smith',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@email.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Main Street',
    city: 'City',
    state: 'State',
    zipCode: '12345'
  },
  joinDate: '2023-03-15',
  dateJoined: '2023-03-15',
  totalWashes: 24,
  favoriteService: 'Premium Wash',
  preferences: {
    loyaltyPoints: 2500,
    defaultLocation: 'Downtown',
    notifications: true
  },
  cars: [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Silver',
      licensePlate: 'ABC123',
      isDefault: true,
      notes: 'Preferred wash: Premium',
      addedDate: '2023-03-15'
    },
    {
      id: '2',
      make: 'Honda',
      model: 'CR-V',
      year: 2021,
      color: 'Blue',
      licensePlate: 'XYZ789',
      isDefault: false,
      notes: 'Family car',
      addedDate: '2023-06-20'
    }
  ]
});

export const getMockLoyaltyTiers = (): LoyaltyTier[] => [
  {
    id: '1',
    name: 'Bronze',
    minWashes: 0,
    minPoints: 0,
    maxPoints: 999,
    discount: 5,
    multiplier: 1,
    benefits: ['5% discount', 'Priority booking'],
    color: '#CD7F32'
  },
  {
    id: '2',
    name: 'Silver',
    minWashes: 10,
    minPoints: 1000,
    maxPoints: 2499,
    discount: 10,
    multiplier: 1.5,
    benefits: ['10% discount', 'Free air freshener', 'Priority booking'],
    color: '#C0C0C0'
  },
  {
    id: '3',
    name: 'Gold',
    minWashes: 25,
    minPoints: 2500,
    maxPoints: 99999,
    discount: 15,
    multiplier: 2,
    benefits: ['15% discount', 'Free monthly wash', 'Premium support'],
    color: '#FFD700'
  }
];

export const getMockLoyaltyRewards = (): LoyaltyReward[] => [
  {
    id: '1',
    title: 'Free Basic Wash',
    name: 'Free Basic Wash',
    description: 'Redeem for a complimentary basic car wash service',
    pointsRequired: 500,
    pointsCost: 500,
    type: 'freeService',
    category: 'Service',
    isAvailable: true,
    image: '/api/placeholder/200/150',
    validUntil: '2024-12-31'
  },
  {
    id: '2',
    title: '20% Off Premium Service',
    name: '20% Off Premium Service',
    description: 'Get 20% discount on any premium wash service',
    pointsRequired: 300,
    pointsCost: 300,
    type: 'discount',
    category: 'Discount',
    isAvailable: true,
    image: '/api/placeholder/200/150'
  }
];

// Operations Generators
export const getMockOperators = (): Operator[] => [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike.johnson@carwash.com',
    phone: '(555) 234-5678',
    specialties: ['Premium Detail', 'Ceramic Coating'],
    skills: ['premium', 'detail', 'ceramic'],
    rating: 4.9,
    totalJobs: 1247,
    totalJobsCompleted: 1200,
    isActive: true,
    isAvailable: true,
    currentAssignments: 2,
    maxAssignments: 5
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@carwash.com',
    phone: '(555) 345-6789',
    specialties: ['Mobile Service', 'Interior Cleaning'],
    skills: ['mobile', 'interior', 'basic'],
    rating: 4.8,
    totalJobs: 892,
    totalJobsCompleted: 850,
    isActive: true,
    isAvailable: true,
    currentAssignments: 1,
    maxAssignments: 4
  }
];

export const getMockPlanningAppointments = (): PlanningAppointment[] => [
  {
    id: '1',
    customerName: 'Alice Brown',
    service: 'Premium Wash',
    serviceName: 'Premium Wash',
    time: '09:00',
    duration: 45,
    estimatedDuration: 45,
    location: 'Downtown Location',
    operatorId: '1',
    status: 'scheduled',
    priority: 'high',
    date: new Date().toISOString().split('T')[0],
    carDetails: '2022 Toyota Camry - Silver',
    address: '123 Main St, Downtown'
  },
  {
    id: '2',
    customerName: 'Bob Davis',
    service: 'Basic Wash',
    serviceName: 'Basic Wash',
    time: '10:30',
    duration: 30,
    estimatedDuration: 30,
    location: 'Mobile Service',
    operatorId: '2',
    status: 'scheduled',
    priority: 'medium',
    date: new Date().toISOString().split('T')[0],
    carDetails: '2021 Honda CR-V - Blue',
    address: '456 Oak Ave, North End'
  }
];

// Stock Management Generators
export const getMockStockItems = (): StockItem[] => [
  {
    id: '1',
    name: 'Car Shampoo',
    category: 'Cleaning Supplies',
    description: 'High-quality car shampoo for premium cleaning',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'bottles',
    costPerUnit: 12.99,
    supplier: 'CleanCorp',
    supplierName: 'CleanCorp',
    supplierId: '1',
    lastRestocked: '2024-01-15',
    status: 'in-stock',
    location: 'Warehouse A1',
    expirationDate: '2025-01-15'
  },
  {
    id: '2',
    name: 'Microfiber Towels',
    category: 'Equipment',
    description: 'Premium microfiber towels for streak-free drying',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: 'packs',
    costPerUnit: 24.99,
    supplier: 'AutoSupply Co',
    supplierName: 'AutoSupply Co',
    supplierId: '2',
    lastRestocked: '2024-01-10',
    status: 'low-stock',
    location: 'Warehouse B2'
  }
];

export const getMockSuppliers = (): Supplier[] => [
  {
    id: '1',
    name: 'CleanCorp',
    contact: 'John Manager',
    contactPerson: 'John Manager',
    email: 'orders@cleancorp.com',
    phone: '(555) 111-2222',
    address: '456 Supply Ave, Industrial City, ST 67890',
    products: ['Car Shampoo', 'Wax', 'Polish'],
    category: ['Cleaning Supplies', 'Chemicals'],
    rating: 4.7,
    isActive: true,
    totalOrders: 145,
    lastOrderDate: '2024-01-10',
    paymentTerms: 'Net 30'
  },
  {
    id: '2',
    name: 'AutoSupply Co',
    contact: 'Jane Supplier',
    contactPerson: 'Jane Supplier',
    email: 'sales@autosupply.com',
    phone: '(555) 333-4444',
    address: '789 Equipment Blvd, Supply Town, ST 54321',
    products: ['Towels', 'Brushes', 'Vacuums'],
    category: ['Equipment', 'Tools'],
    rating: 4.5,
    isActive: true,
    totalOrders: 89,
    lastOrderDate: '2024-01-05',
    paymentTerms: 'Net 15'
  }
];

// Additional generators for missing types
export const getMockLoyaltyData = () => ({
  tiers: getMockLoyaltyTiers(),
  rewards: getMockLoyaltyRewards(),
  transactions: [
    {
      id: '1',
      type: 'earned' as const,
      points: 150,
      description: 'Premium Wash Service',
      date: '2024-01-15'
    },
    {
      id: '2', 
      type: 'redeemed' as const,
      points: -500,
      description: 'Redeemed Free Basic Wash',
      date: '2024-01-10',
      relatedRewardId: '1'
    }
  ]
});

export const getMockPlanningData = () => ({
  operators: getMockOperators(),
  appointments: getMockPlanningAppointments(),
  operationSlots: [
    {
      id: '1',
      timeSlot: '09:00',
      startTime: '09:00',
      endTime: '09:45',
      operatorId: '1',
      appointmentId: '1',
      isAvailable: false,
      status: 'scheduled',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '2',
      timeSlot: '10:30',
      startTime: '10:30',
      endTime: '11:00',
      operatorId: '2',
      appointmentId: '2',
      isAvailable: false,
      status: 'scheduled',
      date: new Date().toISOString().split('T')[0]
    }
  ] as OperationSlot[],
  dailyOperations: [
    {
      date: new Date().toISOString().split('T')[0],
      slots: [
        {
          id: '1',
          timeSlot: '09:00',
          startTime: '09:00',
          endTime: '09:45',
          operatorId: '1',
          appointmentId: '1',
          isAvailable: false,
          status: 'scheduled',
          date: new Date().toISOString().split('T')[0]
        }
      ],
      totalAppointments: 2,
      completedAppointments: 0,
      cancelledAppointments: 0,
      totalRevenue: 150,
      operatorsOnDuty: 2,
      averageServiceTime: 45,
      customerSatisfactionAvg: 4.7
    }
  ] as DailyOperations[]
});