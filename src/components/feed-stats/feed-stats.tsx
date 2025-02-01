import { ORDER_STATUS, OrdersResponse } from '@/api'
import { OrdersBoard } from './orders-board'
import styles from './feed-stats.module.css'

interface FeedStatsProps {
  data: OrdersResponse
}

export function FeedStats(props: FeedStatsProps) {
  const {
    data: { total, totalToday, orders },
  } = props

  const doneOrders = orders
    .filter((order) => order.status === ORDER_STATUS.DONE)
    .slice(0, 14)

  const pendingOrders = orders
    .filter((order) => order.status === ORDER_STATUS.PENDING)
    .slice(0, 14)

  return (
    <div>
      <div className={styles.boards}>
        <OrdersBoard title={'Готовы:'} orders={doneOrders} isDone />
        <OrdersBoard title={'В работе'} orders={pendingOrders} />
      </div>
      <CompletedOrders title={'Выполнено за все время:'} count={total} />
      <CompletedOrders title={'Выполнено за сегодня:'} count={totalToday} />
    </div>
  )
}

function CompletedOrders({ title, count }: { title: string; count: number }) {
  return (
    <div className={'mt-15'}>
      <h2 className={'text text_type_main-medium'}>{title}</h2>
      <p className={'text text_type_digits-large'}>{count}</p>
    </div>
  )
}
