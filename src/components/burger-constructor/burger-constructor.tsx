import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredients } from '@/utils/data.ts'
import { Price } from '@/components/price'
import styles from './burger-constructor.module.css'
import { ConstructorItem } from './constructor-item'

export function BurgerConstructor() {
  const bun = ingredients[0]
  const toppings = ingredients.filter(
    (ingredient) => ingredient.type === 'main' || ingredient.type === 'sauce',
  )

  return (
    <section className={'mt-25'}>
      <ConstructorElement
        type="top"
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        isLocked
        extraClass={'ml-8 pl-4'}
      />

      <div className={`${styles.scroll} mt-4 pr-2`}>
        {toppings.map((ingredient) => (
          <ConstructorItem key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>

      <ConstructorElement
        type="bottom"
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        isLocked
        extraClass={'ml-8 pl-4 mt-4'}
      />

      <div className={`${styles.totalContainer} mt-10`}>
        <Price price={610} size={'medium'} className={'mr-10'} />
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
