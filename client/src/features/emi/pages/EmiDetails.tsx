import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGetEmiDetailsQuery } from '../emiApis';
import { useUpdateEmiDetailsMutation } from '../emiApis';
import { emiFormSchema, type EmiFormData } from '../components/emiShema';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import {
  Edit2,
  X,
  Save,
  Calculator,
  DollarSign,
  Calendar,
  TrendingUp,
  Percent,
  Loader2,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

const EmiDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: emiDetails, isLoading, isError, error } = useGetEmiDetailsQuery(id!);
  const [updateEmiDetails, { isLoading: isUpdating }] = useUpdateEmiDetailsMutation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<EmiFormData>({
    resolver: zodResolver(emiFormSchema),
    defaultValues: {
      price: 0,
      downPayment: 0,
      interestRate: 0,
      tenureMonths: 0,
    },
  });

  const handleEdit = () => {
    if (emiDetails) {
      setIsEditing(true);
      reset({
        price: emiDetails.data.price,
        downPayment: emiDetails.data.downPayment,
        interestRate: emiDetails.data.interestRate,
        tenureMonths: emiDetails.data.tenureMonths,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const onSubmit = async (data: EmiFormData) => {
    try {
      await updateEmiDetails({
        vehicleId: id!,
        ...data,
      }).unwrap();

      setIsEditing(false);
    } catch (err: unknown) {
      console.log('Failed to update EMI details:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading EMI details...</p>
        </div>
      </div>
    );
  }

  if (isError || !emiDetails) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Error Loading EMI Details</h2>
            <p className="text-slate-600">
              {(error as { data?: { message?: string } })?.data?.message ||
                'Failed to load EMI details'}
            </p>
            <Button
              onClick={() => navigate(-1)}
              variant="destructive"
              className="bg-red-600 cursor-pointer mt-6"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calculator className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">EMI Details</h1>
                <p className="text-sm text-slate-500">Vehicle ID: {emiDetails.data.vehicleId}</p>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={18} />
                Edit Details
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          // Edit Form with React Hook Form
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Edit EMI Details</h2>
              <button onClick={handleCancel} className="text-slate-500 hover:text-slate-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Vehicle Price (₹)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="number"
                      {...register('price', { valueAsNumber: true })}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.price ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="220000"
                    />
                  </div>
                  {formErrors.price && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.price.message}</p>
                  )}
                </div>

                {/* Down Payment */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Down Payment (₹)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="number"
                      {...register('downPayment', { valueAsNumber: true })}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.downPayment ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="21000"
                    />
                  </div>
                  {formErrors.downPayment && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.downPayment.message}</p>
                  )}
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <div className="relative">
                    <Percent
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="number"
                      step="0.1"
                      {...register('interestRate', { valueAsNumber: true })}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.interestRate ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="9.5"
                    />
                  </div>
                  {formErrors.interestRate && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.interestRate.message}</p>
                  )}
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tenure (Months)
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="number"
                      {...register('tenureMonths', { valueAsNumber: true })}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.tenureMonths ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="36"
                    />
                  </div>
                  {formErrors.tenureMonths && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.tenureMonths.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isUpdating}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-blue-600" size={24} />
                  <h3 className="text-sm font-medium text-slate-600">Monthly EMI</h3>
                </div>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(emiDetails.data.monthlyEmi)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-green-600" size={24} />
                  <h3 className="text-sm font-medium text-slate-600">Vehicle Price</h3>
                </div>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(emiDetails.data.price)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-purple-600" size={24} />
                  <h3 className="text-sm font-medium text-slate-600">Total Interest</h3>
                </div>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(emiDetails.data.totalInterest)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-orange-600" size={24} />
                  <h3 className="text-sm font-medium text-slate-600">Total Payable</h3>
                </div>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(emiDetails.data.totalPayable)}
                </p>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Loan Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Down Payment</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatCurrency(emiDetails.data.downPayment)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Interest Rate</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {emiDetails.data.interestRate}% p.a.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Tenure</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {emiDetails.data.tenureMonths} months (
                    {Math.floor(emiDetails.data.tenureMonths / 12)} years)
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500">Last Updated</p>
                  <p className="text-sm font-medium text-slate-700">
                    {formatDate(emiDetails.data.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Breakdown */}
        {!isEditing && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Principal Amount (Price - Down Payment)</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(emiDetails.data.price - emiDetails.data.downPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Total Interest</span>
                <span className="font-semibold text-orange-600">
                  {formatCurrency(emiDetails.data.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Down Payment</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(emiDetails.data.downPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 bg-blue-50 rounded-lg px-4">
                <span className="font-semibold text-slate-900">Total Amount to be Paid</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrency(emiDetails.data.totalPayable)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmiDetails;
