import { useEffect, useMemo, useState } from 'react'
import { IngredientsTabs } from './ingredients-tabs'
import { tabs } from '@/config'
import { TabItem } from '@/types'
import styles from './burger-ingredients.module.css'
import { IngredientSection } from './ingredient-section'
import { IntersectionOptions, useInView } from 'react-intersection-observer'
import { useGetIngredientsQuery } from '@/api'
import { LoadingSpinner } from '@/components/loading-spinner'

const intersectionOptions: IntersectionOptions = {
  threshold: 0,
}

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const [bunsRef, inViewBuns, bunEntry] = useInView(intersectionOptions)
  const [saucesRef, inViewSauces, saucesEntry] = useInView(intersectionOptions)
  const [mainsRef, inViewMains, mainsEntry] = useInView(intersectionOptions)

  const { data: ingredients = [], isLoading } = useGetIngredientsQuery()

  const sections = useMemo(() => {
    return [
      {
        type: 'bun',
        label: 'Булки',
        ref: bunsRef,
        inView: inViewBuns,
        ingredients: ingredients.filter(({ type }) => type === 'bun'),
        entry: bunEntry,
      },
      {
        type: 'sauce',
        label: 'Соусы',
        ref: saucesRef,
        inView: inViewSauces,
        ingredients: ingredients.filter(({ type }) => type === 'sauce'),
        entry: saucesEntry,
      },
      {
        type: 'main',
        label: 'Начинки',
        ref: mainsRef,
        inView: inViewMains,
        ingredients: ingredients.filter(({ type }) => type === 'main'),
        entry: mainsEntry,
      },
    ]
  }, [
    bunEntry,
    bunsRef,
    inViewBuns,
    inViewMains,
    inViewSauces,
    ingredients,
    mainsEntry,
    mainsRef,
    saucesEntry,
    saucesRef,
  ])

  const handleTabClick = (tab: TabItem) => {
    setCurrentTab(tab)
    const section = sections.find((section) => section.type === tab.type)
    section?.entry?.target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const visibleSection = sections.find((section) => section.inView)
    if (visibleSection && visibleSection.type !== currentTab.type) {
      setCurrentTab(tabs.find((tab) => tab.type === visibleSection.type)!)
    }
  }, [currentTab.type, sections])

  return (
    <section className={'mt-10'}>
      <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
      <IngredientsTabs
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={handleTabClick}
      />

      <article className={`${styles.scroll} mt-10`}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <LoadingSpinner size={76} />
          </div>
        ) : (
          sections.map((section) => (
            <IngredientSection
              key={section.type}
              ref={section.ref}
              ingredients={section.ingredients}
              label={section.label}
            />
          ))
        )}
      </article>
    </section>
  )
}
