import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export const selectPasswordRecovery = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.passwordRecovery,
)
