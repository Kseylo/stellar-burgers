import styles from './modal-overlay.module.css'
import React from 'react'

export interface ModalOverlayProps {
  children: React.ReactNode
  onClick: () => void
}

export function ModalOverlay(props: ModalOverlayProps) {
  const { children, onClick } = props
  return (
    <div
      className={styles.overlay}
      onClick={onClick}
      role={'dialog'}
      aria-modal={'true'}
    >
      {children}
    </div>
  )
}
