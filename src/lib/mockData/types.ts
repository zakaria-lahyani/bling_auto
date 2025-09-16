// Dashboard Analytics Types
export interface WashAnalytics {
  totalWashes: number;
  mobileWashes: number;
  onsiteWashes: number;
  homeWashes: number;
  revenue: number;
  avgServiceTime: number;
  customerSatisfaction: number;
}

export interface ServiceTypeStats {
  serviceName: string;
  count: number;
  revenue: number;
  avgDuration: number;
  percentage: number;
}

export interface LocationStats {
  region: string;
  washes: number;
  revenue: number;
  avgRating: number;
}

export interface DailyStats {
  date: string;
  washes: number;
  revenue: number;
  mobile: number;
  onsite: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  loyaltyMembers: number;
  churnRate: number;
}

// User & Profile Types
export interface UserProfile {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  } | string;
  joinDate: string;
  dateJoined: string;
  totalWashes: number;
  favoriteService: string;
  cars: UserCar[];
  preferences: {
    loyaltyPoints: number;
    defaultLocation: string;
    notifications: boolean;
  };
}

export interface UserCar {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  isDefault: boolean;
  notes?: string;
  addedDate?: string;
}

// Loyalty System Types
export interface LoyaltyTier {
  id: string;
  name: string;
  minWashes: number;
  minPoints: number;
  maxPoints: number;
  discount: number;
  multiplier: number;
  benefits: string[];
  color: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  name: string;
  description: string;
  pointsRequired: number;
  pointsCost: number;
  type: 'discount' | 'freeService' | 'upgrade';
  category: string;
  isAvailable: boolean;
  image?: string;
  validUntil?: string;
}

export interface PointsTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  date: string;
  relatedRewardId?: string;
}

// Operations Types
export interface Operator {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  skills: string[];
  rating: number;
  totalJobs: number;
  totalJobsCompleted: number;
  isActive: boolean;
  isAvailable: boolean;
  currentAssignments: number;
  maxAssignments: number;
}

export interface PlanningAppointment {
  id: string;
  customerName: string;
  service: string;
  serviceName: string;
  time: string;
  duration: number;
  estimatedDuration: number;
  location: string;
  operatorId: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  date: string;
  carDetails: string;
  address?: string;
}

// Stock Management Types
export interface StockItem {
  id: string;
  name: string;
  category: string;
  description: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  supplierName: string;
  supplierId: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  location: string;
  expirationDate?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  category: string[];
  rating: number;
  isActive: boolean;
  totalOrders: number;
  lastOrderDate: string;
  paymentTerms: string;
}

// Additional Types used in pages
export interface StockTransaction {
  id: string;
  type: 'in' | 'out' | 'Purchase' | 'Usage';
  itemId: string;
  itemName: string;
  quantity: number;
  date: string;
  description: string;
  totalCost?: number;
  reference?: string;
}

export interface OperationSlot {
  id: string;
  timeSlot: string;
  startTime: string;
  endTime: string;
  operatorId: string;
  appointmentId?: string;
  isAvailable: boolean;
  status: 'available' | 'scheduled' | 'busy';
  date: string;
}

export interface DailyOperations {
  date: string;
  slots: OperationSlot[];
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
  operatorsOnDuty: number;
  averageServiceTime: number;
  customerSatisfactionAvg: number;
}