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
}

export interface EmiDetaisResponse {
  massage: string;
  data: IEmi;
  success: boolean;
}

export const emiApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEmiDetails: builder.query<EmiDetaisResponse, string>({
      query: vehiclId => ({
        url: `/emi/${vehiclId}`,
      }),
    }),
    updateEmiDetails: builder.mutation<EmiDetaisResponse, IEmi>({
      query: emiDetails => ({
        url: '/emi',
        method: 'POST',
        body: emiDetails,
      }),
    }),
  }),
});

export const { useGetEmiDetailsQuery, useUpdateEmiDetailsMutation } = emiApis;
