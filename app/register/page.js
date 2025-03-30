
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function Register() {
  const { register } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError(t('register.passwordMismatch'))
      return false
    }
    
    if (formData.password.length < 8) {
      setError(t('register.passwordTooShort'))
      return false
    }
    
    // Basic phone validation
    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!phoneRegex.test(formData.phone)) {
      setError(t('register.invalidPhone'))
      return false
    }
    
    return true
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
      router.push('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || t('register.genericError'))
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="card-gold">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{t('register.title')}</h1>
            <p className="text-primary-500 dark:text-primary-400 mt-2">
              {t('register.subtitle')}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  {t('register.firstNameLabel')}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder={t('register.firstNamePlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  {t('register.lastNameLabel')}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder={t('register.lastNamePlaceholder')}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('register.emailLabel')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder={t('register.emailPlaceholder')}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                {t('register.phoneLabel')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder={t('register.phonePlaceholder')}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                {t('register.passwordLabel')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="input-primary w-full pr-10"
                  placeholder={t('register.passwordPlaceholder')}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-primary-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary-500" />
                  )}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                {t('register.confirmPasswordLabel')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder={t('register.confirmPasswordPlaceholder')}
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
              ) : (
                <UserPlus className="h-5 w-5" />
              )}
              {t('register.submitButton')}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-primary-600 dark:text-primary-400">
              {t('register.haveAccount')}{' '}
              <Link href="/login" className="text-gold-600 hover:text-gold-500 font-medium">
                {t('register.loginLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
