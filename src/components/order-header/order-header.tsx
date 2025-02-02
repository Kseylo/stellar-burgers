import { ORDER_STATUS } from '@/api'
import styles from './order-header.module.css'

interface OrderTitleProps {
  title: string
  status?: ORDER_STATUS
}

const orderStatuses: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.CREATED]: 'Создан',
  [ORDER_STATUS.PENDING]: 'Готовится',
  [ORDER_STATUS.DONE]: 'Выполнен',
}

export function OrderHeader(props: OrderTitleProps) {
  const { title, status } = props
  return (
    <header>
      <h2 className={'text text_type_main-medium'}>{title}</h2>
      {status && (
        <p
          className={`text text_type_main-default mt-3 ${ORDER_STATUS.DONE && styles.done}`}
        >
          {orderStatuses[status]}
        </p>
      )}
    </header>
  )
}
