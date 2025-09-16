import { fetcher } from './fetcher'
import type { 
  LoyaltyAccount, 
  LoyaltyTier,
  PointsTransaction, 
  Reward, 
  RewardRedemption,
  LoyaltyAccountFilter,
  PointsTransactionFilter,
  RewardFilter
} from '../../features/loyalty/types'

export const loyaltyApi = {
  /**
   * Get loyalty account by customer ID
   */
  async getAccount(customerId: string): Promise<LoyaltyAccount> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<LoyaltyAccount>(`/api/loyalty/accounts/${customerId}`)
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock loyalty account data
      const mockAccount: LoyaltyAccount = {
        id: 'acc-1',
        customerId,
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        programId: 'prog-1',
        currentPoints: 1250,
        totalPointsEarned: 2500,
        totalPointsRedeemed: 1250,
        tier: 'silver',
        nextTierPoints: 2000,
        memberSince: '2023-01-15',
        lastActivity: '2024-01-10',
        isActive: true,
        referralCode: 'JOHN1234',
        referredBy: undefined
      }
      
      return mockAccount
    } catch (error) {
      throw new Error(`Failed to fetch loyalty account: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get all loyalty accounts with optional filtering
   */
  async getAccounts(filters?: LoyaltyAccountFilter): Promise<LoyaltyAccount[]> {
    try {
      // TODO: Replace with real API call
      // const params = new URLSearchParams()
      // if (filters?.tier) params.append('tier', filters.tier)
      // if (filters?.status) params.append('status', filters.status)
      // return await fetcher.get<LoyaltyAccount[]>(`/api/loyalty/accounts?${params}`)
      
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const mockAccounts: LoyaltyAccount[] = [
        {
          id: 'acc-1',
          customerId: 'cust-1',
          customerName: 'Alice Johnson',
          email: 'alice@example.com',
          programId: 'prog-1',
          currentPoints: 2500,
          totalPointsEarned: 5000,
          totalPointsRedeemed: 2500,
          tier: 'gold',
          nextTierPoints: 5000,
          memberSince: '2023-01-15',
          lastActivity: '2024-01-12',
          isActive: true,
          referralCode: 'ALICE123',
        },
        {
          id: 'acc-2',
          customerId: 'cust-2',
          customerName: 'Bob Wilson',
          email: 'bob@example.com',
          programId: 'prog-1',
          currentPoints: 750,
          totalPointsEarned: 1200,
          totalPointsRedeemed: 450,
          tier: 'bronze',
          nextTierPoints: 1000,
          memberSince: '2023-06-10',
          lastActivity: '2024-01-08',
          isActive: true,
          referralCode: 'BOB4567',
        },
        {
          id: 'acc-3',
          customerId: 'cust-3',
          customerName: 'Carol Davis',
          email: 'carol@example.com',
          programId: 'prog-1',
          currentPoints: 1800,
          totalPointsEarned: 3600,
          totalPointsRedeemed: 1800,
          tier: 'silver',
          nextTierPoints: 2000,
          memberSince: '2023-03-20',
          lastActivity: '2024-01-11',
          isActive: true,
          referralCode: 'CAROL890',
        }
      ]
      
      // Apply filters
      let filteredAccounts = mockAccounts
      if (filters?.tier) {
        filteredAccounts = filteredAccounts.filter(account => account.tier === filters.tier)
      }
      if (filters?.status) {
        filteredAccounts = filteredAccounts.filter(account => 
          filters.status === 'active' ? account.isActive : !account.isActive
        )
      }
      
      return filteredAccounts
    } catch (error) {
      throw new Error(`Failed to fetch loyalty accounts: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get loyalty tiers
   */
  async getTiers(): Promise<LoyaltyTier[]> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<LoyaltyTier[]>('/api/loyalty/tiers')
      
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const mockTiers: LoyaltyTier[] = [
        {
          id: 'tier-1',
          name: 'bronze',
          displayName: 'Bronze',
          minPoints: 0,
          maxPoints: 999,
          color: '#CD7F32',
          icon: 'Award',
          multiplier: 1,
          benefits: [
            {
              id: 'benefit-1',
              type: 'discount',
              title: '5% Service Discount',
              description: 'Get 5% off all car wash services',
              value: 5
            }
          ]
        },
        {
          id: 'tier-2',
          name: 'silver',
          displayName: 'Silver',
          minPoints: 1000,
          maxPoints: 1999,
          color: '#C0C0C0',
          icon: 'Award',
          multiplier: 1.25,
          benefits: [
            {
              id: 'benefit-2',
              type: 'discount',
              title: '10% Service Discount',
              description: 'Get 10% off all car wash services',
              value: 10
            },
            {
              id: 'benefit-3',
              type: 'priority_booking',
              title: 'Priority Booking',
              description: 'Skip the wait with priority appointment booking',
              value: 0
            }
          ]
        },
        {
          id: 'tier-3',
          name: 'gold',
          displayName: 'Gold',
          minPoints: 2000,
          maxPoints: 4999,
          color: '#FFD700',
          icon: 'Crown',
          multiplier: 1.5,
          benefits: [
            {
              id: 'benefit-4',
              type: 'discount',
              title: '15% Service Discount',
              description: 'Get 15% off all car wash services',
              value: 15
            },
            {
              id: 'benefit-5',
              type: 'free_service',
              title: 'Monthly Free Basic Wash',
              description: 'Get one free basic wash every month',
              value: 0
            },
            {
              id: 'benefit-6',
              type: 'birthday_reward',
              title: 'Birthday Reward',
              description: 'Special birthday discount and bonus points',
              value: 500
            }
          ]
        },
        {
          id: 'tier-4',
          name: 'platinum',
          displayName: 'Platinum',
          minPoints: 5000,
          color: '#E5E4E2',
          icon: 'Star',
          multiplier: 2,
          benefits: [
            {
              id: 'benefit-7',
              type: 'discount',
              title: '20% Service Discount',
              description: 'Get 20% off all car wash services',
              value: 20
            },
            {
              id: 'benefit-8',
              type: 'free_service',
              title: 'Monthly Free Premium Wash',
              description: 'Get one free premium wash every month',
              value: 0
            },
            {
              id: 'benefit-9',
              type: 'referral_bonus',
              title: 'Referral Bonus',
              description: 'Earn bonus points for successful referrals',
              value: 1000
            }
          ]
        }
      ]
      
      return mockTiers
    } catch (error) {
      throw new Error(`Failed to fetch loyalty tiers: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get points transactions for an account
   */
  async getTransactions(accountId: string, filters?: PointsTransactionFilter): Promise<PointsTransaction[]> {
    try {
      // TODO: Replace with real API call
      // const params = new URLSearchParams()
      // if (filters?.type) params.append('type', filters.type)
      // return await fetcher.get<PointsTransaction[]>(`/api/loyalty/accounts/${accountId}/transactions?${params}`)
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const mockTransactions: PointsTransaction[] = [
        {
          id: 'trans-1',
          accountId,
          type: 'earned',
          points: 150,
          description: 'Premium car wash service',
          appointmentId: 'apt-1',
          createdAt: '2024-01-10T10:30:00Z'
        },
        {
          id: 'trans-2',
          accountId,
          type: 'redeemed',
          points: -500,
          description: 'Free basic wash reward',
          rewardId: 'reward-1',
          createdAt: '2024-01-08T14:15:00Z'
        },
        {
          id: 'trans-3',
          accountId,
          type: 'earned',
          points: 100,
          description: 'Basic car wash service',
          appointmentId: 'apt-2',
          createdAt: '2024-01-05T09:20:00Z'
        },
        {
          id: 'trans-4',
          accountId,
          type: 'earned',
          points: 200,
          description: 'Referral bonus',
          createdAt: '2023-12-20T16:45:00Z'
        }
      ]
      
      // Apply filters
      let filteredTransactions = mockTransactions
      if (filters?.type) {
        filteredTransactions = filteredTransactions.filter(trans => trans.type === filters.type)
      }
      
      return filteredTransactions
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get available rewards
   */
  async getRewards(filters?: RewardFilter): Promise<Reward[]> {
    try {
      // TODO: Replace with real API call
      // const params = new URLSearchParams()
      // if (filters?.category) params.append('category', filters.category)
      // return await fetcher.get<Reward[]>(`/api/loyalty/rewards?${params}`)
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const mockRewards: Reward[] = [
        {
          id: 'reward-1',
          name: 'Free Basic Wash',
          description: 'Redeem for one complimentary basic car wash service',
          pointsCost: 500,
          type: 'free_service',
          value: 25,
          category: 'services',
          isActive: true,
          termsConditions: ['Valid for 30 days', 'Cannot be combined with other offers'],
          maxRedemptions: undefined,
          currentRedemptions: 45
        },
        {
          id: 'reward-2',
          name: '20% Off Premium Wash',
          description: 'Get 20% discount on premium wash services',
          pointsCost: 300,
          type: 'discount',
          value: 20,
          category: 'services',
          isActive: true,
          termsConditions: ['Valid for 30 days', 'One-time use only'],
          maxRedemptions: undefined,
          currentRedemptions: 78
        },
        {
          id: 'reward-3',
          name: 'Car Wash Gift Card - $50',
          description: '$50 gift card for car wash services',
          pointsCost: 2000,
          type: 'merchandise',
          value: 50,
          category: 'gift_cards',
          isActive: true,
          termsConditions: ['Valid for 1 year', 'Non-refundable'],
          maxRedemptions: undefined,
          currentRedemptions: 12
        },
        {
          id: 'reward-4',
          name: 'Premium Upgrade',
          description: 'Upgrade any basic service to premium for free',
          pointsCost: 750,
          type: 'upgrade',
          value: 15,
          category: 'services',
          isActive: true,
          termsConditions: ['Valid for 60 days', 'Subject to availability'],
          maxRedemptions: undefined,
          currentRedemptions: 23
        }
      ]
      
      // Apply filters
      let filteredRewards = mockRewards
      if (filters?.category) {
        filteredRewards = filteredRewards.filter(reward => reward.category === filters.category)
      }
      if (filters?.type) {
        filteredRewards = filteredRewards.filter(reward => reward.type === filters.type)
      }
      if (filters?.isActive !== undefined) {
        filteredRewards = filteredRewards.filter(reward => reward.isActive === filters.isActive)
      }
      
      return filteredRewards
    } catch (error) {
      throw new Error(`Failed to fetch rewards: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Redeem a reward
   */
  async redeemReward(accountId: string, rewardId: string): Promise<RewardRedemption> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<RewardRedemption>(`/api/loyalty/accounts/${accountId}/redeem`, { rewardId })
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockRedemption: RewardRedemption = {
        id: 'redemption-' + Date.now(),
        accountId,
        rewardId,
        pointsUsed: 500,
        status: 'active',
        redeemedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        code: 'REWARD' + Math.random().toString(36).substr(2, 6).toUpperCase()
      }
      
      return mockRedemption
    } catch (error) {
      throw new Error(`Failed to redeem reward: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Add points to an account
   */
  async addPoints(accountId: string, points: number, description: string, appointmentId?: string): Promise<PointsTransaction> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<PointsTransaction>(`/api/loyalty/accounts/${accountId}/points`, {
      //   points, description, appointmentId
      // })
      
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const mockTransaction: PointsTransaction = {
        id: 'trans-' + Date.now(),
        accountId,
        type: 'earned',
        points,
        description,
        appointmentId,
        createdAt: new Date().toISOString()
      }
      
      return mockTransaction
    } catch (error) {
      throw new Error(`Failed to add points: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get loyalty program dashboard stats
   */
  async getDashboardStats(): Promise<{
    totalMembers: number
    activeMembers: number
    totalPointsIssued: number
    totalPointsRedeemed: number
    averagePointsPerMember: number
  }> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get('/api/loyalty/dashboard/stats')
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      return {
        totalMembers: 1250,
        activeMembers: 1100,
        totalPointsIssued: 125000,
        totalPointsRedeemed: 45000,
        averagePointsPerMember: 1000
      }
    } catch (error) {
      throw new Error(`Failed to fetch dashboard stats: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}