import { RouterProvider } from 'react-router/dom';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
