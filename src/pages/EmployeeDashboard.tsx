// React is not directly used in this component
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, User, FileText, CheckCircle, XCircle, Clock as PendingIcon } from 'lucide-react';

/**
 * EmployeeDashboard component that displays personal information and leave status for employees
 * Shows leave balance, recent requests, and personal information
 */
export function EmployeeDashboard() {
  const { user } = useAuth();

  // Mock data for Iteration 1 - will be replaced with real API calls in Iteration 2
  const mockEmployeeData = {
    leaveBalance: {
      vacation: 15,
      sick: 10,
      personal: 5,
      total: 30,
    },
    recentRequests: [
      {
        id: 1,
        type: 'vacation',
        startDate: '2024-01-15',
        endDate: '2024-01-19',
        status: 'approved',
        reason: 'Family vacation',
        submittedAt: '2024-01-02',
      },
      {
        id: 2,
        type: 'sick',
        startDate: '2024-01-10',
        endDate: '2024-01-10',
        status: 'approved',
        reason: 'Not feeling well',
        submittedAt: '2024-01-09',
      },
      {
        id: 3,
        type: 'personal',
        startDate: '2024-01-25',
        endDate: '2024-01-25',
        status: 'pending',
        reason: 'Doctor appointment',
        submittedAt: '2024-01-20',
      },
    ],
    upcomingLeaves: [
      {
        id: 1,
        type: 'vacation',
        startDate: '2024-01-15',
        endDate: '2024-01-19',
        days: 5,
      },
    ],
  };

  const leaveTypeColors = {
    vacation: 'bg-blue-100 text-blue-800',
    sick: 'bg-red-100 text-red-800',
    personal: 'bg-purple-100 text-purple-800',
    maternity: 'bg-pink-100 text-pink-800',
    paternity: 'bg-indigo-100 text-indigo-800',
  };

  const statusColors = {
    approved: 'bg-success-100 text-success-800',
    rejected: 'bg-danger-100 text-danger-800',
    pending: 'bg-warning-100 text-warning-800',
    cancelled: 'bg-gray-100 text-gray-800',
  };

  const statusIcons = {
    approved: CheckCircle,
    rejected: XCircle,
    pending: PendingIcon,
    cancelled: XCircle,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's your personal dashboard with leave information and recent activity.
        </p>
      </div>

      {/* Leave Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leave Balance</p>
              <p className="text-2xl font-bold text-primary-600">{mockEmployeeData.leaveBalance.total}</p>
              <p className="text-xs text-gray-500 mt-1">Available days</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vacation Days</p>
              <p className="text-2xl font-bold text-blue-600">{mockEmployeeData.leaveBalance.vacation}</p>
              <p className="text-xs text-gray-500 mt-1">Remaining</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sick Days</p>
              <p className="text-2xl font-bold text-red-600">{mockEmployeeData.leaveBalance.sick}</p>
              <p className="text-xs text-gray-500 mt-1">Remaining</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Personal Days</p>
              <p className="text-2xl font-bold text-purple-600">{mockEmployeeData.leaveBalance.personal}</p>
              <p className="text-xs text-gray-500 mt-1">Remaining</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions and Upcoming Leaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/leave-requests/new"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="p-2 bg-primary-100 rounded-lg mr-3">
                <Calendar className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Request Leave</h3>
                <p className="text-sm text-gray-600">Submit a new leave request</p>
              </div>
            </a>

            <a
              href="/profile"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="p-2 bg-primary-100 rounded-lg mr-3">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Update Profile</h3>
                <p className="text-sm text-gray-600">Edit your personal information</p>
              </div>
            </a>

            <a
              href="/leave-requests"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="p-2 bg-primary-100 rounded-lg mr-3">
                <FileText className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View All Requests</h3>
                <p className="text-sm text-gray-600">Check status of your requests</p>
              </div>
            </a>
          </div>
        </div>

        {/* Upcoming Leaves */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Leaves</h2>
          {mockEmployeeData.upcomingLeaves.length > 0 ? (
            <div className="space-y-3">
              {mockEmployeeData.upcomingLeaves.map((leave) => (
                <div key={leave.id} className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-900 capitalize">{leave.type}</p>
                      <p className="text-sm text-blue-700">
                        {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{leave.days}</p>
                      <p className="text-xs text-blue-600">days</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No upcoming leaves scheduled</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leave Requests</h2>
        <div className="space-y-3">
          {mockEmployeeData.recentRequests.map((request) => {
            const StatusIcon = statusIcons[request.status as keyof typeof statusIcons];
            const days = calculateDays(request.startDate, request.endDate);
            
            return (
              <div key={request.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${leaveTypeColors[request.type as keyof typeof leaveTypeColors]}`}>
                      {request.type}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[request.status as keyof typeof statusColors]} flex items-center`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {request.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{days} days</p>
                    <p className="text-xs text-gray-500">{formatDate(request.submittedAt)}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-900 font-medium">{request.reason}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Information Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Full Name</p>
            <p className="text-gray-900">{user?.firstName} {user?.lastName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <p className="text-gray-900">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Department</p>
            <p className="text-gray-900">{user?.department}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Role</p>
            <p className="text-gray-900 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
