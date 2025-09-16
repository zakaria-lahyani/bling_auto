import { fetcher } from './fetcher'
import type { 
  InventoryItem, 
  InventoryCategory,
  StockMovement, 
  StockOrder,
  LowStockAlert,
  InventoryFilter,
  StockMovementFilter
} from '../../features/inventory/types'

export const inventoryApi = {
  /**
   * Get all inventory items with optional filtering
   */
  async getItems(filters?: InventoryFilter): Promise<InventoryItem[]> {
    try {
      // TODO: Replace with real API call
      // const params = new URLSearchParams()
      // if (filters?.category) params.append('category', filters.category)
      // return await fetcher.get<InventoryItem[]>(`/api/inventory/items?${params}`)
      
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const mockItems: InventoryItem[] = [
        {
          id: 'item-1',
          name: 'Premium Car Shampoo',
          description: 'High-quality car wash shampoo with foam action',
          category: { id: 'cat-1', name: 'Cleaning Products', description: 'Car cleaning chemicals', color: '#3B82F6' },
          sku: 'CS-PREM-001',
          currentStock: 45,
          minStockLevel: 20,
          maxStockLevel: 100,
          unit: 'bottles',
          costPerUnit: 12.50,
          supplier: 'ChemClean Supplies',
          supplierContact: 'orders@chemclean.com',
          lastRestocked: '2024-01-08T10:00:00Z',
          location: 'Bay A - Shelf 1',
          isActive: true,
          notes: 'Popular item, tends to run out quickly'
        },
        {
          id: 'item-2',
          name: 'Microfiber Towels',
          description: 'Professional grade microfiber drying towels',
          category: { id: 'cat-2', name: 'Equipment', description: 'Physical equipment and tools', color: '#10B981' },
          sku: 'EQ-MF-002',
          currentStock: 8,
          minStockLevel: 15,
          maxStockLevel: 50,
          unit: 'pieces',
          costPerUnit: 8.99,
          supplier: 'AutoTools Pro',
          lastRestocked: '2023-12-20T14:30:00Z',
          location: 'Storage Room B',
          isActive: true
        },
        {
          id: 'item-3',
          name: 'Tire Shine Spray',
          description: 'Long-lasting tire shine and protection spray',
          category: { id: 'cat-1', name: 'Cleaning Products', description: 'Car cleaning chemicals', color: '#3B82F6' },
          sku: 'CS-TIRE-003',
          currentStock: 0,
          minStockLevel: 10,
          maxStockLevel: 30,
          unit: 'bottles',
          costPerUnit: 15.75,
          supplier: 'ChemClean Supplies',
          lastRestocked: '2023-11-15T09:00:00Z',
          location: 'Bay A - Shelf 2',
          isActive: true,
          notes: 'Out of stock - urgent reorder needed'
        },
        {
          id: 'item-4',
          name: 'Glass Cleaner',
          description: 'Streak-free professional glass cleaner',
          category: { id: 'cat-1', name: 'Cleaning Products', description: 'Car cleaning chemicals', color: '#3B82F6' },
          sku: 'CS-GLASS-004',
          currentStock: 28,
          minStockLevel: 15,
          maxStockLevel: 40,
          unit: 'bottles',
          costPerUnit: 9.25,
          supplier: 'ChemClean Supplies',
          lastRestocked: '2024-01-05T11:15:00Z',
          expirationDate: '2024-12-31T23:59:59Z',
          location: 'Bay A - Shelf 1',
          isActive: true
        },
        {
          id: 'item-5',
          name: 'Vacuum Bags',
          description: 'Heavy-duty vacuum cleaner bags',
          category: { id: 'cat-2', name: 'Equipment', description: 'Physical equipment and tools', color: '#10B981' },
          sku: 'EQ-VAC-005',
          currentStock: 12,
          minStockLevel: 8,
          maxStockLevel: 25,
          unit: 'pieces',
          costPerUnit: 3.50,
          supplier: 'AutoTools Pro',
          lastRestocked: '2024-01-10T16:00:00Z',
          location: 'Storage Room A',
          isActive: true
        }
      ]
      
      // Apply filters
      let filteredItems = mockItems
      if (filters?.category) {
        filteredItems = filteredItems.filter(item => item.category.id === filters.category)
      }
      if (filters?.lowStock) {
        filteredItems = filteredItems.filter(item => item.currentStock <= item.minStockLevel)
      }
      if (filters?.outOfStock) {
        filteredItems = filteredItems.filter(item => item.currentStock === 0)
      }
      
      return filteredItems
    } catch (error) {
      throw new Error(`Failed to fetch inventory items: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get inventory categories
   */
  async getCategories(): Promise<InventoryCategory[]> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<InventoryCategory[]>('/api/inventory/categories')
      
      await new Promise(resolve => setTimeout(resolve, 200))
      
      return [
        { id: 'cat-1', name: 'Cleaning Products', description: 'Car cleaning chemicals', color: '#3B82F6' },
        { id: 'cat-2', name: 'Equipment', description: 'Physical equipment and tools', color: '#10B981' },
        { id: 'cat-3', name: 'Supplies', description: 'General supplies and consumables', color: '#F59E0B' },
        { id: 'cat-4', name: 'Safety', description: 'Safety equipment and gear', color: '#EF4444' }
      ]
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get stock movements with optional filtering
   */
  async getMovements(filters?: StockMovementFilter): Promise<StockMovement[]> {
    try {
      // TODO: Replace with real API call
      // const params = new URLSearchParams()
      // if (filters?.type) params.append('type', filters.type)
      // return await fetcher.get<StockMovement[]>(`/api/inventory/movements?${params}`)
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const mockMovements: StockMovement[] = [
        {
          id: 'mov-1',
          itemId: 'item-1',
          itemName: 'Premium Car Shampoo',
          type: 'out',
          quantity: -5,
          reason: 'Used for premium wash services',
          performedBy: 'operator-1',
          performedAt: '2024-01-12T14:30:00Z'
        },
        {
          id: 'mov-2',
          itemId: 'item-1',
          itemName: 'Premium Car Shampoo',
          type: 'in',
          quantity: 20,
          reason: 'Stock replenishment',
          performedBy: 'manager-1',
          performedAt: '2024-01-08T10:00:00Z',
          cost: 250.00,
          orderId: 'order-1'
        },
        {
          id: 'mov-3',
          itemId: 'item-2',
          itemName: 'Microfiber Towels',
          type: 'out',
          quantity: -3,
          reason: 'Replacement for worn towels',
          performedBy: 'operator-2',
          performedAt: '2024-01-11T16:15:00Z'
        },
        {
          id: 'mov-4',
          itemId: 'item-4',
          itemName: 'Glass Cleaner',
          type: 'adjustment',
          quantity: -2,
          reason: 'Damaged bottles during transport',
          performedBy: 'manager-1',
          performedAt: '2024-01-09T09:30:00Z',
          notes: 'Bottles cracked, unusable'
        }
      ]
      
      // Apply filters
      let filteredMovements = mockMovements
      if (filters?.type) {
        filteredMovements = filteredMovements.filter(mov => mov.type === filters.type)
      }
      if (filters?.itemId) {
        filteredMovements = filteredMovements.filter(mov => mov.itemId === filters.itemId)
      }
      
      return filteredMovements
    } catch (error) {
      throw new Error(`Failed to fetch stock movements: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get low stock alerts
   */
  async getLowStockAlerts(): Promise<LowStockAlert[]> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<LowStockAlert[]>('/api/inventory/alerts')
      
      await new Promise(resolve => setTimeout(resolve, 250))
      
      return [
        {
          id: 'alert-1',
          itemId: 'item-2',
          itemName: 'Microfiber Towels',
          currentStock: 8,
          minStockLevel: 15,
          category: 'Equipment',
          daysUntilEmpty: 5,
          severity: 'low',
          createdAt: '2024-01-10T08:00:00Z'
        },
        {
          id: 'alert-2',
          itemId: 'item-3',
          itemName: 'Tire Shine Spray',
          currentStock: 0,
          minStockLevel: 10,
          category: 'Cleaning Products',
          severity: 'out_of_stock',
          createdAt: '2024-01-05T12:00:00Z'
        }
      ]
    } catch (error) {
      throw new Error(`Failed to fetch low stock alerts: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Update item stock
   */
  async updateStock(itemId: string, quantity: number, reason: string, type: 'in' | 'out' | 'adjustment'): Promise<StockMovement> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<StockMovement>(`/api/inventory/items/${itemId}/stock`, {
      //   quantity, reason, type
      // })
      
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const mockMovement: StockMovement = {
        id: 'mov-' + Date.now(),
        itemId,
        itemName: 'Updated Item',
        type,
        quantity: type === 'out' ? -Math.abs(quantity) : quantity,
        reason,
        performedBy: 'current-user',
        performedAt: new Date().toISOString()
      }
      
      return mockMovement
    } catch (error) {
      throw new Error(`Failed to update stock: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Create new inventory item
   */
  async createItem(item: Omit<InventoryItem, 'id' | 'lastRestocked'>): Promise<InventoryItem> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<InventoryItem>('/api/inventory/items', item)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newItem: InventoryItem = {
        ...item,
        id: 'item-' + Date.now(),
        lastRestocked: new Date().toISOString()
      }
      
      return newItem
    } catch (error) {
      throw new Error(`Failed to create item: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<{
    totalItems: number
    lowStockItems: number
    outOfStockItems: number
    totalInventoryValue: number
  }> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get('/api/inventory/dashboard/stats')
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      return {
        totalItems: 85,
        lowStockItems: 12,
        outOfStockItems: 3,
        totalInventoryValue: 15240.50
      }
    } catch (error) {
      throw new Error(`Failed to fetch dashboard stats: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}