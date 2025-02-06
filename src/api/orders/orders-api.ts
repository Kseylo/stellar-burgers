import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/api'
import { OrdersResponse } from '@/api/orders/types.ts'
import { RootState } from '@/store'
import { setupOrdersListeners } from '@/api/orders/helpers.ts'

const initialOrdersData: OrdersResponse = {
  orders: [],
  total: 0,
  totalToday: 0,
  success: false,
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userOrders'],
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
      invalidatesTags: ['userOrders'],
    }),
    getAllOrders: builder.query<OrdersResponse, void>({
      queryFn() {
        return { data: initialOrdersData }
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await setupOrdersListeners({
          wsUrl: 'wss://norma.nomoreparties.space/orders/all',
          cacheDataLoaded,
          cacheEntryRemoved,
          updateCachedData,
        })
      },
    }),
    getUserOrders: builder.query<OrdersResponse, void>({
      queryFn() {
        return { data: initialOrdersData }
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState },
      ) {
        const accessToken = (getState() as RootState).auth.accessToken
        if (!accessToken) return

        await setupOrdersListeners({
          wsUrl: `wss://norma.nomoreparties.space/orders?token=${accessToken.split(' ')[1]}`,
          cacheDataLoaded,
          cacheEntryRemoved,
          updateCachedData,
        })
      },
      providesTags: ['userOrders'],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
} = ordersApi
