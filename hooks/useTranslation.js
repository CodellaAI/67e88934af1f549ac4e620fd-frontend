
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import translations from '@/locales/translations'

export function useTranslation() {
  const { language } = useLanguage()
  
  const t = (key, params = {}) => {
    // Split the key by dots to navigate nested objects
    const keys = key.split('.')
    
    // Start with the translations for the current language
    let value = translations[language]
    
    // Navigate through the nested objects
    for (const k of keys) {
      if (value && Object.prototype.hasOwnProperty.call(value, k)) {
        value = value[k]
      } else {
        // If the key doesn't exist, return the key itself
        return key
      }
    }
    
    // If the value is not a string, return the key
    if (typeof value !== 'string') {
      return key
    }
    
    // Replace parameters in the string
    return value.replace(/{(\w+)}/g, (match, paramName) => {
      return params[paramName] !== undefined ? params[paramName] : match
    })
  }
  
  return { t, language }
}
