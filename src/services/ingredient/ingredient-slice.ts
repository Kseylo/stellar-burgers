import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ingredient } from '@/types'

interface IngredientState {
  ingredient: null | Ingredient
}

const initialState: IngredientState = {
  ingredient: null,
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: initialState,
  reducers: {
    setIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.ingredient = action.payload
    },
    clearIngredient: (state) => {
      state.ingredient = null
    },
  },
})

export const { setIngredient, clearIngredient } = ingredientSlice.actions
