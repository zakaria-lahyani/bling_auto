// Core type definitions for the application

export type ChildrenType = {
  children: React.ReactNode
}

export type Direction = 'ltr' | 'rtl'

export type SystemMode = 'light' | 'dark' | 'system'

export type Mode = 'light' | 'dark'

export type Skin = 'default' | 'bordered'

export type Layout = 'vertical' | 'horizontal' | 'collapsed'

export type ContentWidth = 'compact' | 'wide'

export type AppBarType = 'fixed' | 'static' | 'hidden'

export type FooterType = 'fixed' | 'static' | 'hidden'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export interface Settings {
  mode?: SystemMode
  skin?: Skin
  layout?: Layout
  appBar?: {
    type?: AppBarType
    contentWidth?: ContentWidth
  }
  footer?: {
    type?: FooterType
    contentWidth?: ContentWidth
  }
  navbarContentWidth?: ContentWidth
  contentWidth?: ContentWidth
  primaryColor?: string
}

export interface LayoutProps {
  systemMode: SystemMode
  settings: Settings
  children: React.ReactNode
}