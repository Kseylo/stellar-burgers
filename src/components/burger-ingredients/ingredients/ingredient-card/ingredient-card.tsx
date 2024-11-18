import styles from './ingredient-card.module.css'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import type { Ingredient } from '@/utils/data.ts'

export function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <article className={styles.ingredient}>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={'pl-4 pr-4'}
      />
      <Counter count={1} />
      <div className={`${styles.price} mt-1`}>
        <p className={'text text_type_digits-default mr-2'}>
          {ingredient.price}
        </p>
        <CurrencyIcon type={'primary'} />
      </div>
      <p className={`${styles.name} text text_type_main-default mt-1`}>
        {ingredient.name}
      </p>
    </article>
  )
}
