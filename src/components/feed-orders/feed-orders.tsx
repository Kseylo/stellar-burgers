import styles from './feed-orders.module.css'

import { OrderCard } from '../order-card'

export function FeedOrders() {
  return (
    <div className={`${styles.scroll} mt-5`}>
      <OrderCard />
    </div>
  )
}
