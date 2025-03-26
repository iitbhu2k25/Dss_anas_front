'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Circle, Clock } from 'lucide-react'

export default function StatusBar({ 
  steps = [
    { id: 'personal-info', name: 'Population Forecasting', href: '/form/personal-info' },
    { id: 'address', name: 'Water Demand', href: '/form/address' },
    { id: 'employment', name: 'Water Supply', href: '/form/employment' },
    { id: 'documents', name: 'Water Supply', href: '/form/documents' },
  ],
  currentStepId = 'personal-info' 
}) {
  const [hoveredStep, setHoveredStep] = useState(null)

  // Determine the status of each step
  const getStepStatus = (stepId) => {
    // Find the current step index
    const currentIndex = steps.findIndex(step => step.id === currentStepId)
    // Find the target step index
    const targetIndex = steps.findIndex(step => step.id === stepId)
    
    if (targetIndex < currentIndex) return 'completed'
    if (targetIndex === currentIndex) return 'current'
    return 'upcoming'
  }

  return (
    <div className="bg-gray-100 border-r border-gray-200 w-64 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700">Status Bar </h2>
        <p className="text-sm text-gray-500">Complete all steps to Generate Report </p>
      </div>
      
      <nav aria-label="Progress">
        <ol className="space-y-4">
          {steps.map((step, stepIdx) => {
            const status = getStepStatus(step.id)
            
            return (
              <li key={step.id} className="relative">
                <div className="flex items-center">
                  {status === 'completed' ? (
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ) : status === 'current' ? (
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <Circle className="h-5 w-5 text-gray-300" />
                    </div>
                  )}
                  
                  <div className="ml-3">
                    <Link
                      href={step.href}
                      className={`text-sm font-medium ${
                        status === 'completed' ? 'text-green-500 hover:text-green-700' :
                        status === 'current' ? 'text-blue-500 hover:text-blue-700' :
                        'text-gray-500 hover:text-gray-700'
                      }`}
                      onMouseEnter={() => setHoveredStep(step.id)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {step.name}
                    </Link>
                    
                    {/* Show step details on hover */}
                    {hoveredStep === step.id && (
                      <div className="mt-1 text-xs text-gray-500">
                        {status === 'completed' && 'Completed'}
                        {status === 'current' && 'In progress'}
                        {status === 'upcoming' && 'Not started'}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Connect the steps with a line */}
                {stepIdx < steps.length - 1 && (
                  <div className="absolute left-2.5 top-7 -ml-px h-full w-0.5 bg-gray-200" />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Application ID: <span className="font-medium">APP-{Math.floor(10000 + Math.random() * 90000)}</span>
          </div>
          <div className="text-xs text-gray-500">
            <span className="font-medium">
              {steps.findIndex(step => step.id === currentStepId) + 1}/{steps.length}
            </span> steps
          </div>
        </div>
      </div>
    </div>
  )
}