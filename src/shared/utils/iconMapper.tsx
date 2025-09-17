import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Car, 
  Package, 
  Trophy, 
  Briefcase, 
  Settings,
  CreditCard,
  MapPin,
  ClipboardList,
  BarChart3,
  Grid3X3,
  Droplets,
  Sparkles,
  Shield,
  Palette,
  Wrench
} from 'lucide-react'

interface IconProps {
  size?: string | number
  className?: string
}

const iconComponents = {
  LayoutDashboard,
  Calendar,
  Users,
  Car,
  Package,
  Trophy,
  Briefcase,
  Settings,
  CreditCard,
  MapPin,
  ClipboardList,
  BarChart3,
  Grid3X3,
  Droplets,
  Sparkles,
  Shield,
  Palette,
  Wrench
}

export function getIcon(iconName: string | undefined, props: IconProps = {}) {
  if (!iconName || typeof iconName !== 'string') {
    return null
  }

  const IconComponent = iconComponents[iconName as keyof typeof iconComponents]
  
  if (!IconComponent) {
    return null
  }

  return <IconComponent size={props.size || 20} className={props.className} />
}

// Mapping for service category icons
const categoryIconMap = {
  'grid': Grid3X3,
  'droplets': Droplets,
  'sparkles': Sparkles,
  'shield': Shield,
  'palette': Palette,
  'wrench': Wrench,
  'car': Car,
}

export function getCategoryIcon(iconName: string | undefined, props: IconProps = {}) {
  if (!iconName || typeof iconName !== 'string') {
    return <Grid3X3 size={props.size || 20} className={props.className} />
  }

  const IconComponent = categoryIconMap[iconName as keyof typeof categoryIconMap]
  
  if (!IconComponent) {
    return <Grid3X3 size={props.size || 20} className={props.className} />
  }

  return <IconComponent size={props.size || 20} className={props.className} />
}