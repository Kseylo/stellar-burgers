import { BASE_URL } from '@/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GroupedIngredients } from '@/types'
import { transformIngredients } from './transform-ingredients'

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<GroupedIngredients[], void>({
      query: () => 'ingredients',
      transformResponse: transformIngredients,
    }),
  }),
})

export const { useGetIngredientsQuery } = ingredientsApi
