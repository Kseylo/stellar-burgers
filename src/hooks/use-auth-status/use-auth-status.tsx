import { useGetUserQuery } from '@/api'
import { getAccessToken } from '@/utils'

export function useAuthStatus() {
  const accessToken = getAccessToken()
  return useGetUserQuery(undefined, {
    skip: !accessToken,
  })
}
