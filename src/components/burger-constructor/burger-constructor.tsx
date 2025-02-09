import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from '@/components/price'
import styles from './burger-constructor.module.css'
import { ConstructorItem } from './constructor-item'
import { OrderDetails } from '@/components/order-details'
import { Modal } from '@/components/modal'
import { useModal } from '@/hooks/use-modal'
import { useDrop } from 'react-dnd'
import { Ingredient } from '@/types'
import { IngredientType } from '@/config'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  selectBurger,
  addIngredient,
  setBun,
  clearIngredients,
} from '@/services/burger'
import { ConstructorSkeleton } from '@/components/constructor-skeleton'
import { useMemo } from 'react'
import { useCreateOrderMutation } from '@/api/orders'
import { clearOrder, setOrder } from '@/services/order'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/routes.ts'
import { LoadingSpinner } from '@/components/loading-spinner'
import { selectAccessToken } from '@/services/auth'

export function BurgerConstructor() {
  const { open, handleOpen, handleClose } = useModal()
  const navigate = useNavigate()

  const { bun, ingredients } = useAppSelector(selectBurger)
  const accessToken = useAppSelector(selectAccessToken)

  const dispatch = useAppDispatch()

  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const [, dropRefIngredients] = useDrop({
    accept: 'ingredient',
    drop: (item: Ingredient) => {
      if (item.type === IngredientType.BUN) {
        dispatch(setBun(item))
      } else {
        dispatch(addIngredient(item))
      }
    },
  })

  const totalPrice = useMemo(() => {
    const ingredientsPrice = ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price
    }, 0)
    return ingredientsPrice + (bun ? bun.price * 2 : 0)
  }, [bun, ingredients])

  const onSubmit = async () => {
    if (!accessToken) return navigate(ROUTES.LOGIN)

    handleOpen()

    try {
      const {
        name,
        order: { number },
      } = await createOrder({
        ingredients: [bun!._id, ...ingredients.map((ing) => ing._id), bun!._id],
      }).unwrap()
      dispatch(setOrder({ name, number }))
      dispatch(clearIngredients())
    } catch (error) {
      console.error(error)
    }
  }

  const closeModal = () => {
    dispatch(clearOrder())
    handleClose()
  }

  return (
    <section
      ref={dropRefIngredients}
      className={'mt-25 pl-4'}
      data-testid={'burger-constructor'}
    >
      <div className={'ml-8 pr-4'}>
        {bun ? (
          <ConstructorElement
            type="top"
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            isLocked
          />
        ) : (
          <ConstructorSkeleton
            placeholder={'Выберите булку'}
            position={'top'}
          />
        )}
      </div>

      <div className={`${styles.scroll} pr-1`}>
        {ingredients && ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <ConstructorItem
              key={ingredient.key}
              index={index}
              ingredient={ingredient}
            />
          ))
        ) : (
          <ConstructorSkeleton
            placeholder={'Выберите ингредиенты'}
            isIngredients
          />
        )}
      </div>

      <div className={'ml-8 pr-4 mt-4'}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            isLocked
          />
        ) : (
          <ConstructorSkeleton
            placeholder={'Выберите булку'}
            position={'bottom'}
          />
        )}
      </div>

      <div className={`${styles.totalContainer} mt-10`}>
        <Price price={totalPrice} size={'medium'} className={'mr-10'} />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onSubmit}
          disabled={!bun || !ingredients.length || isLoading}
        >
          Оформить заказ
        </Button>
      </div>
      {open && (
        <Modal
          onClose={closeModal}
          title={isLoading ? 'Оформляем заказ...' : ''}
        >
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <LoadingSpinner size={76} />
            </div>
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </section>
  )
}
