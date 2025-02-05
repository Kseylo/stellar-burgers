export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  PROFILE = '/profile',
  PROFILE_ORDERS = '/profile/orders',
  PROFILE_ORDERS_DETAIL = '/profile/orders/:id',
  RESET_PASSWORD = '/reset-password',
  INGREDIENT = '/ingredients/:id',
  FEED = '/feed',
  ORDER = '/feed/:id',
  NOT_FOUND = '*',
}
