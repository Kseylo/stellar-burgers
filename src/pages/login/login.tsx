import { Form, FormTitle, FormActions, FormAction } from '@/components/form'
import {
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useLoginMutation } from '@/api/auth'
import { ROUTES } from '@/config/routes.ts'
import { useForm } from '@/hooks/use-form'
import { useLocation, useNavigate } from 'react-router'

export function LoginPage() {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || ROUTES.HOME

  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(values)
    navigate(from)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Вход'} />

      <EmailInput value={values.email} onChange={handleChange} name={'email'} />
      <PasswordInput
        value={values.password}
        onChange={handleChange}
        name={'password'}
        autoComplete={'current-password'}
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={isLoading}
      >
        Войти
      </Button>

      <FormActions>
        <FormAction
          text={'Вы - новый пользователь?'}
          link={ROUTES.REGISTER}
          buttonText={'Зарегистрироваться'}
        />
        <FormAction
          text={'Забыли пароль?'}
          link={ROUTES.FORGOT_PASSWORD}
          buttonText={'Восстановить пароль'}
        />
      </FormActions>
    </Form>
  )
}
