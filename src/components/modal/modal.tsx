import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import { ModalOverlay } from '@/components/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect, useRef } from 'react'

const modalRoot = document.getElementById('modals')

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export function Modal(props: ModalProps) {
  const { open, onClose, title, children } = props

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  if (!open || !modalRoot) {
    return null
  }

  return createPortal(
    <>
      <ModalOverlay />
      <div
        className={styles.modal}
        role={'dialog'}
        aria-modal={'true'}
        onClick={handleClickOutside}
      >
        <div ref={modalRef} className={`${styles.content} p-10`}>
          <header className={styles.header}>
            {title && <h2 className={'text text_type_main-large'}>{title}</h2>}
            <button className={styles.iconButton} onClick={onClose}>
              <CloseIcon type={'primary'} />
            </button>
          </header>
          {children}
        </div>
      </div>
    </>,
    modalRoot,
  )
}
