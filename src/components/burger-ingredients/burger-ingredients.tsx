import { useState } from 'react'
import { IngredientsTabs, TabItem } from './ingredients-tabs'
import { Ingredients } from './ingredients'
import type { Ingredient } from '@/types'

const tabs: TabItem[] = [
  {
    value: 'buns',
    label: 'Булки',
  },
  {
    value: 'sauces',
    label: 'Соусы',
  },
  {
    value: 'toppings',
    label: 'Начинки',
  },
]

interface BurgerIngredientsProps {
  ingredients: Ingredient[]
}

export function BurgerIngredients({ ingredients }: BurgerIngredientsProps) {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  return (
    <section className={'mt-10'}>
      <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
      <IngredientsTabs
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={setCurrentTab}
      />
      <Ingredients ingredients={ingredients} />
    </section>
  )
}
