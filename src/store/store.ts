import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ingredientSlice } from '@/services/ingredient'

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
