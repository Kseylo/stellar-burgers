import { Outlet } from 'react-router'
import { AppHeader } from '@/components/app-header'
import styles from './root.module.css'

export function RootLayout() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
