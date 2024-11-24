import styles from './ingredient-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from '@/components/price'
import { Ingredient } from '@/types'

interface IngredientCardProps {
  ingredient: Ingredient
  onClick: (ingredient: Ingredient) => void
}

export function IngredientCard({ ingredient, onClick }: IngredientCardProps) {
  return (
    <article className={styles.ingredient} onClick={() => onClick(ingredient)}>
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
