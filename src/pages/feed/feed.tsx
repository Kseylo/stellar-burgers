import styles from './feed.module.css'

import { FeedOrders } from '@/components/feed-orders'
import { useGetAllOrdersQuery } from '@/api'
import { LoadingSpinner } from '@/components/loading-spinner'

export function FeedPage() {
  const { data, isLoading } = useGetAllOrdersQuery()

  let content
  if (isLoading && !data) content = <LoadingSpinner size={76} />

  if (data) content = <FeedOrders orders={data.orders} />

  return (
    <section className={styles.container}>
      <h1 className={'text text_type_main-large'}>Лента заказов</h1>
      {content}
    </section>
  )
}
