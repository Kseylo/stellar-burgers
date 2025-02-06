import styles from './order-card.module.css'
import { Price } from '@/components/price'
import { IngredientPreview } from '@/components/ingredient-preview'
import { Order } from '@/api'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '@/types'
import { OrderHeader } from '@/components/order-header'
import { getOrderIngredients, getOrderTotalPrice } from '@/utils'

interface OrderCardProps {
  order: Order
  ingredientsMap: Record<string, Ingredient>
  showStatus?: boolean
}

export function OrderCard(props: OrderCardProps) {
  const { order, ingredientsMap, showStatus } = props

  const orderIngredients = getOrderIngredients(order, ingredientsMap)
  const totalPrice = getOrderTotalPrice(orderIngredients)

  const visibleIngredients =
    orderIngredients.length > 6
      ? orderIngredients.slice(0, 6)
      : orderIngredients

  const moreCount =
    orderIngredients.length > 6 ? orderIngredients.length - 6 : 0

  return (
    <article className={styles.card}>
      <div className={styles.cardDetails}>
        <span className={'text text_type_digits-default'}>#{order.number}</span>
        <FormattedDate
          className={'text text_type_main-default text_color_inactive '}
          date={new Date(order.createdAt)}
        />
      </div>
      <OrderHeader
        title={order.name}
        status={showStatus ? order.status : undefined}
      />
      <div className={styles.cardDetails}>
        <div className={styles.ingredients}>
          {visibleIngredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredient}>
              <IngredientPreview
                key={index}
                src={ingredient.image}
                more={index === 5 ? moreCount : undefined}
              />
            </div>
          ))}
        </div>
        <Price price={totalPrice} />
      </div>
    </article>
  )
}
