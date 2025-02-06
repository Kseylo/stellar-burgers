import {
  ingredientsSelectors,
  useGetIngredientsQuery,
  useGetUserOrdersQuery,
} from '@/api'
import { FeedOrders } from '@/components/feed-orders'
import { ROUTES } from '@/config/routes.ts'
import { sortOrders } from '@/utils'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Center } from '@/components/center'
import styles from './profile-order.module.css'

export function ProfileOrdersPage() {
  const { data } = useGetUserOrdersQuery()
  const { data: ingredientsState } = useGetIngredientsQuery()

  if (!data || !data.success || !ingredientsState) {
    return (
      <div className={styles.loadingContainer}>
        <Center>
          <LoadingSpinner size={76} />
        </Center>
      </div>
    )
  }

  if (data.orders.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Center>
          <h2 className={'text text_type_main-medium'}>
            У вас пока нет заказов
          </h2>
        </Center>
      </div>
    )
  }

  const ingredientsMap = ingredientsSelectors.selectEntities(ingredientsState)
  const orders = sortOrders(data.orders)

  return (
    <FeedOrders
      orders={orders}
      ingredientsMap={ingredientsMap}
      link={ROUTES.PROFILE_ORDERS_DETAIL}
      className={'mt-10'}
      showStatus
    />
  )
}
