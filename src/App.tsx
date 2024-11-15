import { AppHeader } from '@/components/app-header'
import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'

import styles from './App.module.css'

function App() {
  return (
    <main className={`${styles.main}`}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  )
}

export default App
