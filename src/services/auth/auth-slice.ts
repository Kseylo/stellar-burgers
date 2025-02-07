import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { authApi } from '@/api'

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
}

export const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setTokens: (state, { payload }) => {
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.refreshToken = payload.refreshToken
      },
    )
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.refreshToken = payload.refreshToken
      },
    )
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.accessToken = null
      state.refreshToken = null
    })
  },
})

export const { setTokens } = authSlice.actions

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['refreshToken'],
}

export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer,
)
