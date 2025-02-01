export enum ORDER_STATUS {
  DONE = 'done',
  CREATED = 'created',
  PENDING = 'pending',
}

export interface Order {
  _id: string
  ingredients: string[]
  name: string
  number: number
  status: ORDER_STATUS
  createdAt: string
  updateAt: string
}

export interface OrdersResponse {
  success: boolean
  orders: Order[]
  total: number
  totalToday: number
}
