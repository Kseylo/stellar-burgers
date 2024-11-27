import styles from './constructor-skeleton.module.css'

interface ConstructorSkeletonProps {
  placeholder: string
  position?: 'top' | 'bottom'
  isIngredients?: boolean
}

export function ConstructorSkeleton(props: ConstructorSkeletonProps) {
  const { placeholder, position, isIngredients } = props

  return (
    <div
      className={`${styles.constructor} constructor-element 
      ${position === 'top' && 'constructor-element_pos_top'} 
      ${position === 'bottom' && 'constructor-element_pos_bottom'}
      ${isIngredients && styles.ingredients}
      `}
    >
      {placeholder}
    </div>
  )
}
