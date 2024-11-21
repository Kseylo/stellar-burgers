import { Modal, ModalProps } from '@/components/modal'
import { NutritionInfo } from './nutrition-info'
import { Ingredient } from '@/types'
import styles from './ingredient-details.module.css'

interface IngredientDetailsProps extends ModalProps {
  ingredient: Ingredient
}

export function IngredientDetails(props: IngredientDetailsProps) {
  const { ingredient, ...rest } = props
  return (
    <Modal {...rest}>
      <article className={`${styles.content} pb-5`}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <h3 className={'text text_type_main-medium mt-4'}>{ingredient.name}</h3>
        <div className={`${styles.nutritionList} mt-8`}>
          <NutritionInfo label="Калории, ккал" value={ingredient.calories} />
          <NutritionInfo label="Белки, г" value={ingredient.proteins} />
          <NutritionInfo label="Жиры, г" value={ingredient.fat} />
          <NutritionInfo label="Углеводы, г" value={ingredient.carbohydrates} />
        </div>
      </article>
    </Modal>
  )
}
