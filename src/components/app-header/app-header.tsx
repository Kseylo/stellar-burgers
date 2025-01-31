import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css'
import { NavigationLink } from './navigation-link'
import { ROUTES } from '@/config/routes.ts'
import { Link } from 'react-router'

export function AppHeader() {
  return (
    <header className={`${styles.header} p-4`}>
      <nav className={`${styles.nav}`}>
        <ul className={`${styles.leftSection}`}>
          <NavigationLink
            icon={BurgerIcon}
            title={'Конструктор'}
            to={ROUTES.HOME}
          />
          <NavigationLink
            icon={ListIcon}
            title={'Лента заказов'}
            to={ROUTES.FEED}
          />
        </ul>
        <Link to={ROUTES.HOME} className={`${styles.centerSection}`}>
          <Logo />
        </Link>
        <ul className={`${styles.rightSection}`}>
          <NavigationLink
            icon={ProfileIcon}
            title={'Личный кабинет'}
            to={ROUTES.PROFILE}
          />
        </ul>
      </nav>
    </header>
  )
}
