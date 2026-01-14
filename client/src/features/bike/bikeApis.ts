import apiSlice from '@/app/apiSlice';

export interface IBike {
  _id: string;
  abs: boolean;
  acceleration: string;
  brakingSystem: string;
  brand: string;
  caliperType: string;
  color: string;
  coolingSystem: string;
  displacement: string;
  engineCapacity: number;
  frontBrakeType: string;
  frontSuspension: string;
  fuelTankCapacity: number;
  groundClearance: number;
  imageUrl: string;
  isAvailable: boolean;
  kerbWeight: number;
  maxPower: string;
  maxTorque: string;
  mileage: number;
  model: string;
  price: number;
  quickShifter: boolean;
  rearBrakeType: string;
  rearSuspension: string;
  seatHeight: number;
  seatLength: number;
  topSpeed: string;
  transmission: string;
  varient: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface BikeListResponse {
  success: boolean;
  message: string;
  data: IBike[];
}

export interface BikeDetailResponse {
  message: string;
  data: IBike;
  success: boolean;
}

export const bikeApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllBikes: builder.query<BikeListResponse, string, void>({
      query: brand => ({
        url: '/bikes',
        params: brand ? { brand } : {},
      }),
      providesTags: ['Bike'],
    }),

    getBikeById: builder.query<BikeDetailResponse, string>({
      query: id => ({
        url: `/bikes/${id}`,
      }),
    }),

    getBikeBrands: builder.query<{ success: boolean; message: string; data: string[] }, void>({
      query: () => ({
        url: '/bikes/brands',
      }),
    }),
  }),
});

export const { useGetAllBikesQuery, useGetBikeByIdQuery, useGetBikeBrandsQuery } = bikeApis;
