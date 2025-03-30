
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { BarChart3, Calendar, Settings, Users } from 'lucide-react'
import AdminStats from '@/components/dashboard/admin/AdminStats'
import AppointmentsCalendar from '@/components/dashboard/admin/AppointmentsCalendar'
import RecentBookings from '@/components/dashboard/admin/RecentBookings'
import RevenueChart from '@/components/dashboard/admin/RevenueChart'

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  const [stats, setStats] = useState(null)
  const [recentBookings, setRecentBookings] = useState([])
  const [isStatsLoading, setIsStatsLoading] = useState(true)
  
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])
  
  useEffect(() => {
    // Simulate fetching admin stats
    const fetchAdminStats = async () => {
      setIsStatsLoading(true)
      try {
        // This would be an API call in a real app
        setTimeout(() => {
          setStats({
            totalAppointments: 143,
            totalRevenue: 8750,
            totalClients: 98,
            completionRate: 92
          })
          
          setRecentBookings([
            {
              _id: '1',
              client: { firstName: 'David', lastName: 'Cohen' },
              service: { name: 'Men Cut', price: 60 },
              date: new Date(Date.now() + 86400000), // tomorrow
              timeSlot: '14:00',
              status: 'confirmed'
            },
            {
              _id: '2',
              client: { firstName: 'Noa', lastName: 'Levi' },
              service: { name: 'Kid Cut', price: 45 },
              date: new Date(Date.now() + 86400000 * 2), // day after tomorrow
              timeSlot: '10:30',
              status: 'confirmed'
            },
            {
              _id: '3',
              client: { firstName: 'Yoav', lastName: 'Friedman' },
              service: { name: 'Men+Beard', price: 80 },
              date: new Date(Date.now() + 86400000 * 3),
              timeSlot: '16:00',
              status: 'pending'
            }
          ])
          
          setIsStatsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching admin stats:', error)
        setIsStatsLoading(false)
      }
    }
    
    if (user && user.role === 'admin') {
      fetchAdminStats()
    }
  }, [user])
  
  if (isLoading || (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t('admin.dashboardTitle')}
          </h1>
          <p className="text-primary-500 dark:text-primary-400 mt-1">
            {t('admin.dashboardSubtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t('admin.settings')}
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t('admin.manageSchedule')}
          </button>
        </div>
      </div>
      
      <AdminStats stats={stats} isLoading={isStatsLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card-gold">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-500" />
                {t('admin.appointmentsCalendar')}
              </h2>
              <button className="btn-secondary text-sm">
                {t('admin.viewAll')}
              </button>
            </div>
            
            <AppointmentsCalendar />
          </div>
          
          <div className="card-gold mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gold-500" />
                {t('admin.revenue')}
              </h2>
              <select className="input-primary text-sm">
                <option value="week">{t('admin.thisWeek')}</option>
                <option value="month">{t('admin.thisMonth')}</option>
                <option value="year">{t('admin.thisYear')}</option>
              </select>
            </div>
            
            <RevenueChart />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card-gold">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-gold-500" />
                {t('admin.recentBookings')}
              </h2>
              <button className="btn-secondary text-sm">
                {t('admin.viewAll')}
              </button>
            </div>
            
            <RecentBookings bookings={recentBookings} isLoading={isStatsLoading} />
          </div>
          
          <div className="card-gold mt-8">
            <h2 className="text-xl font-semibold mb-6">
              {t('admin.quickActions')}
            </h2>
            
            <div className="space-y-4">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                {t('admin.addAppointment')}
              </button>
              
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                {t('admin.addClient')}
              </button>
              
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Settings className="w-5 h-5" />
                {t('admin.manageServices')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
