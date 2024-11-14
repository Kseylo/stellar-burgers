import { AppHeader } from '@/components/app-header'
import { BurgerConstructor } from '@/components/burger-constructor'

import styles from './App.module.css'

function App() {
  return (
    <main className={`${styles.main}`}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <BurgerConstructor />
      </div>
    </main>
  )
}

export default App
