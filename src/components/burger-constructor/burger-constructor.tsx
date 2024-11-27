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
  removeIngredient,
  setBun,
} from '@/services/burger'
import { ConstructorSkeleton } from '@/components/constructor-skeleton'
import { useMemo } from 'react'

export function BurgerConstructor() {
  const { open, handleOpen, handleClose } = useModal()

  const { bun, ingredients } = useAppSelector(selectBurger)

  const dispatch = useAppDispatch()

  const [, dropRef] = useDrop({
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

  return (
    <section ref={dropRef} className={'mt-25 pl-4'}>
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
              key={ingredient._id + index}
              ingredient={ingredient}
              handleClose={() => dispatch(removeIngredient({ index }))}
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
          onClick={handleOpen}
          disabled={!bun || !ingredients.length}
        >
          Оформить заказ
        </Button>
      </div>
      {open && (
        <Modal onClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}
