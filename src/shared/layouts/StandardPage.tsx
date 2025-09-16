'use client'

import { ReactNode } from 'react'
import { PageContainer, Section } from './index'
import { Heading1, BodyText } from '@/shared/components/ui'

interface StandardPageProps {
  title: string
  description?: string
  children: ReactNode
  variant?: 'default' | 'centered' | 'wide'
}

export default function StandardPage({ 
  title, 
  description, 
  children, 
  variant = 'default' 
}: StandardPageProps) {
  const sectionWidth = variant === 'wide' ? 'full' : variant === 'centered' ? 'narrow' : 'container'

  return (
    <PageContainer>
      <Section spacing="lg" width={sectionWidth}>
        <div className="text-center mb-12">
          <Heading1 className="mb-4">{title}</Heading1>
          {description && (
            <BodyText color="secondary" className="text-lg max-w-2xl mx-auto">
              {description}
            </BodyText>
          )}
        </div>
        {children}
      </Section>
    </PageContainer>
  )
}