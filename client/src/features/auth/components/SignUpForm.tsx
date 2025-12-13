import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSignUpMutation } from '../authApis';
import { toast } from 'sonner';

const signUpSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('email is required.'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .nonempty('first name is required.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .nonempty('password is required.'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [SignUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await SignUp(data).unwrap();
      toast.success('Sign Up  successful! , Please Login.');
      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Sign Up failed failed');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-slate-900">Create an account</CardTitle>
        <CardDescription className="text-slate-500 font-semibold">
          Enter your details to join Vehiclete
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-slate-700">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-600' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-slate-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-600' : ''}
              />
              {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register('email')}
              className={errors.email ? 'border-red-600' : ''}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-red-600' : ''}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
