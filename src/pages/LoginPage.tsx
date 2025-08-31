import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/LoginForm'

/**
 * Login page component
 * Redirects authenticated users to appropriate dashboard
 */
export const LoginPage: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Redirect authenticated users to appropriate dashboard
  if (isAuthenticated && user) {
    const redirectPath = user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return <LoginForm />
}
