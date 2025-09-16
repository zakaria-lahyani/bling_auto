'use client'

import React from 'react'
import { Plus, Minus, Clock, Edit, Circle, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, Badge, Heading3, BodyText, Caption } from '@/shared/components/ui'
import type { PointsHistoryViewModel, PointsTransactionViewModel } from '../types'

interface PointsHistoryProps {
  pointsHistory: PointsHistoryViewModel
  showSummary?: boolean
  maxTransactions?: number
}

export const PointsHistory: React.FC<PointsHistoryProps> = ({
  pointsHistory,
  showSummary = true,
  maxTransactions
}) => {
  const getTransactionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plus': return <Plus size={16} />
      case 'Minus': return <Minus size={16} />
      case 'Clock': return <Clock size={16} />
      case 'Edit': return <Edit size={16} />
      default: return <Circle size={16} />
    }
  }

  const getTransactionBadgeVariant = (type: PointsTransactionViewModel['type']) => {
    switch (type) {
      case 'earned': return 'default'
      case 'redeemed': return 'outline'
      case 'expired': return 'outline'
      case 'adjusted': return 'outline'
      default: return 'outline'
    }
  }

  const formatPoints = (points: number) => {
    return points.toLocaleString()
  }

  const displayTransactions = maxTransactions 
    ? pointsHistory.transactions.slice(0, maxTransactions)
    : pointsHistory.transactions

  if (pointsHistory.loading) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <BodyText color="muted">Loading points history...</BodyText>
        </div>
      </Card>
    )
  }

  if (pointsHistory.error) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <BodyText color="muted">Error loading points history: {pointsHistory.error}</BodyText>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      {showSummary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <div>
                <BodyText weight="medium">{formatPoints(pointsHistory.totalEarned)}</BodyText>
                <Caption color="muted">Total Earned</Caption>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown size={20} className="text-red-600" />
              </div>
              <div>
                <BodyText weight="medium">{formatPoints(pointsHistory.totalRedeemed)}</BodyText>
                <Caption color="muted">Total Redeemed</Caption>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <Plus size={20} className="text-brand-600" />
              </div>
              <div>
                <BodyText weight="medium">{formatPoints(pointsHistory.currentBalance)}</BodyText>
                <Caption color="muted">Current Balance</Caption>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Transaction History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Heading3>Recent Activity</Heading3>
          {maxTransactions && pointsHistory.transactions.length > maxTransactions && (
            <Caption color="muted">
              Showing {maxTransactions} of {pointsHistory.transactions.length} transactions
            </Caption>
          )}
        </div>

        {displayTransactions.length === 0 ? (
          <div className="text-center py-8">
            <Clock size={48} className="text-content-muted mx-auto mb-4" />
            <Heading3 className="mb-2">No transactions yet</Heading3>
            <BodyText color="muted">
              Start earning points by booking car wash services!
            </BodyText>
          </div>
        ) : (
          <div className="space-y-4">
            {displayTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'earned' 
                      ? 'bg-green-100' 
                      : transaction.type === 'redeemed'
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                  }`}>
                    <span className={transaction.typeColor}>
                      {getTransactionIcon(transaction.typeIcon)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <BodyText weight="medium">{transaction.description}</BodyText>
                      <Badge variant={getTransactionBadgeVariant(transaction.type)}>
                        {transaction.type.replace('_', ' ')}
                      </Badge>
                      {transaction.isExpired && (
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          Expired
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Caption color="muted">{transaction.date}</Caption>
                      {transaction.expiresAt && !transaction.isExpired && (
                        <Caption color="muted">Expires: {transaction.expiresAt}</Caption>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <BodyText 
                    weight="medium" 
                    className={`text-lg ${
                      transaction.type === 'earned' 
                        ? 'text-green-600' 
                        : transaction.type === 'redeemed'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {transaction.pointsDisplay}
                  </BodyText>
                  <Caption color="muted">points</Caption>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}