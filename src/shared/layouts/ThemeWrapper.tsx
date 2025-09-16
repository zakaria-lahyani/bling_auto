'use client'

import { ReactNode } from 'react'
import { PageContainer } from './index'

interface ThemeWrapperProps {
  children: ReactNode
  background?: 'default' | 'muted' | 'elevated'
  className?: string
}

export default function ThemeWrapper({ 
  children, 
  background = 'muted',
  className 
}: ThemeWrapperProps) {
  return (
    <PageContainer background={background} className={className}>
      <div className="p-5">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </PageContainer>
  )
}