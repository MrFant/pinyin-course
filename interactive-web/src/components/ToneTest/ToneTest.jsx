import { useState, useEffect, useCallback } from 'react'
import usePronunciation from '../../hooks/usePronunciation'
import styles from './ToneTest.module.css'

const toneLabels = [
  { tone: 1, label: '一声 (阴平)', symbol: 'ˉ', description: '高平调' },
  { tone: 2, label: '二声 (阳平)', symbol: 'ˊ', description: '中升调' },
  { tone: 3, label: '三声 (上声)', symbol: 'ˇ', description: '降升调' },
  { tone: 4, label: '四声 (去声)', symbol: 'ˋ', description: '全降调' }
]

function ToneTest({ card, onComplete, onCorrect }) {
  const [selectedTone, setSelectedTone] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [correctTone, setCorrectTone] = useState(null)
  const { pronounceSyllable } = usePronunciation()

  useEffect(() => {
    setSelectedTone(null)
    setFeedback(null)
    determineCorrectTone()
  }, [card])

  const determineCorrectTone = useCallback(() => {
    if (!card) return

    const pinyin = card.back.pinyin
    let tone = 1

    if (pinyin.includes('ā') || pinyin.includes('a') && !pinyin.includes('á') && !pinyin.includes('ǎ') && !pinyin.includes('à')) {
      tone = 1
    } else if (pinyin.includes('á')) {
      tone = 2
    } else if (pinyin.includes('ǎ')) {
      tone = 3
    } else if (pinyin.includes('à')) {
      tone = 4
    }

    setCorrectTone(tone)
  }, [card])

  const handlePlayPronunciation = () => {
    if (card) {
      pronounceSyllable(card.back.pinyin)
    }
  }

  const handleToneSelect = (tone) => {
    if (feedback === 'correct') return

    setSelectedTone(tone)

    if (tone === correctTone) {
      setFeedback('correct')
      pronounceSyllable(card.back.pinyin)
      if (onCorrect) onCorrect()
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 1500)
    } else {
      setFeedback('wrong')
      setTimeout(() => {
        setSelectedTone(null)
        setFeedback(null)
      }, 1000)
    }
  }

  const getToneClass = (tone) => {
    if (tone === selectedTone) {
      return feedback === 'correct' ? styles.toneCorrect :
             feedback === 'wrong' ? styles.toneWrong : styles.toneSelected
    }
    if (feedback === 'correct' && tone === correctTone) {
      return styles.toneCorrect
    }
    return styles.tone
  }

  const getToneSymbol = (tone) => {
    const toneInfo = toneLabels.find(t => t.tone === tone)
    return toneInfo ? toneInfo.symbol : ''
  }

  if (!card) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>加载中...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.characterDisplay}>
        <span className={styles.character}>{card.back.character}</span>
        <div className={styles.meaning}>{card.back.meaning}</div>
      </div>

      <button className={styles.playButton} onClick={handlePlayPronunciation}>
        <span className={styles.playIcon}>▶</span>
        <span>播放发音</span>
      </button>

      <div className={styles.question}>这是第几声？</div>

      <div className={styles.tonesContainer}>
        {toneLabels.map((toneInfo) => (
          <button
            key={toneInfo.tone}
            className={getToneClass(toneInfo.tone)}
            onClick={() => handleToneSelect(toneInfo.tone)}
            disabled={feedback === 'correct'}
          >
            <span className={styles.toneSymbol}>{toneInfo.symbol}</span>
            <span className={styles.toneLabel}>{toneInfo.label}</span>
            <span className={styles.toneDescription}>{toneInfo.description}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`${styles.feedback} ${styles[feedback]}`}>
          {feedback === 'correct' ? '✓ 正确!' : '✗ 再试一次'}
        </div>
      )}

      <div className={styles.pinyinDisplay}>
        拼音：<span className={styles.pinyin}>{card.back.pinyin}</span>
      </div>

      <div className={styles.example}>
        例：{card.back.example}
      </div>
    </div>
  )
}

export default ToneTest
