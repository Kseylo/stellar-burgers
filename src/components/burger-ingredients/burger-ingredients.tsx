import { useEffect, useMemo, useState } from 'react'
import { IngredientsTabs } from './ingredients-tabs'
import { tabs } from '@/config'
import { Ingredient, TabItem } from '@/types'
import { Modal } from '@/components/modal'
import { IngredientDetails } from '@/components/ingredient-details'
import { useModal } from '@/hooks/use-modal'
import styles from './burger-ingredients.module.css'
import { IngredientSection } from './ingredient-section'
import { IntersectionOptions, useInView } from 'react-intersection-observer'
import { useAppDispatch } from '@/store'
import { clearIngredient } from '@/services/ingredient'

const intersectionOptions: IntersectionOptions = {
  threshold: 0,
}

export function BurgerIngredients({
  ingredients,
}: {
  ingredients: Ingredient[]
}) {
  const { open, handleOpen, handleClose } = useModal()

  const [currentTab, setCurrentTab] = useState(tabs[0])

  const dispatch = useAppDispatch()

  const [bunsRef, inViewBuns, bunEntry] = useInView(intersectionOptions)
  const [saucesRef, inViewSauces, saucesEntry] = useInView(intersectionOptions)
  const [mainsRef, inViewMains, mainsEntry] = useInView(intersectionOptions)

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
        {sections.map((section) => (
          <IngredientSection
            key={section.type}
            ref={section.ref}
            ingredients={section.ingredients}
            onClick={handleOpen}
            label={section.label}
          />
        ))}
      </article>

      {open && (
        <Modal
          onClose={() => {
            dispatch(clearIngredient())
            handleClose()
          }}
          title={'Детали ингредиента'}
        >
          <IngredientDetails />
        </Modal>
      )}
    </section>
  )
}
