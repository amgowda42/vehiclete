import { z } from 'zod';

export const emiFormSchema = z
  .object({
    price: z
      .number()
      .positive('Price must be greater than 0'),

    downPayment: z
      .number()
      .nonnegative('Down payment must be 0 or greater'),

    interestRate: z
      .number()
      .positive('Interest rate must be greater than 0')
      .max(100, 'Interest rate cannot exceed 100%'),

    tenureMonths: z
      .number()
      .int('Tenure must be a whole number')
      .min(1, 'Tenure must be at least 1 month')
      .max(120, 'Tenure cannot exceed 120 months'),
  })
  .refine(data => data.downPayment < data.price, {
    message: 'Down payment must be less than vehicle price',
    path: ['downPayment'],
  });

export type EmiFormData = z.infer<typeof emiFormSchema>;
