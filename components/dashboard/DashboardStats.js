
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Calendar, Clock, Star, Scissors } from 'lucide-react'

export default function DashboardStats() {
  const { t } = useTranslation()
  
  const stats = [
    {
      title: t('dashboard.totalAppointments'),
      value: '12',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: t('dashboard.upcomingAppointments'),
      value: '2',
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: t('dashboard.favoriteService'),
      value: 'Men Cut',
      icon: Scissors,
      color: 'text-gold-500',
      bgColor: 'bg-gold-100 dark:bg-gold-900/20'
    },
    {
      title: t('dashboard.loyaltyPoints'),
      value: '120',
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-primary-500 dark:text-primary-400 text-sm">
                {stat.title}
              </p>
              <p className="text-2xl font-semibold">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
