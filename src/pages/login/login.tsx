import { Form, FormTitle, FormActions, FormAction } from '@/components/form'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'

export function LoginPage() {
  const [email, setEmail] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Вход'} />

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'E-mail'}
        type={'email'}
      />
      <PasswordInput value={''} onChange={() => {}} />

      <Button htmlType="submit" type="primary" size="medium">
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
