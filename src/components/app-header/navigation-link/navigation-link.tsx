import { FC } from 'react'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import styles from './navigation-link.module.css'

export interface NavigationLinkProps {
  icon: FC<TIconProps>
  title: string
  active?: boolean
}

export function NavigationLink(props: NavigationLinkProps) {
  const { icon: Icon, title, active } = props
  return (
    <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
      <Icon type={active ? 'primary' : 'secondary'} />
      <p
        className={`text text_type_main-default ml-2 ${!active && 'text_color_inactive'}`}
      >
        {title}
      </p>
    </li>
  )
}
