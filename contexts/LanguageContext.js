
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LanguageContext = createContext()

export default function LanguageProvider({ children }) {
  const router = useRouter()
  const [language, setLanguage] = useState('en')
  
  useEffect(() => {
    // Initialize language from localStorage or browser preference
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
      setLanguage(storedLanguage)
    } else {
      // Use browser language if available and supported
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'he') {
        setLanguage('he')
      }
    }
  }, [])
  
  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem('language', language)
  }, [language])
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'he' : 'en')
  }
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
