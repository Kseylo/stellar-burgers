import styles from './feed.module.css'

import { FeedOrders } from '@/components/feed-orders'
import { FeedStats } from '@/components/feed-stats'
import {
  ingredientsSelectors,
  useGetAllOrdersQuery,
  useGetIngredientsQuery,
} from '@/api'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Center } from '@/components/center'
import { ROUTES } from '@/config/routes.ts'

export function FeedPage() {
  const { data } = useGetAllOrdersQuery()
  const { data: ingredientsState } = useGetIngredientsQuery()

  if (!data || data.orders.length === 0 || !ingredientsState) {
    return (
      <section className={styles.container}>
        <h1 className={'text text_type_main-large'}>Лента заказов</h1>
        <Center>
          <LoadingSpinner size={76} />
        </Center>
      </section>
    )
  }
  const ingredientsMap = ingredientsSelectors.selectEntities(ingredientsState)

  return (
    <section className={styles.container}>
      <h1 className={'text text_type_main-large'}>Лента заказов</h1>
      {data && data.success && (
        <div className={styles.feed}>
          <FeedOrders
            orders={data.orders}
            ingredientsMap={ingredientsMap}
            link={ROUTES.ORDER}
            className={'mt-5'}
          />
          <FeedStats data={data} />
        </div>
      )}
    </section>
  )
}
