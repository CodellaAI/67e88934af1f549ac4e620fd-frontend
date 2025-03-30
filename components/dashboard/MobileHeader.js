
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Menu } from 'lucide-react'

export default function MobileHeader({ onMenuClick }) {
  const { user } = useAuth()
  
  return (
    <header className="bg-white dark:bg-primary-800 shadow-sm lg:hidden">
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex items-center">
          <span className="font-medium">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
    </header>
  )
}
