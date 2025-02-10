import { test, expect, describe } from 'vitest'
import {
  initialState,
  reducer,
  setRecoveryInitiated,
  resetRecoveryState,
} from './password-recovery-slice'

describe('password recovery slice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should set the recovery state', () => {
    const action = setRecoveryInitiated()
    const state = reducer(initialState, action)
    expect(state.isRecoveryInitiated).toBe(true)
  })

  test('should reset the recovery state', () => {
    const action = setRecoveryInitiated()
    const state = reducer(initialState, action)

    const action2 = resetRecoveryState()
    const state2 = reducer(state, action2)
    expect(state2.isRecoveryInitiated).toBe(false)
  })
})
