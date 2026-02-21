import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookDemoMutation } from '../demoApis';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, Car, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import { useGetVehicleByIdQuery } from '@/features/vehiclesStats/vehiclesStatsAPis';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button } from '@/components/ui/button';

const bookDemoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Invalid phone number')
    .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
  preferredDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Time is required'),
});

type BookDemoFormValues = z.infer<typeof bookDemoSchema>;

const BookDemoForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data: vehicleData } = useGetVehicleByIdQuery(id || '');
  const [bookDemo, { isLoading, isSuccess, isError, error }] = useBookDemoMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookDemoFormValues>({
    resolver: zodResolver(bookDemoSchema),
  });

  const onSubmit = async (data: BookDemoFormValues) => {
    if (!id) {
      console.error('Vehicle ID is required');
      return;
    }
    try {
      await bookDemo({ ...data, vehicleId: id }).unwrap();
      reset();
    } catch (err) {
      console.error('Failed to book demo:', err);
    }
  };

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  const today = new Date().toISOString().split('T')[0];

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 text-lg mb-6">Your test ride has been successfully booked.</p>
          <div className="bg-white rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-500">Check your email for confirmation</p>
            <Button variant="outline" className="mt-2 cursor-pointer" onClick={() => navigate(-2)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Car className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Book a Test Drive</h1>
          </div>
          {vehicleData && (
            <p className="text-cyan-100 text-lg">
              {vehicleData.data.brand} {vehicleData.data.model}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                {(error as FetchBaseQueryError)?.status === 409
                  ? 'You have already booked a test drive for this vehicle.'
                  : (((error as FetchBaseQueryError)?.data as Record<string, unknown>)
                      ?.message as string) || 'Failed to book demo. Please try again.'}
              </p>
            </div>
          )}

          <InputField label="Full Name" icon={<User />} error={errors.name?.message}>
            <input {...register('name')} placeholder="John Doe" />
          </InputField>

          <InputField label="Email Address" icon={<Mail />} error={errors.email?.message}>
            <input {...register('email')} placeholder="john@example.com" />
          </InputField>

          <InputField label="Phone Number" icon={<Phone />} error={errors.phone?.message}>
            <input {...register('phone')} placeholder="+1 (555) 000-0000" />
          </InputField>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Preferred Date"
              icon={<Calendar />}
              error={errors.preferredDate?.message}
            >
              <input type="date" min={today} {...register('preferredDate')} />
            </InputField>

            <InputField
              label="Preferred Time"
              icon={<Clock />}
              error={errors.preferredTime?.message}
            >
              <select {...register('preferredTime')}>
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </InputField>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex justify-center gap-2">
                <Loader2 className="animate-spin" /> Booking...
              </span>
            ) : (
              'Book Test Drive'
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            By booking, you agree to our terms and conditions
          </p>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-semibold mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      {React.cloneElement(
        children as React.ReactElement<
          React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>
        >,
        {
          className: `w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none ${
            error ? 'border-red-500' : 'border-gray-200'
          }`,
        }
      )}
    </div>
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default BookDemoForm;
