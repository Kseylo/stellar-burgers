import { Ingredient } from '@/utils/data.ts'

export const BASE_URL = 'https://norma.nomoreparties.space/api'

export const getIngredients = async (): Promise<{
  success: boolean
  data: Ingredient[]
}> => {
  const response = await fetch(`${BASE_URL}/ingredients`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}
