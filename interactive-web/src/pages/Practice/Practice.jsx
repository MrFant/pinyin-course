import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getChapterById } from '../../data/chapters'
import useProgressStore from '../../store/progressStore'
import usePronunciation from '../../hooks/usePronunciation'
import FlashCard from '../../components/FlashCard/FlashCard'
import TypingPractice from '../../components/TypingPractice/TypingPractice'
import ListeningTest from '../../components/ListeningTest/ListeningTest'
import ToneTest from '../../components/ToneTest/ToneTest'
import Button from '../../components/Button/Button'
import Progress from '../../components/Progress/Progress'
import styles from './Practice.module.css'

const PRACTICE_MODES = [
  { id: 'flashcard', label: '闪卡', icon: '🃏', description: '翻转卡片学习' },
  { id: 'typing', label: '打字', icon: '⌨️', description: '输入拼音练习' },
  { id: 'listening', label: '听力', icon: '👂', description: '听音选择拼音' },
  { id: 'tone', label: '声调', icon: '🎵', description: '辨别声调练习' }
]

function Practice() {
  const { chapterId } = useParams()
  const navigate = useNavigate()
  const chapter = getChapterById(chapterId)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [practiceMode, setPracticeMode] = useState('flashcard')

  const markCardCompleted = useProgressStore(state => state.markCardCompleted)
  const getChapterStats = useProgressStore(state => state.getChapterStats)
  const { pronounceSyllable } = usePronunciation()

  const handleFlip = useCallback((flipped) => {
    setIsFlipped(flipped)
    if (flipped && chapter) {
      pronounceSyllable(chapter.cards[currentIndex].back.pinyin)
    }
  }, [chapter, currentIndex, pronounceSyllable])

  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setShowResult(false)
  }, [chapterId, practiceMode])

  const handleModeChange = (mode) => {
    setPracticeMode(mode)
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setShowResult(false)
  }

  if (!chapter) {
    return (
      <div className={styles.container}>
        <h2>章节不存在</h2>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>
    )
  }

  const currentCard = chapter.cards[currentIndex]
  const stats = getChapterStats(chapterId, chapter.cards.length)
  const isComplete = currentIndex >= chapter.cards.length

  const handleResult = (correct) => {
    markCardCompleted(chapterId, currentCard.id, correct)
    setResults([...results, { cardId: currentCard.id, correct }])
    setIsFlipped(false)

    if (currentIndex + 1 >= chapter.cards.length) {
      setShowResult(true)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= chapter.cards.length) {
      setShowResult(true)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setShowResult(false)
  }

  if (showResult) {
    const correctCount = results.filter(r => r.correct).length
    const accuracy = Math.round((correctCount / results.length) * 100)

    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>练习完成！</h2>
          <div className={styles.resultStats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{results.length}</div>
              <div className={styles.statLabel}>总卡片</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{correctCount}</div>
              <div className={styles.statLabel}>正确认识</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{accuracy}%</div>
              <div className={styles.statLabel}>正确率</div>
            </div>
          </div>
          <div className={styles.resultActions}>
            <Button onClick={handleRestart}>再练一次</Button>
            <Button variant="secondary" onClick={() => navigate('/')}>返回首页</Button>
          </div>
        </div>
      </div>
    )
  }

  const renderPracticeComponent = () => {
    switch (practiceMode) {
      case 'typing':
        return (
          <TypingPractice
            card={currentCard}
            onComplete={handleNext}
            onCorrect={() => handleResult(true)}
          />
        )
      case 'listening':
        return (
          <ListeningTest
            card={currentCard}
            allCards={chapter.cards}
            onComplete={handleNext}
            onCorrect={() => handleResult(true)}
          />
        )
      case 'tone':
        return (
          <ToneTest
            card={currentCard}
            onComplete={handleNext}
            onCorrect={() => handleResult(true)}
          />
        )
      default:
        return (
          <FlashCard
            front={currentCard.front}
            back={currentCard.back}
            onFlip={handleFlip}
          />
        )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← 返回首页
        </button>
        <h1 className={styles.chapterTitle}>{chapter.icon} {chapter.name}</h1>
        <Progress current={currentIndex + 1} total={chapter.cards.length} />
      </div>

      <div className={styles.modeSelector}>
        {PRACTICE_MODES.map((mode) => (
          <button
            key={mode.id}
            className={`${styles.modeButton} ${practiceMode === mode.id ? styles.modeButtonActive : ''}`}
            onClick={() => handleModeChange(mode.id)}
            title={mode.description}
          >
            <span className={styles.modeIcon}>{mode.icon}</span>
            <span className={styles.modeLabel}>{mode.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.cardArea}>
        {renderPracticeComponent()}
      </div>

      {practiceMode === 'flashcard' && (
        <div className={styles.actions}>
          <Button variant="danger" onClick={() => handleResult(false)}>
            不认识
          </Button>
          <Button variant="success" onClick={() => handleResult(true)}>
            认识
          </Button>
        </div>
      )}
    </div>
  )
}

export default Practice
