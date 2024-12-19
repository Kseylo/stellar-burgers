import React, { useRef, useState } from 'react'

import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './edit-profile.module.css'
import { useGetUserQuery, useUpdateUserMutation } from '@/api'
import { useForm } from '@/hooks/use-form'

export function EditProfile() {
  const { data } = useGetUserQuery()
  const { user } = data!

  const initialFormState = {
    name: user.name,
    email: user.email,
    password: '',
  }

  const { values, handleChange, setValues } = useForm(initialFormState)

  const [nameDisabled, setNameDisabled] = useState(true)
  const nameRef = useRef<HTMLInputElement | null>(null)

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const isFormChanged =
    JSON.stringify(values) !== JSON.stringify(initialFormState)

  const onIconClick = () => {
    if (nameRef.current) {
      setNameDisabled(false)
      setTimeout(() => nameRef.current?.focus(), 0)
    }
  }

  const onBlur = () => {
    setNameDisabled(true)
  }

  const resetForm = () => {
    setValues(initialFormState)
    setNameDisabled(true)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateUser(values).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={values.name}
        onChange={handleChange}
        name={'name'}
        placeholder={'Имя'}
        icon={'EditIcon'}
        ref={nameRef}
        onIconClick={onIconClick}
        disabled={nameDisabled}
        onBlur={onBlur}
      />

      <EmailInput
        value={values.email}
        onChange={handleChange}
        name={'email'}
        placeholder={'Логин'}
        isIcon
      />

      <PasswordInput
        value={values.password}
        onChange={handleChange}
        name={'password'}
        icon={'EditIcon'}
      />

      {isFormChanged && (
        <div className={styles.actions}>
          <Button
            htmlType={'button'}
            type={'secondary'}
            onClick={resetForm}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button htmlType={'submit'} disabled={isLoading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}
