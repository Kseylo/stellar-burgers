import styles from './ingredients.module.css'
import { IngredientCard } from './ingredient-card'
import type { GroupedIngredients, Ingredient } from '@/types'
import { IngredientDetails } from '@/components/ingredient-details'
import { Modal } from '@/components/modal'
import { useModal } from '@/hooks/use-modal'
import { useAppDispatch } from '@/store'
import { setIngredient } from '@/services'
import { tabs } from '@/config'

interface IngredientsProps {
  groupedIngredients: GroupedIngredients[]
}

export function Ingredients({ groupedIngredients }: IngredientsProps) {
  const { open, handleOpen, handleClose } = useModal()

  const dispatch = useAppDispatch()

  const handleClick = (ingredient: Ingredient) => {
    dispatch(setIngredient(ingredient))
    handleOpen()
  }
  return (
    <article className={`${styles.scroll} mt-10`}>
      {groupedIngredients.map(({ type, ingredients }, index) => {
        const tab = tabs.find((tab) => tab.type === type)
        const label = tab?.label || type

        return (
          <div key={type} className={`${index === 0 ? '' : 'mt-10'}`}>
            <h2 className={'text text_type_main-medium'}>{label}</h2>
            <div className={`${styles.ingredients} mt-6 ml-4 mr-2`}>
              {ingredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient._id}
                  ingredient={ingredient}
                  onClick={handleClick}
                />
              ))}
            </div>
          </div>
        )
      })}
      {open && (
        <Modal onClose={handleClose} title={'Детали ингредиента'}>
          <IngredientDetails />
        </Modal>
      )}
    </article>
  )
}
