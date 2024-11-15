import styles from './burger-ingredients.module.css'
import { useState } from 'react'
import {
  IngredientsTabs,
  TabItem,
} from '@/components/burger-ingredients/ingredients-tabs'

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
    <section>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Соберите бургер
      </h1>
      <IngredientsTabs
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={setCurrentTab}
      />
    </section>
  )
}
