import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export const selectOrder = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.order,
)
