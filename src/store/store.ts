import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { errorLogger } from './error-logger'

import { burgerSlice } from '@/services/burger'
import { orderSlice } from '@/services/order'
import { passwordRecoverySlice } from '@/services/password-recovery'
import { authSlice, persistedAuthReducer } from '@/services/auth'
import { authApi, ingredientsApi, ordersApi, passwordApi } from '@/api'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  [burgerSlice.name]: burgerSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [passwordRecoverySlice.name]: passwordRecoverySlice.reducer,
  [authSlice.name]: persistedAuthReducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [passwordApi.reducerPath]: passwordApi.reducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(errorLogger)
        .concat(ingredientsApi.middleware)
        .concat(ordersApi.middleware)
        .concat(authApi.middleware)
        .concat(passwordApi.middleware),
    preloadedState,
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
