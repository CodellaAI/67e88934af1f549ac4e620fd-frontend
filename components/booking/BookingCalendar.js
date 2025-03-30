
'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, isAfter, isBefore } from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export default function BookingCalendar({ onDateSelect, onBack, selectedService }) {
  const { t } = useTranslation()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  
  const today = new Date()
  
  const onDateClick = (day) => {
    // Prevent selecting dates in the past
    if (isBefore(day, today) && !isSameDay(day, today)) {
      return
    }
    
    setSelectedDate(day)
  }
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }
  
  const prevMonth = () => {
    // Prevent going to past months
    if (isSameMonth(subMonths(currentMonth, 1), today) || isAfter(subMonths(currentMonth, 1), today)) {
      setCurrentMonth(subMonths(currentMonth, 1))
    }
  }
  
  const handleContinue = () => {
    if (selectedDate) {
      onDateSelect(selectedDate)
    }
  }
  
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth} 
          className="p-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-700"
          disabled={isSameMonth(currentMonth, today)}
        >
          <ChevronLeft className={`h-5 w-5 ${
            isSameMonth(currentMonth, today) ? 'text-primary-300 dark:text-primary-600' : ''
          }`} />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-700">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    )
  }
  
  const renderDays = () => {
    const days = []
    const dateFormat = 'EEEEEE'
    
    let startDate = startOfWeek(currentMonth)
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-sm text-primary-500 dark:text-primary-400 font-medium">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    
    return <div className="grid grid-cols-7 mb-2">{days}</div>
  }
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd')
        const cloneDay = day
        
        // Check if the day is in the past
        const isInPast = isBefore(day, today) && !isSameDay(day, today)
        
        days.push(
          <div
            key={day}
            className={`h-12 flex items-center justify-center ${
              !isSameMonth(day, monthStart)
                ? 'text-primary-300 dark:text-primary-600'
                : isSameDay(day, selectedDate)
                ? 'bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-500 rounded-lg'
                : isSameDay(day, today)
                ? 'text-gold-700 dark:text-gold-500 font-bold'
                : ''
            } ${
              isInPast 
                ? 'text-primary-300 dark:text-primary-600 cursor-not-allowed'
                : 'cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-700 rounded-lg'
            }`}
            onClick={() => !isInPast && onDateClick(cloneDay)}
          >
            {formattedDate}
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      )
      days = []
    }
    
    return <div className="space-y-1">{rows}</div>
  }
  
  return (
    <div className="card-gold">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
          <CalendarIcon className="h-5 w-5 text-gold-600" />
        </div>
        <h2 className="text-xl font-semibold">{t('booking.selectDate')}</h2>
      </div>
      
      {selectedService && (
        <div className="bg-primary-50 dark:bg-primary-800 rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">{t('booking.selectedService')}</h3>
          <div className="flex justify-between">
            <span>{selectedService.name}</span>
            <span className="font-semibold">₪{selectedService.price}</span>
          </div>
          <div className="text-sm text-primary-500 dark:text-primary-400 mt-1">
            {t('booking.serviceDuration', { duration: selectedService.duration })}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          {t('booking.back')}
        </button>
        
        <button
          onClick={handleContinue}
          className="btn-primary"
          disabled={!selectedDate}
        >
          {t('booking.next')}
        </button>
      </div>
    </div>
  )
}
