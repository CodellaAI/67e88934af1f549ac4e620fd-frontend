
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { format, parseISO } from 'date-fns'
import { Calendar, Clock, Scissors } from 'lucide-react'
import { getUserAppointments } from '@/services/appointmentService'
import AppointmentCard from '@/components/dashboard/AppointmentCard'
import DashboardStats from '@/components/dashboard/DashboardStats'

export default function Dashboard() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getUserAppointments()
        setAppointments(data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAppointments()
  }, [])
  
  const upcomingAppointments = appointments.filter(
    app => new Date(app.date) >= new Date()
  ).sort((a, b) => new Date(a.date) - new Date(b.date))
  
  const pastAppointments = appointments.filter(
    app => new Date(app.date) < new Date()
  ).sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t('dashboard.welcomeMessage', { name: user?.firstName })}
          </h1>
          <p className="text-primary-500 dark:text-primary-400 mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <button className="btn-primary">
          {t('dashboard.newAppointment')}
        </button>
      </div>
      
      <DashboardStats />
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gold-500" />
          {t('dashboard.upcomingAppointments')}
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="card animate-pulse h-48">
                <div className="h-6 bg-primary-200 dark:bg-primary-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-2/3 mb-3"></div>
                <div className="mt-auto h-10 bg-primary-200 dark:bg-primary-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : upcomingAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingAppointments.map(appointment => (
              <AppointmentCard 
                key={appointment._id} 
                appointment={appointment} 
                isUpcoming={true}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Scissors className="w-12 h-12 text-primary-300 dark:text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('dashboard.noUpcomingAppointments')}</h3>
            <p className="text-primary-500 dark:text-primary-400 mb-6">
              {t('dashboard.bookAppointmentMessage')}
            </p>
            <button className="btn-primary">
              {t('dashboard.bookNow')}
            </button>
          </div>
        )}
      </div>
      
      {pastAppointments.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-500" />
            {t('dashboard.pastAppointments')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastAppointments.slice(0, 3).map(appointment => (
              <AppointmentCard 
                key={appointment._id} 
                appointment={appointment} 
                isUpcoming={false}
              />
            ))}
          </div>
          
          {pastAppointments.length > 3 && (
            <div className="text-center">
              <button className="btn-secondary">
                {t('dashboard.viewAllAppointments')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
