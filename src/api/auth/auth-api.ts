import { createApi } from '@reduxjs/toolkit/query/react'
import { getRefreshToken } from '@/utils'
import { User, UserResponse, LogoutResponse, AuthResponse } from '@/api'
import { baseQueryWithReauth } from '@/api'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<
      AuthResponse,
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: { token: getRefreshToken() },
      }),
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<UserResponse, Partial<User>>({
      query: (body) => ({
        url: 'auth/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi
