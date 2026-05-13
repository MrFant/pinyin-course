import { useState, useEffect } from 'react'
import styles from './ToneAnimation.module.css'

const toneData = {
  1: { path: 'M 10 30 L 90 30', color: '#e17055', name: '阴平', value: '55', description: '高而平' },
  2: { path: 'M 10 50 L 90 20', color: '#00b894', name: '阳平', value: '35', description: '由中升高' },
  3: { path: 'M 10 20 L 50 60 L 90 30', color: '#6c5ce7', name: '上声', value: '214', description: '先降后升' },
  4: { path: 'M 10 20 L 90 60', color: '#d63031', name: '去声', value: '51', description: '由高降低' },
}

function ToneAnimation({ tone = 1, autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const data = toneData[tone] || toneData[1]

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true)
      const timer = setTimeout(() => setIsPlaying(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [autoPlay, tone])

  return (
    <div className={styles.container}>
      <div className={styles.toneName}>
        第{tone}声 · {data.name}
      </div>

      <svg viewBox="0 0 100 80" className={styles.svg}>
        {/* Grid lines */}
        <line x1="10" y1="20" x2="90" y2="20" stroke="#eee" strokeWidth="1" />
        <line x1="10" y1="40" x2="90" y2="40" stroke="#eee" strokeWidth="1" />
        <line x1="10" y1="60" x2="90" y2="60" stroke="#eee" strokeWidth="1" />

        {/* Tone path */}
        <path
          d={data.path}
          fill="none"
          stroke={data.color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isPlaying ? styles.animatedPath : ''}
        />

        {/* Tone value labels */}
        <text x="5" y="18" fontSize="10" fill="#999">5</text>
        <text x="5" y="38" fontSize="10" fill="#999">3</text>
        <text x="5" y="58" fontSize="10" fill="#999">1</text>
      </svg>

      <div className={styles.info}>
        <span className={styles.value} style={{ color: data.color }}>调值: {data.value}</span>
        <span className={styles.desc}>{data.description}</span>
      </div>

      <button
        className={styles.playBtn}
        onClick={() => {
          setIsPlaying(true)
          setTimeout(() => setIsPlaying(false), 1500)
        }}
      >
        播放动画
      </button>
    </div>
  )
}

export default ToneAnimation
