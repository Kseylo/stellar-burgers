import { Form, FormTitle, FormActions, FormAction } from '@/components/form'
import {
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useLoginMutation } from '@/api/auth'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/routes.ts'
import { setTokens } from '@/utils'

export function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { accessToken, refreshToken } = await login(form).unwrap()
      setTokens(accessToken, refreshToken)
      navigate(ROUTES.HOME)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Вход'} />

      <EmailInput value={form.email} onChange={onChange} name={'email'} />
      <PasswordInput
        value={form.password}
        onChange={onChange}
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
