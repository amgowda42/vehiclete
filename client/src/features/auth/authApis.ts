import apiSlice from '@/app/apiSlice';
import { setCredentials, clearCredentials } from './authSlice';

export interface SignUpRequest {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  data: {
    _id: string;
    email: string;
    firstName: string;
    isActive: boolean;
    lastName: string;
    role: 'admin"| "user' | string;
  };
  message: string;
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    user: {
      email: string;
      firstName: string;
      _id: string;
      isActive: boolean;
      lastName: string;
      role: 'user' | 'admin' | string;
    };
  };
  message: string;
  success: boolean;
}

export interface AuthCheckResponse {
  data: {
    _id: string;
    email: string;
    firstName: string;
    isActive: boolean;
    lastName: string;
    role: 'user' | 'admin' | string;
  };
  message: string;
  success: boolean;
}

export const authApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    SignUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: credentials => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.data.user));
          dispatch(
            authApis.util.updateQueryData('authCheck', undefined, () => ({
              success: true,
              message: 'Authenticated',
              data: data.data.user,
            }))
          );
        } catch {
          console.log('error in calling authCheck');
        }
      },
    }),

    authCheck: builder.query<AuthCheckResponse, void>({
      query: () => '/auth/authCheck',
      keepUnusedDataFor: 300,
    }),

    refreshToken: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),

    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useAuthCheckQuery, useSignUpMutation } =
  authApis;
