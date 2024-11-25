import { GroupedIngredients, Ingredient } from '@/types'

export const transformIngredients = (response: {
  success: true
  data: Ingredient[]
}): GroupedIngredients[] => {
  const groupedIngredients = response.data.reduce<Record<string, Ingredient[]>>(
    (acc, ingredient) => {
      const type = ingredient.type

      if (!acc[type]) {
        acc[type] = []
      }

      acc[ingredient.type].push(ingredient)

      return acc
    },
    {},
  )

  return Object.entries(groupedIngredients).map(([type, ingredients]) => ({
    type,
    ingredients,
  }))
}
