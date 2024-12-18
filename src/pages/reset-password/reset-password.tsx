import React, { useState } from 'react'
import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ROUTES } from '@/config/routes.ts'
import { useResetPasswordMutation } from '@/api'
import { Navigate, useNavigate } from 'react-router'
import { useAppSelector } from '@/store'
import { selectPasswordRecovery } from '@/services/password-recovery'

export function ResetPasswordPage() {
  const { isRecoveryInitiated } = useAppSelector(selectPasswordRecovery)

  const [form, setForm] = useState({
    password: '',
    token: '',
  })

  const navigate = useNavigate()

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await resetPassword(form).unwrap()
      navigate(ROUTES.LOGIN)
    } catch (e) {
      console.error(e)
    }
  }

  if (!isRecoveryInitiated) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} />
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Восстановление пароля'} />

      <PasswordInput
        value={form.password}
        onChange={onChange}
        placeholder={'Введите новый пароль'}
        autoComplete={'new-password'}
        name={'password'}
      />
      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={form.token}
        onChange={onChange}
        placeholder={'Введите код из письма'}
        type={'text'}
        name={'token'}
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
