import { useState, useEffect, memo } from 'react'
import styles from './SpellingDiagram.module.css'

const syllableExamples = [
  { initial: 'b', final: 'a', syllable: 'ba', pinyin: 'bā', char: '八' },
  { initial: 'p', final: 'o', syllable: 'po', pinyin: 'pō', char: '泼' },
  { initial: 'm', final: 'a', syllable: 'ma', pinyin: 'mā', char: '妈' },
  { initial: 'f', final: 'a', syllable: 'fa', pinyin: 'fā', char: '发' },
  { initial: 'd', final: 'a', syllable: 'da', pinyin: 'dà', char: '大' },
  { initial: 't', final: 'a', syllable: 'ta', pinyin: 'tā', char: '他' },
  { initial: 'n', final: 'i', syllable: 'ni', pinyin: 'nǐ', char: '你' },
  { initial: 'l', final: 'u', syllable: 'lu', pinyin: 'lù', char: '路' },
]

function SpellingDiagram({ initial = 'b', final = 'a', autoPlay = false }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [phase, setPhase] = useState('separate') // separate, moving, merged

  useEffect(() => {
    if (autoPlay) {
      animateSpelling()
    }
  }, [autoPlay, initial, final])

  const animateSpelling = () => {
    setIsAnimating(true)
    setPhase('separate')

    setTimeout(() => setPhase('moving'), 300)
    setTimeout(() => setPhase('merged'), 1000)
    setTimeout(() => {
      setIsAnimating(false)
      setPhase('separate')
    }, 2000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.diagram}>
        {/* Initial on left */}
        <div className={`${styles.syllablePart} ${styles.initial} ${phase === 'moving' ? styles.movingRight : ''}`}>
          <span className={styles.pinyinLetter}>{initial}</span>
          <span className={styles.partLabel}>声母</span>
        </div>

        {/* Plus sign */}
        <div className={`${styles.plus} ${phase === 'moving' ? styles.fadeOut : ''}`}>+</div>

        {/* Final on right */}
        <div className={`${styles.syllablePart} ${styles.final} ${phase === 'moving' ? styles.movingLeft : ''}`}>
          <span className={styles.pinyinLetter}>{final}</span>
          <span className={styles.partLabel}>韵母</span>
        </div>

        {/* Equals sign */}
        <div className={`${styles.equals} ${phase === 'merged' ? styles.show : ''}`}>=</div>

        {/* Result in center */}
        <div className={`${styles.result} ${phase === 'merged' ? styles.show : ''}`}>
          <span className={styles.syllable}>{initial}{final}</span>
        </div>
      </div>

      <button
        className={styles.playBtn}
        onClick={animateSpelling}
        disabled={isAnimating}
      >
        {isAnimating ? '拼读中...' : '播放动画'}
      </button>
    </div>
  )
}

export { syllableExamples }
export default memo(SpellingDiagram)
