import styles from './ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export interface TabItem {
  value: string
  label: string
}

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
          key={tab.value}
          active={currentTab.value === tab.value}
          value={tab.value}
          onClick={() => onTabClick(tab)}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  )
}
