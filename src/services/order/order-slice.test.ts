import { test, expect } from 'vitest'
import {
  reducer,
  OrderState,
  initialState,
  setOrder,
  clearOrder,
} from './order-slice'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})

const mockOrder: OrderState = {
  name: 'Био-марсианский бургер',
  number: 67741,
}

test('should set the order', () => {
  const action = setOrder(mockOrder)
  const state = reducer(initialState, action)
  expect(state).toEqual(mockOrder)
})

test('should clear the order', () => {
  const action = setOrder(mockOrder)
  const state = reducer(initialState, action)

  const action2 = clearOrder()
  const state2 = reducer(state, action2)
  expect(state2).toEqual(initialState)
})
