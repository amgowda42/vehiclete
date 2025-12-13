// src/components/PublicRoutes.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

interface PublicRoutesProps {
  restricted?: boolean;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ restricted = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null;
  }

  if (restricted && isAuthenticated && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }
    return <Navigate to="/user/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
