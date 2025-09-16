import type { Settings } from '@/shared/types'

const themeConfig: Settings = {
  // Template Customization
  mode: 'light', // 'light' | 'dark' | 'system'
  skin: 'default', // 'default' | 'bordered'
  layout: 'vertical', // 'vertical' | 'horizontal' | 'collapsed'
  
  // AppBar Settings
  appBar: {
    type: 'fixed', // 'fixed' | 'static' | 'hidden'
    contentWidth: 'wide' // 'compact' | 'wide'
  },
  
  // Footer Settings
  footer: {
    type: 'static', // 'fixed' | 'static' | 'hidden'
    contentWidth: 'wide' // 'compact' | 'wide'
  },
  
  // Navigation Settings
  navbarContentWidth: 'wide', // 'compact' | 'wide'
  
  // Content Settings
  contentWidth: 'wide', // 'compact' | 'wide'
  
  // Primary Color
  primaryColor: '#14b8a6' // Teal for car wash theme
}

export default themeConfig