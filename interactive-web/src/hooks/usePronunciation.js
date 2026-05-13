import { useCallback } from 'react'
import { pinyin } from 'pinyin-pro'

const usePronunciation = () => {
  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.8
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  const getPinyin = useCallback((char) => {
    try {
      return pinyin(char, { toneType: 'symbol', type: 'string' })
    } catch (error) {
      console.error('Pinyin conversion error:', error)
      return char
    }
  }, [])

  const pronounce = useCallback((text) => {
    speak(text)
  }, [speak])

  const pronounceInitial = useCallback((initial) => {
    speak(initial)
  }, [speak])

  const pronounceFinal = useCallback((final) => {
    speak(final)
  }, [speak])

  const pronounceSyllable = useCallback((syllable) => {
    speak(syllable)
  }, [speak])

  const pronounceWithTone = useCallback((character, tone) => {
    speak(character)
  }, [speak])

  return {
    pronounce,
    pronounceInitial,
    pronounceFinal,
    pronounceSyllable,
    pronounceWithTone,
    getPinyin,
  }
}

export default usePronunciation
