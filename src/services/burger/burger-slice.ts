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
  },
})

export const { setBun, addIngredient, removeIngredient } = burgerSlice.actions
