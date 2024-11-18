import type { Ingredient, GroupedIngredients } from '@/types'

export const groupIngredients = (
  ingredients: Ingredient[],
): GroupedIngredients[] => {
  return [
    {
      title: 'Булки',
      items: ingredients.filter((item) => item.type === 'bun'),
    },
    {
      title: 'Соусы',
      items: ingredients.filter((item) => item.type === 'sauce'),
    },
    {
      title: 'Начинки',
      items: ingredients.filter((item) => item.type === 'main'),
    },
  ]
}
