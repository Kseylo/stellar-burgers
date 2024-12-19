import { FC } from 'react'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import styles from './navigation-link.module.css'
import { NavLink, NavLinkProps } from 'react-router'

export interface NavigationLinkProps extends NavLinkProps {
  icon: FC<TIconProps>
  title: string
}

export function NavigationLink(props: NavigationLinkProps) {
  const { icon: Icon, title, ...rest } = props
  return (
    <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
      <NavLink {...rest} className={styles.link}>
        {({ isActive }) => (
          <>
            <Icon type={isActive ? 'primary' : 'secondary'} />
            <p
              className={`text text_type_main-default ml-2 ${!isActive && 'text_color_inactive'}`}
            >
              {title}
            </p>
          </>
        )}
      </NavLink>
    </li>
  )
}
