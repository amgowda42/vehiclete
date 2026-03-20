import apiSlice from '@/app/apiSlice';

export const compareApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    compareVehicles: builder.mutation({
      query: ({ type, id1, id2 }) => ({
        url: '/compare',
        method: 'POST',
        body: { type, id1, id2 },
      }),
    }),
  }),
});

export const { useCompareVehiclesMutation } = compareApis;
