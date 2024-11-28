import styles from './order-details.module.css'
import { useAppSelector } from '@/store'
import { selectOrder } from '@/services/order'

export function OrderDetails() {
  const order = useAppSelector(selectOrder)
  return (
    <article className={`${styles.content} pl-15 pr-15 pb-20 pt-15`}>
      <h2 className={'text text_type_digits-large'}>{order.number}</h2>
      <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
      <img
        className={`${styles.image} mt-15`}
        src={'done.svg'}
        alt={'Иконка завершения заказа'}
      />
      <p className={'text text_type_main-default mt-15'}>
        Ваш заказ начали готовить
      </p>
      <p className={'text text_type_main-default text_color_inactive mt-2'}>
        Дождитесь готовности на орбитальной станции
      </p>
    </article>
  )
}
