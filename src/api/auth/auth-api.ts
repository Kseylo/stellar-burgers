import { BASE_URL } from '@/api'
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchArgs,
} from '@reduxjs/toolkit/query/react'
import { getCookie, setCookie } from '@/utils'

interface User {
  email: string
  name: string
}

interface AuthResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: User
}

interface UserResponse {
  success: boolean
  user: User
}

interface LogoutResponse {
  success: boolean
  message: string
}

const getAccessToken = () => getCookie('accessToken')
const getRefreshToken = () => localStorage.getItem('refreshToken')
const setTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/auth`,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken()
    if (accessToken) headers.set('Authorization', accessToken)
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error?.status === 403) {
    const refreshToken = getRefreshToken()
    if (!refreshToken) return result

    const refreshResult = await baseQuery(
      {
        url: '/token',
        method: 'POST',
        body: { token: refreshToken },
      },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      const { accessToken, refreshToken } = refreshResult.data as AuthResponse
      setTokens(accessToken, refreshToken)

      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<
      AuthResponse,
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
        body: { token: getRefreshToken() },
      }),
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation<UserResponse, Partial<User>>({
      query: (body) => ({
        url: 'user',
        method: 'PATCH',
        body,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi
