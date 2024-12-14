import { createBrowserRouter, RouteObject } from 'react-router'
import { RootLayout } from '@/layouts'
import { HomePage, LoginPage, RegisterPage } from '@/pages'
import { AuthLayout } from '@/layouts/auth'

export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
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
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
