import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { User, Calendar, Clock, FileText } from 'lucide-react'
import { dashboardService } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Employee Dashboard page component
 * Displays personal information and leave management for employees
 */
export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth()
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['employee-dashboard'],
    queryFn: dashboardService.getEmployeeData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
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
  const mockData = {
    personalInfo: {
      id: '1',
      userId: '1',
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Software Developer',
      hireDate: new Date('2023-01-15'),
      isActive: true,
      leaveBalance: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    leaveBalance: 15,
    recentRequests: [
      {
        id: '1',
        employeeId: '1',
        leaveType: 'vacation',
        startDate: new Date('2024-12-20'),
        endDate: new Date('2024-12-22'),
        reason: 'Family vacation',
        status: 'approved',
        submittedAt: new Date('2024-12-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        employeeId: '1',
        leaveType: 'sick',
        startDate: new Date('2024-12-10'),
        endDate: new Date('2024-12-10'),
        reason: 'Not feeling well',
        status: 'pending',
        submittedAt: new Date('2024-12-08'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  }

  const data = dashboardData || mockData

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'rejected':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'vacation':
        return '🏖️'
      case 'sick':
        return '🏥'
      case 'personal':
        return '👤'
      default:
        return '📅'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
      </div>

      {/* Personal information and leave balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal info card */}
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Employee ID</p>
              <p className="font-medium">{data.personalInfo.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="font-medium">{data.personalInfo.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <p className="font-medium">{data.personalInfo.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Hire Date</p>
              <p className="font-medium">{formatDate(data.personalInfo.hireDate)}</p>
            </div>
          </div>
        </div>

        {/* Leave balance card */}
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Leave Balance</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {data.leaveBalance}
            </div>
            <p className="text-sm text-gray-600">Days Remaining</p>
          </div>
          <div className="mt-4">
            <button className="btn-primary w-full">
              <FileText className="h-4 w-4 mr-2" />
              Request Leave
            </button>
          </div>
        </div>
      </div>

      {/* Recent leave requests */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Leave Requests</h3>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {data.recentRequests.length > 0 ? (
            data.recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getLeaveTypeIcon(request.leaveType)}</span>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {request.leaveType} Leave
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(request.startDate)} - {formatDate(request.endDate)}
                    </p>
                    <p className="text-sm text-gray-500">{request.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(request.submittedAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No leave requests yet</p>
              <p className="text-sm text-gray-400">Submit your first leave request to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-primary w-full">
            <FileText className="h-4 w-4 mr-2" />
            Submit Leave Request
          </button>
          <button className="btn-secondary w-full">
            <Calendar className="h-4 w-4 mr-2" />
            View Leave History
          </button>
        </div>
      </div>
    </div>
  )
}
