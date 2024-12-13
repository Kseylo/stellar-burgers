import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'
import styles from './home.module.css'

import { useGetIngredientsQuery } from '@/api'

export function HomePage() {
  const { data, isLoading, isError } = useGetIngredientsQuery()
  return (
    <div className={`${styles.container}`}>
      {!isLoading && !isError && data && (
        <BurgerIngredients ingredients={data} />
      )}
      <BurgerConstructor />
    </div>
  )
}
