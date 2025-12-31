import apiSlice from '@/app/apiSlice';

export interface ICycle {
  _id: string;

  batteryCapacity?: number;
  brakeType: string;
  brand: string;

  category: string;
  color: string;

  features: string[];
  frameMaterial: string;
  frameSize: string;

  gearType: string;
  gears: number;

  imageUrl: string;
  isAvailable: boolean;
  isElectric: boolean;

  maxLoad: number;
  model: string;
  motorPower?: number;

  price: number;
  range?: number;
  recommendedHeight: string;

  suspension: string;

  terrain: string[];

  warrantyYears: number;
  weight: number;
  wheelSize: string;

  year: number;
}

export interface CycleListResponse {
  success: boolean;
  message: string;
  data: ICycle[];
}

export interface CycleDetailResponse {
  success: boolean;
  data: ICycle;
  message: string;
}

export const cycleApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCycles: builder.query<CycleListResponse, void>({
      query: () => ({
        url: '/cycles',
      }),
      providesTags: ['Cycle'],
    }),

    getCycleById: builder.query<CycleDetailResponse, string>({
      query: id => ({
        url: `/cycles/${id}`,
      }),
    }),
  }),
});

export const { useGetAllCyclesQuery, useGetCycleByIdQuery } = cycleApis;
