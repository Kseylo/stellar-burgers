import { ProfileSidebar } from '@/components/profile-sidebar'
import { EditProfile } from '@/components/edit-profile'

import styles from './profile.module.css'

export function ProfilePage() {
  return (
    <div className={styles.container}>
      <ProfileSidebar />
      <EditProfile />
    </div>
  )
}
