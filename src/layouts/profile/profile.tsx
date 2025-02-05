import styles from '@/layouts/profile/profile.module.css'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { Outlet } from 'react-router'

export function ProfileLayout() {
  return (
    <div className={styles.container}>
      <ProfileSidebar />
      <Outlet />
    </div>
  )
}
