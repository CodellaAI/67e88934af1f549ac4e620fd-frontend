
'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '@/contexts/ThemeContext'

export default function RevenueChart() {
  const { theme } = useTheme()
  const [hoveredBar, setHoveredBar] = useState(null)
  
  // Sample data - in a real app, this would come from an API
  const data = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 900 },
    { name: 'Wed', revenue: 1500 },
    { name: 'Thu', revenue: 1100 },
    { name: 'Fri', revenue: 1800 },
    { name: 'Sat', revenue: 2100 },
    { name: 'Sun', revenue: 800 },
  ]
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-primary-800 p-2 border border-primary-200 dark:border-primary-700 rounded shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-gold-600">{`₪${payload[0].value}`}</p>
        </div>
      )
    }
    
    return null
  }
  
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          onMouseMove={(e) => {
            if (e.activeTooltipIndex !== undefined) {
              setHoveredBar(e.activeTooltipIndex)
            } else {
              setHoveredBar(null)
            }
          }}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
            axisLine={{ stroke: theme === 'dark' ? '#374151' : '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
            axisLine={{ stroke: theme === 'dark' ? '#374151' : '#e5e7eb' }}
            tickLine={false}
            tickFormatter={(value) => `₪${value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey="revenue"
            radius={[4, 4, 0, 0]}
            fill={(data, index) => (index === hoveredBar ? '#f3c728' : '#f5d456')}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
