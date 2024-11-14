import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css'
import { NavigationLink } from './navigation-link'

export function AppHeader() {
  return (
    <header className={`${styles.header} p-4`}>
      <nav className={`${styles.nav}`}>
        <ul className={`${styles.leftSection}`}>
          <NavigationLink icon={BurgerIcon} title={'Конструктор'} active />
          <NavigationLink icon={ListIcon} title={'Лента заказов'} />
        </ul>
        <div className={`${styles.centerSection}`}>
          <Logo />
        </div>
        <ul className={`${styles.rightSection}`}>
          <NavigationLink icon={ProfileIcon} title={'Личный кабинет'} />
        </ul>
      </nav>
    </header>
  )
}
