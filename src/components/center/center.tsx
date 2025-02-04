import styles from './center.module.css'
import React from 'react'

interface CenterProps {
  children: React.ReactNode
  className?: string
}

export function Center(props: CenterProps) {
  const { children, className } = props
  return <div className={`${styles.center} ${className}`}>{children}</div>
}
