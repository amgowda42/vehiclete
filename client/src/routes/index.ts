import { createBrowserRouter } from 'react-router';
import Public from '@/features/auth/pages/Public';
import SignUp from '@/features/auth/pages/SignUp';
import Login from '@/features/auth/pages/Login';

export const router = createBrowserRouter([
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
  
    {
      path:'home'
  }
]);
