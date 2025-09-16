import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { sdk } from '../../../lib/sdk'
import type { 
  LoyaltyAccount,
  LoyaltyTier,
  PointsTransaction, 
  Reward, 
  LoyaltyAccountFilter,
  PointsTransactionFilter,
  RewardFilter,
  LoyaltyCardViewModel,
  PointsHistoryViewModel,
  RewardViewModel,
  LoyaltyDashboardViewModel,
  RewardsListViewModel,
  PointsTransactionViewModel
} from '../types'

export const loyaltyKeys = {
  all: ['loyalty'] as const,
  accounts: () => [...loyaltyKeys.all, 'accounts'] as const,
  account: (id: string) => [...loyaltyKeys.accounts(), id] as const,
  accountList: (filters?: LoyaltyAccountFilter) => [...loyaltyKeys.accounts(), 'list', filters] as const,
  tiers: () => [...loyaltyKeys.all, 'tiers'] as const,
  transactions: () => [...loyaltyKeys.all, 'transactions'] as const,
  accountTransactions: (accountId: string, filters?: PointsTransactionFilter) => 
    [...loyaltyKeys.transactions(), accountId, filters] as const,
  rewards: () => [...loyaltyKeys.all, 'rewards'] as const,
  rewardsList: (filters?: RewardFilter) => [...loyaltyKeys.rewards(), 'list', filters] as const,
  dashboard: () => [...loyaltyKeys.all, 'dashboard'] as const,
}

export function useLoyaltyAccount(customerId: string) {
  const { data: account, isLoading, error } = useQuery({
    queryKey: loyaltyKeys.account(customerId),
    queryFn: () => sdk.loyalty.getAccount(customerId),
    enabled: !!customerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    account,
    isLoading,
    error: error?.message || null,
  }
}

export function useLoyaltyAccounts(filters?: LoyaltyAccountFilter) {
  const { data: accounts, isLoading, error, refetch } = useQuery({
    queryKey: loyaltyKeys.accountList(filters),
    queryFn: () => sdk.loyalty.getAccounts(filters),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  return {
    accounts: accounts || [],
    isLoading,
    error: error?.message || null,
    refetch,
  }
}

export function useLoyaltyTiers() {
  const { data: tiers, isLoading, error } = useQuery({
    queryKey: loyaltyKeys.tiers(),
    queryFn: () => sdk.loyalty.getTiers(),
    staleTime: 1000 * 60 * 30, // 30 minutes - tiers don't change often
  })

  return {
    tiers: tiers || [],
    isLoading,
    error: error?.message || null,
  }
}

export function usePointsTransactions(accountId: string, filters?: PointsTransactionFilter) {
  const { data: transactions, isLoading, error, refetch } = useQuery({
    queryKey: loyaltyKeys.accountTransactions(accountId, filters),
    queryFn: () => sdk.loyalty.getTransactions(accountId, filters),
    enabled: !!accountId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  return {
    transactions: transactions || [],
    isLoading,
    error: error?.message || null,
    refetch,
  }
}

export function useRewards(filters?: RewardFilter) {
  const { data: rewards, isLoading, error, refetch } = useQuery({
    queryKey: loyaltyKeys.rewardsList(filters),
    queryFn: () => sdk.loyalty.getRewards(filters),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  return {
    rewards: rewards || [],
    isLoading,
    error: error?.message || null,
    refetch,
  }
}

export function useLoyaltyActions() {
  const queryClient = useQueryClient()

  const redeemRewardMutation = useMutation({
    mutationFn: ({ accountId, rewardId }: { accountId: string; rewardId: string }) =>
      sdk.loyalty.redeemReward(accountId, rewardId),
    onSuccess: (_, { accountId }) => {
      queryClient.invalidateQueries({ queryKey: loyaltyKeys.account(accountId) })
      queryClient.invalidateQueries({ queryKey: loyaltyKeys.accountTransactions(accountId) })
    },
  })

  const addPointsMutation = useMutation({
    mutationFn: ({ accountId, points, description, appointmentId }: {
      accountId: string
      points: number
      description: string
      appointmentId?: string
    }) => sdk.loyalty.addPoints(accountId, points, description, appointmentId),
    onSuccess: (_, { accountId }) => {
      queryClient.invalidateQueries({ queryKey: loyaltyKeys.account(accountId) })
      queryClient.invalidateQueries({ queryKey: loyaltyKeys.accountTransactions(accountId) })
    },
  })

  return {
    redeemReward: redeemRewardMutation.mutateAsync,
    addPoints: addPointsMutation.mutateAsync,
    isRedeeming: redeemRewardMutation.isPending,
    isAddingPoints: addPointsMutation.isPending,
  }
}

export function useLoyaltyCard(customerId: string): LoyaltyCardViewModel | null {
  const { account, isLoading } = useLoyaltyAccount(customerId)
  const { tiers } = useLoyaltyTiers()

  const transformToViewModel = useCallback((
    account: LoyaltyAccount, 
    tiers: LoyaltyTier[]
  ): LoyaltyCardViewModel => {
    const currentTier = tiers.find(tier => tier.name === account.tier)
    const nextTier = tiers.find(tier => tier.minPoints > account.currentPoints)
    
    const progressPercentage = currentTier 
      ? Math.min((account.currentPoints - currentTier.minPoints) / 
                  ((currentTier.maxPoints || currentTier.minPoints + 1000) - currentTier.minPoints) * 100, 100)
      : 0

    return {
      id: account.id,
      customerName: account.customerName,
      email: account.email,
      tier: account.tier,
      tierDisplayName: currentTier?.displayName || account.tier,
      tierColor: currentTier?.color || '#gray',
      tierIcon: currentTier?.icon || 'Award',
      currentPoints: account.currentPoints,
      nextTierPoints: nextTier?.minPoints || account.nextTierPoints,
      progressPercentage,
      memberSince: new Date(account.memberSince).toLocaleDateString(),
      lastActivity: new Date(account.lastActivity).toLocaleDateString(),
      benefits: currentTier?.benefits || [],
      referralCode: account.referralCode,
      pointsToNextTier: nextTier ? nextTier.minPoints - account.currentPoints : undefined,
      nextTierName: nextTier?.displayName,
    }
  }, [])

  if (isLoading || !account || !tiers.length) return null

  return transformToViewModel(account, tiers)
}

export function usePointsHistory(accountId: string): PointsHistoryViewModel {
  const { transactions, isLoading, error } = usePointsTransactions(accountId)

  const transformTransactionToViewModel = useCallback((transaction: PointsTransaction): PointsTransactionViewModel => {
    const getTypeColor = (type: PointsTransaction['type']) => {
      switch (type) {
        case 'earned': return 'text-green-600'
        case 'redeemed': return 'text-red-600'
        case 'expired': return 'text-gray-600'
        case 'adjusted': return 'text-blue-600'
        default: return 'text-gray-600'
      }
    }

    const getTypeIcon = (type: PointsTransaction['type']) => {
      switch (type) {
        case 'earned': return 'Plus'
        case 'redeemed': return 'Minus'
        case 'expired': return 'Clock'
        case 'adjusted': return 'Edit'
        default: return 'Circle'
      }
    }

    return {
      id: transaction.id,
      type: transaction.type,
      points: Math.abs(transaction.points),
      pointsDisplay: `${transaction.points > 0 ? '+' : ''}${transaction.points}`,
      description: transaction.description,
      date: new Date(transaction.createdAt).toLocaleDateString(),
      typeColor: getTypeColor(transaction.type),
      typeIcon: getTypeIcon(transaction.type),
      isExpired: transaction.expiresAt ? new Date(transaction.expiresAt) < new Date() : false,
      expiresAt: transaction.expiresAt ? new Date(transaction.expiresAt).toLocaleDateString() : undefined,
    }
  }, [])

  const viewModelTransactions = transactions.map(transformTransactionToViewModel)
  const totalEarned = transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.points, 0)
  const totalRedeemed = transactions.filter(t => t.type === 'redeemed').reduce((sum, t) => sum + Math.abs(t.points), 0)
  const currentBalance = totalEarned - totalRedeemed

  return {
    transactions: viewModelTransactions,
    totalEarned,
    totalRedeemed,
    currentBalance,
    loading: isLoading,
    error,
  }
}

export function useRewardsList(filters?: RewardFilter, userPointsBalance: number = 0): RewardsListViewModel {
  const { rewards, isLoading, error } = useRewards(filters)

  const transformRewardToViewModel = useCallback((reward: Reward): RewardViewModel => {
    const isAffordable = userPointsBalance >= reward.pointsCost
    const canRedeem = reward.isActive && isAffordable && 
      (!reward.maxRedemptions || reward.currentRedemptions < reward.maxRedemptions)

    return {
      id: reward.id,
      name: reward.name,
      description: reward.description,
      pointsCost: reward.pointsCost,
      pointsCostDisplay: `${reward.pointsCost.toLocaleString()} pts`,
      type: reward.type,
      category: reward.category,
      value: reward.value,
      valueDisplay: reward.type === 'discount' 
        ? `${reward.value}% off` 
        : `$${reward.value}`,
      isAffordable,
      isActive: reward.isActive,
      expiresAt: reward.expiresAt ? new Date(reward.expiresAt).toLocaleDateString() : undefined,
      canRedeem,
      imageUrl: reward.imageUrl,
      termsConditions: reward.termsConditions,
      popularityScore: reward.currentRedemptions,
    }
  }, [userPointsBalance])

  const rewardViewModels = rewards.map(transformRewardToViewModel)
  
  // Get unique categories
  const categories = rewards.reduce((cats, reward) => {
    const existing = cats.find(c => c.id === reward.category)
    if (existing) {
      existing.count++
    } else {
      cats.push({
        id: reward.category,
        name: reward.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        count: 1
      })
    }
    return cats
  }, [] as { id: string; name: string; count: number }[])

  const availableRewardsCount = rewardViewModels.filter(r => r.canRedeem).length

  return {
    rewards: rewardViewModels,
    categories,
    userPointsBalance,
    availableRewardsCount,
    loading: isLoading,
    error,
  }
}

export function useLoyaltyDashboard(): LoyaltyDashboardViewModel {
  const { accounts } = useLoyaltyAccounts()
  const { tiers } = useLoyaltyTiers()
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: loyaltyKeys.dashboard(),
    queryFn: () => sdk.loyalty.getDashboardStats(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })

  const tierDistribution = tiers.map(tier => {
    const count = accounts.filter(account => account.tier === tier.name).length
    const percentage = accounts.length > 0 ? (count / accounts.length) * 100 : 0
    
    return {
      tier: tier.name,
      tierName: tier.displayName,
      count,
      percentage,
      color: tier.color,
    }
  })

  const topMembers = accounts
    .sort((a, b) => b.currentPoints - a.currentPoints)
    .slice(0, 5)

  return {
    totalMembers: stats?.totalMembers || accounts.length,
    activeMembers: stats?.activeMembers || accounts.filter(a => a.isActive).length,
    totalPointsIssued: stats?.totalPointsIssued || 0,
    totalPointsRedeemed: stats?.totalPointsRedeemed || 0,
    averagePointsPerMember: stats?.averagePointsPerMember || 0,
    membershipGrowth: [], // Would come from API in real implementation
    tierDistribution,
    topMembers,
    recentActivity: [], // Would come from API in real implementation
    popularRewards: [], // Would come from API in real implementation
    loading: isLoading,
    error: error?.message || null,
  }
}