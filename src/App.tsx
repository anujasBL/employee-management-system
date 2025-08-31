// React imports are not directly used in this component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Layout } from '@/components/Layout';
import { ProtectedRoute, PublicRoute } from '@/components/ProtectedRoute';
// LoginForm is used in LoginPage, not directly in App
import { LoginPage } from '@/pages/LoginPage';
import { HRDashboard } from '@/pages/HRDashboard';
import { EmployeeDashboard } from '@/pages/EmployeeDashboard';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * Main App component that sets up routing, authentication, and error handling
 * Implements role-based access control and protected routes
 */
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <div className="App">
              <Routes>
                {/* Public routes */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />

                {/* Protected routes with role-based access */}
                <Route
                  path="/hr-dashboard"
                  element={
                    <ProtectedRoute requiredRoles={['hr']}>
                      <Layout>
                        <HRDashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/employee-dashboard"
                  element={
                    <ProtectedRoute requiredRoles={['employee']}>
                      <Layout>
                        <EmployeeDashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Default dashboard route - redirects based on user role */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <DashboardRedirect />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Employee management routes - HR only */}
                <Route
                  path="/employees"
                  element={
                    <ProtectedRoute requiredRoles={['hr']}>
                      <Layout>
                        <div className="p-6">
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Employee Management
                          </h1>
                          <p className="text-gray-600">
                            Employee management features will be implemented in Iteration 2.
                          </p>
                        </div>
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Leave management routes */}
                <Route
                  path="/leave-requests"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <div className="p-6">
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Leave Requests
                          </h1>
                          <p className="text-gray-600">
                            Leave management features will be implemented in Iteration 2.
                          </p>
                        </div>
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Profile route */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <div className="p-6">
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Profile
                          </h1>
                          <p className="text-gray-600">
                            Profile management features will be implemented in Iteration 2.
                          </p>
                        </div>
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Settings route - HR only */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute requiredRoles={['hr']}>
                      <Layout>
                        <div className="p-6">
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Settings
                          </h1>
                          <p className="text-gray-600">
                            System settings will be implemented in Iteration 2.
                          </p>
                        </div>
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Root route - redirects to appropriate dashboard */}
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />

                {/* Catch-all route - redirects to dashboard */}
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </div>
          </AuthProvider>
        </Router>

        {/* React Query DevTools - only in development */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

/**
 * Component that redirects users to their role-appropriate dashboard
 */
function DashboardRedirect() {
  // This component will be replaced with proper routing in the next iteration
  return (
    <div className="p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}

export default App;
