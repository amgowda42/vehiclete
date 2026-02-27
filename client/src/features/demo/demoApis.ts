import apiSlice from '@/app/apiSlice';

export interface IDemo {
  _id: string;
  email: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  vehicleId: {
    _id: string;
    name: string;
    brand: string;
    price: number;
  };
  status: 'pending' | 'approved' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface BookDemoRequest {
  email: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  vehicleId: string;
}

export interface UpdateStatusRequest {
  bookingId: string;
  status: 'approved' | 'cancelled' | 'completed';
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: IDemo;
}

export const demoApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    bookDemo: builder.mutation<ApiResponse, BookDemoRequest>({
      query: data => ({
        url: '/demo',
        method: 'POST',
        body: data,
      }),
    }),

    getAllDemoBookings: builder.query<ApiResponse, void>({
      query: () => '/demo/bookings',
    }),

    updateDemoStatus: builder.mutation<ApiResponse, UpdateStatusRequest>({
      query: ({ bookingId, status }) => ({
        url: `/demo/${bookingId}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const {
  useBookDemoMutation,
  useGetAllDemoBookingsQuery,
  useLazyGetAllDemoBookingsQuery,
  useUpdateDemoStatusMutation,
} = demoApis;
