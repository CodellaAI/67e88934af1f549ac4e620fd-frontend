
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { format } from 'date-fns'
import { Clock, Calendar, User } from 'lucide-react'

export default function RecentBookings({ bookings = [], isLoading }) {
  const { t } = useTranslation()
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-primary-200 dark:bg-primary-700 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-primary-200 dark:bg-primary-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-primary-200 dark:bg-primary-700 rounded w-1/3"></div>
              </div>
              <div className="h-6 bg-primary-200 dark:bg-primary-700 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 mx-auto text-primary-300 dark:text-primary-600 mb-4" />
        <h3 className="text-lg font-medium mb-2">{t('admin.noRecentBookings')}</h3>
        <p className="text-primary-500 dark:text-primary-400 text-sm">
          {t('admin.bookingsWillAppearHere')}
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div key={booking._id} className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">
              {booking.client.firstName} {booking.client.lastName}
            </h4>
            <div className="text-sm text-primary-500 dark:text-primary-400 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(booking.date), 'MMM d, yyyy')}
            </div>
            <div className="text-sm text-primary-500 dark:text-primary-400 flex items-center mt-1">
              <Clock className="h-4 w-4 mr-1" />
              {booking.timeSlot}
            </div>
          </div>
          <div className={`text-sm px-2 py-1 rounded ${
            booking.status === 'confirmed' 
              ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
              : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
          }`}>
            {booking.status === 'confirmed' ? t('admin.confirmed') : t('admin.pending')}
          </div>
        </div>
      ))}
    </div>
  )
}
