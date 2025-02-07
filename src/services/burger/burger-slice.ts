import { Ingredient, IngredientWithKey } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface BurgerState {
  bun: Ingredient | null
  ingredients: IngredientWithKey[]
}

export const initialState: BurgerState = {
  bun: null,
  ingredients: [],
}

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.push({ ...action.payload, key: uuidv4() })
    },
    removeIngredient: (state, action: PayloadAction<{ index: number }>) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload.index,
      )
    },
    reorderIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) => {
      const { from, to } = action.payload
      const ingredient = state.ingredients.splice(from, 1)[0]
      state.ingredients.splice(to, 0, ingredient)
    },
    clearIngredients: (state) => {
      state.ingredients = []
      state.bun = null
    },
  },
})

export const {
  setBun,
  addIngredient,
  removeIngredient,
  reorderIngredient,
  clearIngredients,
} = burgerSlice.actions
export const { reducer } = burgerSlice
