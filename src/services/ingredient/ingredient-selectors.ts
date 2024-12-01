import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export const selectIngredient = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.ingredient.ingredient,
)
