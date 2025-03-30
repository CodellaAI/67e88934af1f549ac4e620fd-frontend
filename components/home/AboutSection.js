
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Scissors, Award, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function AboutSection() {
  const { t } = useTranslation()
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.aboutTitle')}
          </h2>
          <p className="text-primary-500 dark:text-primary-400 mb-6">
            {t('home.aboutSubtitle')}
          </p>
          
          <p className="mb-6">
            Matan Elbaz brings over 15 years of experience to his craft, having trained with master barbers across Europe and the Middle East. His approach combines traditional techniques with modern styles, ensuring each client receives a personalized experience.
          </p>
          
          <p className="mb-8">
            At our barbershop, we believe that a great haircut is more than just a service—it's an experience. That's why we've created a space where clients can relax, enjoy premium service, and leave looking and feeling their best.
          </p>
          
          <Link href="/about" className="btn-secondary">
            Learn More About Us
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
              alt="Barber shop"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="relative h-64 rounded-lg overflow-hidden mt-12">
            <img 
              src="https://images.unsplash.com/photo-1635273051937-a0d1a4a0dda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
              alt="Haircut"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="relative h-64 rounded-lg overflow-hidden -mt-12">
            <img 
              src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
              alt="Beard trim"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1593702288056-f9fe0a5b56de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
              alt="Barber tools"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        <div className="card-gold text-center">
          <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center mx-auto mb-4">
            <Scissors className="h-8 w-8 text-gold-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Premium Cuts</h3>
          <p className="text-primary-500 dark:text-primary-400">
            Expert haircuts tailored to your style and preferences
          </p>
        </div>
        
        <div className="card-gold text-center">
          <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-gold-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
          <p className="text-primary-500 dark:text-primary-400">
            Award-winning barbers with years of experience
          </p>
        </div>
        
        <div className="card-gold text-center">
          <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-gold-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Efficient Booking</h3>
          <p className="text-primary-500 dark:text-primary-400">
            Easy online scheduling with real-time availability
          </p>
        </div>
        
        <div className="card-gold text-center">
          <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gold-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Loyal Clients</h3>
          <p className="text-primary-500 dark:text-primary-400">
            Join our community of satisfied customers
          </p>
        </div>
      </div>
    </div>
  )
}
