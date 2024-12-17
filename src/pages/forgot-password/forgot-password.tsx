import React, { useState } from 'react'
import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ROUTES } from '@/config/router.tsx'
import { useSendPasswordResetEmailMutation } from '@/api'
import { useNavigate } from 'react-router'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const [sendPasswordResetEmail, { isLoading }] =
    useSendPasswordResetEmailMutation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail({ email }).unwrap()
      navigate(ROUTES.RESET_PASSWORD)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Восстановление пароля'} />

      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Укажите e-mail'}
        type={'email'}
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={isLoading}
      >
        Восстановить
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
