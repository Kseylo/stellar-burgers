import { AppHeader } from '@/components/app-header'
import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'

import styles from './app.module.css'
import { useGetIngredientsQuery } from '@/api'

export function App() {
  const { data, isLoading, isError } = useGetIngredientsQuery()
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={`${styles.container}`}>
          {!isLoading && !isError && data && (
            <BurgerIngredients ingredients={data} />
          )}
          <BurgerConstructor />
        </div>
      </main>
    </>
  )
}
