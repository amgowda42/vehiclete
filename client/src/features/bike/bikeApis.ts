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
    getAllBikes: builder.query<BikeListResponse, void>({
      query: () => ({
        url: '/bikes',
      }),
      providesTags: ['Bike'],
    }),

    getBikeById: builder.query<BikeDetailResponse, string>({
      query: id => ({
        url: `/bikes/${id}`,
      }),
    }),

    // Get bikes by brand
    // getBikesByBrand: builder.query<IBike[], string>({
    //   query: brand => ({
    //     url: '/bikes',
    //   }),
    //   transformResponse: (response: BikeListResponse, meta, brand) => {
    //     return response.data.filter(bike => bike.brand.toLowerCase() === brand.toLowerCase());
    //   },
    //   providesTags: ['Bikes'],
    // }),

    // Search bikes
    // searchBikes: builder.query<IBike[], string>({
    //   query: searchQuery => ({
    //     url: '/bikes',
    //   }),
    //   transformResponse: (response: BikeListResponse, meta, searchQuery) => {
    //     const lowerQuery = searchQuery.toLowerCase();
    //     return response.data.filter(
    //       bike =>
    //         bike.brand.toLowerCase().includes(lowerQuery) ||
    //         bike.model.toLowerCase().includes(lowerQuery) ||
    //         bike.displacement.toLowerCase().includes(lowerQuery)
    //     );
    //   },
    //   providesTags: ['Bikes'],
    // }),

    // Get bikes by price range
    // getBikesByPriceRange: builder.query<IBike[], { minPrice: number; maxPrice: number }>({
    //   query: () => ({
    //     url: '/bikes',
    //   }),
    //   transformResponse: (response: BikeListResponse, meta, { minPrice, maxPrice }) => {
    //     return response.data.filter(bike => bike.price >= minPrice && bike.price <= maxPrice);
    //   },
    //   providesTags: ['Bikes'],
    // }),

    // Get available bikes only
    // getAvailableBikes: builder.query<IBike[], void>({
    //   query: () => ({
    //     url: '/bikes',
    //   }),
    //   transformResponse: (response: BikeListResponse) => {
    //     return response.data.filter(bike => bike.isAvailable);
    //   },
    //   providesTags: ['Bike'],
    // }),
  }),
});

export const {
  useGetAllBikesQuery,
  useGetBikeByIdQuery,
  //   useGetBikesByBrandQuery,
  //   useSearchBikesQuery,
  //   useGetBikesByPriceRangeQuery,
  //   useGetAvailableBikesQuery,
} = bikeApis;
