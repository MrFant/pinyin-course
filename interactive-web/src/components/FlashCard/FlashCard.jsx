import { useState, memo } from 'react'
import usePronunciation from '../../hooks/usePronunciation'
import styles from './FlashCard.module.css'

function FlashCard({ front, back, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { pronounceSyllable, isSpeaking } = usePronunciation()

  const handleClick = () => {
    const newState = !isFlipped
    setIsFlipped(newState)
    onFlip && onFlip(newState)
  }

  const handlePronounce = (e) => {
    e.stopPropagation()
    if (back?.pinyin) {
      pronounceSyllable(back.pinyin)
    }
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.face} ${styles.front}`}>
          <div className={styles.content}>
            <div className={styles.mainText}>{front}</div>
            <div className={styles.hint}>点击翻转</div>
          </div>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <div className={styles.content}>
            <div className={styles.pinyinRow}>
              <span className={styles.pinyin}>{back?.pinyin}</span>
              <button
                className={`${styles.audioBtn} ${isSpeaking ? styles.speaking : ''}`}
                onClick={handlePronounce}
                title="播放发音"
                disabled={isSpeaking}
              >
                {isSpeaking ? '...' : '🔊'}
              </button>
            </div>
            <div className={styles.character}>{back?.character}</div>
            <div className={styles.meaning}>{back?.meaning}</div>
            <div className={styles.example}>例：{back?.example}</div>
            <div className={styles.pronunciation}>{back?.pronunciation}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(FlashCard)
