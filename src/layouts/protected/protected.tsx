import { Navigate, Outlet, useLocation } from 'react-router'

import styles from './protected.module.css'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ROUTES } from '@/config/routes.ts'
import { useAppSelector } from '@/store'
import { selectRefreshToken } from '@/services/auth'
import { useGetUserQuery } from '@/api'

export function ProtectedLayout({
  anonymous = false,
}: {
  anonymous?: boolean
}) {
  const refreshToken = useAppSelector(selectRefreshToken)
  const { data, isLoading } = useGetUserQuery(undefined, {
    skip: !refreshToken,
  })

  const location = useLocation()
  const from = location.state?.from || ROUTES.HOME

  if (isLoading)
    return (
      <div className={styles.anonymous}>
        <LoadingSpinner size={76} />
      </div>
    )

  if (anonymous && data) return <Navigate to={from} />

  if (!anonymous && !data)
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />

  return (
    <div className={`${anonymous ? styles.anonymous : ''}`}>
      <Outlet />
    </div>
  )
}
