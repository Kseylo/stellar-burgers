import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ROUTES } from '@/config/router.tsx'

export function ForgotPasswordPage() {
  return (
    <Form onSubmit={() => {}}>
      <FormTitle title={'Восстановление пароля'} />

      <Input
        value={''}
        onChange={() => {}}
        placeholder={'Укажите e-mail'}
        type={'email'}
      />

      <Button htmlType="submit" type="primary" size="medium">
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
