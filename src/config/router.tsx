import { createBrowserRouter, RouteObject } from 'react-router'
import { RootLayout, AuthLayout, ProtectedLayout } from '@/layouts'
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
  NotFoundPage,
} from '@/pages'

export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  PROFILE = '/profile',
  ORDERS_HISTORY = '/profile/orders',
  RESET_PASSWORD = '/reset-password',
  NOT_FOUND = '*',
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
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
