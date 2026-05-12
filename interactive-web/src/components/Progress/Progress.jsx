import styles from './Progress.module.css'

function Progress({ current, total, showLabel = true }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className={styles.label}>
          {current} / {total} ({percentage}%)
        </div>
      )}
    </div>
  )
}

export default Progress
