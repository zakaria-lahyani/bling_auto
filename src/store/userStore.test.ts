import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from './userStore';

describe('userStore', () => {
  beforeEach(() => {
    useUserStore.getState().logout();
  });

  it('has correct initial state', () => {
    const state = useUserStore.getState();
    
    expect(state.currentRole).toBe('Manager');
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it('sets current role', () => {
    const { setCurrentRole } = useUserStore.getState();
    
    setCurrentRole('Operator');
    
    expect(useUserStore.getState().currentRole).toBe('Operator');
  });

  it('sets user and authentication status', () => {
    const { setUser } = useUserStore.getState();
    const testUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    
    setUser(testUser);
    
    const state = useUserStore.getState();
    expect(state.user).toEqual(testUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('sets authentication status independently', () => {
    const { setAuthenticated } = useUserStore.getState();
    
    setAuthenticated(true);
    
    expect(useUserStore.getState().isAuthenticated).toBe(true);
  });

  it('logs out user correctly', () => {
    const { setUser, setCurrentRole, logout } = useUserStore.getState();
    
    // Set up authenticated state
    setUser({ id: '1', name: 'John Doe', email: 'john@example.com' });
    setCurrentRole('Manager');
    
    // Logout
    logout();
    
    const state = useUserStore.getState();
    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(state.currentRole).toBe('Visitor');
  });

  it('sets user to null and authentication to false', () => {
    const { setUser } = useUserStore.getState();
    
    // First set a user
    setUser({ id: '1', name: 'John Doe', email: 'john@example.com' });
    expect(useUserStore.getState().isAuthenticated).toBe(true);
    
    // Then set to null
    setUser(null);
    
    const state = useUserStore.getState();
    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });
});