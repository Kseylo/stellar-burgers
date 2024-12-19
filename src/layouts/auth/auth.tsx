import styles from './auth.module.css'
import { Navigate, Outlet } from 'react-router'
import { useGetUserQuery } from '@/api'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ROUTES } from '@/config/routes.ts'
import { getAccessToken } from '@/utils'

export function AuthLayout() {
  const accessToken = getAccessToken()

  const { currentData, isFetching } = useGetUserQuery(undefined, {
    skip: !accessToken,
  })

  if (isFetching)
    return (
      <div className={styles.container}>
        <LoadingSpinner size={56} />
      </div>
    )

  if (currentData) return <Navigate to={ROUTES.HOME} />

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )
}
