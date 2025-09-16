// Loyalty feature types
export interface LoyaltyProgram {
  id: string
  name: string
  description: string
  pointsPerDollar: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  benefits: string[]
  minimumSpend: number
}

export interface LoyaltyTier {
  id: string
  name: 'bronze' | 'silver' | 'gold' | 'platinum'
  displayName: string
  minPoints: number
  maxPoints?: number
  benefits: TierBenefit[]
  color: string
  icon: string
  multiplier: number // points earning multiplier
}

export interface TierBenefit {
  id: string
  type: 'discount' | 'free_service' | 'priority_booking' | 'birthday_reward' | 'referral_bonus'
  title: string
  description: string
  value: number // percentage for discounts, points for rewards
}

export interface LoyaltyAccount {
  id: string
  customerId: string
  customerName: string
  email: string
  programId: string
  currentPoints: number
  totalPointsEarned: number
  totalPointsRedeemed: number
  tier: LoyaltyProgram['tier']
  nextTierPoints: number
  memberSince: string
  lastActivity: string
  isActive: boolean
  referralCode: string
  referredBy?: string
}

export interface PointsTransaction {
  id: string
  accountId: string
  type: 'earned' | 'redeemed' | 'expired' | 'adjusted'
  points: number
  description: string
  appointmentId?: string
  rewardId?: string
  createdAt: string
  expiresAt?: string
  metadata?: Record<string, any>
}

export interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  type: 'discount' | 'free_service' | 'upgrade' | 'merchandise' | 'partner_offer'
  value: number
  category: string
  isActive: boolean
  expiresAt?: string
  imageUrl?: string
  termsConditions: string[]
  maxRedemptions?: number
  currentRedemptions: number
}

export interface RewardRedemption {
  id: string
  accountId: string
  rewardId: string
  pointsUsed: number
  status: 'pending' | 'active' | 'used' | 'expired' | 'cancelled'
  redeemedAt: string
  expiresAt?: string
  usedAt?: string
  appointmentId?: string
  code?: string
}

// Filter types
export interface LoyaltyAccountFilter {
  tier?: LoyaltyProgram['tier']
  status?: 'active' | 'inactive'
  minPoints?: number
  maxPoints?: number
  joinedAfter?: string
  joinedBefore?: string
}

export interface PointsTransactionFilter {
  accountId?: string
  type?: PointsTransaction['type']
  dateFrom?: string
  dateTo?: string
}

export interface RewardFilter {
  category?: string
  type?: Reward['type']
  isActive?: boolean
  minPoints?: number
  maxPoints?: number
}

// View models
export interface LoyaltyCardViewModel {
  id: string
  customerName: string
  email: string
  tier: LoyaltyProgram['tier']
  tierDisplayName: string
  tierColor: string
  tierIcon: string
  currentPoints: number
  nextTierPoints: number
  progressPercentage: number
  memberSince: string
  lastActivity: string
  benefits: TierBenefit[]
  referralCode: string
  pointsToNextTier?: number
  nextTierName?: string
}

export interface PointsHistoryViewModel {
  transactions: PointsTransactionViewModel[]
  totalEarned: number
  totalRedeemed: number
  currentBalance: number
  loading: boolean
  error: string | null
}

export interface PointsTransactionViewModel {
  id: string
  type: PointsTransaction['type']
  points: number
  pointsDisplay: string
  description: string
  date: string
  typeColor: string
  typeIcon: string
  isExpired?: boolean
  expiresAt?: string
}

export interface RewardViewModel {
  id: string
  name: string
  description: string
  pointsCost: number
  pointsCostDisplay: string
  type: Reward['type']
  category: string
  value: number
  valueDisplay: string
  isAffordable: boolean
  isActive: boolean
  expiresAt?: string
  canRedeem: boolean
  imageUrl?: string
  termsConditions: string[]
  popularityScore: number
}

export interface LoyaltyDashboardViewModel {
  totalMembers: number
  activeMembers: number
  totalPointsIssued: number
  totalPointsRedeemed: number
  averagePointsPerMember: number
  membershipGrowth: {
    month: string
    newMembers: number
    totalMembers: number
  }[]
  tierDistribution: {
    tier: LoyaltyProgram['tier']
    tierName: string
    count: number
    percentage: number
    color: string
  }[]
  topMembers: LoyaltyAccount[]
  recentActivity: PointsTransaction[]
  popularRewards: {
    reward: Reward
    redemptionsCount: number
  }[]
  loading: boolean
  error: string | null
}

export interface RewardsListViewModel {
  rewards: RewardViewModel[]
  categories: {
    id: string
    name: string
    count: number
  }[]
  userPointsBalance: number
  availableRewardsCount: number
  loading: boolean
  error: string | null
}