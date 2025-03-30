
'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { format, parseISO, isAfter } from 'date-fns'
import { Calendar, Clock, Scissors, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import { Dialog } from '@headlessui/react'
import { cancelAppointment } from '@/services/appointmentService'

export default function AppointmentCard({ appointment, isUpcoming }) {
  const { t } = useTranslation()
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  
  const handleCancel = async () => {
    setIsLoading(true)
    try {
      await cancelAppointment(appointment._id)
      setIsCancelled(true)
    } catch (error) {
      console.error('Error cancelling appointment:', error)
    } finally {
      setIsLoading(false)
      setIsCancelDialogOpen(false)
    }
  }
  
  const formattedDate = format(new Date(appointment.date), 'MMMM d, yyyy')
  const isPastAppointment = !isAfter(new Date(appointment.date), new Date())
  
  // Check if appointment is within 24 hours
  const isWithin24Hours = isAfter(
    new Date(appointment.date),
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  )
  
  return (
    <div className={`card relative ${isCancelled ? 'opacity-50' : ''}`}>
      {isCancelled && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-900/10 backdrop-blur-sm rounded-lg">
          <div className="bg-white dark:bg-primary-800 px-4 py-2 rounded-md shadow-md">
            <span className="font-medium text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {t('appointments.cancelled')}
            </span>
          </div>
        </div>
      )}
      
      {appointment.status === 'completed' && (
        <div className="absolute top-2 right-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs py-1 px-2 rounded-full flex items-center">
          <CheckCircle className="w-3 h-3 mr-1" />
          {t('appointments.completed')}
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{appointment.service.name}</h3>
          <div className="flex items-center text-primary-500 dark:text-primary-400 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-primary-500 dark:text-primary-400 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            <span>{appointment.timeSlot}</span>
          </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-gold-100 dark:bg-gold-900/20 rounded-full">
          <Scissors className="w-5 h-5 text-gold-600" />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="flex justify-between mb-2">
          <span className="text-primary-500 dark:text-primary-400 text-sm">
            {t('services.price')}
          </span>
          <span className="font-semibold">₪{appointment.service.price}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-primary-500 dark:text-primary-400 text-sm">
            {t('services.duration')}
          </span>
          <span className="font-semibold">{appointment.service.duration} {t('services.minutes')}</span>
        </div>
      </div>
      
      {isUpcoming && !isCancelled && (
        <div className="flex justify-between mt-6">
          <button className="btn-primary flex items-center gap-1 text-sm">
            <ChevronRight className="w-4 h-4" />
            {t('appointments.reschedule')}
          </button>
          
          <button 
            className="btn-secondary text-red-500 hover:text-red-600 border-red-500 hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm"
            onClick={() => setIsCancelDialogOpen(true)}
            disabled={isWithin24Hours}
          >
            {t('appointments.cancel')}
          </button>
        </div>
      )}
      
      {isPastAppointment && !isCancelled && (
        <div className="flex justify-end mt-6">
          <button className="btn-secondary text-sm">
            {t('appointments.bookAgain')}
          </button>
        </div>
      )}
      
      <Dialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-primary-800 p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {t('appointments.cancelTitle')}
            </Dialog.Title>
            
            <p className="mb-6">
              {t('appointments.cancelConfirmation', { 
                service: appointment.service.name,
                date: formattedDate,
                time: appointment.timeSlot
              })}
            </p>
            
            <div className="flex justify-end gap-2">
              <button
                className="btn-secondary"
                onClick={() => setIsCancelDialogOpen(false)}
                disabled={isLoading}
              >
                {t('appointments.keepAppointment')}
              </button>
              <button
                className="btn-secondary text-red-500 hover:text-red-600 border-red-500 hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                ) : (
                  t('appointments.confirmCancel')
                )}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
