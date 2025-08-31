# Employee Management System

A modern, role-based employee management system built with React, TypeScript, and Tailwind CSS. This system provides separate interfaces for HR personnel and regular employees, enabling efficient workforce management and leave request processing.

## 🚀 Features

### Iteration 1 (Foundation) - ✅ Complete
- **User Authentication System**
  - Secure login/logout with role-based access control
  - Session management with JWT tokens
  - Protected routes for different user roles
  
- **Role-Based Access Control**
  - HR users: Full system access with employee management capabilities
  - Employee users: Personal information and leave management access
  
- **Basic Dashboard System**
  - HR Dashboard: Employee metrics, pending requests, department overview
  - Employee Dashboard: Personal info, leave balance, recent requests
  
- **Responsive Design**
  - Mobile-first approach with Tailwind CSS
  - Modern UI components with shadcn/ui design system
  - Accessible interface with proper ARIA labels

### Iteration 2 (Core Features) - 🔄 Planned
- **Employee Management**
  - CRUD operations for employee records
  - Employee search and filtering
  - Bulk operations and data export
  
- **Leave Management System**
  - Leave application forms with validation
  - Leave approval workflow for HR users
  - Leave status tracking and notifications
  
- **Advanced Dashboard Features**
  - Real-time metrics and charts
  - Department-specific analytics
  - Performance indicators

### Iteration 3 (Enhancement) - 📋 Planned
- **Notification System**
  - Email notifications for leave events
  - In-app toast notifications
  - Push notifications for mobile
  
- **Reporting & Analytics**
  - Custom report generation
  - Data visualization with charts
  - Export functionality (PDF, Excel)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development and builds
- **State Management**: React Query for server state, Zustand for client state
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Routing**: React Router v6 with protected routes
- **HTTP Client**: Axios with interceptors and error handling
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier + TypeScript strict mode

## 📋 Prerequisites

- **Node.js**: Version 18.18.0 or higher (use `.nvmrc` file)
- **npm**: Version 8.0.0 or higher
- **Git**: For version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd employee-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment variables template
cp env.example .env

# Edit .env file with your configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ENABLE_MOCK_API=true
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── Layout.tsx
│   ├── LoginForm.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts for state management
│   └── AuthContext.tsx
├── hooks/             # Custom React hooks
├── pages/             # Page components
│   ├── LoginPage.tsx
│   ├── HRDashboard.tsx
│   └── EmployeeDashboard.tsx
├── services/          # API services and utilities
│   └── api.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind CSS
```

## 🔐 Authentication & Authorization

### User Roles
- **HR Users**: Full system access including employee management and leave approval
- **Employee Users**: Limited access to personal information and leave management

### Demo Credentials
```
HR User:
- Username: hr_user
- Password: password123

Employee User:
- Username: employee_user
- Password: password123
```

### Protected Routes
- `/hr-dashboard`: HR users only
- `/employee-dashboard`: Employee users only
- `/employees`: HR users only
- `/leave-requests`: All authenticated users
- `/profile`: All authenticated users
- `/settings`: HR users only

## 🌐 API Integration

### Generic Entity Service
The system uses a generic API service that can handle any entity type with standard CRUD operations:

```typescript
// Example usage
const employeeService = api.entity<Employee>('employees');

// Get all employees
const employees = await employeeService.getAll({ page: 1, limit: 10 });

// Get employee by ID
const employee = await employeeService.getById('123');

// Create new employee
const newEmployee = await employeeService.saveNew(employeeData);

// Update employee
const updatedEmployee = await employeeService.update('123', updateData);

// Delete employee
await employeeService.delete('123');
```

### API Endpoints
- **Authentication**: `/auth/*`
- **Employees**: `/employees/*`
- **Leave Requests**: `/leave-requests/*`
- **Dashboard**: `/dashboard/*`

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Component functionality and utility functions
- **Integration Tests**: API service integration and form submissions
- **E2E Tests**: Complete user workflows (planned for Iteration 2)

### Testing Tools
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking for integration tests

## 📱 Responsive Design

The application is built with a mobile-first approach using Tailwind CSS:

- **Mobile**: Optimized for small screens with collapsible navigation
- **Tablet**: Responsive grid layouts and touch-friendly interactions
- **Desktop**: Full-featured interface with sidebar navigation

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Environment Variables for Production
```bash
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_ENABLE_MOCK_API=false
VITE_ENABLE_DEBUG_LOGGING=false
```

### Build Process
```bash
# Create production build
npm run build

# The build output will be in the `dist/` directory
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Route and component-level authorization
- **Input Validation**: Zod schema validation for all forms
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Token-based CSRF protection (backend dependent)

## 📊 Performance

- **Code Splitting**: Automatic code splitting with Vite
- **Lazy Loading**: Route-based code splitting
- **Optimized Bundles**: Tree shaking and minification
- **Caching**: React Query for intelligent data caching
- **Image Optimization**: Optimized asset loading

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run build -- --force
```

#### TypeScript Errors
```bash
# Check for type errors
npm run type-check

# Auto-fix available issues
npm run lint:fix
```

#### Development Server Issues
```bash
# Check if port 3000 is available
lsof -ti:3000 | xargs kill -9

# Start with different port
npm run dev -- --port 3001
```

### Getting Help
1. Check the console for error messages
2. Review the browser's network tab for API issues
3. Check the application logs in the browser console
4. Verify environment variables are set correctly

## 🤝 Contributing

### Development Workflow
1. Create a feature branch from `main`
2. Make your changes with proper TypeScript types
3. Add tests for new functionality
4. Ensure all tests pass and linting is clean
5. Submit a pull request with detailed description

### Code Standards
- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Follow configured rules for code quality
- **Prettier**: Consistent code formatting
- **Testing**: Minimum 70% test coverage required

### Commit Convention
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: code formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
```

## 📈 Roadmap

### Phase 1: Foundation (Current)
- ✅ Authentication system
- ✅ Role-based access control
- ✅ Basic dashboard functionality
- ✅ Responsive design implementation

### Phase 2: Core Features (Next)
- 🔄 Employee management CRUD operations
- 🔄 Leave application and approval system
- 🔄 Advanced dashboard with real-time data
- 🔄 Form validation and error handling

### Phase 3: Enhancement (Future)
- 📋 Notification system
- 📋 Reporting and analytics
- 📋 Advanced search and filtering
- 📋 Mobile app development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **React Query** for efficient server state management
- **Vite** for the fast build tooling

## 📞 Support

For support and questions:
- **Issues**: Create an issue in the GitHub repository
- **Documentation**: Check the project wiki
- **Email**: support@company.com

---

**Built with ❤️ using modern web technologies**
