import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/api'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
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
