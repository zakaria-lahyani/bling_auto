/**
 * User-Friendly Error Messages Components
 * 
 * Provides intuitive, actionable error messages with recovery options
 * and contextual help for common error scenarios.
 */

import React from 'react'
import { AppError, ErrorCode, ErrorSeverity } from './types'

interface ErrorMessageProps {
  error: AppError
  onRetry?: () => void
  onDismiss?: () => void
  showTechnicalDetails?: boolean
  compact?: boolean
}

interface ErrorActionProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

const ErrorAction: React.FC<ErrorActionProps> = ({ 
  label, 
  onClick, 
  variant = 'secondary',
  disabled = false 
}) => {
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {label}
    </button>
  )
}

/**
 * Main Error Message Component
 */
export const UserErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
  onDismiss,
  showTechnicalDetails = false,
  compact = false
}) => {
  const getErrorIcon = () => {
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case ErrorSeverity.HIGH:
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case ErrorSeverity.MEDIUM:
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case ErrorSeverity.LOW:
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getColorClasses = () => {
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        return 'bg-red-50 border-red-200 text-red-800'
      case ErrorSeverity.MEDIUM:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case ErrorSeverity.LOW:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 p-3 border rounded-md ${getColorClasses()}`}>
        {getErrorIcon()}
        <span className="text-sm font-medium">{error.userMessage}</span>
        {onRetry && error.retryable && (
          <button
            onClick={onRetry}
            className="ml-auto text-sm underline hover:no-underline"
          >
            Retry
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`border rounded-lg p-4 ${getColorClasses()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{getErrorIcon()}</div>
        
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium">
            {getErrorTitle(error.code)}
          </h3>
          
          <div className="mt-2 text-sm">
            <p>{error.userMessage}</p>
          </div>

          {getContextualHelp(error.code) && (
            <div className="mt-3 text-sm">
              <details className="cursor-pointer">
                <summary className="font-medium hover:underline">
                  What can I do?
                </summary>
                <div className="mt-2 text-gray-600">
                  {getContextualHelp(error.code)}
                </div>
              </details>
            </div>
          )}

          {showTechnicalDetails && (
            <div className="mt-3 text-xs">
              <details className="cursor-pointer">
                <summary className="font-medium hover:underline">
                  Technical Details
                </summary>
                <div className="mt-2 font-mono bg-gray-100 p-2 rounded text-gray-700">
                  <div><strong>Code:</strong> {error.code}</div>
                  <div><strong>Message:</strong> {error.message}</div>
                  {error.statusCode && <div><strong>Status:</strong> {error.statusCode}</div>}
                  <div><strong>Timestamp:</strong> {new Date(error.timestamp).toLocaleString()}</div>
                </div>
              </details>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {onRetry && error.retryable && (
              <ErrorAction
                label="Try Again"
                onClick={onRetry}
                variant="primary"
              />
            )}
            
            {getRecoveryActions(error.code).map((action, index) => (
              <ErrorAction
                key={index}
                label={action.label}
                onClick={action.onClick}
                variant={action.variant}
              />
            ))}

            {onDismiss && (
              <ErrorAction
                label="Dismiss"
                onClick={onDismiss}
                variant="secondary"
              />
            )}
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Specialized Error Components for Different Scenarios
 */

// Network Error Component
export const NetworkErrorMessage: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <div className="text-center p-6 bg-gray-50 rounded-lg">
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 className="mt-4 text-lg font-medium text-gray-900">Connection Problem</h3>
    <p className="mt-2 text-sm text-gray-500">
      We're having trouble connecting to our servers. Please check your internet connection and try again.
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Try Again
      </button>
    )}
  </div>
)

// Unauthorized Error Component
export const UnauthorizedErrorMessage: React.FC = () => (
  <div className="text-center p-6 bg-yellow-50 rounded-lg">
    <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
    <h3 className="mt-4 text-lg font-medium text-gray-900">Access Required</h3>
    <p className="mt-2 text-sm text-gray-500">
      You need to sign in to access this feature.
    </p>
    <button
      onClick={() => window.location.href = '/login'}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Sign In
    </button>
  </div>
)

// Not Found Error Component
export const NotFoundErrorMessage: React.FC<{ resource?: string }> = ({ 
  resource = 'item' 
}) => (
  <div className="text-center p-6 bg-gray-50 rounded-lg">
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <h3 className="mt-4 text-lg font-medium text-gray-900">
      {resource.charAt(0).toUpperCase() + resource.slice(1)} Not Found
    </h3>
    <p className="mt-2 text-sm text-gray-500">
      The {resource} you're looking for doesn't exist or has been moved.
    </p>
    <button
      onClick={() => window.history.back()}
      className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      Go Back
    </button>
  </div>
)

// Validation Error Component
export const ValidationErrorMessage: React.FC<{ 
  fields: Record<string, string[]>
  onFixErrors?: () => void 
}> = ({ fields, onFixErrors }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex items-start">
      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">
          Please fix the following errors:
        </h3>
        <div className="mt-2 text-sm text-red-700">
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(fields).map(([field, errors]) =>
              errors.map((error, index) => (
                <li key={`${field}-${index}`}>
                  <strong>{field}:</strong> {error}
                </li>
              ))
            )}
          </ul>
        </div>
        {onFixErrors && (
          <button
            onClick={onFixErrors}
            className="mt-3 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200"
          >
            Fix Errors
          </button>
        )}
      </div>
    </div>
  </div>
)

// Helper functions
function getErrorTitle(code: ErrorCode): string {
  const titles: Record<ErrorCode, string> = {
    [ErrorCode.NETWORK_ERROR]: 'Connection Problem',
    [ErrorCode.TIMEOUT_ERROR]: 'Request Timeout',
    [ErrorCode.UNAUTHORIZED]: 'Access Required',
    [ErrorCode.FORBIDDEN]: 'Access Denied',
    [ErrorCode.NOT_FOUND]: 'Not Found',
    [ErrorCode.VALIDATION_ERROR]: 'Invalid Input',
    [ErrorCode.RATE_LIMITED]: 'Too Many Requests',
    [ErrorCode.SERVER_ERROR]: 'Server Error',
    [ErrorCode.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    [ErrorCode.BOOKING_CONFLICT]: 'Booking Conflict',
    [ErrorCode.PAYMENT_FAILED]: 'Payment Failed',
    [ErrorCode.CONFIGURATION_ERROR]: 'Configuration Error',
    [ErrorCode.UNKNOWN_ERROR]: 'Unexpected Error',
    [ErrorCode.API_ERROR]: 'API Error',
    [ErrorCode.CONNECTION_ERROR]: 'Connection Error',
    [ErrorCode.INVALID_INPUT]: 'Invalid Input',
    [ErrorCode.MISSING_REQUIRED_FIELD]: 'Missing Information',
    [ErrorCode.INVALID_FORMAT]: 'Invalid Format',
    [ErrorCode.INSUFFICIENT_PERMISSIONS]: 'Insufficient Permissions',
    [ErrorCode.DEPENDENCY_ERROR]: 'Dependency Error'
  }

  return titles[code] || 'Error'
}

function getContextualHelp(code: ErrorCode): string | null {
  const help: Record<ErrorCode, string> = {
    [ErrorCode.NETWORK_ERROR]: 'Check your internet connection and try refreshing the page. If the problem persists, our servers might be experiencing issues.',
    [ErrorCode.TIMEOUT_ERROR]: 'The request took too long to complete. This might be due to a slow connection or server issues. Try again in a moment.',
    [ErrorCode.UNAUTHORIZED]: 'Sign in to your account to access this feature. If you just signed in, try refreshing the page.',
    [ErrorCode.FORBIDDEN]: 'You don\'t have permission to perform this action. Contact your administrator if you believe this is an error.',
    [ErrorCode.NOT_FOUND]: 'The item you\'re looking for might have been moved or deleted. Check the URL or go back to the previous page.',
    [ErrorCode.VALIDATION_ERROR]: 'Please review the form and correct any highlighted errors before submitting again.',
    [ErrorCode.RATE_LIMITED]: 'You\'ve made too many requests. Please wait a moment before trying again.',
    [ErrorCode.SERVER_ERROR]: 'Our servers are experiencing issues. Please try again in a few minutes.',
    [ErrorCode.SERVICE_UNAVAILABLE]: 'This service is temporarily unavailable, possibly due to maintenance. Please try again later.',
    [ErrorCode.BOOKING_CONFLICT]: 'The time slot you selected is no longer available. Please choose a different time.',
    [ErrorCode.PAYMENT_FAILED]: 'Your payment could not be processed. Please check your payment details and try again.',
    [ErrorCode.API_ERROR]: 'There was an issue with the service. Please try again later.',
    [ErrorCode.CONNECTION_ERROR]: 'Unable to establish a connection. Check your internet and try again.',
    [ErrorCode.INVALID_INPUT]: 'The information provided is not valid. Please check your input.',
    [ErrorCode.MISSING_REQUIRED_FIELD]: 'Some required information is missing. Please complete all required fields.',
    [ErrorCode.INVALID_FORMAT]: 'The format of the information provided is incorrect.',
    [ErrorCode.INSUFFICIENT_PERMISSIONS]: 'You don\'t have the required permissions to perform this action.',
    [ErrorCode.CONFIGURATION_ERROR]: 'There\'s a configuration issue. Please contact support.',
    [ErrorCode.DEPENDENCY_ERROR]: 'A required service is unavailable. Please try again later.',
    [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again or contact support if the issue persists.'
  }

  return help[code] || null
}

function getRecoveryActions(code: ErrorCode): Array<{
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
}> {
  const actions: Record<ErrorCode, Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'danger'
  }>> = {
    [ErrorCode.NETWORK_ERROR]: [
      {
        label: 'Refresh Page',
        onClick: () => window.location.reload(),
        variant: 'secondary'
      }
    ],
    [ErrorCode.UNAUTHORIZED]: [
      {
        label: 'Sign In',
        onClick: () => window.location.href = '/login',
        variant: 'primary'
      }
    ],
    [ErrorCode.NOT_FOUND]: [
      {
        label: 'Go Home',
        onClick: () => window.location.href = '/',
        variant: 'primary'
      },
      {
        label: 'Go Back',
        onClick: () => window.history.back(),
        variant: 'secondary'
      }
    ],
    [ErrorCode.TIMEOUT_ERROR]: [],
    [ErrorCode.CONNECTION_ERROR]: [],
    [ErrorCode.API_ERROR]: [],
    [ErrorCode.FORBIDDEN]: [],
    [ErrorCode.VALIDATION_ERROR]: [],
    [ErrorCode.RATE_LIMITED]: [],
    [ErrorCode.SERVER_ERROR]: [],
    [ErrorCode.INVALID_INPUT]: [],
    [ErrorCode.MISSING_REQUIRED_FIELD]: [],
    [ErrorCode.INVALID_FORMAT]: [],
    [ErrorCode.SERVICE_UNAVAILABLE]: [],
    [ErrorCode.BOOKING_CONFLICT]: [],
    [ErrorCode.PAYMENT_FAILED]: [],
    [ErrorCode.INSUFFICIENT_PERMISSIONS]: [],
    [ErrorCode.UNKNOWN_ERROR]: [],
    [ErrorCode.CONFIGURATION_ERROR]: [],
    [ErrorCode.DEPENDENCY_ERROR]: []
  }

  return actions[code] || []
}