import { useCallback, useMemo, useState } from 'react'
import { pinyin } from 'pinyin-pro'

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
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioError, setAudioError] = useState(null)

  const speak = useCallback((text) => {
    setAudioError(null)

    if (!('speechSynthesis' in window)) {
      setAudioError('您的浏览器不支持语音合成')
      return
    }

    try {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = (e) => {
        setIsSpeaking(false)
        if (e.error !== 'canceled') {
          setAudioError('语音播放失败，请重试')
        }
      }

      window.speechSynthesis.speak(utterance)
    } catch {
      setIsSpeaking(false)
      setAudioError('语音播放失败，请重试')
    }
  }, [])

  const getPinyin = useCallback((char) => getPinyinChar(char), [])

  const pronounce = useCallback((text) => speak(text), [speak])

  const pronounceInitial = useCallback((initial) => speak(initial), [speak])

  const pronounceFinal = useCallback((final) => speak(final), [speak])

  const pronounceSyllable = useCallback((syllable) => speak(syllable), [speak])

  const pronounceWithTone = useCallback((character) => speak(character), [speak])

  return useMemo(() => ({
    pronounce,
    pronounceInitial,
    pronounceFinal,
    pronounceSyllable,
    pronounceWithTone,
    getPinyin,
    isSpeaking,
    audioError,
    clearAudioError: () => setAudioError(null),
  }), [pronounce, pronounceInitial, pronounceFinal, pronounceSyllable, pronounceWithTone, getPinyin, isSpeaking, audioError])
}

export default usePronunciation
