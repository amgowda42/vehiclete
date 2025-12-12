// src/components/PublicRoutes.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

interface PublicRoutesProps {
  restricted?: boolean; // If true, authenticated users can't access (login, signup pages)
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ restricted = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Loading handled by AuthLoader at app level
  if (isLoading) {
    return null;
  }

  // If route is restricted (like login/signup) and user is authenticated, redirect to their dashboard
  if (restricted && isAuthenticated && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }
    return <Navigate to="/user/home" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default PublicRoutes;
