
'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { Scissors, Clock, DollarSign } from 'lucide-react'
import { getServices } from '@/services/serviceService'

export default function ServiceSelection({ onSelect }) {
  const { t } = useTranslation()
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices()
        setServices(data.filter(service => service.isActive))
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchServices()
  }, [])
  
  // If services aren't loaded yet, show sample services
  const sampleServices = [
    {
      id: 1,
      name: 'Kid Cut',
      description: 'Perfect haircut for children under 12',
      price: 45,
      duration: 30
    },
    {
      id: 2,
      name: 'Men Cut',
      description: 'Classic men\'s haircut with precision and style',
      price: 60,
      duration: 45
    },
    {
      id: 3,
      name: 'Men+Beard',
      description: 'Complete haircut and beard trim package',
      price: 80,
      duration: 60
    },
    {
      id: 4,
      name: 'Scissors',
      description: 'Premium scissors cut for longer hair styles',
      price: 90,
      duration: 60
    }
  ]
  
  const displayServices = services.length > 0 ? services : sampleServices
  
  return (
    <div className="card-gold">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
          <Scissors className="h-5 w-5 text-gold-600" />
        </div>
        <h2 className="text-xl font-semibold">{t('booking.selectService')}</h2>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse p-4 border border-primary-200 dark:border-primary-700 rounded-lg">
              <div className="h-6 bg-primary-200 dark:bg-primary-700 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/2 mb-3"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/4"></div>
                <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayServices.map(service => (
            <div
              key={service.id}
              className="p-4 border border-primary-200 dark:border-primary-700 hover:border-gold-300 dark:hover:border-gold-700 rounded-lg cursor-pointer transition-all hover:shadow-gold-md"
              onClick={() => onSelect(service)}
            >
              <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
              <p className="text-primary-500 dark:text-primary-400 text-sm mb-3">
                {service.description}
              </p>
              <div className="flex justify-between">
                <div className="flex items-center text-primary-600 dark:text-primary-300">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-medium">₪{service.price}</span>
                </div>
                <div className="flex items-center text-primary-600 dark:text-primary-300">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{service.duration} {t('services.minutes')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
