import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'
import type { IngredientWithKey } from '@/types'
import { useDrag, useDrop } from 'react-dnd'
import { Identifier, XYCoord } from 'dnd-core'
import { useRef } from 'react'
import { useAppDispatch } from '@/store'
import { removeIngredient, reorderIngredient } from '@/services/burger'

interface ConstructorItemProps {
  ingredient: IngredientWithKey
  index: number
}

export function ConstructorItem(props: ConstructorItemProps) {
  const { ingredient, index } = props
  const ref = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-item',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ handlerId }, drop] = useDrop<
    { index: number },
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'constructor-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(reorderIngredient({ from: dragIndex, to: hoverIndex }))

      item.index = hoverIndex
    },
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={styles.wrapper}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type={'primary'} />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={'ml-2 mt-4'}
        handleClose={() => dispatch(removeIngredient({ index }))}
      />
    </div>
  )
}
