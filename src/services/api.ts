import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { BaseEntity, ApiResponse, PaginatedResponse, QueryParams } from '@/types'

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vibe-code-generic-api-rehearsal-01.onrender.com'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Generic entity service
export const createEntityService = <T extends BaseEntity>(entityName: string) => ({
  /**
   * Get all entities with optional pagination and filtering
   */
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<T>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<T>>>(`/${entityName}`, { params })
    return response.data.data
  },

  /**
   * Get entity by ID
   */
  getById: async (id: string): Promise<T> => {
    const response = await apiClient.get<ApiResponse<T>>(`/${entityName}/${id}`)
    return response.data.data
  },

  /**
   * Create new entity
   */
  saveNew: async (data: Partial<T>): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(`/${entityName}`, data)
    return response.data.data
  },

  /**
   * Update existing entity
   */
  update: async (id: string, data: Partial<T>): Promise<T> => {
    const response = await apiClient.put<ApiResponse<T>>(`/${entityName}/${id}`, data)
    return response.data.data
  },

  /**
   * Delete entity
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/${entityName}/${id}`)
  },
})

// Specific entity services
export const employeeService = createEntityService('employees')
export const leaveRequestService = createEntityService('leave-requests')
export const userService = createEntityService('users')

// Authentication service
export const authService = {
  /**
   * User login
   */
  login: async (credentials: { username: string; password: string }) => {
    const response = await apiClient.post<ApiResponse<{ user: any; token: string; expiresAt: Date }>>('/auth/login', credentials)
    return response.data.data
  },

  /**
   * User logout
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('auth_token')
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    const response = await apiClient.get<ApiResponse<any>>('/auth/profile')
    return response.data.data
  },

  /**
   * Validate current session
   */
  validateSession: async (): Promise<boolean> => {
    try {
      await apiClient.get('/auth/validate')
      return true
    } catch {
      return false
    }
  },
}

// Dashboard service
export const dashboardService = {
  /**
   * Get HR dashboard metrics
   */
  getHRMetrics: async () => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/hr')
    return response.data.data
  },

  /**
   * Get employee dashboard data
   */
  getEmployeeData: async () => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/employee')
    return response.data.data
  },
}

// Export the main API client for custom requests
export default apiClient
