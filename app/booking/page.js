
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuth } from '@/contexts/AuthContext'
import BookingCalendar from '@/components/booking/BookingCalendar'
import ServiceSelection from '@/components/booking/ServiceSelection'
import TimeSlotSelection from '@/components/booking/TimeSlotSelection'
import BookingSummary from '@/components/booking/BookingSummary'
import BookingSteps from '@/components/booking/BookingSteps'
import { getAvailableTimeSlots, createAppointment } from '@/services/appointmentService'

export default function Booking() {
  const { t } = useTranslation()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/booking')
    }
  }, [isAuthenticated, router])
  
  useEffect(() => {
    if (selectedDate && selectedService) {
      setIsLoading(true)
      getAvailableTimeSlots(selectedDate, selectedService.id)
        .then(slots => {
          setAvailableTimeSlots(slots)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching time slots:', error)
          setIsLoading(false)
        })
    }
  }, [selectedDate, selectedService])
  
  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentStep(2)
  }
  
  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setCurrentStep(3)
  }
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setCurrentStep(4)
  }
  
  const handleBookingConfirm = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return
    
    setIsLoading(true)
    try {
      await createAppointment({
        serviceId: selectedService.id,
        date: selectedDate,
        timeSlot: selectedTime,
        userId: user.id
      })
      setBookingComplete(true)
      setCurrentStep(5)
    } catch (error) {
      console.error('Error creating appointment:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('booking.title')}</h1>
      
      <BookingSteps currentStep={currentStep} />
      
      <div className="max-w-3xl mx-auto mt-8">
        {currentStep === 1 && (
          <ServiceSelection onSelect={handleServiceSelect} />
        )}
        
        {currentStep === 2 && (
          <BookingCalendar 
            onDateSelect={handleDateSelect} 
            onBack={handleBackStep}
            selectedService={selectedService}
          />
        )}
        
        {currentStep === 3 && (
          <TimeSlotSelection 
            timeSlots={availableTimeSlots}
            onTimeSelect={handleTimeSelect}
            onBack={handleBackStep}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 4 && (
          <BookingSummary 
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            onConfirm={handleBookingConfirm}
            onBack={handleBackStep}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 5 && bookingComplete && (
          <div className="card-gold text-center">
            <h2 className="text-2xl font-bold mb-4">{t('booking.confirmationTitle')}</h2>
            <p className="mb-6">{t('booking.confirmationMessage')}</p>
            <button 
              className="btn-primary"
              onClick={() => router.push('/dashboard')}
            >
              {t('booking.viewAppointments')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
