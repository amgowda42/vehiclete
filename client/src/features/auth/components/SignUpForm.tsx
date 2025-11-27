import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // TODO: Replace with your actual API call
      console.log('Sign Up Data:', data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitMessage('Account created successfully!');
      reset();

      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
