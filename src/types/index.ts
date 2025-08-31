// Base entity interface
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// User types
export interface User extends BaseEntity {
  username: string
  email: string
  role: 'hr' | 'employee'
  firstName: string
  lastName: string
  department: string
  isActive: boolean
}

// Employee types
export interface Employee extends BaseEntity {
  userId: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  hireDate: Date
  isActive: boolean
  leaveBalance: number
}

// Leave request types
export interface LeaveRequest extends BaseEntity {
  employeeId: string
  leaveType: 'sick' | 'vacation' | 'personal'
  startDate: Date
  endDate: Date
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  hrComments?: string
  submittedAt: Date
}

// Authentication types
export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  expiresAt: Date
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// API types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface QueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  [key: string]: any
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'date' | 'textarea'
  required?: boolean
  options?: { value: string; label: string }[]
  placeholder?: string
  validation?: any
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  roles?: string[]
  children?: NavItem[]
}

// Dashboard types
export interface DashboardMetrics {
  employeeCount: number
  pendingLeaveRequests: number
  recentActivity: any[]
}

export interface EmployeeDashboardData {
  personalInfo: Employee
  leaveBalance: number
  recentRequests: LeaveRequest[]
}
