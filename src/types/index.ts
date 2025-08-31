// User and Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  department: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'hr' | 'employee';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresAt: Date;
}

// Employee Types
export interface Employee {
  id: string;
  userId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  hireDate: Date;
  isActive: boolean;
  leaveBalance: number;
  managerId?: string;
  salary?: number;
  phoneNumber?: string;
  address?: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  phoneNumber?: string;
  address?: string;
}

// Leave Management Types
export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  hrComments?: string;
  submittedAt: Date;
  updatedAt: Date;
  daysRequested: number;
}

export type LeaveType = 'sick' | 'vacation' | 'personal' | 'maternity' | 'paternity';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface LeaveFormData {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// Generic Entity Types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// Dashboard Types
export interface DashboardMetrics {
  totalEmployees: number;
  activeEmployees: number;
  pendingLeaveRequests: number;
  approvedLeaveRequests: number;
  rejectedLeaveRequests: number;
  departmentStats: DepartmentStats[];
}

export interface DepartmentStats {
  department: string;
  employeeCount: number;
  pendingRequests: number;
}

export interface EmployeeDashboardData {
  personalInfo: Employee;
  leaveBalance: number;
  recentRequests: LeaveRequest[];
  upcomingLeaves: LeaveRequest[];
}

// Form Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isSubmitting: boolean;
}

// UI Component Types
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => any;
  width?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  path: string;
  icon: any;
  roles: UserRole[];
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}
