import { useState } from 'react'
import { IngredientsTabs } from './ingredients-tabs'
import { useGetIngredientsQuery } from '@/api'
import { Ingredients } from './ingredients'
import { tabs } from '@/config'

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const { data, isLoading, isError } = useGetIngredientsQuery()

  return (
    <section className={'mt-10'}>
      <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
      <IngredientsTabs
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={setCurrentTab}
      />
      {!isLoading && !isError && data && (
        <Ingredients groupedIngredients={data} />
      )}
    </section>
  )
}
