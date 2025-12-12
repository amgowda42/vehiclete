import { Outlet } from 'react-router';
import AdminHeader from '@/components/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
