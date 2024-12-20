import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'
import styles from './home.module.css'

export function HomePage() {
  return (
    <div className={`${styles.container}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  )
}
