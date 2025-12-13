import { Outlet } from 'react-router';
import UserHeader from '@/components/UserHeader';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
