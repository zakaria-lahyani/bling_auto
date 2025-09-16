'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import ErrorBoundary from '../ErrorBoundary'
import { useUserStore } from '../../store'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { currentRole, setCurrentRole } = useUserStore()
  const pathname = usePathname()
  
  // Pages that don't need the app shell (like marketing pages)
  const isMarketingPage = pathname === '/' && !pathname.startsWith('/(app)')
  const isConnectionPage = pathname === '/connection'

  if (isMarketingPage || isConnectionPage) {
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