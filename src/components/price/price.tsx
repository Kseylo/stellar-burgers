import styles from './price.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface PriceProps {
  price: number
  className?: string
  size?: 'small' | 'medium'
}

export function Price(props: PriceProps) {
  const { price, className, size = 'small' } = props
  return (
    <div className={`${styles.price} ${className}`}>
      <p
        className={`text text_type_digits-${size === 'small' ? 'default' : 'medium'} mr-2`}
      >
        {price}
      </p>
      <CurrencyIcon
        type={'primary'}
        className={size === 'small' ? '' : styles.iconMedium}
      />
    </div>
  )
}
