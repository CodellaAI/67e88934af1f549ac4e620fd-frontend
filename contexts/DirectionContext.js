
'use client'

import { createContext, useContext, useEffect } from 'react'
import { useLanguage } from './LanguageContext'

const DirectionContext = createContext()

export default function DirectionProvider({ children }) {
  const { language } = useLanguage()
  
  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    
    // Add appropriate class to body
    if (language === 'he') {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }, [language])
  
  const direction = language === 'he' ? 'rtl' : 'ltr'
  
  return (
    <DirectionContext.Provider value={{ direction }}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection() {
  const context = useContext(DirectionContext)
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider')
  }
  return context
}
