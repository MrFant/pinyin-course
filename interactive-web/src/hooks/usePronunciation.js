import { useCallback, useMemo, useState } from 'react'
import { pinyin } from 'pinyin-pro'
import TtsService from '../services/ttsService'

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

  const speak = useCallback(async (text) => {
    setAudioError(null)
    setIsSpeaking(true)

    try {
      const success = await TtsService.play(text)
      if (!success) {
        setAudioError('语音播放失败，请重试')
      }
    } catch {
      setAudioError('语音播放失败，请重试')
    } finally {
      setIsSpeaking(false)
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
