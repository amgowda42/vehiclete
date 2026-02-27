import apiSlice from '@/app/apiSlice';

export interface IEmi {
  _id: string;
  vehicleId: string;
  downPayment: number;
  interestRate: number;
  monthlyEmi: number;
  price: number;
  tenureMonths: number;
  totalInterest: number;
  totalPayable: number;
  updatedAt: string; // you are using this in UI
}

export interface EmiDetaisResponse {
  message: string; // fix typo (was massage)
  data: IEmi;
  success: boolean;
}

/* ✅ NEW TYPE */
export interface UpdateEmiPayload {
  vehicleId: string;
  price: number;
  downPayment: number;
  interestRate: number;
  tenureMonths: number;
}

export const emiApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEmiDetails: builder.query<EmiDetaisResponse, string>({
      query: vehicleId => ({
        url: `/emi/${vehicleId}`,
      }),
    }),

    /* ✅ FIXED HERE */
    updateEmiDetails: builder.mutation<EmiDetaisResponse, UpdateEmiPayload>({
      query: emiDetails => ({
        url: '/emi',
        method: 'POST',
        body: emiDetails,
      }),
    }),
  }),
});

export const { useGetEmiDetailsQuery, useUpdateEmiDetailsMutation } = emiApis;
