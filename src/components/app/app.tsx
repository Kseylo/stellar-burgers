import { AppHeader } from '@/components/app-header'
import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'
import { getIngredients } from '@/api'

import styles from './app.module.css'
import { useEffect, useState } from 'react'
import type { Ingredient } from '@/types'

export function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIngredients = async () => {
      setIsLoading(true)

      try {
        const { data } = await getIngredients()
        setIngredients(data)
      } catch (e) {
        console.error(e)
        setError('Не удалось загрузить ингредиенты. Попробуйте снова.')
      } finally {
        setIsLoading(false)
      }
    }
    void fetchIngredients()
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {!isLoading && !error && (
          <div className={`${styles.container}`}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </div>
        )}
      </main>
    </>
  )
}
