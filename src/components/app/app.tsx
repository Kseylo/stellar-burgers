import { BrowserRouter, Routes, Route } from 'react-router'
import { RootLayout, ProtectedLayout, AuthLayout } from '@/layouts'
import { ROUTES } from '@/config/routes.ts'
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
  ForgotPasswordPage,
  NotFoundPage,
} from '@/pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={ROUTES.RESET_PASSWORD}
              element={<ResetPasswordPage />}
            />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
