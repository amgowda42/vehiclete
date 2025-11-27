import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Public from '@/features/auth/pages/Public';
import SignUp from '@/features/auth/pages/SignUp';
import Login from '@/features/auth/pages/Login';

export default function App() {
  const router = createBrowserRouter([
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
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
