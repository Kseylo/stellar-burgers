import bun from '@/assets/images/bun.png'
import styles from './ingredient-preview.module.css'

export function IngredientPreview({ more }: { more?: number }) {
  return (
    <div className={styles.image}>
      {more && (
        <div className={`text text_type_main-default ${styles.overlay}`}>
          +{more}
        </div>
      )}
      <img src={bun} alt="Ингредиент" />
    </div>
  )
}
