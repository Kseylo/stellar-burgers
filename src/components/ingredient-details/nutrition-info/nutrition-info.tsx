import styles from './nutrition-info.module.css'

interface NutritionInfoProps {
  label: string
  value: number
}

export function NutritionInfo(props: NutritionInfoProps) {
  const { label, value } = props

  return (
    <div className={`${styles.nutrition} mr-5`}>
      <p className={'text text_type_main-default text_color_inactive'}>
        {label}
      </p>
      <p className={'text text_type_digits-default text_color_inactive mt-2'}>
        {value}
      </p>
    </div>
  )
}
