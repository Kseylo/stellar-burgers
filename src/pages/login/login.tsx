import { Form, FormTitle, FormActions, FormAction } from '@/components/form'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useLoginMutation } from '@/api/auth'
import { setCookie } from '@/utils'
import { useNavigate } from 'react-router'

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
      setCookie('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Вход'} />

      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={form.email}
        onChange={onChange}
        placeholder={'E-mail'}
        type={'email'}
        name={'email'}
      />
      <PasswordInput
        value={form.password}
        onChange={onChange}
        name={'password'}
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
          link={'/register'}
          buttonText={'Зарегистрироваться'}
        />
        <FormAction
          text={'Забыли пароль?'}
          link={'/forgot-password'}
          buttonText={'Восстановить пароль'}
        />
      </FormActions>
    </Form>
  )
}
