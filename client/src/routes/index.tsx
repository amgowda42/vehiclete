import { createBrowserRouter, Navigate } from 'react-router';
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
import Bike from '@/features/bike/pages/Bike';
import BikeDetails from '@/features/bike/pages/BikeDetails';
import Car from '@/features/car/pages/Car';
import CarDetails from '@/features/car/pages/CarDetails';
import Cycle from '@/features/cycle/pages/Cycle';
import CycleDetails from '@/features/cycle/pages/CycleDetails';
import BikeLayout from '@/features/bike/pages/Layout';
import CarLayout from '@/features/car/pages/Layout';
import CycleLayout from '@/features/cycle/pages/Layout';
import User from '@/features/admin/user/pages/User';
import EmiDetails from '@/features/emi/pages/EmiDetails';
import BookDemoForm from '@/features/demo/components/demoBookingForm';
import Compare from '@/features/compare/pages/Compare';
import CompareBike from '@/features/compare/pages/CompareBike';
import CompareCar from '@/features/compare/pages/CompareCar';
import CompareCycle from '@/features/compare/pages/CompareCycle';

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
          {
            path: 'bikes',
            Component: BikeLayout,
            children: [
              {
                path: '',
                Component: Bike,
              },
              {
                path: ':id',
                Component: BikeDetails,
              },
            ],
          },

          {
            path: 'cars',
            Component: CarLayout,
            children: [
              {
                path: '',
                Component: Car,
              },
              {
                path: ':id',
                Component: CarDetails,
              },
            ],
          },

          {
            path: 'cycles',
            Component: CycleLayout,
            children: [
              {
                path: '',
                Component: Cycle,
              },

              {
                path: ':id',
                Component: CycleDetails,
              },
            ],
          },

          {
            path: 'users',
            Component: User,
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
          {
            path: 'bikes',
            Component: BikeLayout,
            children: [
              {
                path: '',
                Component: Bike,
              },
              {
                path: ':id',
                Component: BikeDetails,
              },
              {
                path: 'emi/:id',
                Component: EmiDetails,
              },
              {
                path: 'test-drive/:id',
                Component: BookDemoForm,
              },
            ],
          },

          {
            path: 'cars',
            Component: CarLayout,
            children: [
              {
                path: '',
                Component: Car,
              },
              {
                path: ':id',
                Component: CarDetails,
              },
              {
                path: 'emi/:id',
                Component: EmiDetails,
              },
              {
                path: 'test-drive/:id',
                Component: BookDemoForm,
              },
            ],
          },

          {
            path: 'cycles',
            Component: CycleLayout,
            children: [
              {
                path: '',
                Component: Cycle,
              },

              {
                path: ':id',
                Component: CycleDetails,
              },
              {
                path: 'emi/:id',
                Component: EmiDetails,
              },
              {
                path: 'test-drive/:id',
                Component: BookDemoForm,
              },
            ],
          },
          {
            path: 'compare',
            Component: Compare,
            children: [
              {
                path: '',
                Component: () => <Navigate to="bike" />,
              },

              {
                path: 'bike',
                Component: CompareBike,
              },
              {
                path: 'car',
                Component: CompareCar,
              },
              {
                path: 'cycle',
                Component: CompareCycle,
              },
            ],
          },
        ],
      },
    ],
  },
]);
