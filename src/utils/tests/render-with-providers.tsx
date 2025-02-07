import { ReactElement, ReactNode } from 'react'
import { RenderOptions } from '@testing-library/react'
import { AppStore, RootState, setupStore } from '@/store'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: ReactElement,
  options: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = options

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
