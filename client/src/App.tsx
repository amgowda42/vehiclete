import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Public from './features/auth/pages/Public';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '',
      Component: Public,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
