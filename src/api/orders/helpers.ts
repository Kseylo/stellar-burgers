import { OrdersResponse } from '@/api'

interface SetupOrdersListenersArgs {
  wsUrl: string
  cacheDataLoaded: Promise<unknown>
  cacheEntryRemoved: Promise<unknown>
  updateCachedData: (updater: (draft: OrdersResponse) => void) => void
}

export const setupOrdersListeners = async (args: SetupOrdersListenersArgs) => {
  const { wsUrl, cacheDataLoaded, cacheEntryRemoved, updateCachedData } = args

  const ws = new WebSocket(wsUrl)

  try {
    await cacheDataLoaded
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as OrdersResponse
      if (data.success && data.orders) {
        updateCachedData((draft) => {
          draft.orders = data.orders
          draft.total = data.total
          draft.totalToday = data.totalToday
          draft.success = true
        })
      }
    }
    ws.addEventListener('message', listener)
  } catch (e) {
    console.error('WebSocket error:', e)
  }
  await cacheEntryRemoved
  ws.close()
}
