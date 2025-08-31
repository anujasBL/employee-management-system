import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ProtectedRoute, HRRoute, EmployeeRoute } from '@/components/ProtectedRoute'
import { LoginPage } from '@/pages/LoginPage'
import { HRDashboard } from '@/pages/HRDashboard'
import { EmployeeDashboard } from '@/pages/EmployeeDashboard'

/**
 * Main App component with routing configuration
 * Handles authentication and role-based routing
 */
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes with layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect based on user role */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Navigate to="/hr/dashboard" replace />
            </ProtectedRoute>
          }
        />
        
        {/* HR routes */}
        <Route
          path="hr"
          element={
            <HRRoute>
              <Layout />
            </HRRoute>
          }
        >
          <Route path="dashboard" element={<HRDashboard />} />
          {/* Additional HR routes will be added here */}
        </Route>
        
        {/* Employee routes */}
        <Route
          path="employee"
          element={
            <EmployeeRoute>
              <Layout />
            </EmployeeRoute>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          {/* Additional employee routes will be added here */}
        </Route>
        
        {/* Catch all route - redirect to appropriate dashboard */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
