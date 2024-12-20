import React, { useState } from 'react'
import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ROUTES } from '@/config/routes.ts'
import { useSendPasswordResetEmailMutation } from '@/api'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '@/store'
import { setRecoveryInitiated } from '@/services/password-recovery'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [sendPasswordResetEmail, { isLoading }] =
    useSendPasswordResetEmailMutation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail({ email }).unwrap()
      dispatch(setRecoveryInitiated())
      navigate(ROUTES.RESET_PASSWORD)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Восстановление пароля'} />

      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name={'email'}
        placeholder={'Укажите e-mail'}
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
