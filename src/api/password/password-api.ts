import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/api'

interface ApiResponse {
  success: boolean
  message: string
}

export const passwordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/password-reset` }),
  endpoints: (builder) => ({
    sendPasswordResetEmail: builder.mutation<ApiResponse, { email: string }>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ApiResponse,
      { password: string; token: string }
    >({
      query: (body) => ({
        url: '/reset',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSendPasswordResetEmailMutation, useResetPasswordMutation } =
  passwordApi
