export interface Ingredient {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export interface IngredientWithKey extends Ingredient {
  key: string
}

export interface IngredientWithCount extends Ingredient {
  count: number
}

export interface TabItem {
  type: string
  label: string
}
