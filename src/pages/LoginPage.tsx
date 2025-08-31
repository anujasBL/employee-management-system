// React is not directly used in this component
import { LoginForm } from '@/components/LoginForm';

/**
 * LoginPage component that provides the login page structure
 * Wraps the LoginForm component and handles page-level layout
 */
export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <LoginForm />
    </div>
  );
}
