'use client'

import React, { useState } from 'react'
import { Gift, Filter, Search, Tag, Star, Clock, CheckCircle } from 'lucide-react'
import { Button, Input, Badge, Select, Card, Heading3, BodyText, Caption } from '../../../components/ui'
import { useLoyaltyActions } from '../hooks/useLoyalty'
import type { RewardsListViewModel, RewardViewModel } from '../types'

interface RewardsListProps {
  rewardsData: RewardsListViewModel
  accountId?: string
  onRewardRedeem?: (rewardId: string) => void
  showFilters?: boolean
  compact?: boolean
}

export const RewardsList: React.FC<RewardsListProps> = ({
  rewardsData,
  accountId,
  onRewardRedeem,
  showFilters = true,
  compact = false
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'points' | 'popularity' | 'value'>('points')
  
  const { redeemReward, isRedeeming } = useLoyaltyActions()

  // Filter and sort rewards
  const filteredRewards = rewardsData.rewards
    .filter(reward => {
      const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reward.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return a.pointsCost - b.pointsCost
        case 'popularity':
          return b.popularityScore - a.popularityScore
        case 'value':
          return b.value - a.value
        default:
          return 0
      }
    })

  const handleRedeemReward = async (reward: RewardViewModel) => {
    if (!accountId || !reward.canRedeem) return
    
    try {
      await redeemReward({ accountId, rewardId: reward.id })
      onRewardRedeem?.(reward.id)
    } catch (error) {
      console.error('Failed to redeem reward:', error)
    }
  }

  const getRewardTypeIcon = (type: RewardViewModel['type']) => {
    switch (type) {
      case 'free_service': return <Gift size={16} />
      case 'discount': return <Tag size={16} />
      case 'upgrade': return <Star size={16} />
      case 'merchandise': return <Gift size={16} />
      case 'partner_offer': return <Star size={16} />
      default: return <Gift size={16} />
    }
  }

  const getRewardTypeColor = (type: RewardViewModel['type']) => {
    switch (type) {
      case 'free_service': return 'bg-green-100 text-green-800'
      case 'discount': return 'bg-blue-100 text-blue-800'
      case 'upgrade': return 'bg-purple-100 text-purple-800'
      case 'merchandise': return 'bg-orange-100 text-orange-800'
      case 'partner_offer': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (rewardsData.loading) {
    return (
      <div className="text-center py-8">
        <BodyText color="muted">Loading rewards...</BodyText>
      </div>
    )
  }

  if (rewardsData.error) {
    return (
      <div className="text-center py-8">
        <BodyText color="muted">Error loading rewards: {rewardsData.error}</BodyText>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Points Balance */}
      <div className="flex items-center justify-between">
        <div>
          <Heading3>Available Rewards</Heading3>
          <Caption color="muted">
            {rewardsData.availableRewardsCount} rewards available with your points
          </Caption>
        </div>
        
        <div className="text-right">
          <BodyText weight="medium" className="text-brand-600">
            {rewardsData.userPointsBalance.toLocaleString()} points
          </BodyText>
          <Caption color="muted">Your Balance</Caption>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted" />
              <Input
                placeholder="Search rewards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category and Sort Filters */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex gap-2">
                <Badge
                  variant={selectedCategory === 'all' ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('all')}
                >
                  All ({rewardsData.rewards.length})
                </Badge>
                {rewardsData.categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Caption>Sort by:</Caption>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border border-border rounded px-2 py-1"
                >
                  <option value="points">Points (Low to High)</option>
                  <option value="popularity">Most Popular</option>
                  <option value="value">Highest Value</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Rewards Grid */}
      {filteredRewards.length === 0 ? (
        <div className="text-center py-12">
          <Gift size={48} className="text-content-muted mx-auto mb-4" />
          <Heading3 className="mb-2">No rewards found</Heading3>
          <BodyText color="muted">
            {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new rewards!'}
          </BodyText>
        </div>
      ) : (
        <div className={`grid gap-4 ${
          compact 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredRewards.map((reward) => (
            <Card key={reward.id} className="p-6 hover:shadow-md transition-shadow">
              {/* Reward Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRewardTypeColor(reward.type)}`}>
                    {getRewardTypeIcon(reward.type)}
                  </div>
                  <div>
                    <BodyText weight="medium" className="mb-1">{reward.name}</BodyText>
                    <Badge variant="outline" className={getRewardTypeColor(reward.type)}>
                      {reward.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                
                {reward.popularityScore > 0 && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    <Star size={12} className="mr-1" />
                    Popular
                  </Badge>
                )}
              </div>

              {/* Reward Description */}
              <BodyText className="mb-4 text-content-secondary">
                {reward.description}
              </BodyText>

              {/* Reward Value */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <BodyText weight="medium" className="text-brand-600">
                    {reward.valueDisplay}
                  </BodyText>
                  <Caption color="muted">Value</Caption>
                </div>
                
                <div className="text-right">
                  <BodyText weight="medium">
                    {reward.pointsCostDisplay}
                  </BodyText>
                  <Caption color="muted">Cost</Caption>
                </div>
              </div>

              {/* Affordability Status */}
              <div className="flex items-center gap-2 mb-4">
                {reward.isAffordable ? (
                  <CheckCircle size={16} className="text-green-600" />
                ) : (
                  <Clock size={16} className="text-gray-400" />
                )}
                <Caption className={reward.isAffordable ? 'text-green-600' : 'text-content-muted'}>
                  {reward.isAffordable 
                    ? 'You can redeem this reward' 
                    : `Need ${(reward.pointsCost - rewardsData.userPointsBalance).toLocaleString()} more points`
                  }
                </Caption>
              </div>

              {/* Expiration */}
              {reward.expiresAt && (
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-content-muted" />
                  <Caption color="muted">Expires: {reward.expiresAt}</Caption>
                </div>
              )}

              {/* Redeem Button */}
              <Button
                className="w-full"
                disabled={!reward.canRedeem || isRedeeming}
                onClick={() => handleRedeemReward(reward)}
                variant={reward.canRedeem ? "default" : "outline"}
              >
                {isRedeeming 
                  ? 'Redeeming...' 
                  : reward.canRedeem 
                  ? 'Redeem Now' 
                  : reward.isAffordable 
                  ? 'Not Available' 
                  : 'Insufficient Points'
                }
              </Button>

              {/* Terms & Conditions */}
              {reward.termsConditions.length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-content-muted">
                    Terms & Conditions
                  </summary>
                  <div className="mt-2 space-y-1">
                    {reward.termsConditions.map((term, index) => (
                      <Caption key={index} color="muted" className="text-xs">
                        • {term}
                      </Caption>
                    ))}
                  </div>
                </details>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}