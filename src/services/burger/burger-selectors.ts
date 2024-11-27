import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export const selectBurger = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.burger,
)
