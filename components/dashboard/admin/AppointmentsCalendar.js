
'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function AppointmentsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  // Sample appointments data - in a real app, this would come from an API
  const appointments = [
    { date: new Date(2023, 10, 15), count: 3 },
    { date: new Date(2023, 10, 18), count: 5 },
    { date: new Date(2023, 10, 22), count: 2 },
    { date: new Date(2023, 10, 25), count: 4 },
    { date: new Date(2023, 10, 28), count: 1 },
  ]
  
  const onDateClick = (day) => {
    setSelectedDate(day)
  }
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }
  
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-700">
          <ChevronLeft className="h-5 w-5" />
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
        
        // Find appointments for this day
        const dayAppointments = appointments.find(a => isSameDay(a.date, day))
        const appointmentCount = dayAppointments ? dayAppointments.count : 0
        
        days.push(
          <div
            key={day}
            className={`h-14 border border-primary-200 dark:border-primary-700 p-1 ${
              !isSameMonth(day, monthStart)
                ? 'text-primary-400 dark:text-primary-600 bg-primary-50 dark:bg-primary-800/50'
                : isSameDay(day, selectedDate)
                ? 'bg-gold-100 dark:bg-gold-900/30 border-gold-300 dark:border-gold-700'
                : ''
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between items-start h-full">
              <span className={`text-sm ${
                isSameDay(day, new Date())
                  ? 'bg-gold-500 text-white w-5 h-5 rounded-full flex items-center justify-center'
                  : ''
              }`}>
                {formattedDate}
              </span>
              {appointmentCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  {appointmentCount}
                </span>
              )}
            </div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      )
      days = []
    }
    
    return <div className="mb-2">{rows}</div>
  }
  
  return (
    <div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}
