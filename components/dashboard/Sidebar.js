
'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Calendar, 
  User, 
  Settings, 
  LogOut, 
  X, 
  Home, 
  Moon, 
  Sun, 
  Globe,
  BarChart2,
  Scissors,
  Users
} from 'lucide-react'

export default function Sidebar({ isOpen, onClose, isAdmin = false }) {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { toggleLanguage } = useLanguage()
  const { logout } = useAuth()
  
  const handleLogout = async () => {
    await logout()
    router.push('/')
  }
  
  const clientLinks = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: Home },
    { name: t('appointments.title'), href: '/dashboard/appointments', icon: Calendar },
    { name: t('profile.title'), href: '/dashboard/profile', icon: User },
  ]
  
  const adminLinks = [
    { name: t('admin.dashboardTitle'), href: '/dashboard/admin', icon: BarChart2 },
    { name: t('services.title'), href: '/dashboard/admin/services', icon: Scissors },
    { name: t('admin.manageSchedule'), href: '/dashboard/admin/schedule', icon: Calendar },
    { name: t('admin.quickActions'), href: '/dashboard/admin/clients', icon: Users },
  ]
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-primary-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-primary-800 shadow-lg z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-primary-200 dark:border-primary-700">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold gold-text">Matan Elbaz</span>
            </Link>
            <button 
              onClick={onClose}
              className="p-2 rounded-md text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {clientLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-500'
                      : 'text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700'
                  }`}
                >
                  <link.icon className="mr-3 h-5 w-5" />
                  {link.name}
                </Link>
              ))}
            </div>
            
            {isAdmin && (
              <>
                <div className="mt-8 mb-2">
                  <p className="px-3 text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                    {t('nav.admin')}
                  </p>
                </div>
                <div className="space-y-1">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === link.href
                          ? 'bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-500'
                          : 'text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700'
                      }`}
                    >
                      <link.icon className="mr-3 h-5 w-5" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="p-4 border-t border-primary-200 dark:border-primary-700">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={toggleTheme}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="mr-3 h-5 w-5" />
                    <span>{t('profile.lightMode')}</span>
                  </>
                ) : (
                  <>
                    <Moon className="mr-3 h-5 w-5" />
                    <span>{t('profile.darkMode')}</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700"
              >
                <Globe className="mr-3 h-5 w-5" />
                <span>{t('profile.language')}</span>
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              {t('nav.logout')}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
