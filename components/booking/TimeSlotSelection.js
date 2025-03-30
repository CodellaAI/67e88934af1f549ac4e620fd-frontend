
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { format } from 'date-fns'
import { Clock, Calendar } from 'lucide-react'

export default function TimeSlotSelection({ timeSlots, onTimeSelect, onBack, isLoading }) {
  const { t } = useTranslation()
  
  // Sample time slots for demonstration
  const sampleTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]
  
  const displayTimeSlots = timeSlots.length > 0 ? timeSlots : sampleTimeSlots
  
  return (
    <div className="card-gold">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
          <Clock className="h-5 w-5 text-gold-600" />
        </div>
        <h2 className="text-xl font-semibold">{t('booking.selectTime')}</h2>
      </div>
      
      <div className="bg-primary-50 dark:bg-primary-800 rounded-lg p-4 mb-6 flex items-center">
        <Calendar className="h-5 w-5 text-primary-500 dark:text-primary-400 mr-2" />
        <span className="font-medium">
          {format(new Date(), 'MMMM d, yyyy')}
        </span>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
          {[...Array(12)].map((_, index) => (
            <div 
              key={index}
              className="h-10 bg-primary-200 dark:bg-primary-700 rounded animate-pulse"
            ></div>
          ))}
        </div>
      ) : displayTimeSlots.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
          {displayTimeSlots.map((time) => (
            <button
              key={time}
              className="py-2 px-3 border border-primary-200 dark:border-primary-700 hover:border-gold-300 dark:hover:border-gold-700 rounded-md text-center hover:bg-gold-50 dark:hover:bg-gold-900/10 transition-colors"
              onClick={() => onTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-6">
          <Clock className="h-12 w-12 mx-auto text-primary-300 dark:text-primary-600 mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('booking.noTimeSlots')}</h3>
        </div>
      )}
      
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          {t('booking.back')}
        </button>
      </div>
    </div>
  )
}
