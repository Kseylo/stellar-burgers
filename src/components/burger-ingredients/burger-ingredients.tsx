import { useState } from 'react'
import {
  IngredientsTabs,
  TabItem,
} from '@/components/burger-ingredients/ingredients-tabs'
import { Ingredients } from '@/components/burger-ingredients/ingredients'

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

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  return (
    <section className={'mt-10'}>
      <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
      <IngredientsTabs
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={setCurrentTab}
      />
      <Ingredients />
    </section>
  )
}
