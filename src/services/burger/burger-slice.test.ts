import { test, expect, describe } from 'vitest'

import {
  reducer,
  initialState,
  setBun,
  addIngredient,
  removeIngredient,
  reorderIngredient,
  clearIngredients,
} from './burger-slice'
import { Ingredient } from '@/types'

const mockIngredient: Ingredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
}

describe('burger slice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should set the bun', () => {
    const action = setBun(mockIngredient)
    const state = reducer(initialState, action)
    expect(state.bun).toEqual(mockIngredient)
  })

  test('should add an ingredient', () => {
    const action = addIngredient(mockIngredient)
    const state = reducer(initialState, action)

    expect(state.ingredients).toHaveLength(1)
    expect(state.ingredients[0]).toEqual({
      ...mockIngredient,
      key: 'mocked-uuid',
    })
  })

  test('should remove an ingredient', () => {
    const action = addIngredient(mockIngredient)
    const state = reducer(initialState, action)

    const action2 = removeIngredient({ index: 0 })
    const state2 = reducer(state, action2)

    expect(state2.ingredients).toHaveLength(0)
  })

  test('should reorder an ingredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, key: 'key-1' },
        { ...mockIngredient, key: 'key-2' },
        { ...mockIngredient, key: 'key-3' },
      ],
    }

    const action = reorderIngredient({ from: 0, to: 2 })
    const state = reducer(stateWithIngredients, action)

    expect(state.ingredients).toHaveLength(3)
    expect(state.ingredients.map((ing) => ing.key)).toEqual([
      'key-2',
      'key-3',
      'key-1',
    ])
  })

  test('should clear all ingredients', () => {
    const stateWithIngredients = {
      bun: mockIngredient,
      ingredients: [{ ...mockIngredient, key: 'mocked-uuid' }],
    }
    const state = reducer(stateWithIngredients, clearIngredients())

    expect(state).toEqual(initialState)
  })
})
