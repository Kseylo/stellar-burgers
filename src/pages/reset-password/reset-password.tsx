import React, { useState } from 'react'
import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ROUTES } from '@/config/router.tsx'
import { useResetPasswordMutation } from '@/api'

export function ResetPasswordPage() {
  const [form, setForm] = useState({
    password: '',
    token: '',
  })

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await resetPassword(form).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Восстановление пароля'} />

      <PasswordInput
        value={form.password}
        onChange={onChange}
        placeholder={'Введите новый пароль'}
      />
      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={form.token}
        onChange={onChange}
        placeholder={'Введите код из письма'}
        type={'text'}
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={isLoading}
      >
        Сохранить
      </Button>

      <FormActions>
        <FormAction
          text={'Вспомнили пароль?'}
          link={ROUTES.LOGIN}
          buttonText={'Войти'}
        />
      </FormActions>
    </Form>
  )
}
