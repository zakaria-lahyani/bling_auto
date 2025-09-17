/**
 * Error Handling Implementation Examples
 * 
 * Demonstrates how to implement the new error handling system
 * in different scenarios and components.
 */

import React, { useState } from 'react'
import { 
  useErrorHandler, 
  useAsyncOperation,
  useFormErrors,
  UserErrorMessage,
  ValidationErrorMessage,
  NetworkErrorMessage,
  FeatureErrorBoundary,
  ComponentErrorBoundary,
  createNetworkError,
  createValidationError,
  ErrorCode
} from '@/shared/errors'

// Example 1: Basic Error Handling Hook Usage
export const BasicErrorHandlingExample: React.FC = () => {
  const { 
    error, 
    hasError, 
    handleError, 
    clearError, 
    retry, 
    canRetry,
    isRetrying 
  } = useErrorHandler(
    // Optional operation to retry
    async () => {
      const response = await fetch('/api/services')
      if (!response.ok) {
        throw new Error('Failed to fetch services')
      }
      return response.json()
    },
    {
      maxRetries: 3,
      retryDelay: 1000,
      logErrors: true,
      showToast: true
    }
  )

  const handleSomeAction = async () => {
    try {
      // Simulate an operation that might fail
      const result = await simulateApiCall()
      console.log('Success:', result)
    } catch (error) {
      handleError(error, {
        component: 'BasicErrorHandlingExample',
        action: 'handleSomeAction'
      })
    }
  }

  return (
    <div className="p-4">
      <h3>Basic Error Handling</h3>
      
      <button 
        onClick={handleSomeAction}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Trigger Operation
      </button>

      {hasError && error && (
        <UserErrorMessage
          error={error}
          onRetry={canRetry ? retry : undefined}
          onDismiss={clearError}
          showTechnicalDetails={process.env.NODE_ENV === 'development'}
        />
      )}

      {isRetrying && (
        <div className="mt-2 text-blue-600">
          Retrying operation...
        </div>
      )}
    </div>
  )
}

// Example 2: Async Operation Hook
export const AsyncOperationExample: React.FC = () => {
  const {
    execute,
    isLoading,
    data,
    error,
    hasError,
    retry,
    canRetry,
    reset
  } = useAsyncOperation(
    async (serviceId: string) => {
      const response = await fetch(`/api/services/${serviceId}`)
      if (!response.ok) {
        throw new Error('Service not found')
      }
      return response.json()
    },
    {
      maxRetries: 2,
      logErrors: true
    }
  )

  const loadService = () => {
    execute('service-123')
  }

  return (
    <div className="p-4">
      <h3>Async Operation Example</h3>
      
      <div className="space-x-2 mb-4">
        <button 
          onClick={loadService}
          disabled={isLoading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          {isLoading ? 'Loading...' : 'Load Service'}
        </button>
        
        <button 
          onClick={reset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {hasError && error && (
        <UserErrorMessage
          error={error}
          onRetry={canRetry ? retry : undefined}
        />
      )}

      {data && (
        <div className="bg-green-50 p-4 rounded">
          <h4>Success! Loaded data:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

// Example 3: Form Validation with Error Handling
export const FormValidationExample: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const {
    fieldErrors,
    formError,
    hasFieldError,
    getFieldError,
    setFieldError,
    clearFieldError,
    setFormError,
    clearAllErrors,
    hasAnyErrors
  } = useFormErrors<typeof formData>()

  const { execute, isLoading } = useAsyncOperation(
    async (data: typeof formData) => {
      // Simulate form submission
      if (!data.name.trim()) {
        setFieldError('name', 'Name is required')
        throw createValidationError('Validation failed', { name: ['Name is required'] })
      }
      
      if (!data.email.includes('@')) {
        setFieldError('email', 'Please enter a valid email')
        throw createValidationError('Validation failed', { email: ['Please enter a valid email'] })
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { success: true, message: 'Form submitted successfully!' }
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearAllErrors()
    
    try {
      await execute(formData)
      alert('Form submitted successfully!')
      setFormData({ name: '', email: '', phone: '' })
    } catch (error) {
      // Errors are automatically handled by useAsyncOperation
    }
  }

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (hasFieldError(field)) {
      clearFieldError(field)
    }
  }

  return (
    <div className="p-4 max-w-md">
      <h3>Form Validation Example</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              hasFieldError('name') ? 'border-red-500' : ''
            }`}
          />
          {hasFieldError('name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              hasFieldError('email') ? 'border-red-500' : ''
            }`}
          />
          {hasFieldError('email') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {Object.keys(fieldErrors).length > 0 && (
        <ValidationErrorMessage
          fields={fieldErrors}
          onFixErrors={() => {
            // Focus on first error field
            const firstErrorField = Object.keys(fieldErrors)[0]
            const element = document.querySelector(`input[name="${firstErrorField}"]`) as HTMLInputElement
            element?.focus()
          }}
        />
      )}

      {formError && (
        <UserErrorMessage
          error={formError}
          onDismiss={() => setFormError(null)}
        />
      )}
    </div>
  )
}

// Example 4: Error Boundaries in Practice
export const ErrorBoundaryExample: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  const ThrowingComponent = () => {
    if (shouldThrow) {
      throw new Error('Intentional error for demonstration')
    }
    
    return (
      <div className="bg-green-50 p-4 rounded">
        <p>Component is working fine!</p>
        <button
          onClick={() => setShouldThrow(true)}
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
        >
          Trigger Error
        </button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h3>Error Boundary Example</h3>
      
      <div className="space-y-4">
        <FeatureErrorBoundary featureName="Demo Feature">
          <ThrowingComponent />
        </FeatureErrorBoundary>

        <button
          onClick={() => setShouldThrow(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reset Component
        </button>
      </div>
    </div>
  )
}

// Example 5: Network Error Handling
export const NetworkErrorExample: React.FC = () => {
  const [networkError, setNetworkError] = useState<boolean>(false)

  const simulateNetworkError = () => {
    setNetworkError(true)
    
    // Simulate network recovery after 3 seconds
    setTimeout(() => {
      setNetworkError(false)
    }, 3000)
  }

  const handleRetry = () => {
    setNetworkError(false)
    // In real scenario, this would retry the failed operation
    console.log('Retrying network operation...')
  }

  return (
    <div className="p-4">
      <h3>Network Error Example</h3>
      
      <button
        onClick={simulateNetworkError}
        className="bg-orange-500 text-white px-4 py-2 rounded mb-4"
      >
        Simulate Network Error
      </button>

      {networkError && (
        <NetworkErrorMessage onRetry={handleRetry} />
      )}

      {!networkError && (
        <div className="bg-green-50 p-4 rounded">
          <p>Network connection is stable!</p>
        </div>
      )}
    </div>
  )
}

// Example 6: Component-Level Error Boundaries
export const ComponentErrorBoundaryExample: React.FC = () => {
  return (
    <div className="p-4">
      <h3>Component Error Boundary Example</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <ComponentErrorBoundary componentName="Service Card">
          <ServiceCardExample />
        </ComponentErrorBoundary>
        
        <ComponentErrorBoundary componentName="Price Calculator">
          <PriceCalculatorExample />
        </ComponentErrorBoundary>
      </div>
    </div>
  )
}

const ServiceCardExample: React.FC = () => {
  const [shouldError, setShouldError] = useState(false)
  
  if (shouldError) {
    throw new Error('Service card failed to render')
  }

  return (
    <div className="border p-4 rounded">
      <h4>Premium Car Wash</h4>
      <p>$29.99</p>
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-500 text-white px-2 py-1 rounded text-sm mt-2"
      >
        Break Component
      </button>
    </div>
  )
}

const PriceCalculatorExample: React.FC = () => {
  return (
    <div className="border p-4 rounded">
      <h4>Price Calculator</h4>
      <p>Total: $29.99</p>
      <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm mt-2">
        Working Fine
      </button>
    </div>
  )
}

// Utility function to simulate API calls
async function simulateApiCall(): Promise<any> {
  // Randomly fail 30% of the time
  if (Math.random() < 0.3) {
    throw createNetworkError('Simulated network failure')
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true, data: 'API call successful' }
}

// Main example component that combines all examples
export const ErrorHandlingShowcase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Error Handling System Examples
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <BasicErrorHandlingExample />
        </div>
        
        <div className="border rounded-lg p-4">
          <AsyncOperationExample />
        </div>
        
        <div className="border rounded-lg p-4">
          <FormValidationExample />
        </div>
        
        <div className="border rounded-lg p-4">
          <NetworkErrorExample />
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <ErrorBoundaryExample />
      </div>
      
      <div className="border rounded-lg p-4">
        <ComponentErrorBoundaryExample />
      </div>
    </div>
  )
}