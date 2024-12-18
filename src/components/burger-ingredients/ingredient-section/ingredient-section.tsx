import styles from './ingredient-section.module.css'
import { IngredientCard } from './ingredient-card'
import { Ingredient } from '@/types'
import { forwardRef } from 'react'
import { Link, useLocation } from 'react-router'

interface IngredientSectionProps {
  ingredients: Ingredient[]
  label: string
}

export const IngredientSection = forwardRef<
  HTMLDivElement,
  IngredientSectionProps
>(({ ingredients, label }, ref) => {
  const location = useLocation()

  return (
    <section ref={ref} className={styles.section}>
      <h2 className={'text text_type_main-medium'}>{label}</h2>
      <div className={`${styles.ingredients} mt-6 ml-4 mr-2`}>
        {ingredients.map((ingredient) => (
          <Link
            to={`/ingredients/${ingredient._id}`}
            key={ingredient._id}
            state={{ backgroundLocation: location }}
            className={styles.link}
          >
            <IngredientCard key={ingredient._id} ingredient={ingredient} />
          </Link>
        ))}
      </div>
    </section>
  )
})

IngredientSection.displayName = 'IngredientSection'
