import { describe, test, expect } from 'vitest'
import {
  initialState,
  persistedAuthReducer,
  setTokens,
  AuthState,
} from './auth-slice'

const tokens: AuthState = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
}

describe('auth slice', () => {
  test('should return the initial state', () => {
    expect(persistedAuthReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    )
  })

  test('should set the tokens', () => {
    const action = setTokens(tokens)
    const state = persistedAuthReducer(initialState as never, action)
    expect(state).toEqual(tokens)
  })

  test('should set tokens on login fulfilled', async () => {
    // const { store } = renderWithProviders(<LoginPage />)
  })
})
