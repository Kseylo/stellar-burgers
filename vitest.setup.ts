import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './src/utils'

const server = setupServer(...handlers)

vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}))

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
