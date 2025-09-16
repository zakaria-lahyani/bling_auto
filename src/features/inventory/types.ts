// Inventory/Stock management types
export interface InventoryItem {
  id: string
  name: string
  description: string
  category: InventoryCategory
  sku: string
  currentStock: number
  minStockLevel: number
  maxStockLevel: number
  unit: string // 'bottles', 'liters', 'pieces', etc.
  costPerUnit: number
  supplier: string
  supplierContact?: string
  lastRestocked: string
  expirationDate?: string
  location: string // warehouse location/bay
  isActive: boolean
  notes?: string
}

export interface InventoryCategory {
  id: string
  name: string
  description: string
  color: string
}

export interface StockMovement {
  id: string
  itemId: string
  itemName: string
  type: 'in' | 'out' | 'adjustment' | 'expired'
  quantity: number
  reason: string
  performedBy: string
  performedAt: string
  cost?: number
  orderId?: string
  notes?: string
}

export interface StockOrder {
  id: string
  orderNumber: string
  supplier: string
  status: 'draft' | 'pending' | 'ordered' | 'received' | 'cancelled'
  items: StockOrderItem[]
  totalCost: number
  orderedAt: string
  expectedDelivery?: string
  receivedAt?: string
  orderedBy: string
  notes?: string
}

export interface StockOrderItem {
  id: string
  itemId: string
  itemName: string
  quantity: number
  costPerUnit: number
  totalCost: number
  received?: number
}

export interface LowStockAlert {
  id: string
  itemId: string
  itemName: string
  currentStock: number
  minStockLevel: number
  category: string
  daysUntilEmpty?: number
  severity: 'low' | 'critical' | 'out_of_stock'
  createdAt: string
}

// Filter types
export interface InventoryFilter {
  category?: string
  lowStock?: boolean
  outOfStock?: boolean
  expiringSoon?: boolean
  supplier?: string
  location?: string
}

export interface StockMovementFilter {
  itemId?: string
  type?: StockMovement['type']
  dateFrom?: string
  dateTo?: string
  performedBy?: string
}

// View model types
export interface InventoryItemViewModel {
  id: string
  name: string
  description: string
  category: string
  categoryColor: string
  sku: string
  currentStock: number
  minStockLevel: number
  maxStockLevel: number
  unit: string
  stockStatus: 'good' | 'low' | 'critical' | 'out'
  stockStatusColor: string
  stockPercentage: number
  costPerUnit: number
  totalValue: number
  supplier: string
  lastRestocked: string
  daysUntilExpiry?: number
  location: string
  needsReorder: boolean
  suggestedOrderQuantity?: number
}

export interface StockDashboardViewModel {
  totalItems: number
  lowStockItems: number
  outOfStockItems: number
  expiringItems: number
  totalInventoryValue: number
  recentMovements: StockMovement[]
  lowStockAlerts: LowStockAlert[]
  topCategories: {
    category: string
    itemCount: number
    totalValue: number
  }[]
  monthlyUsage: {
    month: string
    totalUsed: number
    totalCost: number
  }[]
  loading: boolean
  error: string | null
}