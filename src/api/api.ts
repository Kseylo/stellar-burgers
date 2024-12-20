import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { getAccessToken, getRefreshToken, setTokens } from '@/utils'
import { AuthResponse } from '@/api/auth'

export const BASE_URL = 'https://norma.nomoreparties.space/api'

export const baseQueryWithAuthorization = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken()
    if (accessToken) headers.set('Authorization', accessToken)
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuthorization(args, api, extraOptions)
  if (result.error?.status === 403) {
    const refreshToken = getRefreshToken()
    if (!refreshToken) return result

    const refreshResult = await baseQueryWithAuthorization(
      {
        url: 'auth/token',
        method: 'POST',
        body: { token: refreshToken },
      },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      const { accessToken, refreshToken } = refreshResult.data as AuthResponse
      setTokens(accessToken, refreshToken)

      result = await baseQueryWithAuthorization(args, api, extraOptions)
    }
  }
  return result
}
