'use client'

import Link from 'next/link'
import { cn } from '@core/utils'

interface FooterProps {
  isFixed?: boolean
}

const Footer = ({ isFixed = false }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn(
      'h-14 bg-surface border-t border-border flex items-center px-6',
      isFixed && 'fixed bottom-0 left-0 right-0 z-20'
    )}>
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-content-muted">
          © {currentYear} CarWash Pro. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/support" className="text-sm text-content-muted hover:text-content-primary transition-colors">
            Support
          </Link>
          <Link href="/docs" className="text-sm text-content-muted hover:text-content-primary transition-colors">
            Documentation
          </Link>
          <Link href="/privacy" className="text-sm text-content-muted hover:text-content-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer