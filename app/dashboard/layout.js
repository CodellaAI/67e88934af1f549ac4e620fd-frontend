
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from '@/components/dashboard/Sidebar'
import MobileHeader from '@/components/dashboard/MobileHeader'
import { useTranslation } from '@/hooks/useTranslation'

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard')
    }
  }, [isAuthenticated, isLoading, router])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return null
  }
  
  return (
    <div className="flex h-screen bg-primary-50 dark:bg-primary-900">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isAdmin={user?.role === 'admin'} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary-50 dark:bg-primary-900 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
