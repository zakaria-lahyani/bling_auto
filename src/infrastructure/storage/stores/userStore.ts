import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Visitor' | 'Client' | 'Operator' | 'Manager' | 'Owner';

interface UserState {
  currentRole: UserRole;
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
  setCurrentRole: (role: UserRole) => void;
  setUser: (user: UserState['user']) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentRole: 'Manager',
      isAuthenticated: false,
      user: null,
      
      setCurrentRole: (role) => set({ currentRole: role }),
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        currentRole: 'Visitor' 
      }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        currentRole: state.currentRole,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);