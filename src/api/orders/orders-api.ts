import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/api'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { name: string; order: { number: number }; success: boolean },
      { ingredients: string[] }
    >({
      query: ({ ingredients }) => {
        return {
          url: 'orders',
          method: 'POST',
          body: { ingredients },
        }
      },
    }),
  }),
})

export const { useCreateOrderMutation } = ordersApi
