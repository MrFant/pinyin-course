import { useCallback } from 'react'

const useAudio = () => {
  const speak = useCallback((text, lang = 'zh-CN') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.8
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  const speakPinyin = useCallback((pinyin) => {
    speak(pinyin, 'zh-CN')
  }, [speak])

  const speakCharacter = useCallback((character) => {
    speak(character, 'zh-CN')
  }, [speak])

  const speakExample = useCallback((example) => {
    speak(example, 'zh-CN')
  }, [speak])

  return { speak, speakPinyin, speakCharacter, speakExample }
}

export default useAudio
