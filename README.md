# Employee Management System 2

A modern, responsive web application for managing employee records, leave requests, and HR operations. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Role-based Access Control**: Separate interfaces for HR and Employee users
- **Authentication System**: Secure login/logout with JWT tokens
- **Employee Management**: CRUD operations for employee records (HR only)
- **Leave Management**: Application, approval, and tracking system
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern Architecture**: React 18+ with hooks and context

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development and builds
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query for server state, Context API for global state
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6 with protected routes
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn package manager
- Git for version control

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

### 3. Environment Configuration

Copy the environment example file and configure your settings:

```bash
cp env.example .env.local
```

Update the `.env.local` file with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=https://vibe-code-generic-api-rehearsal-01.onrender.com
VITE_API_TIMEOUT=10000

# Authentication
VITE_JWT_SECRET=your-jwt-secret-key
VITE_SESSION_TIMEOUT=3600000

# Environment
VITE_NODE_ENV=development
VITE_APP_NAME=Employee Management System
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── LoginForm.tsx   # Authentication form
│   ├── ProtectedRoute.tsx # Route protection
│   └── ErrorBoundary.tsx  # Error handling
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Page components
│   ├── LoginPage.tsx   # Login page
│   ├── HRDashboard.tsx # HR dashboard
│   └── EmployeeDashboard.tsx # Employee dashboard
├── services/           # API services
│   └── api.ts         # Generic API client
├── types/              # TypeScript definitions
│   └── index.ts       # Type interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider

## 🔐 Authentication

The system uses JWT tokens for authentication. Demo credentials are available on the login page:

- **HR User**: `hr` / `password123`
- **Employee User**: `employee` / `password123`

## 📱 API Integration

The application is designed to work with a generic REST API that provides the following endpoints:

- `GET /{entity}` - Retrieve all entities
- `GET /{entity}/{id}` - Retrieve specific entity
- `POST /{entity}` - Create new entity
- `PUT /{entity}/{id}` - Update existing entity
- `DELETE /{entity}/{id}` - Delete entity

### Authentication Endpoints

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/profile` - User profile
- `GET /auth/validate` - Session validation

## 🎨 Customization

### Styling

The application uses Tailwind CSS with a custom design system. CSS variables are defined in `src/index.css` for consistent theming.

### Components

All components are built with reusability in mind. Use the existing component library or create new ones following the established patterns.

### API Integration

The generic API service can be extended for additional entities by following the pattern in `src/services/api.ts`.

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure Node.js version matches `.nvmrc`
2. **Type Errors**: Run `npm run type-check` to identify issues
3. **Linting Errors**: Run `npm run lint:fix` to auto-fix issues
4. **API Connection**: Verify environment variables and API endpoint availability

### Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- Verify API responses in Network tab
- Use TypeScript for better development experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Updates

Stay updated with the latest changes:

- Watch the repository
- Check release notes
- Follow the development roadmap

---

**Built with ❤️ using modern web technologies**
