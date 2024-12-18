import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { ingredientSlice } from '@/services/ingredient'
import { burgerSlice } from '@/services/burger'
import { orderSlice } from '@/services/order'
import { passwordRecoverySlice } from '@/services/password-recovery'
import { ingredientsApi, ordersApi, authApi, passwordApi } from '@/api'

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [burgerSlice.name]: burgerSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [passwordRecoverySlice.name]: passwordRecoverySlice.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [passwordApi.reducerPath]: passwordApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ingredientsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(authApi.middleware)
      .concat(passwordApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
