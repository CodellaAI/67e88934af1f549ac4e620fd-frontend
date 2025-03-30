
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const { t } = useTranslation()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      await login(email, password)
      router.push(redirect)
    } catch (err) {
      setError(err.response?.data?.message || t('login.genericError'))
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card-gold">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{t('login.title')}</h1>
            <p className="text-primary-500 dark:text-primary-400 mt-2">
              {t('login.subtitle')}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('login.emailLabel')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary w-full"
                placeholder={t('login.emailPlaceholder')}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                {t('login.passwordLabel')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-primary w-full pr-10"
                  placeholder={t('login.passwordPlaceholder')}
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
              <div className="flex justify-end mt-2">
                <Link href="/forgot-password" className="text-sm text-gold-600 hover:text-gold-500">
                  {t('login.forgotPassword')}
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
              ) : (
                <LogIn className="h-5 w-5" />
              )}
              {t('login.submitButton')}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-primary-600 dark:text-primary-400">
              {t('login.noAccount')}{' '}
              <Link href="/register" className="text-gold-600 hover:text-gold-500 font-medium">
                {t('login.registerLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
