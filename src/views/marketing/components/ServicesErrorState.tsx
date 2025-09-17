/**
 * Services Error State Component
 * 
 * Displays error state for the services page with retry functionality
 * and helpful messaging for users.
 */

import React from 'react'

interface ServicesErrorStateProps {
  error: string
  onRetry: () => void
}

export const ServicesErrorState: React.FC<ServicesErrorStateProps> = ({ 
  error, 
  onRetry 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        
        {/* Error Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h2>
        
        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {error}
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors font-medium"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Refresh Page
          </button>
          
          <a
            href="/"
            className="block w-full text-center text-brand-600 hover:text-brand-800 transition-colors font-medium"
          >
            Go to Homepage
          </a>
        </div>
        
        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Still having trouble?
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a 
              href="/contact" 
              className="text-brand-600 hover:text-brand-800"
            >
              Contact Support
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="/about" 
              className="text-brand-600 hover:text-brand-800"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}