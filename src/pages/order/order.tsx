import { useParams, useNavigate } from 'react-router'
import {
  ingredientsSelectors,
  useGetAllOrdersQuery,
  useGetIngredientsQuery,
} from '@/api'
import { LoadingSpinner } from '@/components/loading-spinner'
import styles from './order.module.css'
import { ROUTES } from '@/config/routes.ts'
import { Order } from '@/components/order'

export function OrderPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useGetAllOrdersQuery()
  const { data: ingredientsState } = useGetIngredientsQuery()

  if (!data || data.orders.length === 0 || !ingredientsState) {
    return (
      <section className={styles.container}>
        <LoadingSpinner size={76} />
      </section>
    )
  }

  const order = data.orders.find((order) => order._id === id)
  if (!order) {
    navigate(ROUTES.NOT_FOUND)
    return null
  }

  const ingredientsMap = ingredientsSelectors.selectEntities(ingredientsState)

  return (
    <section className={styles.container}>
      <span className={'text text_type_digits-default'}>#{order.number}</span>
      <Order order={order} ingredientsMap={ingredientsMap} />
    </section>
  )
}
