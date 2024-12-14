import { createBrowserRouter, RouteObject } from 'react-router'
import { RootLayout } from '@/layouts'
import { HomePage, LoginPage } from '@/pages'

export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
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
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
