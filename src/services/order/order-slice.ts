import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderState {
  name: string
  number: number
}

const initialState: OrderState = {
  name: '',
  number: 0,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      state.name = action.payload.name
      state.number = action.payload.number
    },
    clearOrder: () => initialState,
  },
})

export const { setOrder, clearOrder } = orderSlice.actions
