// Loyalty feature exports
export { 
  useLoyaltyAccount,
  useLoyaltyAccounts,
  useLoyaltyTiers,
  usePointsTransactions,
  useRewards,
  useLoyaltyActions,
  useLoyaltyCard,
  usePointsHistory,
  useRewardsList,
  useLoyaltyDashboard
} from './hooks/useLoyalty'
export type * from './types'

// Loyalty components
export { LoyaltyCard } from './components/LoyaltyCard'
export { PointsHistory } from './components/PointsHistory'
export { RewardsList } from './components/RewardsList'