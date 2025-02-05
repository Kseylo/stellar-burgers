import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useRegisterMutation } from '@/api/auth'
import { useLocation, useNavigate } from 'react-router'
import { ROUTES } from '@/config/routes.ts'
import { useForm } from '@/hooks/use-form'

export function RegisterPage() {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || ROUTES.HOME

  const [register, { isLoading }] = useRegisterMutation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await register(values)
    navigate(from)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle title={'Регистрация'} />
      {/*  @ts-expect-error complains about onPointerEnterCapture, onPointerLeaveCapture */}
      <Input
        value={values.name}
        onChange={handleChange}
        placeholder={'Имя'}
        type={'text'}
        name={'name'}
        autoComplete={'name'}
      />
      <EmailInput value={values.email} onChange={handleChange} name={'email'} />
      <PasswordInput
        value={values.password}
        onChange={handleChange}
        name={'password'}
        autoComplete={'new-password'}
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
          link={ROUTES.LOGIN}
          buttonText={'Войти'}
        />
      </FormActions>
    </Form>
  )
}
