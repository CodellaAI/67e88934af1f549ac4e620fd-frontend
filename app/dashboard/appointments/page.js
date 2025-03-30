
'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { Calendar, Filter, Plus, Search, X } from 'lucide-react'
import { format } from 'date-fns'
import { getUserAppointments } from '@/services/appointmentService'
import AppointmentCard from '@/components/dashboard/AppointmentCard'
import { Popover } from '@headlessui/react'

export default function Appointments() {
  const { t } = useTranslation()
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  
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
  
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by search term
    const searchMatch = 
      appointment.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(new Date(appointment.date), 'MMMM d, yyyy').toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter by status
    let statusMatch = true
    const appointmentDate = new Date(appointment.date)
    const today = new Date()
    
    if (filterStatus === 'upcoming') {
      statusMatch = appointmentDate >= today
    } else if (filterStatus === 'past') {
      statusMatch = appointmentDate < today
    }
    
    // Filter by date range
    let dateMatch = true
    if (dateRange.start && dateRange.end) {
      dateMatch = appointmentDate >= dateRange.start && appointmentDate <= dateRange.end
    }
    
    return searchMatch && statusMatch && dateMatch
  }).sort((a, b) => {
    // Sort by date (upcoming first, then past)
    return new Date(a.date) - new Date(b.date)
  })
  
  const clearFilters = () => {
    setSearchTerm('')
    setFilterStatus('all')
    setDateRange({ start: null, end: null })
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{t('appointments.title')}</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {t('appointments.newAppointment')}
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-primary-400" />
          </div>
          <input
            type="text"
            className="input-primary pl-10 w-full"
            placeholder={t('appointments.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="input-primary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{t('appointments.filterAll')}</option>
            <option value="upcoming">{t('appointments.filterUpcoming')}</option>
            <option value="past">{t('appointments.filterPast')}</option>
          </select>
          
          <Popover className="relative">
            <Popover.Button className="input-primary flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="hidden md:inline">{t('appointments.dateRange')}</span>
            </Popover.Button>
            
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-screen max-w-xs sm:max-w-sm transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-white dark:bg-primary-800 p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t('appointments.selectDateRange')}</h3>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        {t('appointments.startDate')}
                      </label>
                      <input
                        type="date"
                        className="input-primary w-full"
                        value={dateRange.start ? format(dateRange.start, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setDateRange({
                          ...dateRange,
                          start: e.target.value ? new Date(e.target.value) : null
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        {t('appointments.endDate')}
                      </label>
                      <input
                        type="date"
                        className="input-primary w-full"
                        value={dateRange.end ? format(dateRange.end, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setDateRange({
                          ...dateRange,
                          end: e.target.value ? new Date(e.target.value) : null
                        })}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button
                        className="btn-secondary"
                        onClick={() => setDateRange({ start: null, end: null })}
                      >
                        {t('appointments.clear')}
                      </button>
                      <Popover.Button className="btn-primary">
                        {t('appointments.apply')}
                      </Popover.Button>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
          
          {(searchTerm || filterStatus !== 'all' || dateRange.start || dateRange.end) && (
            <button
              className="btn-secondary flex items-center gap-2"
              onClick={clearFilters}
            >
              <X className="h-5 w-5" />
              <span className="hidden md:inline">{t('appointments.clearFilters')}</span>
            </button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card animate-pulse h-48">
              <div className="h-6 bg-primary-200 dark:bg-primary-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-2/3 mb-3"></div>
              <div className="mt-auto h-10 bg-primary-200 dark:bg-primary-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map(appointment => (
            <AppointmentCard 
              key={appointment._id} 
              appointment={appointment} 
              isUpcoming={new Date(appointment.date) >= new Date()}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Filter className="w-12 h-12 text-primary-300 dark:text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('appointments.noAppointmentsFound')}</h3>
          <p className="text-primary-500 dark:text-primary-400 mb-6">
            {t('appointments.tryDifferentFilters')}
          </p>
          <button className="btn-primary" onClick={clearFilters}>
            {t('appointments.clearAllFilters')}
          </button>
        </div>
      )}
    </div>
  )
}
