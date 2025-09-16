// Re-export mock data functions from shared/utils
export {
  getMockWashAnalytics,
  getMockServiceTypeStats,
  getMockLocationStats,
  getMockDailyStats,
  getMockCustomerMetrics,
  getMockUserProfile,
  getMockLoyaltyTiers,
  getMockLoyaltyRewards,
  getMockOperators,
  getMockPlanningAppointments,
  getMockStockItems,
  getMockSuppliers,
  getMockLoyaltyData,
  getMockPlanningData
} from '@/shared/utils/generators'

// Re-export types from shared/utils/types
export type {
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
} from '@/shared/utils/types'