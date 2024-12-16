import { Navigate, Outlet } from 'react-router'

import styles from './protected.module.css'
import { getCookie } from '@/utils'
import { useGetUserQuery } from '@/api'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ROUTES } from '@/config/router.tsx'

export function ProtectedLayout() {
  const accessToken = getCookie('accessToken')

  const { currentData, isFetching } = useGetUserQuery(undefined, {
    skip: !accessToken,
  })

  if (isFetching) {
    return (
      <div className={styles.container}>
        <LoadingSpinner size={56} />
      </div>
    )
  }

  if (!currentData) return <Navigate to={ROUTES.LOGIN} />

  return (
    <div className={styles.container}>
      Protected
      <Outlet />
    </div>
  )
}
