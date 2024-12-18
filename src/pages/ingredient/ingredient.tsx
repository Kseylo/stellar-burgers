import { IngredientDetails } from '@/components/ingredient-details'
import styles from './ingredient.module.css'

export function IngredientPage() {
  return (
    <section className={styles.container}>
      <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
      <IngredientDetails />
    </section>
  )
}
