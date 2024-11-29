import { Ingredient } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BurgerState {
  bun: Ingredient | null
  ingredients: Ingredient[]
}

const initialState: BurgerState = {
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
      state.ingredients.push(action.payload)
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
  },
})

export const { setBun, addIngredient, removeIngredient, reorderIngredient } =
  burgerSlice.actions
