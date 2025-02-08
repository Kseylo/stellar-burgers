import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import { ModalOverlay } from '@/components/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'

const modalRoot = document.getElementById('modals')

export interface ModalProps {
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export function Modal(props: ModalProps) {
  const { onClose, title, children } = props

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!modalRoot) {
    return null
  }

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div
        className={`${styles.content} p-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          {title && <h2 className={'text text_type_main-large'}>{title}</h2>}
          <button
            className={styles.iconButton}
            onClick={onClose}
            data-testid={'close-modal'}
          >
            <CloseIcon type={'primary'} />
          </button>
        </header>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  )
}
