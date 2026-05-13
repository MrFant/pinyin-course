import { useState, useEffect, useCallback, memo } from 'react'
import usePronunciation from '../../hooks/usePronunciation'
import styles from './ListeningTest.module.css'

function ListeningTest({ card, allCards, onComplete, onCorrect }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [options, setOptions] = useState([])
  const { pronounceSyllable, isSpeaking } = usePronunciation()

  useEffect(() => {
    setSelectedOption(null)
    setFeedback(null)
    generateOptions()
  }, [card, allCards])

  const generateOptions = useCallback(() => {
    if (!card || !allCards) return

    const correctPinyin = card.back.pinyin
    const otherCards = allCards.filter(c => c.id !== card.id)

    const shuffled = otherCards.sort(() => Math.random() - 0.5)
    const distractors = shuffled.slice(0, 3).map(c => c.back.pinyin)

    const allOptions = [correctPinyin, ...distractors]
      .sort(() => Math.random() - 0.5)

    setOptions(allOptions)
  }, [card, allCards])

  const handlePlayPronunciation = () => {
    if (card) {
      pronounceSyllable(card.back.pinyin)
    }
  }

  const handleOptionSelect = (option) => {
    if (feedback === 'correct') return

    setSelectedOption(option)

    if (option === card.back.pinyin) {
      setFeedback('correct')
      pronounceSyllable(card.back.pinyin)
      if (onCorrect) onCorrect()
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 1500)
    } else {
      setFeedback('wrong')
      setTimeout(() => {
        setSelectedOption(null)
        setFeedback(null)
      }, 1000)
    }
  }

  const getOptionClass = (option) => {
    if (option === selectedOption) {
      return feedback === 'correct' ? styles.optionCorrect :
             feedback === 'wrong' ? styles.optionWrong : styles.optionSelected
    }
    if (feedback === 'correct' && option === card.back.pinyin) {
      return styles.optionCorrect
    }
    return styles.option
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

      <button
        className={`${styles.playButton} ${isSpeaking ? styles.speaking : ''}`}
        onClick={handlePlayPronunciation}
        disabled={isSpeaking}
      >
        <span className={styles.playIcon}>{isSpeaking ? '...' : '▶'}</span>
        <span>{isSpeaking ? '播放中...' : '播放发音'}</span>
      </button>

      <div className={styles.optionsContainer}>
        {options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleOptionSelect(option)}
            disabled={feedback === 'correct'}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`${styles.feedback} ${styles[feedback]}`}>
          {feedback === 'correct' ? '✓ 正确!' : '✗ 再试一次'}
        </div>
      )}

      <div className={styles.example}>
        例：{card.back.example}
      </div>
    </div>
  )
}

export default memo(ListeningTest)
