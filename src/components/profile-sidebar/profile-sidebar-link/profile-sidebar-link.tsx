import { NavLink, NavLinkProps } from 'react-router'
import styles from './profile-sidebar-link.module.css'

export function ProfileSidebarLink(props: NavLinkProps) {
  return (
    <li className={`pt-4 pb-4`}>
      <NavLink
        className={({ isActive }) =>
          `text text_type_main-medium ${styles.link} ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
        }
        {...props}
      >
        {props.children}
      </NavLink>
    </li>
  )
}
