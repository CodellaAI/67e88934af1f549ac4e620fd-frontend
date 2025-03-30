
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Scissors, Clock, DollarSign, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ServicesSection() {
  const { t } = useTranslation()
  
  const services = [
    {
      id: 1,
      name: 'Kid Cut',
      description: 'Perfect haircut for children under 12',
      price: 45,
      duration: 30,
      icon: Scissors
    },
    {
      id: 2,
      name: 'Men Cut',
      description: 'Classic men\'s haircut with precision and style',
      price: 60,
      duration: 45,
      icon: Scissors
    },
    {
      id: 3,
      name: 'Men+Beard',
      description: 'Complete haircut and beard trim package',
      price: 80,
      duration: 60,
      icon: Scissors
    },
    {
      id: 4,
      name: 'Scissors',
      description: 'Premium scissors cut for longer hair styles',
      price: 90,
      duration: 60,
      icon: Scissors
    }
  ]
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('home.servicesTitle')}
        </h2>
        <p className="text-primary-500 dark:text-primary-400 max-w-2xl mx-auto">
          {t('home.servicesSubtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="card-gold group hover:shadow-gold-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center mb-6">
              <service.icon className="h-8 w-8 text-gold-600" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2 group-hover:text-gold-600 transition-colors">
              {service.name}
            </h3>
            
            <p className="text-primary-500 dark:text-primary-400 mb-6">
              {service.description}
            </p>
            
            <div className="flex justify-between mb-6">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-gold-500 mr-1" />
                <span className="font-semibold">₪{service.price}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gold-500 mr-1" />
                <span>{service.duration} min</span>
              </div>
            </div>
            
            <Link 
              href={`/booking?service=${service.id}`} 
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
