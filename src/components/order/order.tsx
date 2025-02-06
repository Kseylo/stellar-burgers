import styles from './order.module.css'
import { type Order } from '@/api'
import { OrderHeader } from '@/components/order-header'
import { Ingredient } from '@/types'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from '@/components/price'
import {
  getOrderIngredients,
  getOrderTotalPrice,
  getUniqueOrderIngredients,
} from '@/utils'
import { IngredientPreview } from '@/components/ingredient-preview'

interface OrderProps {
  order: Order
  ingredientsMap: Record<string, Ingredient>
}

export function Order(props: OrderProps) {
  const { order, ingredientsMap } = props

  const orderIngredients = getOrderIngredients(order, ingredientsMap)
  const totalPrice = getOrderTotalPrice(orderIngredients)
  const uniqueOrderIngredients = getUniqueOrderIngredients(orderIngredients)

  return (
    <article className={'mt-10'}>
      <OrderHeader title={order.name} status={order.status} />
      <div className={'mt-15'}>
        <h3 className={'text  text_type_main-medium'}>Состав:</h3>
        <ul className={`${styles.ingredients} mt-6`}>
          {uniqueOrderIngredients.map((ingredient) => (
            <li key={ingredient._id} className={styles.ingredient}>
              <IngredientPreview src={ingredient.image} />
              <p className={'text text_type_main-default'}>{ingredient.name}</p>
              <div className={styles.ingredientPrice}>
                <span className={'text text_type_digits-default'}>
                  {ingredient.count} x
                </span>
                <Price price={ingredient.price} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.timePrice}>
        <FormattedDate
          className={'text text_type_main-default text_color_inactive'}
          date={new Date(order.createdAt)}
        />
        <Price price={totalPrice} />
      </div>
    </article>
  )
}
