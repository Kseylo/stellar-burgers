import { Modal } from '@/components/modal'
import { useLocation, useNavigate, useParams } from 'react-router'
import {
  ingredientsSelectors,
  useGetAllOrdersQuery,
  useGetIngredientsQuery,
  useGetUserOrdersQuery,
} from '@/api'
import { Center } from '@/components/center'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Order } from '@/components/order'
import { ROUTES } from '@/config/routes.ts'

export function OrderModal() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  const isProfile = location.pathname.startsWith(ROUTES.PROFILE_ORDERS)

  const allOrdersQuery = useGetAllOrdersQuery(undefined, { skip: isProfile })
  const userOrdersQuery = useGetUserOrdersQuery(undefined, { skip: !isProfile })
  const ordersData = isProfile ? userOrdersQuery.data : allOrdersQuery.data

  const { data: ingredientsState } = useGetIngredientsQuery()

  const handleClose = () => navigate(-1)

  if (!ordersData || ordersData.orders.length === 0 || !ingredientsState) {
    return (
      <Modal onClose={handleClose} title="Загрузка...">
        <Center>
          <LoadingSpinner size={76} />
        </Center>
      </Modal>
    )
  }
  const order = ordersData.orders.find((order) => order._id === id)
  if (!order) {
    return (
      <Modal onClose={handleClose} title="Ошибка">
        <Center>
          <h2 className={'text text_type_main-medium mt-10'}>
            Заказ не найден
          </h2>
        </Center>
      </Modal>
    )
  }

  const ingredientsMap = ingredientsSelectors.selectEntities(ingredientsState)

  return (
    <Modal onClose={handleClose} title={`#${order.number}`}>
      <Order order={order} ingredientsMap={ingredientsMap} />
    </Modal>
  )
}
