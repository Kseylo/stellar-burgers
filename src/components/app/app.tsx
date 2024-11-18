import { AppHeader } from '@/components/app-header'
import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'

import styles from './app.module.css'

export function App() {
  return (
    <main className={styles.main}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  )
}
