import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * ProtectedRoute component that handles authentication and role-based access control
 * Redirects unauthenticated users to login and unauthorized users to specified redirect path
 */
export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const roleRedirect = user.role === 'hr' ? '/hr-dashboard' : '/employee-dashboard';
    return <Navigate to={roleRedirect} replace />;
  }

  // User is authenticated and authorized, render the protected content
  return <>{children}</>;
}

/**
 * HR-only route component
 */
export function HRRoute({ children, redirectTo = '/employee-dashboard' }: Omit<ProtectedRouteProps, 'requiredRoles'>) {
  return (
    <ProtectedRoute requiredRoles={['hr']} redirectTo={redirectTo}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Employee-only route component
 */
export function EmployeeRoute({ children, redirectTo = '/hr-dashboard' }: Omit<ProtectedRouteProps, 'requiredRoles'>) {
  return (
    <ProtectedRoute requiredRoles={['employee']} redirectTo={redirectTo}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Public route that redirects authenticated users to their dashboard
 */
export function PublicRoute({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    const dashboardPath = user.role === 'hr' ? '/hr-dashboard' : '/employee-dashboard';
    return <Navigate to={redirectTo || dashboardPath} replace />;
  }

  return <>{children}</>;
}
