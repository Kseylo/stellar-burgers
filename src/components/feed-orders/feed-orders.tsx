import styles from './feed-orders.module.css'

import { OrderCard } from '../order-card'
import { type Order } from '@/api'
import { Link, useLocation } from 'react-router'
import { Ingredient } from '@/types'

interface FeedOrdersProps {
  orders: Order[]
  ingredientsMap: Record<string, Ingredient>
  className?: string
  link: string
  showStatus?: boolean
}

export function FeedOrders(props: FeedOrdersProps) {
  const { orders, ingredientsMap, link, className, showStatus } = props

  const location = useLocation()

  return (
    <div className={`${styles.scroll} ${className} pr-2`}>
      {orders.map((order) => (
        <Link
          to={link.replace(':id', order._id)}
          key={order._id}
          state={{ backgroundLocation: location }}
          className={styles.link}
        >
          <OrderCard
            order={order}
            ingredientsMap={ingredientsMap}
            showStatus={showStatus}
          />
        </Link>
      ))}
    </div>
  )
}
