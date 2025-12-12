import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clearCredentials } from '@/features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  // prepareHeaders: headers => {
  //   // Add any custom headers here if needed
  //   return headers;
  // },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // here i want to call the refresh token
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Token refresh failed, logging out');
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'User', 'Admin'],
  endpoints: () => ({}),
});

export default apiSlice;
