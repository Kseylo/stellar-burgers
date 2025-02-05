import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export const selectAccessToken = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.accessToken,
)

export const selectRefreshToken = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.refreshToken,
)
