import React, { useState } from 'react'

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './edit-profile.module.css'

export function EditProfile() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form className={styles.form}>
      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={form.name}
        onChange={onChange}
        name={'name'}
        placeholder={'Имя'}
        icon={'EditIcon'}
      />

      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={form.email}
        onChange={onChange}
        name={'email'}
        placeholder={'Логин'}
        type={'email'}
        autoComplete={'email'}
        icon={'EditIcon'}
      />

      <PasswordInput
        value={form.password}
        onChange={onChange}
        name={'password'}
        icon={'EditIcon'}
      />
    </form>
  )
}
