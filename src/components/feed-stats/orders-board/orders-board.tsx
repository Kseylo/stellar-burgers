import { Order } from '@/api'
import styles from './order-board.module.css'

export function OrdersBoard({
  title,
  orders,
  isDone = false,
}: {
  title: string
  orders: Order[]
  isDone?: boolean
}) {
  return (
    <div>
      <h2 className={'text text_type_main-medium'}>{title}</h2>
      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <p
            key={order.number}
            className={`text text_type_digits-default ${isDone ? styles.done : ''}`}
          >
            {order.number}
          </p>
        ))}
      </div>
    </div>
  )
}
