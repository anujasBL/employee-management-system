import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types';
import { api } from '@/services/api';

// Action types for the auth reducer
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER_START' }
  | { type: 'LOAD_USER_SUCCESS'; payload: User }
  | { type: 'LOAD_USER_FAILURE' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

// Initial auth state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: false,
  isLoading: true,
};

// Auth reducer function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOAD_USER_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOAD_USER_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    default:
      return state;
  }
}

// Auth context interface
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount if token exists
  useEffect(() => {
    if (state.token) {
      loadUser();
    } else {
      dispatch({ type: 'LOAD_USER_FAILURE' });
    }
  }, []);

  // Set token in API service when it changes
  useEffect(() => {
    if (state.token) {
      apiService.setAuthToken(state.token);
    } else {
      apiService.clearAuthToken();
    }
  }, [state.token]);

  // Load user profile from API
  const loadUser = async () => {
    try {
      dispatch({ type: 'LOAD_USER_START' });
      const user = await api.auth.profile();
      dispatch({ type: 'LOAD_USER_SUCCESS', payload: user });
    } catch (error) {
      console.error('Failed to load user:', error);
      dispatch({ type: 'LOAD_USER_FAILURE' });
      // Clear invalid token
      localStorage.removeItem('auth_token');
    }
  };

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await api.auth.login(credentials);
      
      // Store token in localStorage
      localStorage.setItem('auth_token', response.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.user, token: response.token },
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state regardless of API call success
      localStorage.removeItem('auth_token');
      dispatch({ type: 'LOGOUT' });
    }
  };

    // Update user function
  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  // Refresh user data
  const refreshUser = async () => {
    if (state.token) {
      await loadUser();
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Import apiService to avoid circular dependency
import { apiService } from '@/services/api';
