/**
 * Client Use Cases - Application Layer
 * 
 * Barrel file for all client-related use cases.
 * These use cases orchestrate domain services and repositories.
 */

// Dashboard - Use specific exports to avoid repository interface conflicts
export {
  GetClientDashboardUseCase,
  type GetClientDashboardRequest,
  type GetClientDashboardResponse,
  type ClientRepository as DashboardClientRepository,
  type BookingRepository as DashboardBookingRepository,
  type ServiceRepository as DashboardServiceRepository
} from './get-client-dashboard'

// Profile Management - Use specific exports to avoid repository interface conflicts
export {
  GetClientProfileUseCase,
  type GetClientProfileRequest,
  type GetClientProfileResponse,
  type ClientRepository as ProfileClientRepository,
  type VehicleRepository as ProfileVehicleRepository,
  type AddressRepository as ProfileAddressRepository,
  type PaymentMethodRepository as ProfilePaymentMethodRepository
} from './get-client-profile'

export * from './update-client-profile'

// Vehicle Management - Use specific exports to avoid repository interface conflicts
export {
  AddVehicleUseCase,
  UpdateVehicleUseCase,
  RemoveVehicleUseCase,
  SetPrimaryVehicleUseCase,
  type VehicleRepository as ManageVehicleRepository,
  type AddVehicleRequest,
  type UpdateVehicleRequest,
  type RemoveVehicleRequest,
  type SetPrimaryVehicleRequest
} from './manage-vehicles'

// Payment Method Management - Use specific exports to avoid repository interface conflicts
export {
  AddPaymentMethodUseCase,
  UpdatePaymentMethodUseCase,
  RemovePaymentMethodUseCase,
  SetPrimaryPaymentMethodUseCase,
  type PaymentMethodRepository as ManagePaymentMethodRepository,
  type AddPaymentMethodRequest,
  type UpdatePaymentMethodRequest,
  type RemovePaymentMethodRequest,
  type SetPrimaryPaymentMethodRequest
} from './manage-payment-methods'