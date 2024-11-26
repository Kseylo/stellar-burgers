import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'
import type { Ingredient } from '@/types'

interface ConstructorItemProps {
  ingredient: Ingredient
}

export function ConstructorItem(props: ConstructorItemProps) {
  const { ingredient } = props
  return (
    <div className={styles.wrapper}>
      <DragIcon type={'primary'} />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={'ml-2 mt-4'}
      />
    </div>
  )
}
