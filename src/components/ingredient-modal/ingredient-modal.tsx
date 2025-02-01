import { useNavigate, useParams } from 'react-router'
import { Modal } from '@/components/modal'
import { IngredientDetails } from '@/components/ingredient-details'
import { useGetIngredientsQuery, ingredientsSelectors } from '@/api'
import { useMemo } from 'react'

export function IngredientModal() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: ingredientsState } = useGetIngredientsQuery()

  const ingredient = useMemo(() => {
    if (!ingredientsState || !id) return null
    return ingredientsSelectors.selectById(ingredientsState, id)
  }, [ingredientsState, id])

  if (!ingredient) return null

  return (
    <Modal onClose={() => navigate(-1)} title={'Детали ингредиента'}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
}
