import type { ReactNode } from 'react'

export type MenuItemType = 'link' | 'section' | 'divider'

export interface MenuItem {
  id: string
  title: string
  type?: MenuItemType
  icon?: ReactNode | string
  path?: string
  children?: MenuItem[]
  disabled?: boolean
  badge?: {
    label: string
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  }
  roles?: string[] // Role-based access control
  hidden?: boolean
}

export interface MenuSection {
  id: string
  title: string
  items: MenuItem[]
  roles?: string[]
}