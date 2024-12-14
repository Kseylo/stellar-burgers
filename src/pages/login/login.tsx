import styles from './login.module.css'
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
    <div className={styles.container}>
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
    </div>
  )
}

// <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
// <Input placeholder={'E-mail'} type={'email'} />
// <PasswordInput value={''} onChange={() => {
// }} />
// <Button htmlType="button" type="primary" size="medium">
//   Войти
// </Button>
// <div className={styles.additionalActions}>
//   <div className={styles.additionalAction}>
//     <p className={'text text_type_main-default text_color_inactive'}>
//       Вы — новый пользователь?
//     </p>
//     <Link to={'/register'}>
//       <Button
//         htmlType={'button'}
//         type={'secondary'}
//         size={'medium'}
//         style={{ padding: '0' }}
//       >
//         Зарегистрироваться
//       </Button>
//     </Link>
//   </div>
//   <div className={styles.additionalAction}>
//     <p className={'text text_type_main-default text_color_inactive'}>
//       Забыли пароль?
//     </p>
//     <Link to={'/register'}>
//       <Button
//         htmlType={'button'}
//         type={'secondary'}
//         size={'medium'}
//         style={{ padding: '0' }}
//       >
//         Восстановить пароль
//       </Button>
//     </Link>
//   </div>
// </div>
