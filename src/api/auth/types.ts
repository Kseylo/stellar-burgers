export interface BaseResponse {
  success: boolean
}

export interface User {
  email: string
  name: string
}

export interface AuthResponse extends BaseResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface UserResponse extends BaseResponse {
  user: User
}

export interface LogoutResponse extends BaseResponse {
  message: string
}

export interface RegisterRequest extends User {
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}
