import { describe, test, expect, vi } from 'vitest'
import { initialState, persistedAuthReducer, setTokens } from './auth-slice'
import { loginCredentials, registerCredentials, tokens } from '@/utils'
import { authApi } from '@/api'
import { setupStore } from '@/store'

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

  test('should set tokens after login', async () => {
    const store = setupStore()
    await vi.waitFor(() =>
      store.dispatch(authApi.endpoints.login.initiate(loginCredentials)),
    )
    expect(store.getState().auth).toEqual(tokens)
  })

  test('should set token after register', async () => {
    const store = setupStore()
    await vi.waitFor(() =>
      store.dispatch(authApi.endpoints.register.initiate(registerCredentials)),
    )
    expect(store.getState().auth).toEqual(tokens)
  })

  test('should clear tokens after logout', async () => {
    const store = setupStore()
    await vi.waitFor(() =>
      store.dispatch(authApi.endpoints.login.initiate(loginCredentials)),
    )
    await vi.waitFor(() =>
      store.dispatch(
        authApi.endpoints.logout.initiate({ token: tokens.refreshToken! }),
      ),
    )
    expect(store.getState().auth).toEqual(initialState)
  })
})
