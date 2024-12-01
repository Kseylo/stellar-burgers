import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { ingredientSlice } from '@/services/ingredient'
import { burgerSlice } from '@/services/burger'
import { ingredientsApi } from '@/api'
import { ordersApi } from '@/api/orders/orders-api.ts'
import { orderSlice } from '@/services/order'

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [burgerSlice.name]: burgerSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ingredientsApi.middleware)
      .concat(ordersApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
