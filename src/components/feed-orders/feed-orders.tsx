import styles from './feed-orders.module.css'

import { OrderCard } from '../order-card'
import { type Order } from '@/api'
import { Link, useLocation } from 'react-router'
import { ROUTES } from '@/config/routes.ts'
import { Ingredient } from '@/types'

interface FeedOrdersProps {
  orders: Order[]
  ingredientsMap: Record<string, Ingredient>
}

export function FeedOrders(props: FeedOrdersProps) {
  const { orders, ingredientsMap } = props

  const location = useLocation()

  return (
    <div className={`${styles.scroll} mt-5`}>
      {orders.map((order) => (
        <Link
          to={ROUTES.ORDER.replace(':id', order._id)}
          key={order._id}
          state={{ backgroundLocation: location }}
          className={styles.link}
        >
          <OrderCard order={order} ingredientsMap={ingredientsMap} />
        </Link>
      ))}
    </div>
  )
}
