import { useCallback, useMemo } from 'react'
import { pinyin } from 'pinyin-pro'

// Shared speech synthesis function - no need to recreate on every hook mount
const speakText = (text, lang = 'zh-CN') => {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = 0.8
  utterance.pitch = 1
  window.speechSynthesis.speak(utterance)
}

// Shared pinyin converter - cache results
const pinyinCache = new Map()
const getPinyinChar = (char) => {
  if (pinyinCache.has(char)) return pinyinCache.get(char)
  try {
    const result = pinyin(char, { toneType: 'symbol', type: 'string' })
    pinyinCache.set(char, result)
    return result
  } catch (error) {
    console.error('Pinyin conversion error:', error)
    return char
  }
}

const usePronunciation = () => {
  const speak = useCallback((text) => speakText(text), [])

  const getPinyin = useCallback((char) => getPinyinChar(char), [])

  const pronounce = useCallback((text) => speakText(text), [])

  const pronounceInitial = useCallback((initial) => speakText(initial), [])

  const pronounceFinal = useCallback((final) => speakText(final), [])

  const pronounceSyllable = useCallback((syllable) => speakText(syllable), [])

  const pronounceWithTone = useCallback((character) => speakText(character), [])

  return useMemo(() => ({
    pronounce,
    pronounceInitial,
    pronounceFinal,
    pronounceSyllable,
    pronounceWithTone,
    getPinyin,
  }), [pronounce, pronounceInitial, pronounceFinal, pronounceSyllable, pronounceWithTone, getPinyin])
}

export default usePronunciation
