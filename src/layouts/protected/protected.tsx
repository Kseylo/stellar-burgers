import { Navigate, Outlet, useLocation } from 'react-router'

import styles from './protected.module.css'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ROUTES } from '@/config/routes.ts'
import { useAuthStatus } from '@/hooks/use-auth-status'

export function ProtectedLayout({
  anonymous = false,
}: {
  anonymous?: boolean
}) {
  const { data: userData, isLoading } = useAuthStatus()

  const location = useLocation()
  const from = location.state?.from || ROUTES.HOME

  if (isLoading)
    return (
      <div className={`${anonymous ? styles.anonymous : ''}`}>
        <LoadingSpinner size={76} />
      </div>
    )

  if (anonymous && userData) return <Navigate to={from} />

  if (!anonymous && !userData)
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />

  return (
    <div className={`${anonymous ? styles.anonymous : ''}`}>
      <Outlet />
    </div>
  )
}
