import React from 'react'
import styles from './loading-spinner.module.css'

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export function LoadingSpinner(props: ISVGProps) {
  const { size = 24, ...rest } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      className={`${styles.spinner}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
