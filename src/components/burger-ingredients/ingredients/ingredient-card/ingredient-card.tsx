import styles from './ingredient-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import type { Ingredient } from '@/utils/data.ts'
import { Price } from '@/components/price'

export function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <article className={styles.ingredient}>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={'pl-4 pr-4'}
      />
      <Counter count={1} />
      <Price price={ingredient.price} className={'mt-1'} />
      <p className={`${styles.name} text text_type_main-default mt-1`}>
        {ingredient.name}
      </p>
    </article>
  )
}
