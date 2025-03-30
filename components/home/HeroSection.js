
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'
import { Scissors } from 'lucide-react'

export default function HeroSection() {
  const { t } = useTranslation()
  
  return (
    <div className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" 
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {t('home.heroTitle')}
          </h1>
          <p className="text-xl text-primary-200 mb-8">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="btn-primary text-lg px-8 py-3 flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              {t('home.bookNow')}
            </Link>
            <Link href="/services" className="btn-secondary text-lg px-8 py-3 text-white border-white hover:bg-white/10">
              {t('nav.services')}
            </Link>
          </div>
          
          <div className="mt-12 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center text-white font-bold">
                  {i}
                </div>
              ))}
            </div>
            <div className="ml-4">
              <div className="text-gold-400 font-semibold">4.9/5</div>
              <div className="text-primary-300 text-sm">Based on 200+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
