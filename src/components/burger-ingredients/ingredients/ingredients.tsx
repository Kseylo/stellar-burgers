import styles from './ingredients.module.css'
import { IngredientCard } from './ingredient-card'
import type { Ingredient } from '@/types'
import { groupIngredients } from '@/utils'
import { IngredientDetails } from '@/components/ingredient-details'
import { useState } from 'react'

interface IngredientsProps {
  ingredients: Ingredient[]
}

export function Ingredients({ ingredients }: IngredientsProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>()
  const [open, setOpen] = useState(false)

  const groupedIngredients = groupIngredients(ingredients)

  const handleClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient)
    setOpen(true)
  }

  return (
    <article className={`${styles.scroll} mt-10`}>
      {groupedIngredients.map(({ title, items }, index) => (
        <div key={title} className={`${index === 0 ? '' : 'mt-10'}`}>
          <h2 className={'text text_type_main-medium'}>{title}</h2>
          <div className={`${styles.ingredients} mt-6 ml-4 mr-2`}>
            {items.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
      ))}
      {selectedIngredient && (
        <IngredientDetails
          ingredient={selectedIngredient}
          open={open}
          onClose={() => setOpen(false)}
          title={'Детали ингредиента'}
        />
      )}
    </article>
  )
}
