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

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles.length > 0 && user) {
    const hasRequiredRole = allowedRoles.includes(user.role);

    if (!hasRequiredRole) {
      if (user.role === 'admin') {
        return <Navigate to="/admin/home" replace />;
      }
      return <Navigate to="/user/home" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
