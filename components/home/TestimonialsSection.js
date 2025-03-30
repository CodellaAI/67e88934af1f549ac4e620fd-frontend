
'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  
  const testimonials = [
    {
      id: 1,
      name: 'David Cohen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'Best haircut I\'ve ever had. Matan took the time to understand what I wanted and delivered perfectly. The atmosphere is relaxing and professional.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Yossi Levi',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      rating: 5,
      text: 'I\'ve been coming to Matan for over a year now. He\'s consistent, skilled, and always makes me feel welcome. The online booking system is also very convenient.',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Avi Goldstein',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      rating: 4,
      text: 'Great service and attention to detail. My beard has never looked better. The shop is clean and modern, and the staff is friendly.',
      date: '2 months ago'
    }
  ]
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }
  
  return (
    <div className="bg-primary-50 dark:bg-primary-900/50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.testimonialsTitle')}
          </h2>
          <p className="text-primary-500 dark:text-primary-400 max-w-2xl mx-auto">
            {t('home.testimonialsSubtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white dark:bg-primary-800 shadow-md flex items-center justify-center text-primary-500 hover:text-gold-500 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white dark:bg-primary-800 shadow-md flex items-center justify-center text-primary-500 hover:text-gold-500 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="card-gold relative">
                    <div className="absolute top-6 right-6 text-gold-500">
                      <Quote className="h-12 w-12 opacity-20" />
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating 
                                  ? 'text-gold-500 fill-gold-500' 
                                  : 'text-primary-300'
                              }`}
                            />
                          ))}
                          <span className="text-primary-500 dark:text-primary-400 text-sm ml-2">
                            {testimonial.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                  index === activeIndex 
                    ? 'bg-gold-500' 
                    : 'bg-primary-300 dark:bg-primary-700'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
