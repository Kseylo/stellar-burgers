import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit'

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error(action.payload)
  }
  return next(action)
}
