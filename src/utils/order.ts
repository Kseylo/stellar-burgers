import { Order } from '@/api'
import { Ingredient, IngredientWithCount } from '@/types'

export function getOrderIngredients(
  order: Order,
  ingredientsMap: Record<string, Ingredient>,
) {
  return order.ingredients.map((id) => ingredientsMap[id]).filter(Boolean)
}

export function getOrderTotalPrice(orderIngredients: Ingredient[]) {
  return orderIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
}

export function getUniqueOrderIngredients(orderIngredients: Ingredient[]) {
  const ingredientMap = orderIngredients.reduce<
    Record<string, IngredientWithCount>
  >((acc, ingredient) => {
    if (acc[ingredient._id]) {
      acc[ingredient._id].count += 1
    } else {
      acc[ingredient._id] = { ...ingredient, count: 1 }
    }
    return acc
  }, {})
  return Object.values(ingredientMap)
}

export function sortOrders(orders: Order[]) {
  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}
