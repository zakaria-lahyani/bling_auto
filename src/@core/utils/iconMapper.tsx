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
  BarChart3
} from 'lucide-react'

interface IconProps {
  size?: number
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