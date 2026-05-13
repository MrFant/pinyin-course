import { memo } from 'react'
import styles from './Button.module.css'

function Button({ children, variant = 'primary', onClick, disabled = false }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default memo(Button)
