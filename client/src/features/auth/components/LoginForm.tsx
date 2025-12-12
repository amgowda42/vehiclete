import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '../authApis';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      if (onSuccess) onSuccess();
      else navigate('/');
    }
  }, [isSuccess, onSuccess, reset, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Login failed');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-slate-900">Login In to Account</CardTitle>
        <CardDescription className="text-slate-500 font-semibold">
          Enter your details to login Vehiclete
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
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
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
