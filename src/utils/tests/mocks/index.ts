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

export const credentials = {
  email: 'user@example.com',
  password: 'password',
}
