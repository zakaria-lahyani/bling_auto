'use client'

import React from 'react'
import { Car, Plus, Star } from 'lucide-react'
import { Card, Heading3, BodyText, Caption, Button } from '../../../components/ui'
import type { VehicleInfo } from '../types'

interface VehicleInfoFormProps {
  vehicleInfo?: VehicleInfo | null
  onVehicleInfoUpdate: (updates: Partial<VehicleInfo>) => void
  savedVehicles?: VehicleInfo[]
  onSelectSavedVehicle?: (vehicle: VehicleInfo) => void
}

export const VehicleInfoForm: React.FC<VehicleInfoFormProps> = ({
  vehicleInfo,
  onVehicleInfoUpdate,
  savedVehicles = [],
  onSelectSavedVehicle
}) => {
  const currentYear = new Date().getFullYear()
  
  const vehicleYears = Array.from(
    { length: 30 }, 
    (_, i) => currentYear - i
  )

  const popularMakes = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
    'Audi', 'Volkswagen', 'Nissan', 'Hyundai', 'Kia', 'Subaru'
  ]

  const isFormValid = vehicleInfo && 
    vehicleInfo.make && 
    vehicleInfo.model && 
    vehicleInfo.year && 
    vehicleInfo.color && 
    vehicleInfo.licensePlate

  return (
    <div className="space-y-6">
      <div>
        <Heading3 className="mb-2">Vehicle Information</Heading3>
        <BodyText color="secondary">
          Tell us about your vehicle so we can provide the best service
        </BodyText>
      </div>

      {/* Saved Vehicles */}
      {savedVehicles.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star size={20} className="text-content-muted" />
            <Heading3>Your Saved Vehicles</Heading3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {savedVehicles.map((vehicle, index) => (
              <button
                key={index}
                onClick={() => onSelectSavedVehicle?.(vehicle)}
                className="p-4 border border-border rounded-lg text-left hover:border-brand-300 hover:bg-brand-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Car size={20} className="text-brand-600" />
                  </div>
                  <div>
                    <div className="font-medium text-content-primary">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-sm text-content-muted">
                      {vehicle.color} • {vehicle.licensePlate}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <Caption color="muted">
            Or enter vehicle details manually below
          </Caption>
        </Card>
      )}

      {/* Manual Entry Form */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Plus size={20} className="text-content-muted" />
          <Heading3>Enter Vehicle Details</Heading3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Make */}
          <div>
            <label className="block text-sm font-medium text-content-primary mb-2">
              Make <span className="text-content-danger">*</span>
            </label>
            <input
              type="text"
              list="makes"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g., Toyota"
              value={vehicleInfo?.make || ''}
              onChange={(e) => onVehicleInfoUpdate({ make: e.target.value })}
            />
            <datalist id="makes">
              {popularMakes.map(make => (
                <option key={make} value={make} />
              ))}
            </datalist>
          </div>
          
          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-content-primary mb-2">
              Model <span className="text-content-danger">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g., Camry"
              value={vehicleInfo?.model || ''}
              onChange={(e) => onVehicleInfoUpdate({ model: e.target.value })}
            />
          </div>
          
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-content-primary mb-2">
              Year <span className="text-content-danger">*</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              value={vehicleInfo?.year || ''}
              onChange={(e) => onVehicleInfoUpdate({ year: parseInt(e.target.value) })}
            >
              <option value="">Select year</option>
              {vehicleYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-content-primary mb-2">
              Color <span className="text-content-danger">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g., Silver"
              value={vehicleInfo?.color || ''}
              onChange={(e) => onVehicleInfoUpdate({ color: e.target.value })}
            />
          </div>
          
          {/* License Plate */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-content-primary mb-2">
              License Plate <span className="text-content-danger">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="ABC-1234"
              value={vehicleInfo?.licensePlate || ''}
              onChange={(e) => onVehicleInfoUpdate({ 
                licensePlate: e.target.value.toUpperCase() 
              })}
            />
          </div>
        </div>
        
        {/* Form Status */}
        <div className="mt-6 p-4 bg-surface-muted rounded-lg">
          <div className="flex items-center justify-between">
            <Caption color="muted">
              Required fields: Make, Model, Year, Color, License Plate
            </Caption>
            <div className={`flex items-center gap-2 ${
              isFormValid ? 'text-green-600' : 'text-content-muted'
            }`}>
              {isFormValid ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <Caption>Complete</Caption>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-content-muted rounded-full" />
                  <Caption>Incomplete</Caption>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Vehicle Preview */}
      {isFormValid && (
        <Card className="p-6">
          <Heading3 className="mb-4">Vehicle Summary</Heading3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <Car size={24} className="text-brand-600" />
            </div>
            <div>
              <BodyText weight="medium">
                {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
              </BodyText>
              <Caption color="muted">
                {vehicleInfo.color} • License: {vehicleInfo.licensePlate}
              </Caption>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}