import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Users, Calendar, TrendingUp, Activity } from 'lucide-react'
import { dashboardService } from '@/services/api'

/**
 * HR Dashboard page component
 * Displays key metrics and navigation for HR users
 */
export const HRDashboard: React.FC = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['hr-dashboard'],
    queryFn: dashboardService.getHRMetrics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-destructive/10 p-4">
        <p className="text-sm text-destructive">
          Error loading dashboard data. Please try again.
        </p>
      </div>
    )
  }

  // Mock data for demo purposes
  const mockMetrics = {
    employeeCount: 24,
    pendingLeaveRequests: 7,
    recentActivity: [
      { id: 1, action: 'Leave request approved', employee: 'John Doe', time: '2 hours ago' },
      { id: 2, action: 'New employee added', employee: 'Jane Smith', time: '4 hours ago' },
      { id: 3, action: 'Leave request submitted', employee: 'Mike Johnson', time: '6 hours ago' },
    ],
  }

  const dashboardData = metrics || mockMetrics

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employee count */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.employeeCount}</p>
            </div>
          </div>
        </div>

        {/* Pending leave requests */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Leave Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.pendingLeaveRequests}</p>
            </div>
          </div>
        </div>

        {/* System status */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-2xl font-semibold text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {dashboardData.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.employee}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-primary w-full">
            <Users className="h-4 w-4 mr-2" />
            Manage Employees
          </button>
          <button className="btn-secondary w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Review Leave Requests
          </button>
        </div>
      </div>
    </div>
  )
}
