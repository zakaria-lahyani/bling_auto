'use client'

import { ReactElement } from 'react'
import { useSettings } from '@core/hooks/useSettings'
import type { ChildrenType, SystemMode } from '@core/types'

interface Props extends ChildrenType {
  systemMode: SystemMode
  verticalLayout: ReactElement
  horizontalLayout?: ReactElement
}

const LayoutWrapper = ({ children, systemMode, verticalLayout, horizontalLayout }: Props) => {
  const { settings } = useSettings()
  
  // Select layout based on settings
  const Layout = settings.layout === 'horizontal' && horizontalLayout 
    ? horizontalLayout 
    : verticalLayout

  return (
    <>
      {Layout}
      {children}
    </>
  )
}

export default LayoutWrapper