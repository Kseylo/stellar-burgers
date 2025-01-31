import styles from './feed.module.css'

import { FeedOrders } from '@/components/feed-orders'

export function FeedPage() {
  return (
    <section className={styles.container}>
      <h1 className={'text text_type_main-large'}>Лента заказов</h1>
      <FeedOrders />
    </section>
  )
}
