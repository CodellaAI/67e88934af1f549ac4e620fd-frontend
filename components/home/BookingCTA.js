
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

export default function BookingCTA() {
  const { t } = useTranslation()
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80')" 
          }}
        ></div>
        
        <div className="relative z-20 py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            {t('home.ctaSubtitle')}
          </p>
          
          <Link href="/booking" className="btn-primary text-lg px-8 py-3 flex items-center gap-2 mx-auto w-fit">
            <Calendar className="h-5 w-5" />
            {t('home.ctaButton')}
          </Link>
          
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mr-3">
                <Calendar className="h-6 w-6 text-gold-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Online Booking</div>
                <div className="text-primary-300 text-sm">24/7 Availability</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mr-3">
                <Calendar className="h-6 w-6 text-gold-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Flexible Scheduling</div>
                <div className="text-primary-300 text-sm">Easy Rescheduling</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mr-3">
                <Calendar className="h-6 w-6 text-gold-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold">SMS Reminders</div>
                <div className="text-primary-300 text-sm">Never Miss an Appointment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
