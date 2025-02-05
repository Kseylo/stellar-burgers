import { createApi } from '@reduxjs/toolkit/query/react'
import {
  User,
  UserResponse,
  LogoutResponse,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
} from '@/api'
import { baseQueryWithReauth } from '@/api'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, { token: string }>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
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
