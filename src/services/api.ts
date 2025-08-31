import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, PaginatedResponse, QueryParams, ApiError } from '@/types';

/**
 * Generic API service for handling CRUD operations on any entity type
 * Implements the standard endpoints: GET_ALL, GET_BY_ID, SAVE_NEW, UPDATE, DELETE
 */
export class ApiService {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for authentication
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Generic entity service factory
   * Creates a service for any entity type with standard CRUD operations
   */
  entity<T>(entityName: string) {
    return {
      /**
       * Get all entities with optional pagination and filtering
       */
      getAll: async (params?: QueryParams): Promise<PaginatedResponse<T>> => {
        const response = await this.client.get<ApiResponse<PaginatedResponse<T>>>(`/${entityName}`, {
          params,
        });
        return response.data.data;
      },

      /**
       * Get entity by ID
       */
      getById: async (id: string): Promise<T> => {
        const response = await this.client.get<ApiResponse<T>>(`/${entityName}/${id}`);
        return response.data.data;
      },

      /**
       * Create new entity
       */
      saveNew: async (data: Partial<T>): Promise<T> => {
        const response = await this.client.post<ApiResponse<T>>(`/${entityName}`, data);
        return response.data.data;
      },

      /**
       * Update existing entity
       */
      update: async (id: string, data: Partial<T>): Promise<T> => {
        const response = await this.client.put<ApiResponse<T>>(`/${entityName}/${id}`, data);
        return response.data.data;
      },

      /**
       * Delete entity
       */
      delete: async (id: string): Promise<void> => {
        await this.client.delete(`/${entityName}/${id}`);
      },

      /**
       * Search entities
       */
      search: async (query: string, params?: QueryParams): Promise<PaginatedResponse<T>> => {
        const response = await this.client.get<ApiResponse<PaginatedResponse<T>>>(`/${entityName}/search`, {
          params: { ...params, q: query },
        });
        return response.data.data;
      },
    };
  }

  /**
   * Authentication endpoints
   */
  auth = {
    login: async (credentials: { username: string; password: string }) => {
      const response = await this.client.post<ApiResponse<{ user: any; token: string }>>('/auth/login', credentials);
      return response.data.data;
    },

    logout: async () => {
      await this.client.post('/auth/logout');
      localStorage.removeItem('auth_token');
    },

    profile: async () => {
      const response = await this.client.get<ApiResponse<any>>('/auth/profile');
      return response.data.data;
    },

    validate: async () => {
      const response = await this.client.get<ApiResponse<boolean>>('/auth/validate');
      return response.data.data;
    },
  };

  /**
   * Dashboard endpoints
   */
  dashboard = {
    hr: async () => {
      const response = await this.client.get<ApiResponse<any>>('/dashboard/hr');
      return response.data.data;
    },

    employee: async () => {
      const response = await this.client.get<ApiResponse<any>>('/dashboard/employee');
      return response.data.data;
    },
  };

  /**
   * Handle API errors and convert them to consistent format
   */
  private handleApiError(error: AxiosError): ApiError {
    if (error.response) {
      const { status, data } = error.response;
      const responseData = data as any;
      return {
        message: responseData?.message || `HTTP ${status} error`,
        code: `HTTP_${status}`,
        details: responseData as Record<string, any>,
      };
    } else if (error.request) {
      return {
        message: 'Network error - no response received',
        code: 'NETWORK_ERROR',
      };
    } else {
      return {
        message: error.message || 'Unknown error occurred',
        code: 'UNKNOWN_ERROR',
      };
    }
  }

  /**
   * Get the base URL for the API service
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Clear authentication token
   */
  clearAuthToken(): void {
    localStorage.removeItem('auth_token');
    delete this.client.defaults.headers.common.Authorization;
  }
}

// Create and export the main API service instance
export const apiService = new ApiService();

// Export specific entity services for convenience
export const api = {
  // Generic entity service
  entity: <T>(entityName: string) => apiService.entity<T>(entityName),

  // Specific entity APIs
  employees: apiService.entity<any>('employees'),
  leaveRequests: apiService.entity<any>('leave-requests'),
  users: apiService.entity<any>('users'),

  // Authentication
  auth: apiService.auth,

  // Dashboard
  dashboard: apiService.dashboard,
};

export default apiService;
