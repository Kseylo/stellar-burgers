import styles from './order-card.module.css'
import { Price } from '@/components/price'
import { IngredientPreview } from '@/components/ingredient-preview'
import { Order } from '@/api'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '@/types'

interface OrderCardProps {
  order: Order
  ingredientsMap: Record<string, Ingredient>
}

export function OrderCard(props: OrderCardProps) {
  const { order, ingredientsMap } = props

  const orderIngredients = order.ingredients
    .map((id) => ingredientsMap[id])
    .filter(Boolean)

  const totalPrice = orderIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0,
  )

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
      <h3 className={'text text_type_main-medium'}>{order.name}</h3>
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
