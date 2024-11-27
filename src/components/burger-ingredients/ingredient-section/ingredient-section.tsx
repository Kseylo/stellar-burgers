import styles from './ingredient-section.module.css'
import { IngredientCard } from './ingredient-card'
import { Ingredient } from '@/types'
import { useAppDispatch } from '@/store'
import { setIngredient } from '@/services/ingredient'
import { forwardRef } from 'react'

interface IngredientSectionProps {
  ingredients: Ingredient[]
  onClick: () => void
  label: string
}

export const IngredientSection = forwardRef<
  HTMLDivElement,
  IngredientSectionProps
>(({ ingredients, onClick, label }, ref) => {
  const dispatch = useAppDispatch()

  const handleClick = (ingredient: Ingredient) => {
    dispatch(setIngredient(ingredient))
    onClick()
  }

  return (
    <section ref={ref} className={styles.section}>
      <h2 className={'text text_type_main-medium'}>{label}</h2>
      <div className={`${styles.ingredients} mt-6 ml-4 mr-2`}>
        {ingredients.map((ingredient) => (
          <IngredientCard
            key={ingredient._id}
            ingredient={ingredient}
            onClick={handleClick}
          />
        ))}
      </div>
    </section>
  )
})

IngredientSection.displayName = 'IngredientSection'
