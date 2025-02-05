import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { ProfileLayout, ProtectedLayout, RootLayout } from '@/layouts'
import { ROUTES } from '@/config/routes.ts'
import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  EditProfilePage,
  RegisterPage,
  ResetPasswordPage,
  FeedPage,
  OrderPage,
  ProfileOrdersPage,
  ProfileOrdersDetailPage,
} from '@/pages'
import { IngredientModal } from '@/components/ingredient-modal'
import { OrderModal } from '@/components/order-modal'

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
          <Route path={ROUTES.FEED} element={<FeedPage />} />
          <Route path={ROUTES.ORDER} element={<OrderPage />} />
          <Route element={<ProtectedLayout anonymous />}>
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
            <Route path={ROUTES.PROFILE} element={<ProfileLayout />}>
              <Route index element={<EditProfilePage />} />
              <Route
                path={ROUTES.PROFILE_ORDERS}
                element={<ProfileOrdersPage />}
              />
            </Route>
            <Route
              path={ROUTES.PROFILE_ORDERS_DETAIL}
              element={<ProfileOrdersDetailPage />}
            />
          </Route>
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path={ROUTES.INGREDIENT} element={<IngredientModal />} />
          <Route path={ROUTES.ORDER} element={<OrderModal />} />
        </Routes>
      )}
    </>
  )
}
