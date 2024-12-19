import styles from './profile-sidebar.module.css'
import { ROUTES } from '@/config/routes.ts'
import { ProfileSidebarLink } from './profile-sidebar-link'
import { authApi, useLogoutMutation } from '@/api'
import { setTokens } from '@/utils'
import { useAppDispatch } from '@/store'

export function ProfileSidebar() {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const onLogout = async () => {
    try {
      await logout().unwrap()
      setTokens('', '')
      dispatch(authApi.util.resetApiState())
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <nav className={styles.navContainer}>
      <ol className={styles.navList}>
        <ProfileSidebarLink to={ROUTES.PROFILE}>Профиль</ProfileSidebarLink>
        <ProfileSidebarLink to={ROUTES.ORDERS_HISTORY}>
          История заказов
        </ProfileSidebarLink>
        <ProfileSidebarLink to={ROUTES.HOME} onClick={onLogout}>
          Выход
        </ProfileSidebarLink>
      </ol>
      <p className={'text text_type_main-default text_color_inactive mt-20'}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  )
}
