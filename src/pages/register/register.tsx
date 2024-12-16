import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useRegisterMutation } from '@/api/auth'
import { useNavigate } from 'react-router'
import { setCookie } from '@/utils'

export function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { accessToken, refreshToken } = await register(form).unwrap()
      setCookie('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Регистрация'} />
      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={form.name}
        onChange={onChange}
        placeholder={'Имя'}
        type={'text'}
        name={'name'}
      />
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
        Зарегистрироваться
      </Button>

      <FormActions>
        <FormAction
          text={'Уже зарегистрированы?'}
          link={'/login'}
          buttonText={'Войти'}
        />
      </FormActions>
    </Form>
  )
}
