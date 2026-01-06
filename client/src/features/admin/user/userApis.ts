import apiSlice from '@/app/apiSlice';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  role: string;
}

export interface ICount {
  totalUsers: number;
  totalAdmins: number;
  totalRegularUsers: number;
}

export interface UsersResponse {
  data: IUser[];
  success: boolean;
  message: string;
}

export interface UsersCountResponse {
  data: ICount;
  success: boolean;
  message: string;
}

export interface UpdateUserBody {
  email?: string;
  firstName?: string;
  isActive?: boolean;
  lastName?: string;
}

interface UpdateUserRequest {
  id: string;
  body: UpdateUserBody;
}

export const userApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query<UsersResponse, void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['User'],
    }),

    getUsersCount: builder.query<UsersCountResponse, void>({
      query: () => ({
        url: '/users/count',
      }),
    }),

    updateUserById: builder.mutation<UpdateUserBody, UpdateUserRequest>({
      query: ({ body, id }) => ({
        url: `/users/update/${id}`,
        body: body,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUsersCountQuery, useUpdateUserByIdMutation } = userApis;
