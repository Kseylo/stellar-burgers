import styles from './feed.module.css'

import { FeedOrders } from '@/components/feed-orders'
import { FeedStats } from '@/components/feed-stats'
import { useGetAllOrdersQuery } from '@/api'

export function FeedPage() {
  const { data } = useGetAllOrdersQuery()

  return (
    <section className={styles.container}>
      <h1 className={'text text_type_main-large'}>Лента заказов</h1>
      {data && data.success && (
        <div className={styles.feed}>
          <FeedOrders orders={data.orders} />
          <FeedStats data={data} />
        </div>
      )}
    </section>
  )
}
