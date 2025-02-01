import styles from './feed-orders.module.css'

import { OrderCard } from '../order-card'
import { ingredientsSelectors, type Order, useGetIngredientsQuery } from '@/api'

interface FeedOrdersProps {
  orders: Order[]
}

export function FeedOrders(props: FeedOrdersProps) {
  const { orders } = props

  const { data: ingredientsState } = useGetIngredientsQuery()

  if (!ingredientsState) return null

  const ingredientsMap = ingredientsSelectors.selectEntities(ingredientsState)

  return (
    <div className={`${styles.scroll} mt-5`}>
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          ingredientsMap={ingredientsMap}
        />
      ))}
    </div>
  )
}
