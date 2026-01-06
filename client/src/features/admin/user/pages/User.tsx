import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User as UserIcon,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit2,
} from 'lucide-react';
import { useGetAllUsersQuery, useUpdateUserByIdMutation } from '../userApis';
import type { UpdateUserBody } from '../userApis';
import UserCardSkeleton from '../components/UserCardSkeleton';
import EditUserModal from '../components/EditUserModel';
import type { IUser } from '../userApis';
import { toast } from 'sonner';

const User = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  const [updateUserById, { isLoading: isUpdating }] = useUpdateUserByIdMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (payload: UpdateUserBody) => {
    if (!selectedUser?._id) return;

    try {
      await updateUserById({
        id: selectedUser._id,
        body: payload,
      }).unwrap();

      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch {
      toast.error('failed to update the user.');
    }
  };

  return (
    <div className="w-full bg-linear-to-br from-slate-50 to-slate-100 p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">User Management</h1>
        <p className="text-slate-400">Manage and view all registered users</p>
      </div>

      {isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>

          <div className="mt-8 p-6 rounded-lg border border-slate-600 w-full bg-background">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="text-center space-y-2">
                  <Skeleton className="h-9 w-16 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-red-50 border-2 border-red-600 rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-600">Error</h2>
              </div>
            </div>
            <p className="text-slate-700 text-lg">
              Something went wrong while fetching users. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!isLoading && !isError && users && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.data.map(user => (
              <Card
                key={user._id}
                className="bg-background border-slate-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                <button
                  onClick={() => handleEditClick(user)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors z-10"
                  title="Edit User"
                >
                  <Edit2 className="w-4 h-4 text-white cursor-pointer" />
                </button>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between pr-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900">
                          {user.firstName} {user.lastName}
                        </CardTitle>
                      </div>
                    </div>
                    {user.isActive ? (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <Badge
                      className={`${
                        user.role === 'admin'
                          ? 'bg-red-600 hover:bg-red-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="pt-2 border-t border-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Status</span>
                      <Badge
                        variant="outline"
                        className={`${
                          user.isActive
                            ? 'border-blue-600 text-blue-600'
                            : 'border-red-600 text-red-600'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs text-slate-700 font-mono">
                      ID: {user._id.slice(-8)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-lg border border-slate-600 w-full bg-background">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{users.data.length}</p>
                <p className="text-sm text-slate-400">Total Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {users.data.filter(u => u.isActive).length}
                </p>
                <p className="text-sm text-slate-400">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">
                  {users.data.filter(u => u.role === 'admin').length}
                </p>
                <p className="text-sm text-slate-400">Admins</p>
              </div>
            </div>
          </div>
        </>
      )}

      <EditUserModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        user={selectedUser}
        onSubmit={handleUpdateUser}
        isSubmitting={isUpdating}
      />
    </div>
  );
};

export default User;
