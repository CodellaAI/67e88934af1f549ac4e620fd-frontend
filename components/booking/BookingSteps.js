
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Check, Scissors, Calendar, Clock, CheckCircle } from 'lucide-react'

export default function BookingSteps({ currentStep }) {
  const { t } = useTranslation()
  
  const steps = [
    { id: 1, name: t('booking.selectService'), icon: Scissors },
    { id: 2, name: t('booking.selectDate'), icon: Calendar },
    { id: 3, name: t('booking.selectTime'), icon: Clock },
    { id: 4, name: t('booking.reviewBooking'), icon: CheckCircle },
  ]
  
  return (
    <div className="hidden md:block">
      <div className="border-b border-primary-200 dark:border-primary-700 pb-8">
        <nav className="flex justify-center" aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                {step.id < currentStep ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gold-500"></div>
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 group">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : step.id === currentStep ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-primary-200 dark:bg-primary-700"></div>
                    </div>
                    <div
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold-500 bg-white dark:bg-primary-800"
                      aria-current="step"
                    >
                      <step.icon className="h-4 w-4 text-gold-500" aria-hidden="true" />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-primary-200 dark:bg-primary-700"></div>
                    </div>
                    <div
                      className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-300 dark:border-primary-600 bg-white dark:bg-primary-800"
                    >
                      <step.icon className="h-4 w-4 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                )}
                
                {stepIdx !== steps.length - 1 && (
                  <div className="hidden sm:block absolute top-0 right-0 translate-x-1/2 mt-0.5 text-xs font-medium text-primary-500 dark:text-primary-400">
                    {step.name}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
