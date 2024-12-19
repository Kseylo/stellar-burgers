export interface User {
  email: string
  name: string
}

export interface AuthResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: User
}

export interface UserResponse {
  success: boolean
  user: User
}

export interface LogoutResponse {
  success: boolean
  message: string
}
