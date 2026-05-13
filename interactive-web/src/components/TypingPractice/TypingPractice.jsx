import { useState, useEffect, useRef } from 'react'
import usePronunciation from '../../hooks/usePronunciation'
import styles from './TypingPractice.module.css'

function TypingPractice({ card, onComplete, onCorrect }) {
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const inputRef = useRef(null)
  const { pronounceSyllable } = usePronunciation()

  useEffect(() => {
    setUserInput('')
    setFeedback(null)
    setIsCorrect(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [card])

  const handleInputChange = (e) => {
    const value = e.target.value
    setUserInput(value)

    if (value.toLowerCase() === card.back.pinyin.toLowerCase()) {
      setFeedback('correct')
      setIsCorrect(true)
      pronounceSyllable(card.back.pinyin)
      if (onCorrect) onCorrect()
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 1000)
    } else if (value.length > 0) {
      setFeedback('wrong')
      setIsCorrect(false)
    } else {
      setFeedback(null)
      setIsCorrect(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && feedback === 'correct') {
      if (onComplete) onComplete()
    }
  }

  const handlePronounce = () => {
    pronounceSyllable(card.back.pinyin)
  }

  const feedbackClass = feedback === 'correct' ? styles.correct :
                        feedback === 'wrong' ? styles.wrong : ''

  return (
    <div className={styles.container}>
      <div className={styles.characterDisplay}>
        <span className={styles.character}>{card.back.character}</span>
        <button className={styles.audioBtn} onClick={handlePronounce} title="播放发音">
          🔊
        </button>
      </div>

      <div className={styles.meaning}>{card.back.meaning}</div>

      <div className={styles.inputArea}>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.input} ${feedbackClass}`}
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="输入拼音..."
          autoComplete="off"
          spellCheck="false"
          disabled={feedback === 'correct'}
        />

        {feedback && (
          <div className={`${styles.feedback} ${styles[feedback]}`}>
            {feedback === 'correct' ? '✓ 正确!' : '✗ 再试一次'}
          </div>
        )}
      </div>

      <div className={styles.hint}>
        <span className={styles.hintLabel}>提示：</span>
        <span className={styles.hintText}>{card.back.pinyin}</span>
      </div>

      <div className={styles.example}>
        例：{card.back.example}
      </div>
    </div>
  )
}

export default TypingPractice
