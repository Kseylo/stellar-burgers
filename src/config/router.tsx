import { createBrowserRouter, RouteObject } from 'react-router'
import { RootLayout, AuthLayout, ProtectedLayout } from '@/layouts'
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
} from '@/pages'

export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  PROFILE = '/profile',
  RESET_PASSWORD = '/reset-password',
}

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTES.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: ROUTES.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: ROUTES.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
