import type { MenuItem } from '@/shared/types/menu'

// Navigation configuration based on user roles
export const getNavigationConfig = (userRole?: string): MenuItem[] => {
  const navigation: MenuItem[] = [
    {
      id: 'dashboards',
      title: 'Dashboards',
      type: 'section',
      children: [
        {
          id: 'analytics',
          title: 'Analytics',
          icon: 'BarChart3',
          path: '/dashboard/analytics',
          roles: ['Owner', 'Manager']
        },
        {
          id: 'operations',
          title: 'Operations',
          icon: 'LayoutDashboard',
          path: '/dashboard/operations',
          roles: ['Owner', 'Manager', 'Operator']
        }
      ]
    },
    {
      id: 'apps',
      title: 'Applications',
      type: 'section',
      children: [
        {
          id: 'booking',
          title: 'Booking',
          icon: 'Calendar',
          path: '/booking',
          badge: {
            label: 'New',
            color: 'primary'
          }
        },
        {
          id: 'jobs',
          title: 'Jobs Management',
          icon: 'Briefcase',
          path: '/jobs',
          roles: ['Owner', 'Manager', 'Operator']
        },
        {
          id: 'customers',
          title: 'Customers',
          icon: 'Users',
          path: '/customers',
          roles: ['Owner', 'Manager']
        },
        {
          id: 'services',
          title: 'Services',
          icon: 'Car',
          path: '/services',
          children: [
            {
              id: 'services-list',
              title: 'Service Catalog',
              path: '/services/list'
            },
            {
              id: 'services-management',
              title: 'Management',
              path: '/services/management',
              roles: ['Owner', 'Manager']
            }
          ]
        },
        {
          id: 'inventory',
          title: 'Inventory',
          icon: 'Package',
          path: '/inventory',
          roles: ['Owner', 'Manager'],
          children: [
            {
              id: 'stock-overview',
              title: 'Stock Overview',
              path: '/inventory/stock'
            },
            {
              id: 'supplies',
              title: 'Supplies',
              path: '/inventory/supplies'
            },
            {
              id: 'orders',
              title: 'Purchase Orders',
              path: '/inventory/orders'
            }
          ]
        },
        {
          id: 'loyalty',
          title: 'Loyalty Program',
          icon: 'Trophy',
          path: '/loyalty',
          children: [
            {
              id: 'loyalty-overview',
              title: 'Overview',
              path: '/loyalty/overview'
            },
            {
              id: 'rewards',
              title: 'Rewards',
              path: '/loyalty/rewards'
            },
            {
              id: 'members',
              title: 'Members',
              path: '/loyalty/members',
              roles: ['Owner', 'Manager']
            }
          ]
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'section',
      children: [
        {
          id: 'profile',
          title: 'User Profile',
          icon: 'Users',
          path: '/profile'
        },
        {
          id: 'account-settings',
          title: 'Account Settings',
          icon: 'Settings',
          path: '/settings'
        },
        {
          id: 'pricing',
          title: 'Pricing',
          icon: 'CreditCard',
          path: '/pricing'
        },
        {
          id: 'locations',
          title: 'Locations',
          icon: 'MapPin',
          path: '/locations'
        }
      ]
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'section',
      children: [
        {
          id: 'reports-dashboard',
          title: 'Reports Dashboard',
          icon: 'ClipboardList',
          path: '/reports',
          roles: ['Owner', 'Manager']
        }
      ]
    }
  ]

  // Filter navigation based on user role
  if (userRole) {
    return filterNavigationByRole(navigation, userRole)
  }

  return navigation
}

// Helper function to filter navigation based on user role
const filterNavigationByRole = (items: MenuItem[], userRole: string): MenuItem[] => {
  return items.reduce((filtered: MenuItem[], item) => {
    // Check if item has role restrictions
    if (item.roles && !item.roles.includes(userRole)) {
      return filtered
    }

    // If item has children, filter them recursively
    if (item.children) {
      const filteredChildren = filterNavigationByRole(item.children, userRole)
      if (filteredChildren.length > 0) {
        filtered.push({
          ...item,
          children: filteredChildren
        })
      }
    } else {
      filtered.push(item)
    }

    return filtered
  }, [])
}

// Default navigation for unauthenticated users
export const getPublicNavigation = (): MenuItem[] => [
  {
    id: 'home',
    title: 'Home',
    path: '/'
  },
  {
    id: 'services',
    title: 'Services',
    path: '/services'
  },
  {
    id: 'pricing',
    title: 'Pricing',
    path: '/pricing'
  },
  {
    id: 'locations',
    title: 'Locations',
    path: '/locations'
  },
  {
    id: 'contact',
    title: 'Contact',
    path: '/contact'
  }
]