'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import Header from './Header'
import ErrorBoundary from './ErrorBoundary'
import { useUserStore } from '@/infrastructure/storage/stores'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { currentRole, setCurrentRole } = useUserStore()
  const pathname = usePathname()
  
  const isConnectionPage = pathname === '/connection'

  if (isConnectionPage) {
    return (
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      <ErrorBoundary>
        <Sidebar currentRole={currentRole} setCurrentRole={setCurrentRole} />
      </ErrorBoundary>
      
      <div className="flex-1 flex flex-col">
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        
        <main className="flex-1 overflow-auto bg-white dark:bg-slate-900">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}