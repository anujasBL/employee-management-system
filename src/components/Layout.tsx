import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, NavigationItem } from '@/types';
import {
  Users,
  Calendar,
  Home,
  LogOut,
  Menu,
  X,
  User,
  Settings,
  Bell,
} from 'lucide-react';

/**
 * Navigation items configuration for different user roles
 */
const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: Home,
    roles: ['hr', 'employee'],
  },
  {
    label: 'Employees',
    path: '/employees',
    icon: Users,
    roles: ['hr'],
  },
  {
    label: 'Leave Requests',
    path: '/leave-requests',
    icon: Calendar,
    roles: ['hr', 'employee'],
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: User,
    roles: ['hr', 'employee'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    roles: ['hr'],
  },
];

/**
 * Layout component that provides the main application structure
 * Includes navigation, header, and content area with role-based access control
 */
export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter navigation items based on user role
  const filteredNavigation = navigationItems.filter((item) =>
    item.roles.includes(user?.role as UserRole)
  );

  // Get current page title
  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find((item) => item.path === location.pathname);
    return currentItem?.label || 'Dashboard';
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close sidebar on mobile
  const closeSidebar = () => setSidebarOpen(false);

  if (!user) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-semibold text-gray-900">
              EMS
            </h1>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon
                  className={`
                    mr-3 h-5 w-5 transition-colors
                    ${
                      isActive
                        ? 'text-primary-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Page title */}
            <h1 className="text-lg font-semibold text-gray-900 lg:ml-0">
              {getCurrentPageTitle()}
            </h1>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md">
                <Bell className="w-5 h-5" />
              </button>

              {/* User dropdown */}
              <div className="relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
