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
export interface BikeFormData {
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
  groundClearance?: number;
  image: File;
  isAvailable?: boolean;
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
}

export interface UpdateBikeFormData extends Partial<BikeFormData> {
  id: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
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

    createBike: builder.mutation<ApiResponse<IBike>, BikeFormData>({
      query: data => {
        const formData = new FormData();

        // Append all fields to FormData
        formData.append('abs', String(data.abs));
        formData.append('acceleration', data.acceleration);
        formData.append('brakingSystem', data.brakingSystem);
        formData.append('brand', data.brand);
        formData.append('caliperType', data.caliperType);
        formData.append('color', data.color);
        formData.append('coolingSystem', data.coolingSystem);
        formData.append('displacement', data.displacement);
        formData.append('engineCapacity', String(data.engineCapacity));
        formData.append('frontBrakeType', data.frontBrakeType);
        formData.append('frontSuspension', data.frontSuspension);
        formData.append('fuelTankCapacity', String(data.fuelTankCapacity));

        if (data.groundClearance) {
          formData.append('groundClearance', String(data.groundClearance));
        }

        formData.append('isAvailable', String(data.isAvailable ?? true));
        formData.append('kerbWeight', String(data.kerbWeight));
        formData.append('maxPower', data.maxPower);
        formData.append('maxTorque', data.maxTorque);
        formData.append('mileage', String(data.mileage));
        formData.append('model', data.model);
        formData.append('price', String(data.price));
        formData.append('quickShifter', String(data.quickShifter));
        formData.append('rearBrakeType', data.rearBrakeType);
        formData.append('rearSuspension', data.rearSuspension);
        formData.append('seatHeight', String(data.seatHeight));
        formData.append('seatLength', String(data.seatLength));
        formData.append('topSpeed', data.topSpeed);
        formData.append('transmission', data.transmission);
        formData.append('varient', data.varient);
        formData.append('year', String(data.year));

        // Append image file
        formData.append('image', data.image);

        return {
          url: '/bikes',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Bike'],
    }),

    // // Create bike
    // createBike: builder.mutation<IBike, { bikeData: CreateBikeDto; image: File }>({
    //   query: ({ bikeData, image }) => {
    //     const formData = new FormData();

    //     // Append all bike data
    //     Object.entries(bikeData).forEach(([key, value]) => {
    //       formData.append(key, String(value));
    //     });

    //     // Append image
    //     formData.append('image', image);

    //     return {
    //       url: '/bikes',
    //       method: 'POST',
    //       body: formData,
    //     };
    //   },
    //   transformResponse: (response: BikeDetailResponse) => response.data,
    //   invalidatesTags: ['Bikes'],
    // }),

    // // Update bike
    // updateBike: builder.mutation<IBike, { id: string; bikeData: UpdateBikeDto; image?: File }>({
    //   query: ({ id, bikeData, image }) => {
    //     const formData = new FormData();

    //     // Append all bike data
    //     Object.entries(bikeData).forEach(([key, value]) => {
    //       if (value !== undefined) {
    //         formData.append(key, String(value));
    //       }
    //     });

    //     // Append image if provided
    //     if (image) {
    //       formData.append('image', image);
    //     }

    //     return {
    //       url: `/bikes/${id}`,
    //       method: 'PUT',
    //       body: formData,
    //     };
    //   },
    //   transformResponse: (response: BikeDetailResponse) => response.data,
    //   invalidatesTags: (result, error, { id }) => [{ type: 'Bikes', id }, 'Bikes'],
    // }),

    // Delete bike
    // deleteBike: builder.mutation<void, string>({
    //   query: id => ({
    //     url: `/bikes/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: (result, error, id) => [{ type: 'Bikes', id }, 'Bikes'],
    // }),

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
  useCreateBikeMutation
  //   useCreateBikeMutation,
  //   useUpdateBikeMutation,
  //   useDeleteBikeMutation,
  //   useGetBikesByBrandQuery,
  //   useSearchBikesQuery,
  //   useGetBikesByPriceRangeQuery,
  //   useGetAvailableBikesQuery,
} = bikeApis;

// ============================================
// Usage Examples in Components
// ============================================

/*

// Example 5: Delete bike

// Example 6: Filter by brand
import { useGetBikesByBrandQuery } from '@/features/bikes/bikeApi';

const KTMBikesPage = () => {
  const { data: ktmBikes, isLoading } = useGetBikesByBrandQuery('KTM');

  if (isLoading) return <div>Loading KTM bikes...</div>;

  return (
    <div>
      {ktmBikes?.map(bike => (
        <BikeCard key={bike._id} bike={bike} />
      ))}
    </div>
  );
};

// Example 7: Search bikes
import { useSearchBikesQuery } from '@/features/bikes/bikeApi';
import { useState } from 'react';

const SearchBikesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults, isLoading } = useSearchBikesQuery(searchQuery, {
    skip: searchQuery.length < 2, // Don't search if query is too short
  });

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search bikes..."
      />
      {isLoading && <div>Searching...</div>}
      {searchResults?.map(bike => (
        <BikeCard key={bike._id} bike={bike} />
      ))}
    </div>
  );
};

// Example 8: Price range filter
import { useGetBikesByPriceRangeQuery } from '@/features/bikes/bikeApi';

const AffordableBikesPage = () => {
  const { data: bikes, isLoading } = useGetBikesByPriceRangeQuery({
    minPrice: 100000,
    maxPrice: 300000,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Bikes between ₹1L - ₹3L</h2>
      {bikes?.map(bike => (
        <BikeCard key={bike._id} bike={bike} />
      ))}
    </div>
  );
};

// Example 9: Available bikes only
import { useGetAvailableBikesQuery } from '@/features/bikes/bikeApi';

const AvailableBikesPage = () => {
  const { data: bikes, isLoading } = useGetAvailableBikesQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Available Bikes</h2>
      {bikes?.map(bike => (
        <BikeCard key={bike._id} bike={bike} />
      ))}
    </div>
  );
};
*/

// ============================================
// Don't forget to add tag types in apiSlice.ts
// ============================================

/*
// app/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8001',
  }),
  tagTypes: ['Bikes'], // Add this!
  endpoints: () => ({}),
});

export default apiSlice;
*/
