import { test, expect, Page } from '@playwright/test'

const SELECTORS = {
  INGREDIENT_CARD: 'ingredient-card',
  CONSTRUCTOR_AREA: 'burger-constructor',
  BUN: (position: 'top' | 'bottom') => `.constructor-element_pos_${position}`,
  MODAL_TITLE: 'Детали ингредиента',
  ORDER_BUTTON: 'Оформить заказ',
  CLOSE_MODAL: 'close-modal',
}

async function addIngredients(
  page: Page,
  options: { bun?: boolean; ingredient?: boolean },
) {
  const { bun, ingredient } = options

  if (bun) {
    const bunCard = page.getByTestId(SELECTORS.INGREDIENT_CARD).first()
    await bunCard.dragTo(page.getByTestId(SELECTORS.CONSTRUCTOR_AREA))
  }

  if (ingredient) {
    const ingredientCard = page
      .getByTestId(SELECTORS.INGREDIENT_CARD)
      .filter({ hasText: 'Соус' })
      .first()
    await ingredientCard.dragTo(page.getByTestId(SELECTORS.CONSTRUCTOR_AREA))
  }
}

async function createOrder(page: Page) {
  const submitButton = page.getByRole('button', {
    name: SELECTORS.ORDER_BUTTON,
  })
  await submitButton.click()
}

async function login(page: Page) {
  await page.goto('/login')
  const emailInput = page.locator('input[name="email"]')
  await emailInput.fill(process.env.TEST_EMAIL!)

  const passwordInput = page.locator('input[name="password"]')
  await passwordInput.fill(process.env.TEST_PASSWORD!)

  const submitButton = page.getByRole('button', { name: 'Войти' })
  await submitButton.click()
}

async function openIngredientModal(page: Page) {
  const ingredientCard = page.getByTestId(SELECTORS.INGREDIENT_CARD).first()
  await ingredientCard.click()
}

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  })

  test.describe('Drag and Drop', () => {
    test('Dragging bun', async ({ page }) => {
      await addIngredients(page, { bun: true })

      await expect(page.locator(SELECTORS.BUN('top'))).toBeVisible()
      await expect(page.locator(SELECTORS.BUN('bottom'))).toBeVisible()
    })

    test('Dragging ingredient', async ({ page }) => {
      await addIngredients(page, { ingredient: true })
      await expect(page.locator('.constructor-element').nth(1)).toBeVisible()
    })
  })

  test.describe('Order flow', () => {
    test('Should navigate to login page if unauthorized', async ({ page }) => {
      await test.step('Add ingredients', async () => {
        await addIngredients(page, { bun: true, ingredient: true })
      })
      await test.step('Try to create order', async () => {
        await createOrder(page)
      })
      await expect(page).toHaveURL(`/login`)
    })

    test('Should create order', async ({ page }) => {
      await test.step('Login', async () => {
        await login(page)
      })

      await test.step('Add ingredients', async () => {
        await addIngredients(page, { bun: true, ingredient: true })
      })

      await test.step('Create order', async () => {
        await createOrder(page)
      })

      await expect(page.getByText('Оформляем заказ..')).toBeVisible()
      await expect(page.getByText('Ваш заказ начали готовить')).toBeVisible({
        timeout: 20000,
      })
    })
  })

  test.describe('Ingredient modal', () => {
    test('Should open modal', async ({ page }) => {
      await openIngredientModal(page)
      await expect(page).toHaveURL(/\/ingredients\//)
      await expect(page.getByText(SELECTORS.MODAL_TITLE)).toBeVisible()
    })

    test('Should close modal', async ({ page }) => {
      await openIngredientModal(page)
      const closeButton = page.getByTestId(SELECTORS.CLOSE_MODAL)
      await closeButton.click()
      await expect(page).toHaveURL('/')
      await expect(page.getByText(SELECTORS.MODAL_TITLE)).toBeHidden()
    })
  })
})
