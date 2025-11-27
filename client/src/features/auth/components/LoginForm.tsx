import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Zod Schema for Login
const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('email is required.'),
  password: z.string().min(1, 'Password is required').nonempty('password is required.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // TODO: Replace with your actual API call
      console.log('Login Data:', data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitMessage('Login successful!');
      reset();

      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (error) {
      setSubmitMessage('Invalid credentials. Please try again.');
      console.log(error);
    } finally {
      setIsSubmitting(false);
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

          {/* need to replace */}
          {submitMessage && (
            <Alert
              className={
                submitMessage.includes('success')
                  ? 'bg-green-50 text-green-900 border-green-200'
                  : 'bg-red-50 text-red-900 border-red-200'
              }
            >
              <AlertDescription>{submitMessage}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
