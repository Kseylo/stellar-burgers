import styles from './ingredient-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from '@/components/price'
import { Ingredient } from '@/types'
import { useDrag } from 'react-dnd'
import { useAppSelector } from '@/store'
import { selectBurger } from '@/services/burger'

interface IngredientCardProps {
  ingredient: Ingredient
  onClick: (ingredient: Ingredient) => void
}

export function IngredientCard({ ingredient, onClick }: IngredientCardProps) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  const burger = useAppSelector(selectBurger)

  const isBun = burger.bun?._id === ingredient._id
  const ingredientCount = burger.ingredients.filter(
    (ing) => ing._id === ingredient._id,
  ).length

  return (
    <article
      ref={dragRef}
      className={styles.ingredient}
      onClick={() => onClick(ingredient)}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={'pl-4 pr-4'}
      />
      {(isBun || ingredientCount > 0) && (
        <Counter count={isBun ? 2 : ingredientCount} />
      )}
      <Price price={ingredient.price} className={'mt-1'} />
      <p className={`${styles.name} text text_type_main-default mt-1`}>
        {ingredient.name}
      </p>
    </article>
  )
}
