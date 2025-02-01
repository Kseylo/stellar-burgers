import { BASE_URL } from '@/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ingredient } from '@/types'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'

const ingredientsAdapter = createEntityAdapter({
  selectId: (ingredient: Ingredient) => ingredient._id,
})

type IngredientState = EntityState<Ingredient, string>

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientState, void>({
      query: () => 'ingredients',
      transformResponse(response: { success: boolean; data: Ingredient[] }) {
        return ingredientsAdapter.addMany(
          ingredientsAdapter.getInitialState(),
          response.data,
        )
      },
    }),
  }),
})

export const ingredientsSelectors = ingredientsAdapter.getSelectors()
export const { useGetIngredientsQuery } = ingredientsApi
