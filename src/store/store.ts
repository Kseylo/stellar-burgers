import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { ingredientSlice } from '@/services/ingredient'
import { burgerSlice } from '@/services/burger'
import { ingredientsApi } from '@/api'

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [burgerSlice.name]: burgerSlice.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
