import { useLogoutMutation } from '@/features/auth/authApis';
import { toast } from 'sonner';

const LogOutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      await logout().unwrap();
      toast.success('Logged out.');
    } catch {
      toast.error('logout unsuccessfull.');
    }
  };
  return (
    <button
      className="bg-red-600 text-white px-4 py-2 text-base md:text-lg rounded-lg hover:bg-red-700 transition font-semibold cursor-pointer"
      onClick={handleLogOut}
    >
      {isLoading ? 'Logging Out.' : 'Log Out.'}
    </button>
  );
};

export default LogOutButton;
