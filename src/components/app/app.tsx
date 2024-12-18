import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { AuthLayout, ProtectedLayout, RootLayout } from '@/layouts'
import { ROUTES } from '@/config/routes.ts'
import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '@/pages'
import { IngredientModal } from '@/components/ingredient-modal'

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

function AppRoutes() {
  const location = useLocation()
  const backgroundLocation = location.state && location.state.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route element={<RootLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.INGREDIENT} element={<IngredientPage />} />
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
      {backgroundLocation && (
        <Routes>
          <Route path={ROUTES.INGREDIENT} element={<IngredientModal />} />
        </Routes>
      )}
    </>
  )
}
