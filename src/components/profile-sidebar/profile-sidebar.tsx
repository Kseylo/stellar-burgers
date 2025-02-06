import styles from './profile-sidebar.module.css'
import { ROUTES } from '@/config/routes.ts'
import { ProfileSidebarLink } from './profile-sidebar-link'
import { authApi, useLogoutMutation } from '@/api'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectRefreshToken } from '@/services/auth'

export function ProfileSidebar() {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const refreshToken = useAppSelector(selectRefreshToken)!

  const onLogout = async () => {
    await logout({ token: refreshToken })
    dispatch(authApi.util.resetApiState())
  }

  return (
    <nav className={styles.navContainer}>
      <ol className={styles.navList}>
        <ProfileSidebarLink to={ROUTES.PROFILE}>Профиль</ProfileSidebarLink>
        <ProfileSidebarLink to={ROUTES.PROFILE_ORDERS}>
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
