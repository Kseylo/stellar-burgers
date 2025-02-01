import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/api'
import { OrdersResponse } from '@/api/orders/types.ts'

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
    getAllOrders: builder.query<OrdersResponse, void>({
      queryFn() {
        return { data: { orders: [], total: 0, totalToday: 0, success: false } }
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')

        try {
          await cacheDataLoaded
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)

            if (data.success && data.orders) {
              updateCachedData((draft) => {
                draft.orders = data.orders
                draft.total = data.total
                draft.totalToday = data.totalToday
                draft.success = true
              })
            }
          }
          ws.addEventListener('message', listener)
        } catch (e) {
          console.error(e)
        }
        await cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})

export const { useCreateOrderMutation, useGetAllOrdersQuery } = ordersApi
