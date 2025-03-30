
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { format } from 'date-fns'
import { CheckCircle, Calendar, Clock, Scissors, DollarSign } from 'lucide-react'

export default function BookingSummary({ service, date, time, onConfirm, onBack, isLoading }) {
  const { t } = useTranslation()
  
  return (
    <div className="card-gold">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-gold-600" />
        </div>
        <h2 className="text-xl font-semibold">{t('booking.reviewBooking')}</h2>
      </div>
      
      <div className="space-y-6 mb-8">
        <div className="bg-primary-50 dark:bg-primary-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Scissors className="h-5 w-5 text-gold-500" />
            <h3 className="font-medium">{t('booking.selectedService')}</h3>
          </div>
          <div className="flex justify-between mb-1">
            <span>{service.name}</span>
            <span className="font-semibold">₪{service.price}</span>
          </div>
          <div className="text-sm text-primary-500 dark:text-primary-400">
            {t('booking.serviceDuration', { duration: service.duration })}
          </div>
        </div>
        
        <div className="bg-primary-50 dark:bg-primary-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-gold-500" />
            <h3 className="font-medium">{t('booking.appointmentDate')}</h3>
          </div>
          <div>
            {t('booking.dateSelected', { date: format(date, 'MMMM d, yyyy') })}
          </div>
        </div>
        
        <div className="bg-primary-50 dark:bg-primary-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-gold-500" />
            <h3 className="font-medium">{t('booking.appointmentTime')}</h3>
          </div>
          <div>
            {t('booking.timeSelected', { time })}
          </div>
        </div>
      </div>
      
      <div className="border-t border-primary-200 dark:border-primary-700 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">{t('booking.total')}</div>
          <div className="flex items-center text-xl font-semibold">
            <DollarSign className="h-5 w-5 text-gold-500" />
            ₪{service.price}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="btn-secondary"
          disabled={isLoading}
        >
          {t('booking.back')}
        </button>
        
        <button
          onClick={onConfirm}
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
          ) : (
            t('booking.confirm')
          )}
        </button>
      </div>
    </div>
  )
}
