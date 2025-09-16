import { create } from 'zustand';
import { 
  type WashAnalytics,
  type ServiceTypeStats,
  type LocationStats,
  type DailyStats,
  type CustomerMetrics,
  getMockWashAnalytics,
  getMockServiceTypeStats,
  getMockLocationStats,
  getMockDailyStats,
  getMockCustomerMetrics
} from '@/lib/mockData';

interface DashboardData {
  washAnalytics: WashAnalytics;
  serviceStats: ServiceTypeStats[];
  locationStats: LocationStats[];
  dailyStats: DailyStats[];
  customerMetrics: CustomerMetrics;
}

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Actions
  fetchData: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  lastUpdated: null,

  fetchData: async () => {
    const state = get();
    
    // Avoid duplicate requests
    if (state.loading) return;
    
    set({ loading: true, error: null });
    
    try {
      const data = {
        washAnalytics: getMockWashAnalytics(),
        serviceStats: getMockServiceTypeStats(),
        locationStats: getMockLocationStats(),
        dailyStats: getMockDailyStats(),
        customerMetrics: getMockCustomerMetrics()
      };
      set({ 
        data, 
        loading: false, 
        lastUpdated: new Date(),
        error: null 
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data'
      });
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ 
    data: null, 
    loading: false, 
    error: null, 
    lastUpdated: null 
  }),
}));