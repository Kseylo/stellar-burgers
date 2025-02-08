import { http, HttpResponse } from 'msw'
import { tokens } from '../mocks'

export const handlers = [
  http.post('*/auth/login', async ({ request }) => {
    const user = await request.json()
    return HttpResponse.json({ ...tokens, user }, { status: 200 })
  }),
  http.post('*/auth/register', async ({ request }) => {
    const user = await request.json()
    return HttpResponse.json({ ...tokens, user }, { status: 200 })
  }),
  http.post('*/auth/logout', () => {
    return HttpResponse.json({ message: 'Success' }, { status: 200 })
  }),
]
