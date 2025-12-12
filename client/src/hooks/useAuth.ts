import { useAppSelector } from '@/app/hooks';
import { useAuthCheckQuery } from '@/features/auth/authApis';

export const useAuth = () => {
  const authState = useAppSelector(state => state.auth);
  const { isLoading, isFetching, error, refetch } = useAuthCheckQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isInitialized: authState.isInitialized,
    isLoading: isLoading || isFetching || !authState.isInitialized,
    error,
    refetch,
  };
};
