// React is not directly used in this component
import { useAuth } from '@/contexts/AuthContext';
import { Users, Calendar, TrendingUp, UserCheck } from 'lucide-react';

/**
 * HRDashboard component that displays key metrics and information for HR users
 * Shows employee count, pending leave requests, and navigation to key features
 */
export function HRDashboard() {
  const { user } = useAuth();

  // Mock data for Iteration 1 - will be replaced with real API calls in Iteration 2
  const mockMetrics = {
    totalEmployees: 45,
    activeEmployees: 42,
    pendingLeaveRequests: 8,
    approvedLeaveRequests: 156,
    rejectedLeaveRequests: 3,
    newHiresThisMonth: 2,
    departuresThisMonth: 1,
  };

  const metricCards = [
    {
      title: 'Total Employees',
      value: mockMetrics.totalEmployees,
      change: '+2 this month',
      icon: Users,
      color: 'primary',
      description: 'All employees in the system',
    },
    {
      title: 'Active Employees',
      value: mockMetrics.activeEmployees,
      change: '93% active rate',
      icon: UserCheck,
      color: 'success',
      description: 'Currently active employees',
    },
    {
      title: 'Pending Leave Requests',
      value: mockMetrics.pendingLeaveRequests,
      change: 'Requires attention',
      icon: Calendar,
      color: 'warning',
      description: 'Leave requests awaiting approval',
    },
    {
      title: 'Leave Approval Rate',
      value: `${Math.round((mockMetrics.approvedLeaveRequests / (mockMetrics.approvedLeaveRequests + mockMetrics.rejectedLeaveRequests)) * 100)}%`,
      change: '98% approval rate',
      icon: TrendingUp,
      color: 'success',
      description: 'Overall leave request approval rate',
    },
  ];

  const quickActions = [
    {
      title: 'View All Employees',
      description: 'Browse and manage employee records',
      href: '/employees',
      icon: Users,
    },
    {
      title: 'Review Leave Requests',
      description: 'Approve or reject pending leave requests',
      href: '/leave-requests',
      icon: Calendar,
    },
    {
      title: 'Add New Employee',
      description: 'Create a new employee account',
      href: '/employees/new',
      icon: UserCheck,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Leave request approved',
      employee: 'John Smith',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      action: 'New employee added',
      employee: 'Sarah Johnson',
      time: '1 day ago',
      type: 'info',
    },
    {
      id: 3,
      action: 'Leave request submitted',
      employee: 'Mike Davis',
      time: '3 hours ago',
      type: 'warning',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your workforce today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            primary: 'bg-primary-50 text-primary-600',
            success: 'bg-success-50 text-success-600',
            warning: 'bg-warning-50 text-warning-600',
            danger: 'bg-danger-50 text-danger-600',
          };

          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">{metric.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.href}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
                >
                  <div className="p-2 bg-primary-100 rounded-lg mr-3">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const typeColors = {
                success: 'bg-success-100 text-success-800',
                warning: 'bg-warning-100 text-warning-800',
                info: 'bg-primary-100 text-primary-800',
                danger: 'bg-danger-100 text-danger-800',
              };

              return (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[activity.type as keyof typeof typeColors]}`}>
                    {activity.type}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.employee} • {activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Engineering', count: 18, pending: 3 },
            { name: 'Sales', count: 12, pending: 2 },
            { name: 'Marketing', count: 8, pending: 1 },
            { name: 'HR', count: 4, pending: 0 },
            { name: 'Finance', count: 3, pending: 2 },
          ].map((dept) => (
            <div key={dept.name} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900">{dept.name}</h3>
              <p className="text-2xl font-bold text-primary-600">{dept.count}</p>
              <p className="text-sm text-gray-600">
                {dept.pending} pending requests
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
