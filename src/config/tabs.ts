import { TabItem } from '@/types'
import { IngredientType } from './ingredients'

export const tabs: TabItem[] = [
  {
    type: IngredientType.BUN,
    label: 'Булки',
  },
  {
    type: IngredientType.SAUCE,
    label: 'Соусы',
  },
  {
    type: IngredientType.MAIN,
    label: 'Начинки',
  },
]
