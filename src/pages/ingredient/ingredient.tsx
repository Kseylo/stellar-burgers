import { IngredientDetails } from '@/components/ingredient-details'
import styles from './ingredient.module.css'
import { useParams, useNavigate } from 'react-router'
import { ingredientsSelectors, useGetIngredientsQuery } from '@/api'
import { useMemo } from 'react'
import { ROUTES } from '@/config/routes.ts'

export function IngredientPage() {
  const { id } = useParams()
  const { data: ingredientsState, isLoading } = useGetIngredientsQuery()
  const navigate = useNavigate()

  const ingredient = useMemo(() => {
    if (!ingredientsState || !id) return null
    return ingredientsSelectors.selectById(ingredientsState, id)
  }, [ingredientsState, id])

  if (isLoading) return null

  if (!ingredient) navigate(ROUTES.NOT_FOUND)

  return (
    <section className={styles.container}>
      <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
      <IngredientDetails ingredient={ingredient!} />
    </section>
  )
}
