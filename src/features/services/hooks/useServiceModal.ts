/**
 * Service Modal Hook
 * 
 * Handles modal state management for service details.
 * Single responsibility: Modal state and keyboard interactions.
 */

import { useState, useCallback, useEffect } from 'react'
import type { Service } from '@/core/entities/service/types'

interface UseServiceModalReturn {
  // Modal state
  selectedService: Service | null
  isOpen: boolean
  
  // Modal actions
  openModal: (service: Service) => void
  closeModal: () => void
  
  // Navigation actions
  navigateToNext: (services: Service[]) => void
  navigateToPrevious: (services: Service[]) => void
  
  // Helper methods
  canNavigateNext: (services: Service[]) => boolean
  canNavigatePrevious: (services: Service[]) => boolean
  getCurrentIndex: (services: Service[]) => number
}

export function useServiceModal(): UseServiceModalReturn {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Open modal with selected service
  const openModal = useCallback((service: Service) => {
    setSelectedService(service)
    setIsOpen(true)
  }, [])

  // Close modal and clear selection
  const closeModal = useCallback(() => {
    setSelectedService(null)
    setIsOpen(false)
  }, [])

  // Navigation helpers
  const getCurrentIndex = useCallback((services: Service[]) => {
    if (!selectedService || !services.length) return -1
    return services.findIndex(service => service.id === selectedService.id)
  }, [selectedService])

  const canNavigateNext = useCallback((services: Service[]) => {
    const currentIndex = getCurrentIndex(services)
    return currentIndex >= 0 && currentIndex < services.length - 1
  }, [getCurrentIndex])

  const canNavigatePrevious = useCallback((services: Service[]) => {
    const currentIndex = getCurrentIndex(services)
    return currentIndex > 0
  }, [getCurrentIndex])

  const navigateToNext = useCallback((services: Service[]) => {
    const currentIndex = getCurrentIndex(services)
    if (canNavigateNext(services)) {
      const nextService = services[currentIndex + 1]
      setSelectedService(nextService ?? null)
    }
  }, [getCurrentIndex, canNavigateNext])

  const navigateToPrevious = useCallback((services: Service[]) => {
    const currentIndex = getCurrentIndex(services)
    if (canNavigatePrevious(services)) {
      const previousService = services[currentIndex - 1]
      setSelectedService(previousService ?? null)
    }
  }, [getCurrentIndex, canNavigatePrevious])

  // Keyboard event handling
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Close modal on Escape
      if (event.key === 'Escape') {
        closeModal()
        return
      }
    }

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeModal])

  return {
    selectedService,
    isOpen,
    openModal,
    closeModal,
    navigateToNext,
    navigateToPrevious,
    canNavigateNext,
    canNavigatePrevious,
    getCurrentIndex
  }
}