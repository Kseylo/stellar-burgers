import styles from './order-card.module.css'
import { Price } from '@/components/price'
import { IngredientPreview } from '@/components/ingredient-preview'

export function OrderCard() {
  const ingredients = Array.from({ length: 9 })
  const visibleIngredients = ingredients.slice(0, 5)
  const moreCount = ingredients.length > 6 ? ingredients.length - 6 : 0

  return (
    <article className={styles.card}>
      <div className={styles.cardDetails}>
        <span className={'text text_type_digits-default'}>#034535</span>
        <span className={'text text_type_main-default text_color_inactive'}>
          Сегодня, 16:20
        </span>
      </div>
      <h3 className={'text text_type_main-medium'}>
        Death Star Starship Main бургер
      </h3>
      <div className={styles.cardDetails}>
        <div className={styles.ingredients}>
          {visibleIngredients.map((_, index) => (
            <div key={index} className={styles.ingredient}>
              <IngredientPreview key={index} />
            </div>
          ))}
          {moreCount > 0 && (
            <div className={styles.ingredient}>
              <IngredientPreview more={moreCount} />
            </div>
          )}
        </div>
        <Price price={480} />
      </div>
    </article>
  )
}
