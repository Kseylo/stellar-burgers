import styles from './not-found.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router'
import { ROUTES } from '@/config/routes.ts'

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <p className={'text text_type_digits-large'}>404</p>
      <h1 className={'text text_type_main-large'}>Страница не найдена</h1>
      <p className={'text text_type_main-default text_color_inactive mt-4'}>
        Страница, которую вы пытаетесь открыть, не существует. Возможно, вы
        ошиблись в адресе или страница была перемещена на другой URL.
      </p>
      <Link to={ROUTES.HOME}>
        <Button htmlType={'button'} extraClass={'mt-8'}>
          Вернуться на главную страницу
        </Button>
      </Link>
    </div>
  )
}
