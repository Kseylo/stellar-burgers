import { IngredientDetails } from '@/components/ingredient-details'
import styles from './ingredient.module.css'
import { useParams } from 'react-router'
import { useGetIngredientsQuery } from '@/api'

export function IngredientPage() {
  const { id } = useParams()
  const { data } = useGetIngredientsQuery()
  const ingredient = data?.find((ingredient) => ingredient._id === id)

  if (!ingredient) return null

  return (
    <section className={styles.container}>
      <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
      <IngredientDetails ingredient={ingredient} />
    </section>
  )
}
