import { Form, FormAction, FormActions, FormTitle } from '@/components/form'
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

export function RegisterPage() {
  return (
    <Form onSubmit={() => {}}>
      <FormTitle title={'Регистрация'} />

      <Input
        value={''}
        onChange={(e) => {}}
        placeholder={'Имя'}
        type={'email'}
      />
      <Input
        value={''}
        onChange={(e) => {}}
        placeholder={'E-mail'}
        type={'email'}
      />
      <PasswordInput value={''} onChange={() => {}} />

      <Button htmlType="submit" type="primary" size="medium">
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
