'use client'

import type { ChildrenType } from '@/shared/types'

const BlankLayout = ({ children }: ChildrenType) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted">
      {children}
    </div>
  )
}

export default BlankLayout