import styles from './auth.module.css'
import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )
}
