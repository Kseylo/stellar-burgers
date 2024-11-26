import { BASE_URL } from '@/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ingredient } from '@/types'

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<Ingredient[], void>({
      query: () => 'ingredients',
      transformResponse: (response: { success: true; data: Ingredient[] }) =>
        response.data,
    }),
  }),
})

export const { useGetIngredientsQuery } = ingredientsApi
