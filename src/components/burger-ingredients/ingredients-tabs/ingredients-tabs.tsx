import styles from './ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { TabItem } from '@/types'

export interface IngredientsTabsProps {
  tabs: TabItem[]
  currentTab: TabItem
  onTabClick: (value: TabItem) => void
}

export function IngredientsTabs(props: IngredientsTabsProps) {
  const { tabs, currentTab, onTabClick } = props

  return (
    <div className={`${styles.tabs} mt-5`}>
      {tabs.map((tab) => (
        <Tab
          key={tab.type}
          active={currentTab.type === tab.type}
          value={tab.type}
          onClick={() => onTabClick(tab)}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  )
}
