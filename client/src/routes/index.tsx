import { createBrowserRouter } from 'react-router';
import { Navigate } from 'react-router';
import Public from '@/features/auth/pages/Public';
import SignUp from '@/features/auth/pages/SignUp';
import Login from '@/features/auth/pages/Login';
import AdminLayout from '@/layouts/AdminLayout';
import UserLayout from '@/layouts/UserLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AdminHome from '@/features/admin/home/pages/AdminHome';
import UserHome from '@/features/user/home/pages/UserHome';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

export const router = createBrowserRouter([
  {
    path: '',
    Component: () => <Navigate to="auth" />,
  },

  {
    Component: () => <PublicRoutes restricted />,
    children: [
      {
        path: 'auth',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: Public,
          },
          {
            path: 'sign-up',
            Component: SignUp,
          },

          {
            path: 'login',
            Component: Login,
          },
        ],
      },
    ],
  },

  {
    Component: () => <ProtectedRoutes allowedRoles={['admin']} redirectTo="/auth/login" />,
    children: [
      {
        path: 'admin',
        Component: AdminLayout,
        children: [
          {
            path: 'home',
            Component: AdminHome,
            index: true,
          },
        ],
      },
    ],
  },
  {
    Component: () => <ProtectedRoutes allowedRoles={['user']} redirectTo="/auth/login" />,
    children: [
      {
        path: 'user',
        Component: UserLayout,
        children: [
          {
            path: 'home',
            Component: UserHome,
            index: true,
          },
        ],
      },
    ],
  },
]);
