import { AuthState } from '@/services/auth'
import { User } from '@/api'

export const tokens: AuthState = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
}

export const user: User = {
  email: 'user@example.com',
  name: 'John Doe',
}

export const loginCredentials = {
  email: 'user@example.com',
  password: 'password',
}

export const registerCredentials = {
  name: 'John Doe',
  email: 'user@example.com',
  password: 'password',
}
