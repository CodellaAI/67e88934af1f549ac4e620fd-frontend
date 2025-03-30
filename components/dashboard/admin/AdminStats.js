
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Calendar, DollarSign, Users, BarChart } from 'lucide-react'

export default function AdminStats({ stats, isLoading }) {
  const { t } = useTranslation()
  
  const statsConfig = [
    {
      title: t('admin.totalAppointments'),
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: t('admin.totalRevenue'),
      value: stats?.totalRevenue ? `₪${stats.totalRevenue}` : '₪0',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: t('admin.totalClients'),
      value: stats?.totalClients || 0,
      icon: Users,
      color: 'text-gold-500',
      bgColor: 'bg-gold-100 dark:bg-gold-900/20'
    },
    {
      title: t('admin.completionRate'),
      value: stats?.completionRate ? `${stats.completionRate}%` : '0%',
      icon: BarChart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsConfig.map((stat, index) => (
        <div key={index} className="card">
          {isLoading ? (
            <div className="animate-pulse flex items-center">
              <div className={`w-12 h-12 rounded-full bg-primary-200 dark:bg-primary-700 mr-4`}></div>
              <div className="flex-1">
                <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-primary-200 dark:bg-primary-700 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      ))}
    </div>
  )
}
