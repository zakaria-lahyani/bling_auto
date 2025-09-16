'use client'

import React from 'react'
import { Award, Crown, Star, Gift, ArrowUp } from 'lucide-react'
import { Card, Badge, Heading3, BodyText, Caption } from '../../../components/ui'
import type { LoyaltyCardViewModel } from '../types'

interface LoyaltyCardProps {
  loyaltyCard: LoyaltyCardViewModel
  showDetails?: boolean
  compact?: boolean
}

export const LoyaltyCard: React.FC<LoyaltyCardProps> = ({
  loyaltyCard,
  showDetails = true,
  compact = false
}) => {
  const getTierIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown size={24} />
      case 'Star': return <Star size={24} />
      default: return <Award size={24} />
    }
  }

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-amber-700 to-amber-500'
      case 'silver': return 'from-gray-500 to-gray-300'
      case 'gold': return 'from-yellow-500 to-yellow-300'
      case 'platinum': return 'from-gray-800 to-gray-600'
      default: return 'from-brand-600 to-brand-400'
    }
  }

  const formatPoints = (points: number) => {
    return points.toLocaleString()
  }

  return (
    <Card className={`overflow-hidden ${compact ? 'p-4' : 'p-6'}`}>
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${getTierGradient(loyaltyCard.tier)} p-6 -m-6 mb-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              {getTierIcon(loyaltyCard.tierIcon)}
            </div>
            <div>
              <Heading3 className="text-white">{loyaltyCard.tierDisplayName}</Heading3>
              <Caption className="text-white/80">Member since {loyaltyCard.memberSince}</Caption>
            </div>
          </div>
          
          <div className="text-right">
            <BodyText className="text-white/80 text-sm">Points Balance</BodyText>
            <Heading3 className="text-white">{formatPoints(loyaltyCard.currentPoints)}</Heading3>
          </div>
        </div>
      </div>

      {/* Progress to Next Tier */}
      {loyaltyCard.nextTierName && loyaltyCard.pointsToNextTier && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Caption>Progress to {loyaltyCard.nextTierName}</Caption>
            <Caption>{loyaltyCard.pointsToNextTier} points to go</Caption>
          </div>
          
          <div className="w-full bg-surface-muted rounded-full h-2 mb-2">
            <div 
              className="bg-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loyaltyCard.progressPercentage}%` }}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <ArrowUp size={14} className="text-brand-600" />
            <Caption color="muted">
              {loyaltyCard.progressPercentage.toFixed(1)}% complete
            </Caption>
          </div>
        </div>
      )}

      {/* Customer Info */}
      <div className="mb-6">
        <BodyText weight="medium" className="mb-1">{loyaltyCard.customerName}</BodyText>
        <Caption color="muted">{loyaltyCard.email}</Caption>
        <Caption color="muted">Referral Code: {loyaltyCard.referralCode}</Caption>
      </div>

      {/* Tier Benefits */}
      {showDetails && loyaltyCard.benefits.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Gift size={16} className="text-brand-600" />
            <BodyText weight="medium">Your Benefits</BodyText>
          </div>
          
          <div className="space-y-2">
            {loyaltyCard.benefits.map((benefit) => (
              <div key={benefit.id} className="p-3 bg-surface-muted rounded-lg">
                <BodyText className="text-sm font-medium mb-1">{benefit.title}</BodyText>
                <Caption color="muted">{benefit.description}</Caption>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats (Compact Mode) */}
      {compact && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <BodyText weight="medium">{formatPoints(loyaltyCard.currentPoints)}</BodyText>
            <Caption color="muted">Current Points</Caption>
          </div>
          <div className="text-center">
            <BodyText weight="medium">{loyaltyCard.tierDisplayName}</BodyText>
            <Caption color="muted">Tier Level</Caption>
          </div>
        </div>
      )}
    </Card>
  )
}