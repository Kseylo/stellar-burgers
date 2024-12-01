import { NutritionInfo } from './nutrition-info'
import styles from './ingredient-details.module.css'
import { useAppSelector } from '@/store'
import { selectIngredient } from '@/services/ingredient'

export function IngredientDetails() {
  const ingredient = useAppSelector(selectIngredient)!

  return (
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
  )
}
