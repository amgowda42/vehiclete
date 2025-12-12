import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRoutesProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  allowedRoles = [],
  redirectTo = '/auth/login',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Loading handled by AuthLoader at app level
  // But keep this for safety in case AuthLoader is removed
  if (isLoading) {
    return null;
  }

  // Not authenticated - redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && user) {
    const hasRequiredRole = allowedRoles.includes(user.role);

    if (!hasRequiredRole) {
      // Redirect to their correct dashboard based on role
      if (user.role === 'admin') {
        return <Navigate to="/admin/home" replace />;
      }
      return <Navigate to="/user/home" replace />;
    }
  }

  // Authenticated and authorized - render child routes
  return <Outlet />;
};

export default ProtectedRoutes;
