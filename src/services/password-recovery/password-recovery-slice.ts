import { createSlice } from '@reduxjs/toolkit'

interface PasswordRecoveryState {
  isRecoveryInitiated: boolean
}

export const initialState: PasswordRecoveryState = {
  isRecoveryInitiated: false,
}

export const passwordRecoverySlice = createSlice({
  name: 'passwordRecovery',
  initialState,
  reducers: {
    setRecoveryInitiated: (state) => {
      state.isRecoveryInitiated = true
    },
    resetRecoveryState: () => initialState,
  },
})

export const { setRecoveryInitiated, resetRecoveryState } =
  passwordRecoverySlice.actions
export const { reducer } = passwordRecoverySlice
