import styles from './ingredient-preview.module.css'

interface IngredientPreviewProps {
  src: string
  more?: number
}

export function IngredientPreview(props: IngredientPreviewProps) {
  const { src, more } = props

  return (
    <div className={styles.image}>
      {more && (
        <div className={`text text_type_main-default ${styles.overlay}`}>
          +{more}
        </div>
      )}
      <img src={src} alt="Ингредиент" />
    </div>
  )
}
