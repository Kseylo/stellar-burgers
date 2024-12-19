import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router'

import styles from './form.module.css'

export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

export function Form(props: FormProps) {
  const { children, onSubmit } = props

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export function FormTitle({ title }: { title: string }) {
  return (
    <h1 className={`text text_type_main-medium ${styles.title}`}>{title}</h1>
  )
}

export interface FormAction {
  text: string
  link: string
  buttonText: string
}

export function FormAction(props: FormAction) {
  const { text, link, buttonText } = props

  return (
    <div className={styles.additionalAction}>
      <p className={'text text_type_main-default text_color_inactive'}>
        {text}
      </p>
      <Link to={link}>
        <Button
          htmlType={'button'}
          type={'secondary'}
          size={'medium'}
          style={{ padding: '0' }}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}

export function FormActions({ children }: { children: React.ReactNode }) {
  return <div className={styles.additionalActions}>{children}</div>
}
