import React from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { IUser } from '../userApis';

const editUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean(),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

interface EditUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser | null;
  onSubmit: (data: EditUserFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onOpenChange,
  user,
  onSubmit,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      isActive: true,
    },
  });

  React.useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive,
      });
    }
  }, [user, reset]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.tagName === 'INPUT') {
          activeElement.blur();
        }
      }, 0);
    }
  }, [open]);

  const handleFormSubmit = async (data: EditUserFormValues) => {
    await onSubmit(data);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">Edit User</DialogTitle>
          <DialogDescription className="text-slate-500">
            Update user information for {user.firstName} {user.lastName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-firstName" className="text-slate-700">
                First Name
              </Label>
              <Input
                id="edit-firstName"
                placeholder="John"
                {...register('firstName')}
                className="border-slate-300"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-lastName" className="text-slate-700">
                Last Name
              </Label>
              <Input
                id="edit-lastName"
                placeholder="Doe"
                {...register('lastName')}
                className="border-slate-300"
              />
              {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email" className="text-slate-700">
              Email
            </Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="john.doe@example.com"
              {...register('email')}
              className="border-slate-300"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status" className="text-slate-700">
              Status
            </Label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? 'active' : 'inactive'}
                  onValueChange={value => field.onChange(value === 'active')}
                >
                  <SelectTrigger className="border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="border-slate-300 text-slate-700 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              {isSubmitting ? 'Updating...' : 'Update User'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
