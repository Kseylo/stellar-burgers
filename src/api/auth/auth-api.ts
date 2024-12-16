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

interface ApiResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: User
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/auth`,
  prepareHeaders: (headers) => {
    const accessToken = getCookie('accessToken')
    if (accessToken) {
      headers.set('Authorization', accessToken)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 403) {
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      return result
    }

    const { data } = await baseQuery(
      {
        url: '/token',
        method: 'POST',
        body: { token: refreshToken },
      },
      api,
      extraOptions,
    )

    if (data) {
      const { accessToken, refreshToken } = data as {
        accessToken: string
        refreshToken: string
      }

      setCookie('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

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
      ApiResponse,
      { name: string; email: string; password: string }
    >({
      query: (body) => {
        return {
          url: 'register',
          method: 'POST',
          body,
        }
      },
    }),
    login: builder.mutation<ApiResponse, { email: string; password: string }>({
      query: (body) => {
        return {
          url: 'login',
          method: 'POST',
          body,
        }
      },
    }),
    getUser: builder.query<
      Omit<ApiResponse, 'accessToken' | 'refreshToken'>,
      void
    >({
      query: () => 'user',
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => {
        return {
          url: 'logout',
          method: 'POST',
          body: { token: localStorage.getItem('refreshToken') },
        }
      },
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi
