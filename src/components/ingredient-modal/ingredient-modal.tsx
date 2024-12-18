import { useNavigate, useParams } from 'react-router'
import { Modal } from '@/components/modal'
import { IngredientDetails } from '@/components/ingredient-details'
import { useGetIngredientsQuery } from '@/api'

export function IngredientModal() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data } = useGetIngredientsQuery()
  const ingredient = data?.find((ingredient) => ingredient._id === id)

  if (!ingredient) return null

  return (
    <Modal onClose={() => navigate(-1)} title={'Детали ингредиента'}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
}
